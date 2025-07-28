<template>
	<div class="wb-input" @focus="focus" tabindex="0" :data-type="type">

		<slot name="top"></slot>

		<div class="-box">

			<slot name="start"></slot>

			<div class="-input-container">

				<Transition name="--fade">
					<label class="-label" v-if="label?.trim().length && (alwaysShowLabel || value?.trim?.().length)">{{ label }}</label>
				</Transition>


				<wb-tokens-input
					class="-input -tokens"
					ref="input"
					v-if="type === 'tokens'"
					:required="required"
					:size="size"
					:disabled="disabled"
					:placeholder="placeholder"
					v-model="value">
				</wb-tokens-input>

				<wb-radio-input-impl
					class="-input -radio"
					ref="input"
					v-else-if="type === 'radio'"
					:required="required"
					:disabled="disabled"
					:name="name"
					:radioValue="radioValue"
					:placeholder="placeholder"
					v-model="value">
				</wb-radio-input-impl>

				<input
					class="-input -native"
					ref="input"
					v-else
					:type="type"
					:required="required"
					:size="size"
					:min="min"
					:max="max"
					:minlength="minLength"
					:maxlength="maxLength"
					:disabled="disabled"
					:placeholder="placeholder"
					v-model="value"/>

			</div>


			<slot name="end"></slot>

		</div>

		<slot name="bottom"></slot>

<!--		<ul class="-summary" v-if="summary?.length">-->
<!--			<li class="-summary-item" :key="summaryItem" v-for="summaryItem in summary">{{ summaryItem }}</li>-->
<!--		</ul>-->


	</div>
</template>


<script>
/**
 * @typedef {'text'|'email'|'search'|'password'|'file'|'number'|'tokens'|'radio'|'checkbox'} WbInputType
 */

import WbTokensInput from "./wb-tokens-input.vue";
import WbRadioInputImpl from "./wb-radio-input-impl.vue";

export default {

	name: 'wb-input',
	components: {WbRadioInputImpl, WbTokensInput},


	props: {

		/**
		 * @type {WbInputType}
		 */
		type: {
			type: String,
			required: true,
			default: 'text',
			validate: val => ['text','email','search','password','file','number','tokens','radio','checkbox'].includes(val),
		},

		placeholder: {
			type: String,
			required: false,
		},

		name: {
			type: String,
			required: false,
		},

		/**
		 * @type {?string}
		 */
		radioValue: {
			type: String,
			required: false,
		},

		label: {
			type: String,
			required: false,
		},

		alwaysShowLabel: {
			type: Boolean,
			required: false,
			default: false,
		},

		disabled: {
			type: Boolean,
			required: false,
			default: false,
		},

		autoFocus: {
			type: Boolean,
			required: false,
			default: false,
		},

		required: {
			type: Boolean,
			required: false,
			default: false,
		},

		size: {
			type: [Number, String],
			required: false,
		},

		min: {
			type: [Number, String],
			required: false,
		},

		max: {
			type: [Number, String],
			required: false,
		},

		minLength: {
			type: [Number, String],
			required: false,
			default: 0,
		},

		maxLength: {
			type: [Number, String],
			required: false,
		},

		modelValue: {
			type: [Number,String,Date,Array,Boolean],
			required: false,
		},

		/**
		 * @type {(text:string) => shouldCommit:boolean}
		 */
		onCommit: {
			type: Function,
			required: false,
		},

	},


	emits: [
		'update:modelValue',
		'input',
	],


	// data(){
	// 	return {
	//
	// 	};
	// },


	computed: {

		value: {
			get(){
				return this.modelValue;
			},
			set(newVal){
				this.$emit('update:modelValue', newVal);
			}
		},

	},


	mounted(){
		if(this.autoFocus)
			this.focus();

	},


	methods: {

		getMainInput(){
			if(typeof this.$refs.input?.getMainInput === 'function')
				return this.$refs.input.getMainInput();
			else
				return this.$refs.input;
		},


		focus(){
			this.getMainInput()?.focus?.();
		},


		blur(){
			this.getMainInput()?.blur?.();
		},


		/**
		 *
		 * @param {string} message
		 */
		setCustomValidity(message){
			this.getMainInput()?.setCustomValidity?.(message);
			// this.$refs.input.setCustomValidity(message);
		},

	},


}
</script>


<style>
@property --wb-input--height {
	syntax: "<lenght-percentage>";
	inherits: true;
	initial-value: auto;
}

@property --wb-input--bg-color {
	syntax: "<color>";
	inherits: true;
	/*initial-value: var(--wb--input-color);*/
	initial-value: inherit;
}
@property --wb-input--fg-color {
	syntax: "<color>";
	inherits: true;
	/*initial-value: var(--wb--on-input-color);*/
	initial-value: inherit;
}
@property --wb-input--font-size {
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: 16px;
}


@property --wb-input--box-shadow {
	syntax: "<length-percentage> <length-percentage> <length-percentage> <length-percentage> <color>";
	inherits: true;
	initial-value: 0 0 0 0 none;
}

@property --wb-input--border-size {
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: 0;
}
@property --wb-input--border-color {
	syntax: "<color>";
	inherits: true;
	initial-value: none;
}
@property --wb-input--border-radius {
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: 8px;
}






.wb-input{
	/*--var-bg-color: var(--wb-input--bg-color, color-mix(in hsl, var(--wb--local-bg-color-contrast) 0%, var(--wb--local-bg-color)));*/
	/*--var-bg-color: var(--wb-input--bg-color, color-mix(in hsl, var(--wb--local-bg-color-contrast) 80%, var(--wb--local-bg-color)));*/
	/*--var-bg-color: var(--wb-input--bg-color, var(--wb--input-color, var(--wb--surface-color)));*/
	/*--var-fg-color: var(--wb-input--fg-color, var(--wb--on-input-color, var(--wb--on-surface-color)));*/


	/*background-color: color-mix(in hsl, var(--wb--local-bg-color-contrast) 10%, var(--var-bg-color));*/

	--var-bg-color: var(--wb-input--bg-color, color-mix(in hsl, var(--wb--local-fg-color) 6%, var(--wb--local-bg-color)));
	--var-fg-color: var(--wb-input--fg-color, var(--wb--local-fg-color));


	/*--var-bg-color: hsl(from var(--wb--local-bg-color) h s calc(l + 10));*/

	/*--var-bg-color: var(--wb--local-bg-color-contrast);*/


	display: flex;
	flex-direction: column;
	align-items: stretch;

	gap: 0.25em;
}
.wb-input:not([data-type="radio"]){
	cursor: text;
}
.wb-input[data-type="radio"]{
	cursor: default;
}
.wb-input > .-box{
	flex: 0 0 auto;
	display: flex;
	flex-direction: row;
	align-items: center;

	gap: 1em;

	height: var(--wb-input--height);

	padding: 1.25em 1.25em;

	font-size: var(--wb-input--font-size);

	--wb--local-bg-color: var(--var-bg-color);
	--wb--local-fg-color: var(--var-fg-color);

	background: var(--wb--local-bg-color);
	color: var(--wb--local-fg-color);

	box-shadow: var(--wb-input--box-shadow);
	border-radius: var(--wb-input--border-radius);
}
.wb-input > .-box > .-input-container{
	flex: 1 1 auto;

	display: flex;
	flex-direction: column;
	/*align-items: center;*/
	/*gap: 0.25em;*/
}
.wb-input > .-box > .-input-container > .-label{
	position: absolute;
	top: -1.4em;


	opacity: 0.8;
	font-weight: 400;
	font-size: 0.6em;

	transition: transform, opacity, 0.15s ease;
}
.wb-input > .-box > .-input-container > .-label.--fade-enter-from,
.wb-input > .-box > .-input-container > .-label.--fade-enter-to{
	opacity: 0;
	transform: translateY(1em);
}
.wb-input > .-box > .-input-container > .-label.--fade-leave-from,
.wb-input > .-box > .-input-container > .-label.--fade-leave-to{
	opacity: 0;
	transform: translateY(1em);
}
.wb-input > .-box > .-input-container > .-input{
	flex: 1 1 auto;

	/*width: auto;*/
	/*min-width: 8em;*/

	/*font-size: 16px;*/
	color: var(--wb--local-fg-color);
	font-size: 1em;
	/*padding: var(--wb-input--input-padding);*/
	/*padding: 1em 0.5em;*/
	/*background: var(--wb-input--bg-color);*/

}
/*.wb-input > .-box > .-box{*/
/*	flex: 0 0 auto;*/

/*	background: var(--wb-input--box-color);*/
/*	width: 100%;*/
/*	height: 3pt;*/
/*	min-height: 3pt;*/
/*	max-height: 3pt;*/
/*	border-radius: 100px;*/
/*}*/
</style>
