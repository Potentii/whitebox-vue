<template>
	<div class="wb-output-input-impl">

		<output
			class="-output -native"
			ref="output"
			:id="randId"
			@focus="onfocus($event)"
			@keyup="$emit('keyup', $event)">{{ value }}</output>

	</div>
</template>


<script>


export default {

	name: 'wb-output-input-impl',



	props: {

		/**
		 * @type {?(*[])|?*}
		 */
		modelValue: {
			required: false
		},


	},


	data(){
		return {
			randId: null,
		};
	},


	computed: {
		/**
		 * @return {?(File[])}
		 */
		value: {
			get() {
				return this.modelValue;
			},
			set(value) {
				this.$emit('update:modelValue', value);
			}
		},

	},


	emits: [
		'update:modelValue',
		'focus',
		'keyup',
	],


	beforeMount() {
		this.randId = 'wb-output-input-impl-' + Math.floor(Math.random() * 10000);
	},


	methods: {

		getParentWbInput(){
			return this.$parent;
		},

		getMainInput(){
			return this.$refs.output;
		},


		/**
		 *
		 * @param e
		 */
		onfocus(e){
			this.$emit('focus', e);
			this.$refs.input.click();
		},
	}

}
</script>


<style>
.wb-output-input-impl {
	display: flex;
	flex-direction: row;
	align-items: center;

	gap: 0.5em;
}

.wb-output-input-impl > .-output {
	width: 100%;
}

</style>
