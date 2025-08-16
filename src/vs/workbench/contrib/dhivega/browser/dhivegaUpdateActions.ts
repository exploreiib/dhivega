/*--------------------------------------------------------------------------------------
 *  Copyright 2025 Glass Devtools, Inc. All rights reserved.
 *  Licensed under the Apache License, Version 2.0. See LICENSE.txt for more information.
 *--------------------------------------------------------------------------------------*/

import { Disposable } from '../../../../base/common/lifecycle.js';
import Severity from '../../../../base/common/severity.js';
import { ServicesAccessor } from '../../../../editor/browser/editorExtensions.js';
import { localize2 } from '../../../../nls.js';
import { Action2, registerAction2 } from '../../../../platform/actions/common/actions.js';
import { INotificationActions, INotificationHandle, INotificationService } from '../../../../platform/notification/common/notification.js';
import { IMetricsService } from '../common/metricsService.js';
import { IDhivegaUpdateService } from '../common/dhivegaUpdateService.js';
import { IWorkbenchContribution, registerWorkbenchContribution2, WorkbenchPhase } from '../../../common/contributions.js';
import * as dom from '../../../../base/browser/dom.js';
import { IUpdateService } from '../../../../platform/update/common/update.js';
import { DhivegaCheckUpdateRespose } from '../common/dhivegaUpdateServiceTypes.js';
import { IAction } from '../../../../base/common/actions.js';




const notifyUpdate = (res: DhivegaCheckUpdateRespose & { message: string }, notifService: INotificationService, updateService: IUpdateService): INotificationHandle => {
	const message = res?.message || 'This is a very old version of Dhivega, please download the latest version! [Dhivega Editor](https://dhivegaeditor.com/download-beta)!'

	let actions: INotificationActions | undefined

	if (res?.action) {
		const primary: IAction[] = []

		if (res.action === 'reinstall') {
			primary.push({
				label: `Reinstall`,
				id: 'void.updater.reinstall',
				enabled: true,
				tooltip: '',
				class: undefined,
				run: () => {
					const { window } = dom.getActiveWindow()
					window.open('https://dhivegaeditor.com/download-beta')
				}
			})
		}

		if (res.action === 'download') {
			primary.push({
				label: `Download`,
				id: 'void.updater.download',
				enabled: true,
				tooltip: '',
				class: undefined,
				run: () => {
					updateService.downloadUpdate()
				}
			})
		}


		if (res.action === 'apply') {
			primary.push({
				label: `Apply`,
				id: 'void.updater.apply',
				enabled: true,
				tooltip: '',
				class: undefined,
				run: () => {
					updateService.applyUpdate()
				}
			})
		}

		if (res.action === 'restart') {
			primary.push({
				label: `Restart`,
				id: 'void.updater.restart',
				enabled: true,
				tooltip: '',
				class: undefined,
				run: () => {
					updateService.quitAndInstall()
				}
			})
		}

		primary.push({
			id: 'void.updater.site',
			enabled: true,
			label: `Dhivega Site`,
			tooltip: '',
			class: undefined,
			run: () => {
				const { window } = dom.getActiveWindow()
				window.open('https://dhivegaeditor.com/')
			}
		})

		actions = {
			primary: primary,
			secondary: [{
				id: 'void.updater.close',
				enabled: true,
				label: `Keep current version`,
				tooltip: '',
				class: undefined,
				run: () => {
					notifController.close()
				}
			}]
		}
	}
	else {
		actions = undefined
	}

	const notifController = notifService.notify({
		severity: Severity.Info,
		message: message,
		sticky: true,
		progress: actions ? { worked: 0, total: 100 } : undefined,
		actions: actions,
	})

	return notifController
	// const d = notifController.onDidClose(() => {
	// 	notifyYesUpdate(notifService, res)
	// 	d.dispose()
	// })
}
const notifyErrChecking = (notifService: INotificationService): INotificationHandle => {
	const message = `Dhivega Error: There was an error checking for updates. If this persists, please get in touch or reinstall Dhivega [here](https://dhivegaeditor.com/download-beta)!`
	const notifController = notifService.notify({
		severity: Severity.Info,
		message: message,
		sticky: true,
	})
	return notifController
}


const performDhivegaCheck = async (
	explicit: boolean,
	notifService: INotificationService,
	dhivegaUpdateService: IDhivegaUpdateService,
	metricsService: IMetricsService,
	updateService: IUpdateService,
): Promise<INotificationHandle | null> => {

	const metricsTag = explicit ? 'Manual' : 'Auto'

	metricsService.capture(`Dhivega Update ${metricsTag}: Checking...`, {})
	const res = await dhivegaUpdateService.check(explicit)
	if (!res) {
		const notifController = notifyErrChecking(notifService);
		metricsService.capture(`Dhivega Update ${metricsTag}: Error`, { res })
		return notifController
	}
	else {
		if (res.message) {
			const notifController = notifyUpdate(res, notifService, updateService)
			metricsService.capture(`Dhivega Update ${metricsTag}: Yes`, { res })
			return notifController
		}
		else {
			metricsService.capture(`Dhivega Update ${metricsTag}: No`, { res })
			return null
		}
	}
}


// Action
let lastNotifController: INotificationHandle | null = null


registerAction2(class extends Action2 {
	constructor() {
		super({
			f1: true,
			id: 'dhivega.dhivegaCheckUpdate',
			title: localize2('dhivegaCheckUpdate', 'Dhivega: Check for Updates'),
		});
	}
	async run(accessor: ServicesAccessor): Promise<void> {
		const dhivegaUpdateService = accessor.get(IDhivegaUpdateService)
		const notifService = accessor.get(INotificationService)
		const metricsService = accessor.get(IMetricsService)
		const updateService = accessor.get(IUpdateService)

		const currNotifController = lastNotifController

		const newController = await performDhivegaCheck(true, notifService, dhivegaUpdateService, metricsService, updateService)

		if (newController) {
			currNotifController?.close()
			lastNotifController = newController
		}
	}
})

// on mount
class DhivegaUpdateWorkbenchContribution extends Disposable implements IWorkbenchContribution {
	static readonly ID = 'workbench.contrib.dhivega.dhivegaUpdate'
	constructor(
		@IDhivegaUpdateService dhivegaUpdateService: IDhivegaUpdateService,
		@IMetricsService metricsService: IMetricsService,
		@INotificationService notifService: INotificationService,
		@IUpdateService updateService: IUpdateService,
	) {
		super()

		const autoCheck = () => {
			performDhivegaCheck(false, notifService, dhivegaUpdateService, metricsService, updateService)
		}

		// check once 5 seconds after mount
		// check every 3 hours
		const { window } = dom.getActiveWindow()

		const initId = window.setTimeout(() => autoCheck(), 5 * 1000)
		this._register({ dispose: () => window.clearTimeout(initId) })


		const intervalId = window.setInterval(() => autoCheck(), 3 * 60 * 60 * 1000) // every 3 hrs
		this._register({ dispose: () => window.clearInterval(intervalId) })

	}
}
registerWorkbenchContribution2(DhivegaUpdateWorkbenchContribution.ID, DhivegaUpdateWorkbenchContribution, WorkbenchPhase.BlockRestore);
