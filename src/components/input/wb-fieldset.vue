<template>
	<fieldset
		class="wb-fieldset"
		:disabled="disabled"
		:name="name">
		<slot></slot>
	</fieldset>
</template>


<script>
export default {

	name: 'wb-fieldset',


	props: {
		/**
		 * @type {?string}
		 */
		name: {
			type: String,
			required: false,
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

}
</script>


<style>
.wb-fieldset {
	border: 2px solid color-mix(in hsl, var(--wb--local-bg-color) 85%, var(--wb--local-bg-color-contrast));
	border-radius: 6px;
	padding: 0.5em 1em 1.25em 1em;
}
</style>
