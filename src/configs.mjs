import {useWhiteboxConfigsStore} from "./stores/whitebox-configs-store.mjs";


/**
 *
 * @param {object} [opts]
 * @param {EWbIconProvider} [opts.defaultIconProvider]
 */
export function install(opts){
	useWhiteboxConfigsStore().setDefaultIconProvider(opts?.defaultIconProvider);
	return app => {

	};
}






