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
	 * @type {import('vue').Ref<boolean>}
	 */
	const isPaused = ref(false);


	/**
	 *
	 * @param {?Snack} newSnack
	 */
	function addNewSnack(newSnack){
		snackStack.value.push(newSnack);
		_onStackChanged();
	}

	/**
	 *
	 * @param {string} snackId
	 */
	function removeSnackById(snackId){
		const index = snackStack.value.findIndex(s => s.id === snackId);
		if(index >= 0) {
			_clearSnackTimeout(snackStack.value[index]);
			snackStack.value[index].timeoutLeft = 0;
			snackStack.value.splice(index, 1);
			_onStackChanged();
		}
	}

	function clearSnackStack(){
		for (let snack of snackStack.value) {
			_clearSnackTimeout(snack);
			snack.timeoutLeft = 0;
		}
		snackStack.value = [];
		_onStackChanged();
	}

	function _onStackChanged(){
		_tryStartTimeoutForFirstSnack();
	}






	function _tryStartTimeoutForFirstSnack(){
		if(!snackStack.value?.length)
			return;

		const firstSnack = snackStack.value[0];
		if(firstSnack && !firstSnack.timeoutId){
			_startSnackTimeout(firstSnack);
		}
	}
	function _startSnackTimeout(snack){
		snack.timeoutStartedAt = Date.now();
		snack.timeoutId = setTimeout(() => {
			removeSnackById(snack.id);
		}, snack.timeoutLeft);
	}

	function _pauseSnackTimeout(snack){
		snack.timeoutLeft = snack.timeoutStartedAt
			? Math.max(0, (snack.timeoutStartedAt + snack.timeoutLeft) - Date.now())
			: snack.timeoutLeft;
		_clearSnackTimeout(snack);
	}

	function _clearSnackTimeout(snack){
		if(snack?.timeoutId) {
			clearTimeout(snack.timeoutId);
			snack.timeoutId = null;
		}
	}




	function pauseSnackbarTimeout(){
		if(isPaused.value)
			return;

		isPaused.value = true;
		for (let snack of snackStack.value) {
			_pauseSnackTimeout(snack);
		}
	}
	function resumeSnackbarTimeout(){
		if(!isPaused.value)
			return;

		_tryStartTimeoutForFirstSnack();

		isPaused.value = false;
	}



	return {
		snackStack,
		isPaused,

		addNewSnack,
		removeSnackById,
		clearSnackStack,

		pauseSnackbarTimeout,
		resumeSnackbarTimeout,
	};

});