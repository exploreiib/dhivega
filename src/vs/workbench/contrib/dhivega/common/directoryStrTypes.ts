import { URI } from '../../../../base/common/uri.js';

export type DhivegaDirectoryItem = {
	uri: URI;
	name: string;
	isSymbolicLink: boolean;
	children: DhivegaDirectoryItem[] | null;
	isDirectory: boolean;
	isGitIgnoredDirectory: false | { numChildren: number }; // if directory is gitignored, we ignore children
}
