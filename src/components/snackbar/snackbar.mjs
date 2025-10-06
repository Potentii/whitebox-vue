import * as uuid from 'uuid';
import Snack from "./snack.mjs";
import {useWbSnackbarStore} from "./wb-snack-store.mjs";




export default class Snackbar{

	/**
	 * @type {?Snackbar}
	 */
	static #instance = null;

	/**
	 * @type {import('./wb-snack-store.mjs').useWbSnackbarStore()}
	 */
	#store = useWbSnackbarStore();



	/**
	 * @return {Snackbar}
	 */
	static get instance(){
		if(!this.#instance)
			this.#instance = new Snackbar();
		return this.#instance;
	}



	/**
	 *
	 * @param {ESnackLevel} level
	 * @param {string} message
	 * @param {?string} [submessage]
	 * @param {number|ESnackTimeout} [timeout]
	 * @param {*} [data]
	 */
	addSnack(level, message, submessage, timeout, data){
		const newSnack = new Snack(uuid.v4(), level, message, submessage, timeout, data);
		this.#store.addNewSnack(newSnack);
	}


	/**
	 *
	 * @param {string} id
	 */
	removeSnackById(id){
		this.#store.removeSnackById(id);
	}


	/**
	 * @return {ESnackLevelsEnum}
	 */
	static get LEVELS(){
		return Snack.LEVELS;
	}

	/**
	 * @return {ESnackTimeoutsEnum}
	 */
	static get TIMEOUTS(){
		return Snack.TIMEOUTS;
	}



}