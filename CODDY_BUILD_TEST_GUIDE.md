# Coddy Editor Build and Test Guide

This guide provides comprehensive instructions for building and testing your rebranded Coddy editor. It covers all platforms (Windows, macOS, Linux) and includes troubleshooting tips.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Building Coddy](#building-coddy)
4. [Running Coddy](#running-coddy)
5. [Testing Procedures](#testing-procedures)
6. [Troubleshooting](#troubleshooting)
7. [Distribution](#distribution)

## Prerequisites

### System Requirements

- **Node.js:** Version 20.18.2 (exactly as specified in `.nvmrc`)
- **Git:** Latest version
- **Python:** 3.x (for native module compilation)
- **RAM:** Minimum 8GB, recommended 16GB+
- **Disk Space:** At least 10GB free space

### Platform-Specific Prerequisites

#### Windows
1. **Visual Studio 2022** (recommended) or **VS Build Tools**
   - Download from: https://visualstudio.microsoft.com/downloads/
   - Select "Desktop development with C++" workload
   - Select "Node.js build tools" workload
   - In "Individual Components" tab, select:
     - `MSVC v143 - VS 2022 C++ x64/x86 Spectre-mitigated libs (Latest)`
     - `C++ ATL for latest build tools with Spectre Mitigations`
     - `C++ MFC for latest build tools with Spectre Mitigations`

2. **Windows SDK** (usually included with Visual Studio)

#### macOS
1. **Xcode Command Line Tools:**
   ```bash
   xcode-select --install
   ```

2. **Python** (usually pre-installed)

#### Linux
1. **Ubuntu/Debian:**
   ```bash
   sudo apt-get update
   sudo apt-get install build-essential g++ libx11-dev libxkbfile-dev libsecret-1-dev libkrb5-dev python-is-python3
   ```

2. **Fedora/RHEL:**
   ```bash
   sudo dnf install @development-tools gcc gcc-c++ make libsecret-devel krb5-devel libX11-devel libxkbfile-devel
   ```

3. **openSUSE:**
   ```bash
   sudo zypper install patterns-devel-C-C++-devel_C_C++ krb5-devel libsecret-devel libxkbfile-devel libX11-devel
   ```

4. **Global node-gyp:**
   ```bash
   npm install -g node-gyp
   ```

## Environment Setup

### 1. Node.js Version Management

**Using nvm (recommended):**
```bash
# Install nvm if not already installed
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal or run:
source ~/.bashrc

# Install and use the correct Node.js version
nvm install
nvm use
```

**Verify Node.js version:**
```bash
node --version  # Should output v20.18.2
npm --version   # Should be compatible with Node.js 20.18.2
```

### 2. Clone and Setup Repository

```bash
# Clone your rebranded repository
git clone https://github.com/yourusername/coddy.git
cd coddy

# Install dependencies
npm install
```

### 3. Environment Variables

Set these environment variables for development:

```bash
# Windows (PowerShell)
$env:NODE_ENV="development"
$env:VSCODE_DEV="1"
$env:VSCODE_CLI="1"

# macOS/Linux
export NODE_ENV=development
export VSCODE_DEV=1
export VSCODE_CLI=1
```

## Building Coddy

### Method 1: Using VSCode (Recommended for Development)

1. **Open the project in VSCode:**
   ```bash
   code .
   ```

2. **Start the build process:**
   - **Windows:** Press `Ctrl+Shift+B`
   - **macOS:** Press `Cmd+Shift+B`
   - **Linux:** Press `Ctrl+Shift+B`

3. **Monitor the build:**
   - Watch the terminal output for compilation progress
   - Build typically takes 5-10 minutes on first run
   - Look for two checkmarks indicating successful compilation
   - One process will continue running (React compilation)

### Method 2: Using Terminal

```bash
# Start the watch process
npm run watch

# Monitor output for completion:
# [watch-extensions] Finished compilation extensions with 0 errors
# [watch-client] Finished compilation with 0 errors
```

### Method 3: One-time Build

```bash
# Compile everything once
npm run compile

# Or use gulp directly
npx gulp compile
```

### Build Output

Successful build creates:
- `out/` - Compiled TypeScript/JavaScript files
- `.build/` - Electron and other build artifacts
- `out-build/` - Additional build outputs

## Running Coddy

### Development Mode

#### Windows
```bash
# Using the provided script
./scripts/code.bat

# Or directly
./.build/electron/coddy.exe .
```

#### macOS
```bash
# Using the provided script
./scripts/code.sh

# Or directly
./.build/electron/Coddy.app/Contents/MacOS/Electron .
```

#### Linux
```bash
# Using the provided script
./scripts/code.sh

# Or directly
./.build/electron/coddy .
```

### Production Mode

For testing the production build:

```bash
# Build for production
npm run compile-build

# Run production build
./scripts/code.bat  # Windows
./scripts/code.sh   # macOS/Linux
```

### Custom Launch Options

```bash
# Launch with custom user data directory
./scripts/code.sh --user-data-dir ./.tmp/user-data --extensions-dir ./.tmp/extensions

# Launch with specific workspace
./scripts/code.sh /path/to/your/workspace

# Launch with debugging enabled
./scripts/code.sh --enable-logging --log-level=0
```

## Testing Procedures

### 1. Basic Functionality Tests

#### Editor Core Features
- [ ] **File Operations:** Create, open, save, delete files
- [ ] **Editing:** Type, copy, paste, undo, redo
- [ ] **Search:** Find, replace, find in files
- [ ] **Multi-cursor:** Alt+Click, Ctrl+D
- [ ] **Folding:** Code folding and unfolding
- [ ] **Syntax Highlighting:** Various file types

#### UI Elements
- [ ] **Sidebar:** File explorer, search, source control
- [ ] **Status Bar:** Shows correct information
- [ ] **Command Palette:** Ctrl+Shift+P works
- [ ] **Settings:** Open settings (Ctrl+,)
- [ ] **Extensions:** Extensions panel loads

#### Branding Verification
- [ ] **Window Title:** Shows "Coddy" instead of "Void"
- [ ] **Application Name:** Taskbar shows "Coddy"
- [ ] **Icons:** All icons display correctly
- [ ] **About Dialog:** Shows "Coddy" branding
- [ ] **Welcome Page:** Shows Coddy branding

### 2. AI Features Testing

#### Chat Functionality
- [ ] **Sidebar Chat:** Opens and responds
- [ ] **Model Selection:** Can select different models
- [ ] **Provider Configuration:** Can add/edit providers
- [ ] **Chat History:** Messages persist between sessions

#### Code Generation
- [ ] **Autocomplete:** AI-powered suggestions work
- [ ] **Code Generation:** Generate code from prompts
- [ ] **Code Editing:** Apply suggested changes
- [ ] **Context Gathering:** Understands codebase context

### 3. Extension Testing

#### Built-in Extensions
- [ ] **Language Support:** JavaScript, TypeScript, Python, etc.
- [ ] **Git Integration:** Source control features
- [ ] **Terminal:** Integrated terminal works
- [ ] **Debugger:** Debugging capabilities
- [ ] **Remote Development:** SSH, WSL, Containers

### 4. Platform-Specific Testing

#### Windows
- [ ] **File Associations:** .txt, .js, .py files open correctly
- [ ] **Registry Integration:** Proper registry entries
- [ ] **Windows Integration:** Taskbar, start menu
- [ ] **High DPI:** Scaling works correctly

#### macOS
- [ ] **App Bundle:** Proper .app structure
- [ ] **Code Signing:** App launches without warnings
- [ ] **macOS Integration:** Dock, menu bar
- [ ] **Retina Display:** High DPI support

#### Linux
- [ ] **Desktop Integration:** Desktop files, icons
- [ ] **Package Management:** Proper installation
- [ ] **System Integration:** File associations
- [ ] **Window Manager:** Works with different WMs

### 5. Performance Testing

#### Startup Time
- [ ] **Cold Start:** First launch time
- [ ] **Warm Start:** Subsequent launches
- [ ] **Large Workspace:** Performance with many files

#### Memory Usage
- [ ] **Baseline:** Memory usage on startup
- [ ] **Large Files:** Performance with large files
- [ ] **Multiple Windows:** Memory with multiple instances

### 6. Error Handling

#### Network Issues
- [ ] **Offline Mode:** Works without internet
- [ ] **Update Failures:** Graceful handling of update errors
- [ ] **Extension Downloads:** Handles download failures

#### File System
- [ ] **Permission Errors:** Handles read/write permission issues
- [ ] **Corrupted Files:** Graceful handling of corrupted files
- [ ] **Disk Space:** Handles low disk space scenarios

## Troubleshooting

### Common Build Issues

#### Node.js Version Issues
```bash
# Verify Node.js version
node --version  # Must be 20.18.2

# If wrong version, use nvm
nvm install 20.18.2
nvm use 20.18.2
```

#### Memory Issues
```bash
# Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=8192"

# Or for Windows
set NODE_OPTIONS=--max-old-space-size=8192
```

#### Python Issues
```bash
# Ensure Python is available
python --version
python3 --version

# On macOS, ensure Xcode tools are installed
xcode-select --install
```

#### Native Module Compilation Issues

**Windows:**
- Ensure Visual Studio 2022 is properly installed
- Run as Administrator if needed
- Check that all required components are installed

**Linux:**
```bash
# Install additional dependencies if needed
sudo apt-get install python3-dev
```

**macOS:**
```bash
# Reinstall Xcode command line tools
sudo rm -rf /Library/Developer/CommandLineTools
xcode-select --install
```

### Runtime Issues

#### Application Won't Start
```bash
# Check for missing dependencies
npm install

# Clear build cache
rm -rf out/ .build/

# Rebuild
npm run compile
```

#### Missing Styles/UI Issues
```bash
# Wait a few seconds for styles to load
# Or reload the window: Ctrl+R (Cmd+R on macOS)
```

#### Extension Issues
```bash
# Clear extension cache
rm -rf .tmp/extensions/

# Reinstall extensions
./scripts/code.sh --install-extension <extension-id>
```

### Platform-Specific Issues

#### Windows
```bash
# If you get "The SUID sandbox helper binary was found, but is not configured correctly"
sudo chown root:root .build/electron/chrome-sandbox
sudo chmod 4755 .build/electron/chrome-sandbox
```

#### Linux
```bash
# If you get libtool errors
# Ensure you have GNU libtool instead of BSD libtool
brew install libtool  # macOS
# Or install from package manager on Linux
```

#### macOS
```bash
# If you get code signing issues
# You may need to sign the app for distribution
codesign --force --deep --sign - .build/electron/Coddy.app
```

## Distribution

### Creating Installers

#### Windows
```bash
# Build Windows installer
npm run build-win32

# Or use specific architecture
npm run build-win32-x64
npm run build-win32-arm64
```

#### macOS
```bash
# Build macOS app
npm run build-darwin

# Create DMG
npm run build-darwin-dmg
```

#### Linux
```bash
# Build Linux packages
npm run build-linux

# Specific distributions
npm run build-linux-deb
npm run build-linux-rpm
npm run build-linux-appimage
```

### Testing Installers

1. **Clean Environment:** Test on a clean VM or fresh system
2. **Installation:** Verify installer works correctly
3. **Uninstallation:** Ensure clean removal
4. **Updates:** Test update mechanism
5. **File Associations:** Verify file type associations
6. **Integration:** Test system integration

### Release Checklist

- [ ] **Build Success:** All platforms build successfully
- [ ] **Tests Pass:** All functionality tests pass
- [ ] **Installation:** Installers work on target platforms
- [ ] **Branding:** All branding is correct
- [ ] **Documentation:** README and guides are updated
- [ ] **Licensing:** License files are correct
- [ ] **Release Notes:** Create release notes
- [ ] **Distribution:** Upload to appropriate platforms

## Continuous Integration

### GitHub Actions Example

```yaml
name: Build and Test Coddy

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build:
    runs-on: ${{ matrix.os }}

    strategy:
      matrix:
        os: [ubuntu-latest, windows-latest, macos-latest]
        node-version: [20.18.2]

    steps:
    - uses: actions/checkout@v3

    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v3
      with:
        node-version: ${{ matrix.node-version }}

    - name: Install dependencies
      run: npm install

    - name: Build
      run: npm run compile

    - name: Test
      run: npm run test
```

This guide provides comprehensive instructions for building and testing your rebranded Coddy editor. Follow the steps carefully and test thoroughly on all target platforms before distribution.
