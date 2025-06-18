import {useWhiteboxConfigsStore} from "./stores/whitebox-configs-store.mjs";


/**
 *
 * @param {object} [opts]
 * @param {EWbIconProvider} [opts.defaultIconProvider]
 * @param {boolean} [opts.showIconOnLoadingButton]
 */
export function install(opts){
	const configsStore = useWhiteboxConfigsStore();

	configsStore.setDefaultIconProvider(opts?.defaultIconProvider);
	configsStore.showIconOnLoadingButton = opts?.showIconOnLoadingButton || false;

	return app => {

	};
}






