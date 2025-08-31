<template>
	<legend class="wb-legend"><slot></slot></legend>
</template>


<script>
export default {

	name: 'wb-legend',


	props: {
		/**
		 * @type {boolean}
		 */
		disabled: {
			type: Boolean,
			required: false,
			default: false,
		},
	},

}
</script>


<style>
.wb-legend {

	padding: 0.25em 0.5em;
}
</style>
