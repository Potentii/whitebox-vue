import {ref} from "vue";


const defaultIconProvider = ref(undefined);



/**
 *
 * @param {object} opts
 * @param {EWbIconProvider} opts.defaultIconProvider
 */
export function config(opts){
	defaultIconProvider.value = opts?.defaultIconProvider;
}


export {
	defaultIconProvider,
}







