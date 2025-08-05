# Coddy Editor Rebranding Guide

This document provides a comprehensive list of all changes required to rebrand the Void editor to "Coddy". The changes are organized by category and include specific file paths and line numbers where applicable.

## Overview

Void is an open-source code editor based on VSCode with AI capabilities. This guide will help you transform it into "Coddy" by changing all branding, names, and references throughout the codebase.

## 1. Core Configuration Files

### 1.1 package.json
**File:** `package.json`
**Changes:**
- Line 1: Change `"name": "code-oss-dev"` to `"name": "coddy-editor"`
- Lines 12-13: Update build scripts to reference coddy instead of void:
  ```json
  "buildreact": "cd ./src/vs/workbench/contrib/coddy/browser/react/ && node build.js && cd ../../../../../../../",
  "watchreact": "cd ./src/vs/workbench/contrib/coddy/browser/react/ && node build.js --watch && cd ../../../../../../../",
  ```

### 1.2 product.json
**File:** `product.json`
**Changes:**
- Line 1: `"nameShort": "Coddy"`
- Line 2: `"nameLong": "Coddy"`
- Line 3: `"coddyVersion": "1.0.0"` (change from voidVersion)
- Line 4: `"coddyRelease": "0001"` (change from voidRelease)
- Line 5: `"applicationName": "coddy"`
- Line 6: `"dataFolderName": ".coddy-editor"`
- Line 7: `"win32MutexName": "coddyeditor"`
- Line 9: `"licenseUrl": "https://github.com/yourusername/coddy/blob/main/LICENSE.txt"`
- Line 10: `"serverLicenseUrl": "https://github.com/yourusername/coddy/blob/main/LICENSE.txt"`
- Line 14: `"serverApplicationName": "coddy-server"`
- Line 15: `"serverDataFolderName": ".coddy-server"`
- Line 16: `"tunnelApplicationName": "coddy-tunnel"`
- Line 17: `"win32DirName": "Coddy"`
- Line 18: `"win32NameVersion": "Coddy"`
- Line 19: `"win32RegValueName": "CoddyEditor"`
- Line 24: `"win32AppUserModelId": "Coddy.Editor"`
- Line 26: `"win32TunnelServiceMutex": "coddy-tunnelservice"`
- Line 27: `"win32TunnelMutex": "coddy-tunnel"`
- Line 28: `"darwinBundleIdentifier": "com.coddyeditor.code"`
- Line 29: `"linuxIconName": "coddy-editor"`
- Line 31: `"reportIssueUrl": "https://github.com/yourusername/coddy/issues/new"`
- Line 33: `"urlProtocol": "coddy"`
- Lines 40-42: Update trusted domains:
  ```json
  "linkProtectionTrustedDomains": [
    "https://coddyeditor.com",
    "https://coddyeditor.dev",
    "https://github.com/yourusername/coddy",
    "https://ollama.com"
  ]
  ```

## 2. Source Code Directory Structure

### 2.1 Rename Void Directory
**Action:** Rename the entire directory structure
- `src/vs/workbench/contrib/void/` → `src/vs/workbench/contrib/coddy/`

### 2.2 Update Import Paths
**Files to update:** All TypeScript/JavaScript files that import from the void directory
**Pattern:** Replace all imports from `vs/workbench/contrib/void/` to `vs/workbench/contrib/coddy/`

## 3. Source Code Files

### 3.1 Update Service References
**Files in `src/vs/workbench/contrib/coddy/`:**
- Update all service names from `void*` to `coddy*`
- Update all class names from `Void*` to `Coddy*`
- Update all interface names from `IVoid*` to `ICoddy*`

### 3.2 Specific File Changes

#### voidUpdateActions.ts → coddyUpdateActions.ts
**File:** `src/vs/workbench/contrib/coddy/browser/coddyUpdateActions.ts`
**Changes:**
- Line 23: Update message to reference Coddy
- Line 39: Update URL to `https://coddyeditor.com/download-beta`
- Line 92: Update URL to `https://coddyeditor.com/`
- Line 129: Update message to reference Coddy

#### voidUpdateMainService.ts → coddyUpdateMainService.ts
**File:** `src/vs/workbench/contrib/coddy/electron-main/coddyUpdateMainService.ts`
**Changes:**
- Line 97: Update GitHub API URL to `https://api.github.com/repos/yourusername/coddy/releases/latest`

#### editCodeService.ts
**File:** `src/vs/workbench/contrib/coddy/browser/editCodeService.ts`
**Changes:**
- Line 292: Update GitHub issues URL to `https://github.com/yourusername/coddy/issues/new`

#### sendLLMMessage.impl.ts
**File:** `src/vs/workbench/contrib/coddy/electron-main/llmMessage/sendLLMMessage.impl.ts`
**Changes:**
- Line 102: Update referer to `'https://coddyeditor.com'`

### 3.3 Extension Files
**Files in `extensions/`:**
- `extensions/open-remote-wsl/src/serverSetup.ts`
- `extensions/open-remote-ssh/src/serverSetup.ts`
**Changes:**
- Update download URL templates to reference your repository

## 4. Assets and Icons

### 4.1 Icon Files
**Directory:** `void_icons/` → `coddy_icons/`
**Files to replace:**
- `slice_of_void.png` → `slice_of_coddy.png`
- `logo_cube_noshadow.png` → `logo_cube_noshadow.png` (update content)
- `cubecircled.png` → `cubecircled.png` (update content)
- `code.ico` → `coddy.ico` (update content)

### 4.2 Resource Files
**Directory:** `resources/win32/`
**Files to update:**
- `logo_cube_noshadow.png`
- `code.ico`
- `code_150x150.png`
- `code_70x70.png`
- All `inno-*.bmp` files (installer images)

### 4.3 Welcome Image
**File:** `src/vs/workbench/browser/parts/editor/media/slice_of_void.png`
**Action:** Replace with your Coddy logo

## 5. Documentation Files

### 5.1 README.md
**File:** `README.md`
**Changes:**
- Update title to "Welcome to Coddy"
- Update description to reference Coddy
- Update all URLs to point to your repository
- Update Discord links
- Update project board links

### 5.2 VOID_CODEBASE_GUIDE.md → CODDY_CODEBASE_GUIDE.md
**File:** `CODDY_CODEBASE_GUIDE.md`
**Changes:**
- Update all references from "Void" to "Coddy"
- Update all file paths from `void/` to `coddy/`
- Update all GitHub URLs

### 5.3 HOW_TO_CONTRIBUTE.md
**File:** `HOW_TO_CONTRIBUTE.md`
**Changes:**
- Update all references from "Void" to "Coddy"
- Update all URLs to point to your repository
- Update Discord links

## 6. Build Configuration

### 6.1 Gulp Files
**Files in `build/`:**
- Update any hardcoded references to "void" or "Void" in build scripts
- Update any paths that reference the void directory

### 6.2 Scripts
**Files in `scripts/`:**
- Update any hardcoded references to "void" or "Void"
- Update any URLs or paths

## 7. Extension Configuration

### 7.1 Extension Package Files
**Files to check:**
- `extensions/open-remote-wsl/package.json`
- `extensions/open-remote-ssh/package.json`
**Changes:**
- Update publisher names
- Update download URLs
- Update any void-specific references

## 8. Windows-Specific Files

### 8.1 VisualElementsManifest.xml
**File:** `resources/win32/VisualElementsManifest.xml`
**Changes:**
- Update any void-specific references

## 9. Search and Replace Commands

### 9.1 Global Search and Replace
Run these commands in your code editor to perform bulk replacements:

```bash
# Replace void with coddy (case-insensitive where appropriate)
find . -type f -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" | xargs sed -i 's/void/coddy/g'
find . -type f -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" | xargs sed -i 's/Void/Coddy/g'
find . -type f -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" | xargs sed -i 's/VOID/CODDY/g'

# Replace URLs
find . -type f -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" | xargs sed -i 's/voideditor\.com/coddyeditor.com/g'
find . -type f -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" | xargs sed -i 's/voideditor\.dev/coddyeditor.dev/g'
find . -type f -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" | xargs sed -i 's/github\.com\/voideditor/github.com\/yourusername/g'
```

### 9.2 Directory Renaming
```bash
# Rename the main void directory
mv src/vs/workbench/contrib/void src/vs/workbench/contrib/coddy

# Rename icons directory
mv void_icons coddy_icons
```

## 10. Testing Checklist

After making all changes, verify:

1. **Build Process:** The project builds successfully
2. **Application Launch:** The editor launches without errors
3. **Branding Display:** All UI elements show "Coddy" instead of "Void"
4. **Icons:** All icons display correctly
5. **Functionality:** All core features work as expected
6. **Extensions:** Built-in extensions work properly
7. **Updates:** Update mechanism points to your repository
8. **Issues:** Issue reporting points to your repository

## 11. Additional Considerations

### 11.1 Legal and Licensing
- Ensure you comply with the original MIT license
- Update license headers if required
- Consider adding your own license file

### 11.2 Domain and URLs
- Register your domain (coddyeditor.com)
- Set up GitHub repository (github.com/yourusername/coddy)
- Update all hardcoded URLs throughout the codebase

### 11.3 Community and Support
- Set up your own Discord server
- Create your own project board
- Update all community links

## 12. Post-Rebranding Tasks

1. **Test thoroughly** on all target platforms (Windows, macOS, Linux)
2. **Create installer packages** for distribution
3. **Set up CI/CD pipeline** for automated builds
4. **Document your changes** for future contributors
5. **Set up issue tracking** and project management
6. **Create release notes** for your first version

This guide covers the major changes required to rebrand Void to Coddy. Remember to test thoroughly after making changes and ensure all functionality works as expected.
