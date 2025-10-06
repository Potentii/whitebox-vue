/**
 * @typedef {'ERROR'|'INFO'|'SUCCESS'|'WARNING'} ESnackLevel
 */
/**
 * @typedef {{INFO: 'INFO', SUCCESS: 'SUCCESS', WARNING: 'WARNING', ERROR: 'ERROR'}} ESnackLevelsEnum
 */
/**
 * @enum {ESnackLevel}
 */
const LEVELS = {
	INFO: 'INFO',
	SUCCESS: 'SUCCESS',
	WARNING: 'WARNING',
	ERROR: 'ERROR',
}
/**
 * @typedef {number} ESnackTimeout
 */
/**
 * @typedef {{SHORT: 4_000, MEDIUM: 8_000, LONG: 12_000, SUPER_LONG: 20_000}} ESnackTimeoutsEnum
 */
/**
 *
 * @enum {ESnackTimeout}
 */
const TIMEOUTS = {
	SHORT: 4_000,
	MEDIUM: 8_000,
	LONG: 12_000,
	SUPER_LONG: 20_000,
}

export default class Snack{
	/**
	 * @type {string}
	 */
	id;
	/**
	 * @type {string}
	 */
	level;
	/**
	 * @type {string}
	 */
	message;
	/**
	 * @type {?string}
	 */
	submessage;
	/**
	 * @type {number}
	 */
	timeout;
	/**
	 * @type {*}
	 */
	data;

	/**
	 * @type {?number}
	 */
	timeoutId;



	/**
	 *
	 * @param {string} id
	 * @param {string} level
	 * @param {string} message
	 * @param {?string} [submessage]
	 * @param {number|ESnackTimeout} [timeout]
	 * @param {*} [data]
	 */
	constructor(id, level, message, submessage = null, timeout = Snack.TIMEOUTS.MEDIUM, data = null) {
		this.id = id;
		this.level = level;
		this.message = message;
		this.submessage = submessage;
		this.timeout = timeout;
		this.data = data;
	}



	/**
	 *
	 * @return {ESnackLevelsEnum}
	 */
	static get LEVELS(){
		return LEVELS;
	}

	/**
	 *
	 * @return {ESnackTimeoutsEnum}
	 */
	static get TIMEOUTS(){
		return TIMEOUTS;
	}

}