# Dhivega Editor - Windows Build Guide

## 🏗️ **Complete Guide to Building Dhivega Windows Executable**

This document provides detailed step-by-step instructions for building the Dhivega Editor Windows executable from source code. Follow these instructions carefully to ensure a successful build.

---

## 📋 **Prerequisites**

### **System Requirements**
- **OS**: Windows 10/11 (64-bit)
- **RAM**: 8GB minimum, 16GB recommended
- **Storage**: 10GB available space
- **Network**: Stable internet connection

### **Required Software**
1. **Node.js** (LTS version 18.x or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version` and `npm --version`

2. **Git** (Latest version)
   - Download from: https://git-scm.com/
   - Verify installation: `git --version`

3. **Python** (3.x)
   - Download from: https://www.python.org/
   - Verify installation: `python --version`

4. **Visual Studio Build Tools** (Optional, for native modules)
   - Download from: https://visualstudio.microsoft.com/downloads/
   - Install "C++ build tools" workload

### **PowerShell Configuration**
```powershell
# Set execution policy (run as Administrator)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

---

## 🚀 **Step-by-Step Build Process**

### **Step 1: Clone and Setup Repository**
```powershell
# Navigate to your development directory
cd D:\Projects\AI_Editor\void_original

# Clone the repository (if not already done)
git clone <repository-url> dhivega
cd dhivega

# Verify you're in the correct directory
pwd
# Should show: D:\Projects\AI_Editor\void_original\dhivega
```

### **Step 2: Clean Previous Builds**
```powershell
# Remove previous build artifacts
Remove-Item -Recurse -Force .build -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force out -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force out-build -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force out-vscode -ErrorAction SilentlyContinue

# Remove parent directory build output (if exists)
Remove-Item -Recurse -Force ..\VSCode-win32-x64 -ErrorAction SilentlyContinue
```

### **Step 3: Install Dependencies**
```powershell
# Install npm dependencies
npm install

# Verify installation
npm list --depth=0
```

### **Step 4: Verify Icon Files**
Ensure all required icon files exist in `resources/win32/`:
```powershell
# Check icon files
Get-ChildItem resources\win32\dhivega*
Get-ChildItem resources\win32\inno-dhivega*
```

**Required Files:**
- `dhivega.ico` - Main application icon
- `dhivega_70x70.png` - Small Windows tile icon
- `dhivega_150x150.png` - Large Windows tile icon
- `inno-dhivega-small-*.bmp` - Installer wizard images
- `inno-dhivega-big-*.bmp` - Installer wizard images

### **Step 5: Verify Configuration Files**
Check that these files have correct Dhivega branding:

#### **product.json**
```json
{
  "nameShort": "Dhivega",
  "nameLong": "Dhivega",
  "version": "1.99.3",
  "applicationName": "dhivega",
  "linuxIconName": "dhivega-editor"
}
```

#### **build/lib/electron.ts**
```typescript
winIcon: 'resources/win32/dhivega.ico',
```

#### **build/gulpfile.vscode.js**
```javascript
.pipe(electron({ ...config, platform, arch: arch === 'armhf' ? 'arm' : arch, ffmpegChromium: false, winIcon: 'resources/win32/dhivega.ico' }))
```

#### **build/win32/code.iss**
```ini
WizardSmallImageFile="{#RepoDir}\resources\win32\inno-dhivega-small-100.bmp,{#RepoDir}\resources\win32\inno-dhivega-small-125.bmp,{#RepoDir}\resources\win32\inno-dhivega-small-150.bmp,{#RepoDir}\resources\win32\inno-dhivega-small-175.bmp,{#RepoDir}\resources\win32\inno-dhivega-small-200.bmp,{#RepoDir}\resources\win32\inno-dhivega-small-225.bmp,{#RepoDir}\resources\win32\inno-dhivega-small-250.bmp"
SetupIconFile={#RepoDir}\resources\win32\dhivega.ico
```

### **Step 6: Build React Components**
```powershell
# Build React components for Dhivega
npm run buildreact

# This step may take 1-5 minutes
# Watch for any React build errors
```

### **Step 7: Compile Build Tools**
```powershell
# Compile build configuration
npm run compile-build

# This step may take 5-15 minutes
# Watch for any compilation errors
```

### **Step 8: Compile Extensions**
```powershell
# Compile all extensions
npm run compile-extensions-build

# This step may take 10-30 minutes
# Watch for any compilation errors
```

### **Step 9: Build Windows Application**
```powershell
# Build the Windows application
npm run gulp -- vscode-win32-x64

# This step may take 15-45 minutes
# Watch for any build errors
```

**Expected Output Location:** `../VSCode-win32-x64/`

### **Step 10: Copy Required Tools**
```powershell
# Copy installer tools to build output
npm run gulp -- vscode-win32-x64-inno-updater

# This creates the tools directory with required files
```

### **Step 11: Create Windows Installer**
```powershell
# Create the Windows installer
npm run gulp -- vscode-win32-x64-system-setup

# This step may take 5-15 minutes
# Watch for any installer creation errors
```

**Expected Output Location:** `.build/win32-x64/system-setup/Dhivega-1.99.3.exe`

---

## 🔍 **Verification Steps**

### **Step 12: Verify Build Output**
```powershell
# Check build output
Get-ChildItem ..\VSCode-win32-x64\
Get-ChildItem .build\win32-x64\system-setup\

# Verify installer exists
Test-Path .build\win32-x64\system-setup\Dhivega-1.99.3.exe
```

### **Step 13: Test the Application**
```powershell
# Test the built application
Start-Process ..\VSCode-win32-x64\Dhivega.exe

# Verify:
# 1. Application launches correctly
# 2. Dhivega branding is displayed
# 3. Icons are correct
# 4. No VS Code branding remains
```

### **Step 14: Test the Installer**
```powershell
# Test the installer (optional)
Start-Process .build\win32-x64\system-setup\Dhivega-1.99.3.exe

# Verify:
# 1. Installer launches correctly
# 2. Dhivega branding in installer
# 3. Installation completes successfully
# 4. Application works after installation
```

---

## ⚠️ **Common Issues and Solutions**

### **Issue 1: PowerShell Execution Policy**
```
Error: File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled
```
**Solution:**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### **Issue 2: Missing Icon Files**
```
Error: Cannot open icon file 'resources/win32/code.ico'
```
**Solution:**
1. Verify `dhivega.ico` exists in `resources/win32/`
2. Check `build/lib/electron.js` has correct icon path
3. Update `build/gulpfile.vscode.js` with explicit icon path

### **Issue 3: Missing Tools Directory**
```
Error: No files found matching "tools\*"
```
**Solution:**
```powershell
npm run gulp -- vscode-win32-x64-inno-updater
```

### **Issue 4: Compilation Errors**
```
Error: Cannot find type definition file for 'minimatch'
```
**Solution:**
1. Clean and reinstall dependencies
2. Check `package.json` for correct versions
3. Update TypeScript configurations if needed

### **Issue 5: Build Timeout**
```
Error: Build process taking too long
```
**Solution:**
1. Increase Node.js memory: `--max-old-space-size=8192`
2. Close unnecessary applications
3. Ensure sufficient disk space

---

## 📁 **Output Files**

### **Build Output Structure**
```
D:\Projects\AI_Editor\void_original\
├── VSCode-win32-x64\              # Built application
│   ├── Dhivega.exe               # Main executable
│   ├── tools\                    # Installer tools
│   ├── resources\                # Application resources
│   └── [other files]
└── dhivega\
    └── .build\
        └── win32-x64\
            └── system-setup\
                └── Dhivega-1.99.3.exe  # Windows installer
```

### **Key Files to Verify**
- `../VSCode-win32-x64/Dhivega.exe` - Main application
- `.build/win32-x64/system-setup/Dhivega-1.99.3.exe` - Installer
- `../VSCode-win32-x64/tools/inno_updater.exe` - Installer tool
- `../VSCode-win32-x64/tools/vcruntime140.dll` - Runtime dependency

---

## 🔄 **Quick Build Script**

Create a PowerShell script for automated builds:

```powershell
# build-dhivega.ps1
Write-Host "Starting Dhivega Windows Build..." -ForegroundColor Green

# Clean previous builds
Write-Host "Cleaning previous builds..." -ForegroundColor Yellow
Remove-Item -Recurse -Force .build -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force ..\VSCode-win32-x64 -ErrorAction SilentlyContinue

# Install dependencies
Write-Host "Installing dependencies..." -ForegroundColor Yellow
npm install

# Build process
Write-Host "Building React components..." -ForegroundColor Yellow
npm run buildreact

Write-Host "Compiling build tools..." -ForegroundColor Yellow
npm run compile-build

Write-Host "Compiling extensions..." -ForegroundColor Yellow
npm run compile-extensions-build

Write-Host "Building Windows application..." -ForegroundColor Yellow
npm run gulp -- vscode-win32-x64

Write-Host "Copying tools..." -ForegroundColor Yellow
npm run gulp -- vscode-win32-x64-inno-updater

Write-Host "Creating installer..." -ForegroundColor Yellow
npm run gulp -- vscode-win32-x64-system-setup

Write-Host "Build completed successfully!" -ForegroundColor Green
Write-Host "Installer location: .build\win32-x64\system-setup\Dhivega-1.99.3.exe" -ForegroundColor Cyan
```

---

## 📝 **Build Checklist**

Before starting a build, verify:

- [ ] All icon files exist in `resources/win32/`
- [ ] Configuration files have correct Dhivega branding
- [ ] Sufficient disk space (10GB+)
- [ ] Stable internet connection
- [ ] PowerShell execution policy set
- [ ] Node.js and npm installed
- [ ] Git installed
- [ ] Python installed (if needed)

After build completion, verify:

- [ ] `Dhivega.exe` launches correctly
- [ ] All Dhivega branding is displayed
- [ ] No VS Code branding remains
- [ ] Installer creates successfully
- [ ] Installation works correctly
- [ ] Application functions after installation

---

## 🆘 **Troubleshooting**

### **If Build Fails:**
1. Check error messages carefully
2. Verify all prerequisites are installed
3. Clean all build artifacts and retry
4. Check disk space and memory
5. Ensure stable internet connection

### **If Icons Don't Display:**
1. Verify icon files exist and are correct format
2. Check configuration files for correct paths
3. Rebuild after fixing icon issues
4. Test on clean Windows machine

### **If Installer Fails:**
1. Check Inno Setup configuration
2. Verify tools directory exists
3. Check for missing dependencies
4. Review installer logs

---

## 📞 **Support**

For build issues:
1. Check this guide first
2. Review error messages carefully
3. Verify all prerequisites
4. Create issue on GitHub with detailed error information

---

*This guide covers the complete process for building Dhivega Editor v1.99.3 for Windows. Follow each step carefully for successful builds.*
