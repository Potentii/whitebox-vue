export default class WbToken {

	/**
	 * @type {string}
	 */
	id;
	/**
	 * @type {*}
	 */
	data;

	/**
	 *
	 * @param {string} id
	 * @param {*} data
	 */
	constructor(id, data) {
		this.id = id;
		this.data = data;
	}

}