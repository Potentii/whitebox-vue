<template>
	<teleport :to="teleportTo">
		<div
			class="wb-datalist --wb--surface-1"
			:class="slotClass"
			tabindex="0"
			ref="panel"
			v-inject-offset="{ getAnchor: () => anchorEl }"
			v-inject-size="{ getEl: () => anchorEl }"
			@focusin="$emit('focusin', $event)"
			@focusout="$emit('focusout', $event)"
			@keydown="onkeydown($event)">
			<slot :highlighted="highlightedValue" :select="control_select"></slot>
		</div>
	</teleport>
</template>


<script>

/**
 * @typedef {{ el: HTMLElement, value: * }} WbDatalistOptionVo
 */

import {InjectOffset} from "../../directives/inject-offset.mjs";
import {InjectSize} from "../../directives/inject-size.mjs";
import {MathUtils} from "@potentii/math-utils";




export default {

	name: 'wb-datalist',


	components: {},


	directives: {
		InjectOffset,
		InjectSize,
	},


	props: {

		/**
		 * @type {?string}
		 */
		slotClass: {
			type: String,
			required: false,
		},


		/**
		 * @type {?HTMLElement}
		 */
		anchorEl: {
			required: false,
		},

		/**
		 * @type {string}
		 */
		teleportTo: {
			type: String,
			required: false,
			default: 'body',
		},
	},



	data() {
		return {
			highlightedValue: null,
		};
	},


	emits: [
		'highlighted',
		'selected',
		'focusin',
		'focusout',
	],




	methods: {


		focusFirstOption(){
			if(!this.$refs.panel)
				return;

			const matrix = this.getOptions();

			if(!matrix.length || !matrix[0].length)
				return;

			this.highlightOption(matrix[0][0]);
		},

		focusLastOption(){
			if(!this.$refs.panel)
				return;

			const matrix = this.getOptions();

			if(!matrix.length)
				return;

			this.highlightOption(matrix[matrix.length-1][0]);
		},


		focusOut(){
			this.highlightedValue = null;
			this.anchorEl.focus();
		},



		/**
		 *
		 * @param {?*} value
		 */
		control_select(value){
			this.selectOption(value);
		},


		/**
		 *
		 * @param {WbDatalistOptionVo} option
		 */
		highlightOption(option){
			this.highlightedValue = option.value;

			option.el?.focus();

			this.$emit('highlighted', option.value);
		},



		selectOption(value){
			this.$emit('selected', value);
			this.focusOut();
		},



		/**
		 *
		 * @param {KeyboardEvent} e
		 */
		onkeydown(e) {
			// if (e.key === 'Enter' && this.highlightedValue) {
			// 	e.preventDefault();
			// 	this.selectOption(this.highlightedValue);
			// 	return;
			// }

			let movementRow = 0;
			let movementColumn = 0;
			if (e.key === 'ArrowDown') {
				movementRow++;
			}
			if (e.key === 'ArrowUp') {
				movementRow--;
			}
			if (e.key === 'ArrowRight') {
				movementColumn++;
			}
			if (e.key === 'ArrowLeft') {
				movementColumn--;
			}

			if(movementRow === 0 && movementColumn === 0)
				return;

			e.preventDefault();


			this.moveHighlight(movementColumn, movementRow);
		},


		/**
		 *
		 * @param {number} deltaX
		 * @param {number} deltaY
		 */
		moveHighlight(deltaX, deltaY){
			if(deltaY === 0 && deltaX === 0)
				return;

			const matrix = this.getOptions();

			if(!matrix.length)
				return;

			if(!this.highlightedValue){
				this.highlightOption(matrix[0][0]);
				return;
			}

			let foundLast = false;
			let lastRow;
			let lastColumn;
			(() => {
				for (let row = 0; row < matrix.length; row++) {
					for (let column = 0; column < matrix[row].length; column++) {
						if(matrix[row][column].value === this.highlightedValue){
							foundLast = true;
							lastRow = row;
							lastColumn = column;
							return;
						}
					}
				}
			})();


			if(foundLast){
				let targetRow;
				if((lastRow + deltaY) > matrix.length-1){
					// this.focusOut();
					// return;
					// targetRow = 0;
					targetRow = lastRow;
				} else if((lastRow + deltaY) < 0){
					this.focusOut();
					return;
					// targetRow = matrix.length-1;
				} else{
					targetRow = lastRow + deltaY;
				}
				// const targetRow = MathUtils.clamp(lastRow + deltaY, 0, matrix.length-1);

				let targetColumn;
				if((lastColumn + deltaX) > matrix[targetRow].length-1){
					targetColumn = 0;
				} else if((lastColumn + deltaX) < 0){
					targetColumn = matrix[targetRow].length-1;
				} else{
					targetColumn = lastColumn + deltaX;
				}

				// const targetColumn = MathUtils.clamp(lastColumn + deltaX, 0, matrix[targetRow].length-1);

				this.highlightOption(matrix[targetRow][targetColumn]);
			}
		},


		/**
		 *
		 * @return {WbDatalistOptionVo[][]}
		 */
		getOptions(){
			const optionEls = [...this.$refs.panel.querySelectorAll('.wb-option')];
			const matrix = [];
			let row = 0;
			let column;
			let lastY = 0;
			for (let optionEl of optionEls) {
				const y = optionEl.offsetTop;

				if(!MathUtils.moreOrLess(lastY, y, 3)) {
					lastY = y;
					row++;
				}

				if(!Array.isArray(matrix[row])) {
					column = -1;
					matrix[row] = [];
				}

				column++;

				matrix[row][column] = {
					el: optionEl,
					value: optionEl.dataset.value,
				};
			}

			return matrix;
		},



	},

}
</script>


<style>
.wb-datalist {
	position: absolute;
	left: var(--v-offset-x, 0);
	top: calc(calc(var(--v-size-height) + var(--v-offset-y, 0)) + 2px);

	/*display: flex;*/
	/*flex-direction: row;*/
	/*align-items: center;*/
	/*flex-wrap: wrap;*/

	/*gap: 0.5em;*/

	width: var(--v-size-width, 3em);
	height: auto;

	border-radius: 6px;

	overflow-y: auto;
	overflow-x: hidden;

	z-index: 10;

	box-shadow: 0 8px 18px -4px rgba(0, 0, 0, 0.15);

}




</style>
