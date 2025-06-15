import {defineStore} from "pinia";
import {computed, ref} from "vue";


export const useWhiteboxConfigsStore = defineStore('whitebox-configs', () => {
	const defaultIconProvider = ref(undefined);


	/**
	 * @type {ComputedRef<?EWbIconProvider>}
	 */
	const getDefaultIconProvider = computed(() => defaultIconProvider.value);

	/**
	 * @param {EWbIconProvider} value
	 */
	function setDefaultIconProvider(value) {
		defaultIconProvider.value = value;
	}


	return {
		getDefaultIconProvider,
		setDefaultIconProvider,
	};
});