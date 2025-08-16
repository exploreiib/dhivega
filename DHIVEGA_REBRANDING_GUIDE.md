# Dhivega Editor Rebranding Guide

This document provides a comprehensive list of all changes required to rebrand the Dhivega editor to "Dhivega". The changes are organized by category and include specific file paths and line numbers where applicable.

## Overview

Dhivega is an open-source code editor based on VSCode with AI capabilities. This guide will help you transform it into "Dhivega" by changing all branding, names, and references throughout the codebase.

## 1. Core Configuration Files

### 1.1 package.json
**File:** `package.json`
**Changes:**
- Line 1: Change `"name": "code-oss-dev"` to `"name": "dhivega-editor"`
- Lines 12-13: Update build scripts to reference dhivega instead of dhivega:
  ```json
  "buildreact": "cd ./src/vs/workbench/contrib/dhivega/browser/react/ && node build.js && cd ../../../../../../../",
  "watchreact": "cd ./src/vs/workbench/contrib/dhivega/browser/react/ && node build.js --watch && cd ../../../../../../../",
  ```

### 1.2 product.json
**File:** `product.json`
**Changes:**
- Line 1: `"nameShort": "Dhivega"`
- Line 2: `"nameLong": "Dhivega"`
- Line 3: `"dhivegaVersion": "1.0.0"` (change from dhivegaVersion)
- Line 4: `"dhivegaRelease": "0001"` (change from dhivegaRelease)
- Line 5: `"applicationName": "dhivega"`
- Line 6: `"dataFolderName": ".dhivega-editor"`
- Line 7: `"win32MutexName": "dhivegaeditor"`
- Line 9: `"licenseUrl": "https://github.com/yourusername/dhivega/blob/main/LICENSE.txt"`
- Line 10: `"serverLicenseUrl": "https://github.com/yourusername/dhivega/blob/main/LICENSE.txt"`
- Line 14: `"serverApplicationName": "dhivega-server"`
- Line 15: `"serverDataFolderName": ".dhivega-server"`
- Line 16: `"tunnelApplicationName": "dhivega-tunnel"`
- Line 17: `"win32DirName": "Dhivega"`
- Line 18: `"win32NameVersion": "Dhivega"`
- Line 19: `"win32RegValueName": "DhivegaEditor"`
- Line 24: `"win32AppUserModelId": "Dhivega.Editor"`
- Line 26: `"win32TunnelServiceMutex": "dhivega-tunnelservice"`
- Line 27: `"win32TunnelMutex": "dhivega-tunnel"`
- Line 28: `"darwinBundleIdentifier": "com.dhivegaeditor.code"`
- Line 29: `"linuxIconName": "dhivega-editor"`
- Line 31: `"reportIssueUrl": "https://github.com/yourusername/dhivega/issues/new"`
- Line 33: `"urlProtocol": "dhivega"`
- Lines 40-42: Update trusted domains:
  ```json
  "linkProtectionTrustedDomains": [
    "https://dhivegaeditor.com",
    "https://dhivegaeditor.dev",
    "https://github.com/yourusername/dhivega",
    "https://ollama.com"
  ]
  ```

## 2. Source Code Directory Structure

### 2.1 Rename dhivega Directory
**Action:** Rename the entire directory structure
- `src/vs/workbench/contrib/dhivega/` → `src/vs/workbench/contrib/dhivega/`

### 2.2 Update Import Paths
**Files to update:** All TypeScript/JavaScript files that import from the dhivega directory
**Pattern:** Replace all imports from `vs/workbench/contrib/dhivega/` to `vs/workbench/contrib/dhivega/`

## 3. Source Code Files

### 3.1 Update Service References
**Files in `src/vs/workbench/contrib/dhivega/`:**

#### Browser Directory Files:
- `dhivegaSettingsPane.ts` → `dhivegaSettingsPane.ts`
- `dhivegaUpdateActions.ts` → `dhivegaUpdateActions.ts`
- `dhivegaCommandBarService.ts` → `dhivegaCommandBarService.ts`
- `dhivegaOnboardingService.ts` → `dhivegaOnboardingService.ts`
- `dhivegaSCMService.ts` → `dhivegaSCMService.ts`
- `dhivegaSelectionHelperWidget.ts` → `dhivegaSelectionHelperWidget.ts`
- `dhivega.contribution.ts` → `dhivega.contribution.ts`
- `chatThreadService.ts` (update internal references)
- `editCodeService.ts` (update internal references)
- `autocompleteService.ts` (update internal references)

#### Electron-Main Directory Files:
- `dhivegaUpdateMainService.ts` → `dhivegaUpdateMainService.ts`
- `dhivegaSCMMainService.ts` → `dhivegaSCMMainService.ts`
- `sendLLMMessageChannel.ts` (update internal references)
- `mcpChannel.ts` (update internal references)
- `metricsMainService.ts` (update internal references)

### 3.2 Specific File Changes

#### dhivegaUpdateActions.ts → dhivegaUpdateActions.ts
**File:** `src/vs/workbench/contrib/dhivega/browser/dhivegaUpdateActions.ts`
**Changes:**
- Line 23: Update message to reference Dhivega
- Line 39: Update URL to `https://dhivegaeditor.com/download-beta`
- Line 92: Update URL to `https://dhivegaeditor.com/`
- Line 129: Update message to reference Dhivega

#### dhivegaUpdateMainService.ts → dhivegaUpdateMainService.ts
**File:** `src/vs/workbench/contrib/dhivega/electron-main/dhivegaUpdateMainService.ts`
**Changes:**
- Line 97: Update GitHub API URL to `https://api.github.com/repos/yourusername/dhivega/releases/latest`

#### editCodeService.ts
**File:** `src/vs/workbench/contrib/dhivega/browser/editCodeService.ts`
**Changes:**
- Line 292: Update GitHub issues URL to `https://github.com/yourusername/dhivega/issues/new`

#### sendLLMMessage.impl.ts
**File:** `src/vs/workbench/contrib/dhivega/electron-main/llmMessage/sendLLMMessage.impl.ts`
**Changes:**
- Line 102: Update referer to `'https://dhivegaeditor.com'`

### 3.3 Extension Files
**Files in `extensions/`:**

#### open-remote-wsl/package.json
**File:** `extensions/open-remote-wsl/package.json`
**Changes:**
- Line 40: Update download URL template to `"https://github.com/yourusername/binaries/releases/download/${version}/dhivega-reh-${os}-${arch}-${version}.tar.gz"`

#### open-remote-ssh/package.json
**File:** `extensions/open-remote-ssh/package.json`
**Changes:**
- Line 3: Update publisher to `"dhivegaeditor"`
- Line 73: Update download URL template to `"https://github.com/yourusername/binaries/releases/download/${version}/dhivega-reh-${os}-${arch}-${version}.tar.gz"`

## 4. Assets and Icons

### 4.1 Icon Files
**Directory:** `dhivega_icons/` → `dhivega_icons/`
**Files to replace:**
- `slice_of_dhivega.png` → `slice_of_dhivega.png`
- `logo_cube_noshadow.png` → `logo_cube_noshadow.png` (update content)
- `cubecircled.png` → `cubecircled.png` (update content)
- `code.ico` → `dhivega.ico` (update content)

### 4.2 Resource Files
**Directory:** `resources/win32/`
**Files to update:**
- `logo_cube_noshadow.png`
- `code.ico`
- `code_150x150.png`
- `code_70x70.png`
- All `inno-*.bmp` files (installer images)

### 4.3 Welcome Image
**File:** `src/vs/workbench/browser/parts/editor/media/slice_of_dhivega.png`
**Action:** Replace with your Dhivega logo

## 5. Documentation Files

### 5.1 README.md
**File:** `README.md`
**Changes:**
- Update title to "Welcome to Dhivega"
- Update description to reference Dhivega
- Update all URLs to point to your repository
- Update Discord links
- Update project board links
- Update email contact to `hello@dhivegaeditor.com`

### 5.2 dhivega_CODEBASE_GUIDE.md → DHIVEGA_CODEBASE_GUIDE.md
**File:** `DHIVEGA_CODEBASE_GUIDE.md`
**Changes:**
- Update all references from "dhivega" to "Dhivega"
- Update all file paths from `dhivega/` to `dhivega/`
- Update all GitHub URLs

### 5.3 HOW_TO_CONTRIBUTE.md
**File:** `HOW_TO_CONTRIBUTE.md`
**Changes:**
- Update all references from "dhivega" to "Dhivega"
- Update all URLs to point to your repository
- Update Discord links

### 5.4 Dhivega_REBRANDING_GUIDE.md → DHIVEGA_REBRANDING_GUIDE.md
**File:** `DHIVEGA_REBRANDING_GUIDE.md`
**Changes:**
- Update all references from "Dhivega" to "Dhivega"
- Update all file paths and examples

## 6. Build Configuration

### 6.1 Gulp Files
**Files in `build/`:**
- Update any hardcoded references to "dhivega" or "dhivega" in build scripts
- Update any paths that reference the dhivega directory

### 6.2 Scripts
**Files in `scripts/`:**
- Update any hardcoded references to "dhivega" or "dhivega"
- Update any URLs or paths

## 7. Extension Configuration

### 7.1 Extension Package Files
**Files to check:**
- `extensions/open-remote-wsl/package.json`
- `extensions/open-remote-ssh/package.json`
**Changes:**
- Update publisher names
- Update download URLs
- Update any dhivega-specific references

## 8. Windows-Specific Files

### 8.1 VisualElementsManifest.xml
**File:** `resources/win32/VisualElementsManifest.xml`
**Changes:**
- Update any dhivega-specific references

## 9. Search and Replace Commands

### 9.1 Global Search and Replace
Run these commands in your code editor to perform bulk replacements:

```bash
# Replace dhivega with dhivega (case-insensitive where appropriate)
find . -type f -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" | xargs sed -i 's/dhivega/dhivega/g'
find . -type f -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" | xargs sed -i 's/dhivega/Dhivega/g'
find . -type f -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" | xargs sed -i 's/dhivega/DHIVEGA/g'

# Replace URLs
find . -type f -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" | xargs sed -i 's/dhivegaeditor\.com/dhivegaeditor.com/g'
find . -type f -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" | xargs sed -i 's/dhivegaeditor\.dev/dhivegaeditor.dev/g'
find . -type f -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" | xargs sed -i 's/github\.com\/dhivegaeditor/github.com\/yourusername/g'

# Replace Dhivega with dhivega (if any remnants exist)
find . -type f -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" | xargs sed -i 's/Dhivega/dhivega/g'
find . -type f -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" | xargs sed -i 's/Dhivega/Dhivega/g'
find . -type f -name "*.ts" -o -name "*.js" -o -name "*.json" -o -name "*.md" | xargs sed -i 's/Dhivega/DHIVEGA/g'
```

### 9.2 Directory Renaming
```bash
# Rename the main dhivega directory
mv src/vs/workbench/contrib/dhivega src/vs/workbench/contrib/dhivega

# Rename icons directory
mv dhivega_icons dhivega_icons
```

## 10. Testing Checklist

After making all changes, verify:

1. **Build Process:** The project builds successfully
2. **Application Launch:** The editor launches without errors
3. **Branding Display:** All UI elements show "Dhivega" instead of "dhivega"
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
- Register your domain (dhivegaeditor.com)
- Set up GitHub repository (github.com/yourusername/dhivega)
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

## 13. File Renaming Summary

### Core Files to Rename:
- `src/vs/workbench/contrib/dhivega/` → `src/vs/workbench/contrib/dhivega/`
- `dhivega_icons/` → `dhivega_icons/`
- `Dhivega_REBRANDING_GUIDE.md` → `DHIVEGA_REBRANDING_GUIDE.md`
- `dhivega_CODEBASE_GUIDE.md` → `DHIVEGA_CODEBASE_GUIDE.md`

### Service Files to Rename:
- `dhivegaSettingsPane.ts` → `dhivegaSettingsPane.ts`
- `dhivegaUpdateActions.ts` → `dhivegaUpdateActions.ts`
- `dhivegaCommandBarService.ts` → `dhivegaCommandBarService.ts`
- `dhivegaOnboardingService.ts` → `dhivegaOnboardingService.ts`
- `dhivegaSCMService.ts` → `dhivegaSCMService.ts`
- `dhivegaSelectionHelperWidget.ts` → `dhivegaSelectionHelperWidget.ts`
- `dhivega.contribution.ts` → `dhivega.contribution.ts`
- `dhivegaUpdateMainService.ts` → `dhivegaUpdateMainService.ts`
- `dhivegaSCMMainService.ts` → `dhivegaSCMMainService.ts`

### Icon Files to Replace:
- `slice_of_dhivega.png` → `slice_of_dhivega.png`
- `code.ico` → `dhivega.ico`

This guide covers the major changes required to rebrand dhivega to Dhivega. Remember to test thoroughly after making changes and ensure all functionality works as expected.
