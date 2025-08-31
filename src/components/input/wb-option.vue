<template>
	<option
		class="wb-option --wb--datalist-option"
		tabindex="0"
		@click="$emit('click', $event)"
		:data-value="value"
		:value="value"
		:selected="selected"
		:disabled="disabled">
		<slot></slot>
	</option>
</template>


<script>
export default {

	name: 'wb-option',


	components: {},


	props: {
		/**
		 * @type {*}
		 */
		value: {
			required: false,
		},
		/**
		 * @type {boolean}
		 */
		selected: {
			type: Boolean,
			required: false,
			default: false,
		},
		/**
		 * @type {boolean}
		 */
		disabled: {
			type: Boolean,
			required: false,
			default: false,
		},
	},



	emits: [
		'click',
		'selected',
	],


	emitSelected(){
		this.$emit('selected', this.value);
	}


}
</script>


<style>
.wb-option {

}

/*.wb-option.--highlighted {*/
/*	box-shadow: inset 0 0 0 2px #333;*/
/*}*/

/*.wb-option.--selected {*/
/*	background-color: #bbb;*/
/*}*/
</style>
