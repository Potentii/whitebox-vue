import {useWhiteboxConfigsStore} from "./stores/whitebox-configs-store.mjs";
import Snackbar from "./components/snackbar/snackbar.mjs";


/**
 * @typedef {Object} WhiteboxGlobal
 * @property {typeof Snackbar} snackbar
 */


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


	/**
	 * @param {import('vue').App} app
	 */
	return app => {

		/**
		 * @type {WhiteboxGlobal}
		 */
		app.config.globalProperties.$wb = {
			snackbar: Snackbar,
		};

	};
}






