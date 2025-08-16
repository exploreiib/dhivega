# Remaining Rebranding Changes

This document lists all remaining "Void" references that need to be updated to "Dhivega" for the complete rebranding.

## 1. React Source Files - Import Paths and Service References

### File: `src/vs/workbench/contrib/dhivega/browser/react/src/void-settings-tsx/ModelDropdown.tsx`
**Line 12:** Update import path
```typescript
// Change from:
import { modelFilterOfFeatureName, ModelOption } from '../../../../../../../workbench/contrib/dhivega/common/voidSettingsService.js'
// To:
import { modelFilterOfFeatureName, ModelOption } from '../../../../../../../workbench/contrib/dhivega/common/dhivegaSettingsService.js'
```

**Line 26:** Update service access
```typescript
// Change from:
const voidSettingsService = accessor.get('IVoidSettingsService')
// To:
const dhivegaSettingsService = accessor.get('IDhivegaSettingsService')
```

**Lines 28-33:** Update variable references
```typescript
// Change from:
const selection = voidSettingsService.state.modelSelectionOfFeature[featureName]
const selectedOption = selection ? voidSettingsService.state._modelOptions.find(v => modelSelectionsEqual(v.selection, selection))! : options[0]
// ...
voidSettingsService.setModelSelectionOfFeature(featureName, newOption.selection)
// To:
const selection = dhivegaSettingsService.state.modelSelectionOfFeature[featureName]
const selectedOption = selection ? dhivegaSettingsService.state._modelOptions.find(v => modelSelectionsEqual(v.selection, selection))! : options[0]
// ...
dhivegaSettingsService.setModelSelectionOfFeature(featureName, newOption.selection)
```

### File: `src/vs/workbench/contrib/dhivega/browser/react/src/util/services.tsx`
**Line 8:** Update import path
```typescript
// Change from:
import { VoidSettingsState } from '../../../../../../../workbench/contrib/dhivega/common/voidSettingsService.js'
// To:
import { DhivegaSettingsState } from '../../../../../../../workbench/contrib/dhivega/common/dhivegaSettingsService.js'
```

**Line 22:** Update import path
```typescript
// Change from:
import { IVoidSettingsService } from '../../../../../../../workbench/contrib/dhivega/common/voidSettingsService.js';
// To:
import { IDhivegaSettingsService } from '../../../../../../../workbench/contrib/dhivega/common/dhivegaSettingsService.js';
```

**Line 43:** Update import path
```typescript
// Change from:
import { IVoidModelService } from '../../../../common/voidModelService.js'
// To:
import { IDhivegaModelService } from '../../../../common/dhivegaModelService.js'
```

**Line 69:** Update type reference
```typescript
// Change from:
let settingsState: VoidSettingsState
// To:
let settingsState: DhivegaSettingsState
```

**Line 70:** Update type reference
```typescript
// Change from:
const settingsStateListeners: Set<(s: VoidSettingsState) => void> = new Set()
// To:
const settingsStateListeners: Set<(s: DhivegaSettingsState) => void> = new Set()
```

**Line 96:** Update service access
```typescript
// Change from:
settingsStateService: accessor.get(IVoidSettingsService),
// To:
settingsStateService: accessor.get(IDhivegaSettingsService),
```

**Line 195:** Update service access
```typescript
// Change from:
IVoidSettingsService: accessor.get(IVoidSettingsService),
// To:
IDhivegaSettingsService: accessor.get(IDhivegaSettingsService),
```

**Line 218:** Update service access
```typescript
// Change from:
IVoidModelService: accessor.get(IVoidModelService),
// To:
IDhivegaModelService: accessor.get(IDhivegaModelService),
```

### File: `src/vs/workbench/contrib/dhivega/browser/react/src/void-editor-widgets-tsx/VoidCommandBar.tsx`
**Line 92:** Update service access
```typescript
// Change from:
const voidModelService = accessor.get('IVoidModelService')
// To:
const dhivegaModelService = accessor.get('IDhivegaModelService')
```

### File: `src/vs/workbench/contrib/dhivega/browser/react/src/sidebar-tsx/SidebarChat.tsx`
**Line 155:** Update service access
```typescript
// Change from:
const voidSettingsService = accessor.get('IVoidSettingsService')
// To:
const dhivegaSettingsService = accessor.get('IDhivegaSettingsService')
```

**Line 156:** Update variable reference
```typescript
// Change from:
const voidSettingsState = useSettingsState()
// To:
const dhivegaSettingsState = useSettingsState()
```

**Lines 158-167:** Update variable references
```typescript
// Change from:
const modelSelection = voidSettingsState.modelSelectionOfFeature[featureName]
const overridesOfModel = voidSettingsState.overridesOfModel
// ...
const modelSelectionOptions = voidSettingsState.optionsOfModelSelection[featureName][providerName]?.[modelName]
// To:
const modelSelection = dhivegaSettingsState.modelSelectionOfFeature[featureName]
const overridesOfModel = dhivegaSettingsState.overridesOfModel
// ...
const modelSelectionOptions = dhivegaSettingsState.optionsOfModelSelection[featureName][providerName]?.[modelName]
```

**Lines 178, 206, 237:** Update service calls
```typescript
// Change from:
voidSettingsService.setOptionsOfModelSelection(...)
// To:
dhivegaSettingsService.setOptionsOfModelSelection(...)
```

**Line 265:** Update service access
```typescript
// Change from:
const voidSettingsService = accessor.get('IVoidSettingsService')
// To:
const dhivegaSettingsService = accessor.get('IDhivegaSettingsService')
```

**Lines 271-272:** Update service calls
```typescript
// Change from:
voidSettingsService.setGlobalSetting('chatMode', newVal)
}, [voidSettingsService])
// To:
dhivegaSettingsService.setGlobalSetting('chatMode', newVal)
}, [dhivegaSettingsService])
```

**Line 587:** Update service access
```typescript
// Change from:
const modelReferenceService = accessor.get('IVoidModelService')
// To:
const modelReferenceService = accessor.get('IDhivegaModelService')
```

**Line 1576:** Update service access
```typescript
// Change from:
const voidSettingsService = accessor.get('IVoidSettingsService')
// To:
const dhivegaSettingsService = accessor.get('IDhivegaSettingsService')
```

**Line 1577:** Update variable reference
```typescript
// Change from:
const voidSettingsState = useSettingsState()
// To:
const dhivegaSettingsState = useSettingsState()
```

### File: `src/vs/workbench/contrib/dhivega/browser/react/src/void-settings-tsx/Settings.tsx`
**Lines 222, 375, 617, 760, 785, 800, 840, 858, 1052:** Update service access
```typescript
// Change from:
const voidSettingsService = accessor.get('IVoidSettingsService')
// To:
const dhivegaSettingsService = accessor.get('IDhivegaSettingsService')
```

**Lines 628-629, 716-718, 773, 793, 805-806, 843, 863-864, 868, 1070, 1109, 1242, 1273, 1321, 1333, 1354, 1375, 1422, 1512:** Update service calls
```typescript
// Change from:
voidSettingsService.setSettingOfProvider(...)
voidSettingsService.setGlobalSetting(...)
voidSettingsService.state.settingsOfProvider[providerName].enabled
voidSettingsService.resetState()
// To:
dhivegaSettingsService.setSettingOfProvider(...)
dhivegaSettingsService.setGlobalSetting(...)
dhivegaSettingsService.state.settingsOfProvider[providerName].enabled
dhivegaSettingsService.resetState()
```

**Lines 648, 650, 655, 694, 696, 701, 763, 766, 786, 789, 859, 873:** Update variable references
```typescript
// Change from:
const voidSettingsState = useSettingsState()
const needsModel = isProviderNameDisabled(providerName, voidSettingsState) === 'addModel'
// To:
const dhivegaSettingsState = useSettingsState()
const needsModel = isProviderNameDisabled(providerName, dhivegaSettingsState) === 'addModel'
```

### File: `src/vs/workbench/contrib/dhivega/browser/react/src/void-onboarding/VoidOnboarding.tsx`
**Line 19:** Update variable reference
```typescript
// Change from:
const voidSettingsState = useSettingsState()
// To:
const dhivegaSettingsState = useSettingsState()
```

**Line 20:** Update variable reference
```typescript
// Change from:
const isOnboardingComplete = voidSettingsState.globalSettings.isOnboardingComplete || OVERRIDE_VALUE
// To:
const isOnboardingComplete = dhivegaSettingsState.globalSettings.isOnboardingComplete || OVERRIDE_VALUE
```

**Line 473:** Update service access
```typescript
// Change from:
const voidSettingsService = accessor.get('IVoidSettingsService')
// To:
const dhivegaSettingsService = accessor.get('IDhivegaSettingsService')
```

**Line 476:** Update variable reference
```typescript
// Change from:
const voidSettingsState = useSettingsState()
// To:
const dhivegaSettingsState = useSettingsState()
```

**Lines 520-522:** Update variable references
```typescript
// Change from:
const didFillInProviderSettings = selectedProviderName && voidSettingsState.settingsOfProvider[selectedProviderName]._didFillInProviderSettings
const isApiKeyLongEnoughIfApiKeyExists = selectedProviderName && voidSettingsState.settingsOfProvider[selectedProviderName].apiKey ? voidSettingsState.settingsOfProvider[selectedProviderName].apiKey.length > 15 : true
const isAtLeastOneModel = selectedProviderName && voidSettingsState.settingsOfProvider[selectedProviderName].models.length >= 1
// To:
const didFillInProviderSettings = selectedProviderName && dhivegaSettingsState.settingsOfProvider[selectedProviderName]._didFillInProviderSettings
const isApiKeyLongEnoughIfApiKeyExists = selectedProviderName && dhivegaSettingsState.settingsOfProvider[selectedProviderName].apiKey ? dhivegaSettingsState.settingsOfProvider[selectedProviderName].apiKey.length > 15 : true
const isAtLeastOneModel = selectedProviderName && dhivegaSettingsState.settingsOfProvider[selectedProviderName].models.length >= 1
```

**Line 545:** Update service call
```typescript
// Change from:
voidSettingsService.setGlobalSetting('isOnboardingComplete', true);
// To:
dhivegaSettingsService.setGlobalSetting('isOnboardingComplete', true);
```

**Lines 548, 588, 591:** Update variable references
```typescript
// Change from:
ringSize={voidSettingsState.globalSettings.isOnboardingComplete ? 'screen' : undefined}
if (!voidSettingsState.globalSettings.isOnboardingComplete) {
}, [setPageIndex, voidSettingsState.globalSettings.isOnboardingComplete])
// To:
ringSize={dhivegaSettingsState.globalSettings.isOnboardingComplete ? 'screen' : undefined}
if (!dhivegaSettingsState.globalSettings.isOnboardingComplete) {
}, [setPageIndex, dhivegaSettingsState.globalSettings.isOnboardingComplete])
```

## 2. CSS Class Names and Tooltip IDs

### File: `src/vs/workbench/contrib/dhivega/browser/dhivegaOnboardingService.ts`
**Line 32:** Update CSS class
```typescript
// Change from:
const onboardingContainer = h('div.void-onboarding-container').root;
// To:
const onboardingContainer = h('div.dhivega-onboarding-container').root;
```

### File: `src/vs/workbench/contrib/dhivega/browser/tooltipService.ts`
**Line 32:** Update CSS class
```typescript
// Change from:
const tooltipContainer = h('div.void-tooltip-container').root;
// To:
const tooltipContainer = h('div.dhivega-tooltip-container').root;
```

### File: `src/vs/workbench/contrib/dhivega/browser/react/src/void-tooltip/VoidTooltip.tsx`
**Lines 13-14:** Update comments
```typescript
// Change from:
* 1. Mount a Tooltip with some id eg id='void-tooltip'
* 2. Add data-tooltip-id="void-tooltip" and data-tooltip-content="Your tooltip text" to any element
// To:
* 1. Mount a Tooltip with some id eg id='dhivega-tooltip'
* 2. Add data-tooltip-id="dhivega-tooltip" and data-tooltip-content="Your tooltip text" to any element
```

**Lines 47, 56, 61, 66, 71, 84, 91, 97, 103, 129:** Update tooltip IDs
```typescript
// Change from:
#void-tooltip, #void-tooltip-orange, #void-tooltip-green, #void-tooltip-ollama-settings, #void-tooltip-provider-info {
// ...
id="void-tooltip"
id="void-tooltip-orange"
id="void-tooltip-green"
id="void-tooltip-ollama-settings"
id="void-tooltip-provider-info"
// To:
#dhivega-tooltip, #dhivega-tooltip-orange, #dhivega-tooltip-green, #dhivega-tooltip-ollama-settings, #dhivega-tooltip-provider-info {
// ...
id="dhivega-tooltip"
id="dhivega-tooltip-orange"
id="dhivega-tooltip-green"
id="dhivega-tooltip-ollama-settings"
id="dhivega-tooltip-provider-info"
```

### Multiple React Files - Update tooltip data attributes
In the following files, update all `data-tooltip-id` attributes from `void-tooltip` variants to `dhivega-tooltip` variants:
- `src/vs/workbench/contrib/dhivega/browser/react/src/void-settings-tsx/Settings.tsx`
- `src/vs/workbench/contrib/dhivega/browser/react/src/void-onboarding/VoidOnboarding.tsx`
- `src/vs/workbench/contrib/dhivega/browser/react/src/void-editor-widgets-tsx/VoidCommandBar.tsx`
- `src/vs/workbench/contrib/dhivega/browser/react/src/sidebar-tsx/SidebarThreadSelector.tsx`
- `src/vs/workbench/contrib/dhivega/browser/react/src/sidebar-tsx/SidebarChat.tsx`
- `src/vs/workbench/contrib/dhivega/browser/react/src/markdown/ChatMarkdownRender.tsx`
- `src/vs/workbench/contrib/dhivega/browser/react/src/markdown/ApplyBlockHoverButtons.tsx`

## 3. Hardcoded "Void" Strings

### File: `src/vs/workbench/contrib/dhivega/browser/extensionTransferService.ts`
**Lines 197, 200, 209, 212, 221, 224, 240, 243, 252, 255, 264, 267, 285, 288, 297, 300, 309, 312:** Update application paths
```typescript
// Change from:
'Library', 'Application Support', 'Void', 'User', 'settings.json'
'Library', 'Application Support', 'Void', 'User', 'keybindings.json'
'.config', 'Void', 'User', 'settings.json'
'.config', 'Void', 'User', 'keybindings.json'
'Void', 'User', 'settings.json'
'Void', 'User', 'keybindings.json'
// To:
'Library', 'Application Support', 'Dhivega', 'User', 'settings.json'
'Library', 'Application Support', 'Dhivega', 'User', 'keybindings.json'
'.config', 'Dhivega', 'User', 'settings.json'
'.config', 'Dhivega', 'User', 'keybindings.json'
'Dhivega', 'User', 'settings.json'
'Dhivega', 'User', 'keybindings.json'
```

### File: `src/vs/workbench/contrib/dhivega/browser/dhivegaSettingsPane.ts`
**Line 37:** Update scheme name
```typescript
// Change from:
scheme: 'void',  // Custom scheme for our editor (try Schemas.https)
// To:
scheme: 'dhivega',  // Custom scheme for our editor (try Schemas.https)
```

### File: `src/vs/workbench/contrib/dhivega/browser/sidebarPane.ts`
**Line 110:** Update localization key
```typescript
// Change from:
title: nls.localize2('voidContainer', 'Chat'), // this is used to say "Void" (Ctrl + L)
// To:
title: nls.localize2('dhivegaContainer', 'Chat'), // this is used to say "Dhivega" (Ctrl + L)
```

### File: `resources/win32/VisualElementsManifest.xml`
**Line 7:** Update display name
```xml
<!-- Change from: -->
ShortDisplayName="Void" />
<!-- To: -->
ShortDisplayName="Dhivega" />
```

## 4. Commented Code References

### File: `src/vs/workbench/contrib/dhivega/common/refreshModelService.ts`
**Line 99:** Update commented code
```typescript
// Change from:
// const { '_didFillInProviderSettings': enabled } = this.voidSettingsService.state.settingsOfProvider[providerName]
// To:
// const { '_didFillInProviderSettings': enabled } = this.dhivegaSettingsService.state.settingsOfProvider[providerName]
```

## 5. Directory Structure Updates

The following directories still contain "void" in their names and need to be renamed:
- `src/vs/workbench/contrib/dhivega/browser/react/src/void-settings-tsx/` → `src/vs/workbench/contrib/dhivega/browser/react/src/dhivega-settings-tsx/`
- `src/vs/workbench/contrib/dhivega/browser/react/src/void-editor-widgets-tsx/` → `src/vs/workbench/contrib/dhivega/browser/react/src/dhivega-editor-widgets-tsx/`
- `src/vs/workbench/contrib/dhivega/browser/react/src/void-onboarding/` → `src/vs/workbench/contrib/dhivega/browser/react/src/dhivega-onboarding/`
- `src/vs/workbench/contrib/dhivega/browser/react/src/void-tooltip/` → `src/vs/workbench/contrib/dhivega/browser/react/src/dhivega-tooltip/`

After renaming these directories, update all import paths in the files that reference them.

## 6. Build Script Updates

### File: `scripts/appimage/create-appimage-old.sh`
**Line 5:** Update app name
```bash
# Change from:
APP_NAME="void"
# To:
APP_NAME="dhivega"
```

## Summary

This document covers all remaining "Void" references that need to be updated to "Dhivega". The changes include:

1. **React Source Files**: Import paths, service references, and variable names
2. **CSS Classes and Tooltip IDs**: All tooltip-related CSS and data attributes
3. **Hardcoded Strings**: Application paths, scheme names, and display names
4. **Directory Structure**: Renaming remaining "void-" prefixed directories
5. **Build Scripts**: App name in shell scripts

After completing these changes, run `npm run buildreact` followed by `npm run compile` to ensure all references are properly updated.

