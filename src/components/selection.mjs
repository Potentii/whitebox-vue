export default class Selection {

	/**
	 * @type {string[]}
	 */
	highlightedIds;
	/**
	 * @type {string[]}
	 */
	selectedIds;

	/**
	 *
	 * @param {string[]} [highlightedIds=[]]
	 * @param {string[]} [selectedIds=[]]
	 */
	constructor(highlightedIds = [], selectedIds = []) {
		this.highlightedIds = highlightedIds;
		this.selectedIds = selectedIds;
	}
}