<template>
	<div class="wb-select-input-impl">

		<select
			class="-input -native"
			ref="input"
			:id="randId"
			:name="name"
			:required="required"
			:disabled="disabled"
			:multiple="multiple"
			v-model="value"
			@focus="onfocus($event)"
			@input="$emit('input', $event)"
			@change="onchange($event)"
			@keyup="$emit('keyup', $event)">
			<slot></slot>
		</select>


<!--		<span class="-placeholder" v-if="placeholder?.trim()?.length && !value?.length">{{ placeholder }}</span>-->


<!--		<div class="-previews" v-if="value?.length">-->
<!--			<div class="-preview" v-for="(file, index) in value" :key="index" :title="file.name + (file.size ? ' (' + (file.size) + ' bytes)' : '')">-->
<!--				<wb-file class="-thumb" :file="file"></wb-file>-->
<!--				<div class="-controls">-->
<!--					<wb-button-->
<!--						class="-control -remove"-->
<!--						intent="negative"-->
<!--						icon="clear"-->
<!--						:title="'Remove \'' + file.name + '\''"-->
<!--						@click="removeFile(file)"-->
<!--						size-smallest>-->
<!--					</wb-button>-->
<!--				</div>-->
<!--			</div>-->
<!--		</div>-->


<!--		<div class="-controls">-->
<!--			<wb-button-->
<!--				class="-control -add"-->
<!--				intent="neutral"-->
<!--				relevancy="normal"-->
<!--				icon="add"-->
<!--				:disabled="disabled || (value?.length >= 1 && !multiple)"-->
<!--				title="Select file"-->
<!--				@click="$refs.input.click()">-->
<!--			</wb-button>-->


<!--			<wb-button-->
<!--				class="-control -clear"-->
<!--				intent="negative"-->
<!--				relevancy="normal"-->
<!--				icon="clear"-->
<!--				title="Clear"-->
<!--				v-if="value?.length > 0"-->
<!--				@click="value = []">-->
<!--			</wb-button>-->
<!--		</div>-->


	</div>
</template>


<script>


import WbIcon from "../../wb-icon.vue";
import WbThumb from "../../wb-thumb.vue";
import WbButton from "../../wb-button.vue";
import WbFile from "../../wb-file.vue";

export default {

	name: 'wb-select-input-impl',


	components: {WbFile, WbButton, WbThumb, WbIcon},


	props: {

		/**
		 * @type {?string}
		 */
		name: {
			type: String,
			required: false,
		},

		multiple: {
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
			default: false
		},

		/**
		 * @type {boolean}
		 */
		required: {
			type: Boolean,
			required: false,
			default: false
		},

		/**
		 * @type {?string}
		 */
		placeholder: {
			type: String,
			required: false
		},

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
		'input',
		'change',
		'focus',
		'keyup',
	],


	beforeMount() {
		this.randId = 'wb-select-input-impl-' + Math.floor(Math.random() * 10000);
	},


	methods: {

		getMainInput(){
			return this.$refs.input;
		},


		/**
		 *
		 * @param e
		 */
		onfocus(e){
			this.$emit('focus', e);
			this.$refs.input.click();
		},

		/**
		 *
		 * @param e
		 */
		onchange(e){
			this.$emit('change', e);
		},



		/**
		 *
		 * @param {?*} value
		 */
		onSelectedFromDatalist(value){
			this.value = value;
		},
	}

}
</script>


<style>
.wb-select-input-impl {
	display: flex;
	flex-direction: row;
	align-items: center;

	gap: 0.5em;
}

.wb-select-input-impl > .-input {
	width: 100%;
}

</style>
