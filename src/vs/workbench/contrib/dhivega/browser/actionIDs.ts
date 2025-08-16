// Normally you'd want to put these exports in the files that register them, but if you do that you'll get an import order error if you import them in certain cases.
// (importing them runs the whole file to get the ID, causing an import error). I guess it's best practice to separate out IDs, pretty annoying...

export const DHIVEGA_CTRL_L_ACTION_ID = 'dhivega.ctrlLAction'

export const DHIVEGA_CTRL_K_ACTION_ID = 'dhivega.ctrlKAction'

export const DHIVEGA_ACCEPT_DIFF_ACTION_ID = 'dhivega.acceptDiff'

export const DHIVEGA_REJECT_DIFF_ACTION_ID = 'dhivega.rejectDiff'

export const DHIVEGA_GOTO_NEXT_DIFF_ACTION_ID = 'dhivega.goToNextDiff'

export const DHIVEGA_GOTO_PREV_DIFF_ACTION_ID = 'dhivega.goToPrevDiff'

export const DHIVEGA_GOTO_NEXT_URI_ACTION_ID = 'dhivega.goToNextUri'

export const DHIVEGA_GOTO_PREV_URI_ACTION_ID = 'dhivega.goToPrevUri'

export const DHIVEGA_ACCEPT_FILE_ACTION_ID = 'dhivega.acceptFile'

export const DHIVEGA_REJECT_FILE_ACTION_ID = 'dhivega.rejectFile'

export const DHIVEGA_ACCEPT_ALL_DIFFS_ACTION_ID = 'dhivega.acceptAllDiffs'

export const DHIVEGA_REJECT_ALL_DIFFS_ACTION_ID = 'dhivega.rejectAllDiffs'
