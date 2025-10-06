import {defineStore} from "pinia";
import {ref} from "vue";


export const useWbSnackbarStore = defineStore('wb-snackbar', () => {

	/**
	 *
	 * @type {import('vue').Ref<Snack[]>}
	 */
	const snackStack = ref([]);


	/**
	 *
	 * @param {?Snack} newSnack
	 */
	function addNewSnack(newSnack){
		newSnack.timeoutId = setTimeout(() => {
			this.removeSnackById(newSnack.id);
		}, newSnack.timeout);

		snackStack.value.push(newSnack);
	}


	/**
	 *
	 * @param {string} snackId
	 */
	function removeSnackById(snackId){
		const index = snackStack.value.findIndex(s => s.id === snackId);
		if(index >= 0) {
			const timeoutId = snackStack.value[index].timeoutId;
			if(timeoutId) {
				clearTimeout(timeoutId);
				snackStack.value[index].timeoutId = null;
			}
			snackStack.value.splice(index, 1);
		}
	}


	function clearSnackStack(){
		snackStack.value = [];
	}



	return {
		snackStack,
		addNewSnack,
		removeSnackById,
		clearSnackStack,
	};

});