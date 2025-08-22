# Dhivega Editor - Quick Build Reference

## ⚡ **Essential Commands for Windows Build**

### **🔄 Complete Build Process (Copy & Paste)**
```powershell
# 1. Clean everything
Remove-Item -Recurse -Force .build, node_modules, out, out-build, out-vscode -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force ..\VSCode-win32-x64 -ErrorAction SilentlyContinue

# 2. Install dependencies
npm install

# 3. Build process (Fast - skip compile-build)
npm run buildreact
npm run compile-extensions-build
npm run gulp -- vscode-win32-x64
npm run gulp -- vscode-win32-x64-inno-updater
npm run gulp -- vscode-win32-x64-system-setup

# Alternative: Full build (slow - includes compile-build)
# npm run buildreact
# npm run compile-build
# npm run compile-extensions-build
# npm run gulp -- vscode-win32-x64
# npm run gulp -- vscode-win32-x64-inno-updater
# npm run gulp -- vscode-win32-x64-system-setup
```

### **📁 Output Locations**
- **Application**: `../VSCode-win32-x64/Dhivega.exe`
- **Installer**: `.build/win32-x64/system-setup/Dhivega-1.99.3.exe`

---

## 🚨 **Quick Fix Commands**

### **PowerShell Execution Policy**
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### **Missing Tools Directory**
```powershell
npm run gulp -- vscode-win32-x64-inno-updater
```

### **Icon Issues**
```powershell
# Check if icons exist
Get-ChildItem resources\win32\dhivega*
Get-ChildItem resources\win32\inno-dhivega*
```

### **Clean Build**
```powershell
# Nuclear option - clean everything
Remove-Item -Recurse -Force .build, node_modules, out, out-build, out-vscode -ErrorAction SilentlyContinue
Remove-Item -Force package-lock.json -ErrorAction SilentlyContinue
npm install
```

---

## ⚠️ **Common Error Solutions**

| Error | Solution |
|-------|----------|
| `Cannot open icon file 'resources/win32/code.ico'` | Run: `npm run gulp -- vscode-win32-x64-inno-updater` |
| `No files found matching "tools\*"` | Run: `npm run gulp -- vscode-win32-x64-inno-updater` |
| `PowerShell execution policy` | Run: `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` |
| `Build taking too long` | Increase memory: `node --max-old-space-size=8192` |

---

## 📋 **Pre-Build Checklist**
- [ ] All icon files in `resources/win32/`
- [ ] `dhivega.ico` exists
- [ ] `inno-dhivega-*.bmp` files exist
- [ ] 10GB+ disk space
- [ ] Stable internet connection

---

## 🎯 **Post-Build Verification**
```powershell
# Test application
Start-Process ..\VSCode-win32-x64\Dhivega.exe

# Test installer
Start-Process .build\win32-x64\system-setup\Dhivega-1.99.3.exe

# Verify files exist
Test-Path ..\VSCode-win32-x64\Dhivega.exe
Test-Path .build\win32-x64\system-setup\Dhivega-1.99.3.exe
```

---

## 📞 **Need Help?**
- Check `BUILD_GUIDE_WINDOWS.md` for detailed instructions
- Review error messages carefully
- Ensure all prerequisites are installed
- Create GitHub issue with error details

---

*Quick reference for Dhivega Editor Windows builds. For complete instructions, see `BUILD_GUIDE_WINDOWS.md`.*
