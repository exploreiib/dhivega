import { Disposable } from '../../../../base/common/lifecycle.js';
import { URI } from '../../../../base/common/uri.js';
import { localize2 } from '../../../../nls.js';
import { IWorkbenchContribution, registerWorkbenchContribution2, WorkbenchPhase } from '../../../common/contributions.js';
import { INotificationService, INotificationActions, Severity } from '../../../../platform/notification/common/notification.js';
import { IStorageService, StorageScope, StorageTarget } from '../../../../platform/storage/common/storage.js';
import { IWorkspaceContextService } from '../../../../platform/workspace/common/workspace.js';
import { IFileService } from '../../../../platform/files/common/files.js';
import { VSBuffer } from '../../../../base/common/buffer.js';

class DhivegaRulesSetupWorkbenchContribution extends Disposable implements IWorkbenchContribution {
	static readonly ID = 'dhivegaRulesSetupWorkbenchContribution';
	private static readonly STORAGE_KEY_PREFIX = 'dhivega.rulesSetup.workspace.';
	private static readonly SETUP_DELAY_MS = 3000; // 3 seconds for production
	private _setupTimeout: NodeJS.Timeout | undefined;

	constructor(
		@INotificationService private readonly _notificationService: INotificationService,
		@IStorageService private readonly _storageService: IStorageService,
		@IWorkspaceContextService private readonly _workspaceContextService: IWorkspaceContextService,
		@IFileService private readonly _fileService: IFileService,
	) {
		super();
		this._setupWorkspaceChangeListener();
	}

	private _setupWorkspaceChangeListener(): void {
		// Listen for workspace changes
		this._register(this._workspaceContextService.onDidChangeWorkspaceFolders(() => {
			this._scheduleDhivegaRulesCheck();
		}));

		// Initial check when contribution is created
		this._scheduleDhivegaRulesCheck();
	}

	private _scheduleDhivegaRulesCheck(): void {
		// Clear any existing timeout
		if (this._setupTimeout) {
			clearTimeout(this._setupTimeout);
		}

		// Schedule check after delay
		this._setupTimeout = setTimeout(() => {
			this._checkAndSetupDhivegaRules();
		}, DhivegaRulesSetupWorkbenchContribution.SETUP_DELAY_MS);
	}

	private async _checkAndSetupDhivegaRules(): Promise<void> {
		const workspace = this._workspaceContextService.getWorkspace();

		if (!workspace.folders.length) {
			return;
		}

		const rootFolder = workspace.folders[0];
		const dhivegaRulesUri = URI.joinPath(rootFolder.uri, '.dhivegarules');

		// Check if file already exists
		try {
			await this._fileService.stat(dhivegaRulesUri);
			return; // File exists, no need to show prompt
		} catch {
			// File doesn't exist, continue with setup
		}

		// Check if user has chosen to ignore for this workspace
		const workspaceKey = this._getWorkspaceKey(rootFolder.uri);
		const hasIgnored = this._storageService.getBoolean(workspaceKey, StorageScope.WORKSPACE, false);

		if (hasIgnored) {
			return;
		}

		// Show notification with options
		this._showDhivegaRulesNotification(dhivegaRulesUri, workspaceKey);
	}

	private _getWorkspaceKey(workspaceUri: URI): string {
		return DhivegaRulesSetupWorkbenchContribution.STORAGE_KEY_PREFIX + workspaceUri.toString();
	}

	private _showDhivegaRulesNotification(dhivegaRulesUri: URI, workspaceKey: string): void {
		const message = localize2('dhivegaRulesSetupMessage', 'No .dhivegarules file found in this workspace. This file contains AI instructions that help customize code generation, suggestions, and behavior for your specific project. It can include coding standards, architectural preferences, and project-specific guidelines.').value;

		const actions: INotificationActions = {
			primary: [
				{
					id: 'dhivega.createRulesWithExample',
					label: localize2('dhivegaRulesCreateWithExample', 'Create with Example').value,
					tooltip: '',
					class: undefined,
					enabled: true,
					run: () => this._createDhivegaRulesFile(dhivegaRulesUri, true)
				},
				{
					id: 'dhivega.createRulesEmpty',
					label: localize2('dhivegaRulesCreateEmpty', 'Create Empty').value,
					tooltip: '',
					class: undefined,
					enabled: true,
					run: () => this._createDhivegaRulesFile(dhivegaRulesUri, false)
				}
			],
			secondary: [
				{
					id: 'dhivega.dontShowRulesAgain',
					label: localize2('dhivegaRulesDontShowAgain', 'Don\'t Show Again').value,
					tooltip: '',
					class: undefined,
					enabled: true,
					run: () => this._markAsIgnored(workspaceKey)
				}
			]
		};

		this._notificationService.notify({
			severity: Severity.Info,
			message,
			actions,
			sticky: false
		});
	}

	private async _createDhivegaRulesFile(uri: URI, withExample: boolean): Promise<void> {
		try {
			const content = withExample ? await this._generateExampleContent() : '';
			await this._fileService.writeFile(uri, VSBuffer.fromString(content));

			const message = withExample
				? localize2('dhivegaRulesCreatedWithExample', '.dhivegarules file created with example content! You can now customize the AI instructions for your project.').value
				: localize2('dhivegaRulesCreatedEmpty', '.dhivegarules file created! Add your project-specific AI instructions to customize code generation and suggestions.').value;

			this._notificationService.info(message);
		} catch (error) {
			this._notificationService.error(localize2('dhivegaRulesCreationFailed', 'Failed to create .dhivegarules file: {0}', error.message).value);
		}
	}

	private _markAsIgnored(workspaceKey: string): void {
		this._storageService.store(workspaceKey, true, StorageScope.WORKSPACE, StorageTarget.MACHINE);
	}

	private async _generateExampleContent(): Promise<string> {
		// Try to detect programming language/framework from workspace
		const detectedLanguage = await this._detectWorkspaceLanguage();

		let content = `# Dhivega AI Instructions for this project\n\n`;

		if (detectedLanguage) {
			content += this._getLanguageSpecificGuidelines(detectedLanguage);
		} else {
			content += this._getGenericGuidelines();
		}

		return content;
	}

	private async _detectWorkspaceLanguage(): Promise<string | null> {
		const workspace = this._workspaceContextService.getWorkspace();
		if (!workspace.folders.length) return null;

		const rootFolder = workspace.folders[0];
		const rootUri = rootFolder.uri;

		// Check for common project files to detect language/framework
		const projectFiles = [
			{ file: 'tsconfig.json', language: 'typescript' }, // Check TypeScript first
			{ file: 'package.json', language: 'javascript' },
			{ file: 'pyproject.toml', language: 'python' },
			{ file: 'requirements.txt', language: 'python' },
			{ file: 'Cargo.toml', language: 'rust' },
			{ file: 'go.mod', language: 'go' },
			{ file: 'pom.xml', language: 'java' },
			{ file: 'build.gradle', language: 'java' },
			{ file: 'Gemfile', language: 'ruby' },
			{ file: 'composer.json', language: 'php' },
			{ file: '*.csproj', language: 'csharp' },
			{ file: '*.sln', language: 'csharp' },
		];

		for (const { file, language } of projectFiles) {
			try {
				const fileUri = URI.joinPath(rootUri, file);
				await this._fileService.stat(fileUri);
				return language;
			} catch {
				// File doesn't exist, continue checking
			}
		}

		return null;
	}

	private _getLanguageSpecificGuidelines(language: string): string {
		const guidelines: Record<string, string> = {
			'typescript': `## TypeScript Guidelines
- Use strict TypeScript with proper type annotations
- Prefer interfaces over types for object shapes
- Use async/await over Promises
- Follow ESLint and Prettier configurations
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

## React Best Practices
- Use functional components with hooks
- Prefer useState and useEffect over class components
- Keep components small and focused
- Use proper prop types or TypeScript interfaces
- Follow the existing project structure and patterns`,

			'javascript': `## JavaScript Guidelines
- Use modern ES6+ features (const, let, arrow functions)
- Prefer async/await over Promises
- Use meaningful variable and function names
- Add JSDoc comments for complex functions
- Follow the existing code style and patterns
- Use proper error handling with try/catch`,

			'python': `## Python Guidelines
- Follow PEP 8 style guidelines
- Use type hints where appropriate
- Prefer list comprehensions over loops when readable
- Use virtual environments for dependencies
- Add docstrings for functions and classes
- Use meaningful variable names in snake_case`,

			'java': `## Java Guidelines
- Follow Java naming conventions (camelCase for variables, PascalCase for classes)
- Use proper access modifiers (private, protected, public)
- Add comprehensive JavaDoc comments
- Follow SOLID principles
- Use meaningful variable and method names
- Handle exceptions appropriately`,

			'csharp': `## C# Guidelines
- Follow C# naming conventions (PascalCase for methods, camelCase for variables)
- Use async/await for asynchronous operations
- Prefer LINQ over traditional loops when appropriate
- Use proper access modifiers
- Add XML documentation comments
- Follow SOLID principles`,

			'rust': `## Rust Guidelines
- Follow Rust naming conventions (snake_case for variables, SCREAMING_SNAKE_CASE for constants)
- Use proper error handling with Result and Option
- Prefer ownership and borrowing over cloning
- Add documentation comments with /// for public items
- Use meaningful variable names
- Follow the existing code style and patterns`,

			'go': `## Go Guidelines
- Follow Go naming conventions (camelCase for variables, PascalCase for exported items)
- Use proper error handling with explicit error returns
- Prefer composition over inheritance
- Add documentation comments for exported functions
- Use meaningful variable names
- Follow Go idioms and best practices`,

			'ruby': `## Ruby Guidelines
- Follow Ruby naming conventions (snake_case for variables and methods)
- Use meaningful variable names
- Add documentation comments for complex methods
- Follow Ruby idioms and best practices
- Use proper error handling
- Keep methods small and focused`,

			'php': `## PHP Guidelines
- Follow PSR-12 coding standards
- Use meaningful variable names
- Add PHPDoc comments for functions and classes
- Use proper error handling
- Follow modern PHP practices (PHP 7.4+)
- Keep functions and classes focused`
		};

		return guidelines[language.toLowerCase()] || this._getGenericGuidelines();
	}

	private _getGenericGuidelines(): string {
		return `## Code Style Guidelines
- Follow consistent naming conventions
- Add meaningful comments for complex logic
- Keep functions focused and small
- Use proper error handling
- Maintain existing code structure

## AI Behavior Preferences
- Prefer modern programming patterns
- Suggest improvements with explanations
- Respect existing architectural decisions
- Provide context for suggested changes
- Follow the project's established conventions

## General Best Practices
- Write clean, readable code
- Use meaningful variable and function names
- Add appropriate documentation
- Follow the existing project structure
- Consider performance implications of suggestions`;
	}

	override dispose(): void {
		if (this._setupTimeout) {
			clearTimeout(this._setupTimeout);
		}
		super.dispose();
	}
}

registerWorkbenchContribution2(DhivegaRulesSetupWorkbenchContribution.ID, DhivegaRulesSetupWorkbenchContribution, WorkbenchPhase.AfterRestored);
