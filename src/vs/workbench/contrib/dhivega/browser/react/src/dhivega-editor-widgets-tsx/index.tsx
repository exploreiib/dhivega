/*--------------------------------------------------------------------------------------
 *  Copyright 2025 Glass Devtools, Inc. All rights reserved.
 *  Licensed under the Apache License, Version 2.0. See LICENSE.txt for more information.
 *--------------------------------------------------------------------------------------*/

import { mountFnGenerator } from '../util/mountFnGenerator.js'
import { DhivegaCommandBarMain } from './DhivegaCommandBar.js'
import { DhivegaSelectionHelperMain } from './DhivegaSelectionHelper.js'

export const mountDhivegaCommandBar = mountFnGenerator(DhivegaCommandBarMain)

export const mountDhivegaSelectionHelper = mountFnGenerator(DhivegaSelectionHelperMain)

