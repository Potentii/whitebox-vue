<template>
	<div class="wb-select-input-impl">

<!--		<select-->
<!--			class="-select -native"-->
<!--			ref="select"-->
<!--			hidden="hidden"-->
<!--			:id="randId"-->
<!--			:name="name"-->
<!--			:required="required"-->
<!--			:disabled="disabled"-->
<!--			:multiple="multiple"-->
<!--			v-model="value"-->
<!--			@input="$emit('input', $event)"-->
<!--			@change="onchange($event)">-->
<!--		</select>-->

		<output
			class="-output"
			ref="output"
			@focus="onfocus($event)"
			@keyup="$emit('keyup', $event)">{{ selectedLabel }}</output>





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


export default {

	name: 'wb-select-input-impl',


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
			selectedLabel: null,
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



	watch: {

		value: {
			handler(value) {
				const extractLabel = () => {
					const datalist = this.getParentWbInput()?.getDatalist();
					const option = datalist?.getOptionsElements()?.find(optionElement => optionElement?.dataset?.value === value);
					return option?.innerText;
				}
				this.selectedLabel = extractLabel();

				if(this.selectedLabel === undefined){
					setTimeout(() => {
						this.selectedLabel = extractLabel();
					}, 0);
				}

			},
			immediate: true,
		}


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
			// this.$refs.output.click();
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
		 * @param {WbDatalistSelectedEvent} e
		 */
		onSelectedFromDatalist(e){
			this.value = e.value;
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

.wb-select-input-impl > .-output {
	width: 100%;
}

</style>
