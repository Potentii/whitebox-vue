<template>
	<div class="wb-file-input-impl">

		<input
			class="-input -native"
			ref="input"
			type="file"
			:id="randId"
			:name="name"
			:required="required"
			:disabled="disabled"
			:accept="accept"
			:capture="capture"
			:multiple="multiple"
			v-show="false"
			@input="$emit('input', $event)"
			@change="onchange($event)"
			@keyup="$emit('keyup', $event)"/>


		<span class="-placeholder" v-if="placeholder?.trim()?.length && !value?.length">{{ placeholder }}</span>


		<div class="-previews" v-if="value?.length">
			<div class="-preview" v-for="(file, index) in value" :key="index" :title="file.name + (file.size ? ' (' + (file.size) + ' bytes)' : '')">
				<wb-file class="-thumb" :file="file"></wb-file>
				<div class="-controls">
					<wb-button
						class="-control -remove"
						intent="negative"
						icon="clear"
						:title="'Remove \'' + file.name + '\''"
						@click="removeFile(file)"
						size-smallest>
					</wb-button>
				</div>
			</div>
		</div>


		<div class="-controls">
			<wb-button
				class="-control -add"
				intent="neutral"
				relevancy="normal"
				icon="add"
				:disabled="disabled || (value?.length >= 1 && !multiple)"
				title="Select file"
				@click="$refs.input.click()">
			</wb-button>


			<wb-button
				class="-control -clear"
				intent="negative"
				relevancy="normal"
				icon="clear"
				title="Clear"
				v-if="value?.length > 0"
				@click="value = []">
			</wb-button>
		</div>


	</div>
</template>


<script>


import WbIcon from "../../wb-icon.vue";
import WbThumb from "../../wb-thumb.vue";
import WbButton from "../../wb-button.vue";
import WbFile from "../../wb-file.vue";

export default {

	name: 'wb-file-input-impl',


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
		 * @type {?(string|string[])}
		 */
		accept: {
			type: [String, Array],
			required: false,
		},

		/**
		 * @type {?('user'|'environment')}
		 */
		capture: {
			type: String,
			required: false,
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
		 * @type {?(File[])}
		 */
		modelValue: {
			type: Array,
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
		'keyup',
	],


	beforeMount() {
		this.randId = 'wb-file-input-impl-' + Math.floor(Math.random() * 10000);
	},


	methods: {

		getParentWbInput(){
			return this.$parent;
		},


		getMainInput(){
			return this.$refs.input;
		},


		/**
		 *
		 * @param e
		 */
		onchange(e){
			this.$emit('change', e);
			const newFiles = e.target.files || [];

			if(this.multiple){
				if(!this.value){
					this.value = [...newFiles];
				} else{
					this.value.push(...newFiles);
				}
			} else{
				if(newFiles.length > 0)
					this.value = [newFiles[0]];
			}
		},

		/**
		 *
		 * @param {File} file
		 */
		removeFile(file){
			const index = this.value.indexOf(file);
			if(index >= 0)
				this.value.splice(index, 1);
		},



		/**
		 *
		 * @param {WbDatalistSelectedEvent} e
		 */
		onSelectedFromDatalist(e){
			this.value = e.value;
		},
	}

}
</script>


<style>
@property --wb-input--file--preview-size {
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: 32px;
}
@property --wb-input--file--object-fit {
	syntax: "*";
	inherits: true;
	initial-value: cover;
}

.wb-file-input-impl {


	display: flex;
	flex-direction: row;
	align-items: center;

	gap: 0.5em;
}


.wb-file-input-impl > .-placeholder {
	opacity: 0.6;

	padding-left: 0.25em;


	font-size: 1em;
	font-weight: 400;
}


.wb-file-input-impl > .-previews {
	display: flex;
	flex-direction: row;
	align-items: center;

	gap: 0.5em;

	padding-left: 0.25em;
	padding-right: 0.5em;
}

.wb-file-input-impl > .-previews > .-preview {
	--var-preview-width: var(--wb-input--file--preview-size, 32px);

	flex: 0 0 var(--var-preview-width);


	display: flex;
	flex-direction: column;
	align-items: stretch;

	gap: 0.25em;

	/*padding: 0.25em;*/


	min-width: var(--var-preview-width);
	width: var(--var-preview-width);
	max-width: var(--var-preview-width);


	background-color: color-mix(in hsl, var(--wb--local-bg-color-contrast) 10%, var(--wb--local-bg-color));


	overflow: hidden;

	border-radius: 6px;
}
.wb-file-input-impl > .-previews > .-preview > .-thumb{

	--wb-file--object-fit: var(--wb-input--file--object-fit, cover);

	/*min-width: 100%;*/
	/*width: 100%;*/
	/*max-width: 100%;*/

	height: var(--var-preview-width);


	/*min-width: var(--var-preview-width);*/
	/*width: var(--var-preview-width);*/
	/*max-width: var(--var-preview-width);*/


	/*min-height: var(--var-preview-width);*/
	/*height: var(--var-preview-width);*/
	/*max-height: var(--var-preview-width);;*/

	/*background-color: color-mix(in hsl, var(--wb--local-bg-color-contrast) 12%, var(--wb--local-bg-color));*/

	/*aspect-ratio: 1 / 1;*/
}
.wb-file-input-impl > .-previews > .-preview > .-controls{
	position: absolute;

	opacity: 0;

	pointer-events: none;

	display: flex;
	align-items: center;
	justify-content: center;

	top: 0;
	left: 0;
	width: 100%;
	height: 100%;


	background-color: rgba(0, 0, 0, 0.5);

	transition: opacity 0.15s ease;
}
.wb-file-input-impl > .-previews > .-preview:hover > .-controls{
	opacity: 1;

	pointer-events: auto;
}
/*.wb-file-input-impl > .-previews > .-preview > .-details{*/
/*	display: flex;*/
/*	flex-direction: row;*/
/*	align-items: center;*/

/*	gap: 0.25em;*/
/*}*/
/*.wb-file-input-impl > .-previews > .-preview > .-details > .-control{*/
/*	flex: 0 0 auto;*/
/*}*/
/*.wb-file-input-impl > .-previews > .-preview > .-details > .-name{*/
/*	flex: 1 1 auto;*/
/*	font-size: 0.75em;*/
/*	overflow: hidden;*/
/*	white-space: nowrap;*/
/*	text-overflow: ellipsis;*/
/*}*/

.wb-file-input-impl > .-controls {
	display: flex;
	flex-direction: row;
	align-items: center;

	gap: 0.5em;
}

</style>
