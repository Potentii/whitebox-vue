import {useWhiteboxConfigsStore} from "./stores/whitebox-configs-store.mjs";
import Snackbar from "./components/snackbar/snackbar.mjs";


/**
 *
 * @param {object} [opts]
 * @param {EWbIconProvider} [opts.defaultIconProvider]
 * @param {boolean} [opts.showIconOnLoadingButton]
 * @returns {(app: import('vue').App) => void}
 */
export function install(opts){
	const configsStore = useWhiteboxConfigsStore();

	configsStore.setDefaultIconProvider(opts?.defaultIconProvider);
	configsStore.showIconOnLoadingButton = opts?.showIconOnLoadingButton || false;


	return app => {

		app.config.globalProperties.$wb = {
			snackbar: Snackbar,
		};

	};
}






