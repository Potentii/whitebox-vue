<template>
	<div class="wb-input" @focus="focus" @focusin="onfocusin($event)" @focusout="onfocusout($event)" tabindex="0" :data-type="type">

		<slot name="top"></slot>

		<div class="-box">

			<slot name="start"></slot>

			<div class="-input-container">

				<Transition name="--fade">
					<label class="-label" v-if="showLabel">{{ label }}</label>
				</Transition>


				<wb-tokens-input-impl
					class="-input -tokens"
					ref="input"
					v-if="type === 'tokens'"
					:required="required"
					:disabled="disabled"
					:size="size"
					:placeholder="placeholder"
					v-model="value"
					:token-slot-class="tokenClass"
					@input="$emit('input', $event)"
					@change="$emit('change', $event)"
					@keyup="onkeyup($event)"
					@focus="onfocus($event)">
					<template #token="data">
						<slot name="token" :token="data?.token"></slot>
					</template>
				</wb-tokens-input-impl>

				<wb-radio-input-impl
					class="-input -radio"
					ref="input"
					v-else-if="type === 'radio'"
					:required="required"
					:disabled="disabled"
					:name="name"
					:radio-value="radioValue"
					:placeholder="placeholder"
					v-model="value"
					@input="$emit('input', $event)"
					@change="$emit('change', $event)"
					@keyup="onkeyup($event)"
					@focus="onfocus($event)">
				</wb-radio-input-impl>

				<wb-checkbox-input-impl
					class="-input -checkbox"
					ref="input"
					v-else-if="type === 'checkbox'"
					:required="required"
					:disabled="disabled"
					:name="name"
					:checkbox-value="checkboxValue"
					:placeholder="placeholder"
					v-model="value"
					@input="$emit('input', $event)"
					@change="$emit('change', $event)"
					@keyup="onkeyup($event)"
					@focus="onfocus($event)">
				</wb-checkbox-input-impl>

				<wb-file-input-impl
					class="-input -file"
					ref="input"
					v-else-if="type === 'file'"
					:required="required"
					:disabled="disabled"
					:name="name"
					:multiple="multiple"
					:accept="accept"
					:capture="capture"
					:placeholder="placeholder"
					v-model="value"
					@input="$emit('input', $event)"
					@change="$emit('change', $event)"
					@keyup="onkeyup($event)"
					@focus="onfocus($event)">
				</wb-file-input-impl>

				<wb-select-input-impl
					class="-input -file"
					ref="input"
					v-else-if="type === 'select'"
					:required="required"
					:disabled="disabled"
					:name="name"
					:multiple="multiple"
					:placeholder="placeholder"
					v-model="value"
					@input="$emit('input', $event)"
					@change="$emit('change', $event)"
					@keyup="onkeyup($event)"
					@focus="onfocus($event)">
					<slot name="select">
						<template></template>
					</slot>
				</wb-select-input-impl>

				<input
					class="-input -native"
					ref="input"
					v-else
					:type="type"
					:required="required"
					:disabled="disabled"
					:name="name"
					:size="size"
					:min="min"
					:max="max"
					:minlength="minLength"
					:maxlength="maxLength"
					:placeholder="placeholder"
					v-model="value"
					@input="$emit('input', $event)"
					@change="$emit('change', $event)"
					@keyup="onkeyup($event)"
					@focus="onfocus($event)"/>

			</div>


			<slot name="end"></slot>

		</div>

		<slot name="bottom"></slot>

<!--		<ul class="-summary" v-if="summary?.length">-->
<!--			<li class="-summary-item" :key="summaryItem" v-for="summaryItem in summary">{{ summaryItem }}</li>-->
<!--		</ul>-->

		<wb-datalist
			ref="datalist"
			:anchor-el="$el"
			v-if="$slots.options && isDatalistOpened"
			:teleport-to="datalistTeleportTo"
			:slot-class="optionsClass"
			v-slot="data"
			@focusin="datalist_onfocusin($event)"
			@focusout="datalist_onfocusout($event)"
			@highlighted="$emit('highlighted', $event)"
			@selected="datalist_onSelected($event)">
			<slot name="options" :highlighted="data.highlighted" :select="data.select"></slot>
		</wb-datalist>

	</div>
</template>


<script>
/**
 * @typedef {'text'|'email'|'search'|'password'|'file'|'number'|'tokens'|'radio'|'checkbox'|'select'} WbInputType
 */

import WbRadioInputImpl from "./impl/wb-radio-input-impl.vue";
import WbCheckboxInputImpl from "./impl/wb-checkbox-input-impl.vue";
import WbFileInputImpl from "./impl/wb-file-input-impl.vue";
import WbSelectInputImpl from "./impl/wb-select-input-impl.vue";
import WbDatalist from "./wb-datalist.vue";
import {DomUtils} from "@potentii/browser-utils";
import WbTokensInputImpl from "./impl/wb-tokens-input-impl.vue";

export default {

	name: 'wb-input',

	components: {WbTokensInputImpl, WbDatalist, WbSelectInputImpl, WbFileInputImpl, WbCheckboxInputImpl, WbRadioInputImpl},


	props: {

		/**
		 * @type {WbInputType}
		 */
		type: {
			type: String,
			required: true,
			default: 'text',
			validate: val => ['text','email','search','password','file','number','tokens','radio','checkbox','select'].includes(val),
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
		 * @type {?*}
		 */
		radioValue: {
			required: false,
		},

		/**
		 * @type {?*}
		 */
		checkboxValue: {
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
		 * @type {?string}
		 */
		tokenClass: {
			type: String,
			required: false,
		},



		/**
		 * @type {?string}
		 */
		datalistTeleportTo: {
			type: String,
			required: false,
		},



		/**
		 * @type {?string}
		 */
		optionsClass: {
			type: String,
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
		'focus',
		'focusin',
		'focusout',
		'change',
		'keyup',
		'highlighted',
		'selected',
		'valueChanged',
		'datalistOpened',
		'datalistFocusin',
		'datalistFocusout',
	],


	data(){
		return {
			isDatalistOpened: false,
		};
	},


	computed: {

		value: {
			get(){
				return this.modelValue;
			},
			set(newVal){
				this.$emit('update:modelValue', newVal);
				this.$emit('valueChanged', newVal);
			}
		},


		/**
		 *
		 * @return {boolean}
		 */
		showLabel(){
			const hasLabelText = !!this.label?.trim().length;

			if(this.type === 'select')
				return hasLabelText;

			return hasLabelText && (this.alwaysShowLabel || this.hasValue);
		},



		/**
		 *
		 * @return {boolean}
		 */
		datalistHasOptions(){
			return !!this.$slots.options?.()?.[0]?.children?.length;
		},



		/**
		 *
		 * @return {boolean}
		 */
		hasValue(){
			if(typeof this.value === 'string')
				return this.value?.length > 0;
			else if(Array.isArray(this.value))
				return this.value?.length > 0;
			else
				return this.value !== null && this.value !== undefined;
		},

	},



	watch: {
		isDatalistOpened(newVal, oldVal){
			if(newVal && !oldVal){
				this.$emit('datalistOpened');
			}
		}
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
		 * @param {KeyboardEvent} e
		 */
		onkeyup(e){
			this.$emit('keyup', e);

			if(e.key === 'ArrowDown'){
				if(this.$slots.options){
					e.preventDefault();

					if(e.key === 'ArrowDown') {
						// this.isDatalistOpened = true;
						this.$nextTick(() => this.$refs.datalist.focusFirstOption())
						// this.$refs.datalist.focusFirstOption();
						// this.$emit('datalistOpened');
					} /*else if(e.key === 'ArrowUp') {
						this.isDatalistOpened = true;
						this.$nextTick(() => this.$refs.datalist.focusLastOption())
						// this.$refs.datalist.focusLastOption();
						// this.$emit('datalistOpened');
					}*/
				}
			}
		},


		/**
		 * @param {FocusEvent} e
		 */
		onfocus(e){
			this.$emit('focus', e)
			// console.log(e)
			// this.isDatalistOpened = true;
		},


		/**
		 * @param {FocusEvent} e
		 */
		onfocusin(e){
			this.$emit('focusin', e);
			this.isDatalistOpened = true;
		},

		/**
		 * @param {FocusEvent} e
		 */
		onfocusout(e){
			this.$emit('focusout', e);
			this.datalist_handleFocusOut(e);
		},

		/**
		 * @param {FocusEvent} e
		 */
		datalist_onfocusin(e){
			this.$emit('datalistFocusin', e);
			this.isDatalistOpened = true;
		},

		/**
		 * @param {FocusEvent} e
		 */
		datalist_onfocusout(e){
			this.$emit('datalistFocusout', e);
			this.datalist_handleFocusOut(e);
		},

		/**
		 *
		 * @param {FocusEvent} e
		 */
		datalist_handleFocusOut(e){
			if(this.isDatalistOpened){
				const newFocusIsInsideDatalist = !!DomUtils.getParentUsingPredicate(e.relatedTarget, el => el === this.$refs.datalist?.$refs?.panel);

				if(!newFocusIsInsideDatalist) {
					this.isDatalistOpened = false;
				}
			}
		},



		/**
		 *
		 * @param {?*} value
		 */
		datalist_onSelected(value){
			switch (this.type) {
				case 'file':
				case 'tokens':
				case 'select':
					this.$refs.input.onSelectedFromDatalist(value);
					break;
				case 'text':
				case 'email':
				case 'search':
				case 'password':
				case 'number':
					this.value = value;
					break;
			}

			this.isDatalistOpened = false;

			this.$emit('selected', value);
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

	/*--var-bg-color: var(--wb-input--bg-color, color-mix(in hsl, var(--wb--local-bg-color) 50%, #FAFAFA));*/
	--var-bg-color: var(--wb-input--bg-color, hsl(from var(--wb--local-bg-color) h s calc(l + 5)));
	--var-fg-color: var(--wb-input--fg-color, var(--wb--local-fg-color));


	/*--var-bg-color: hsl(from var(--wb--local-bg-color) h s calc(l + 10));*/

	/*--var-bg-color: var(--wb--local-bg-color-contrast);*/


	display: flex;
	flex-direction: column;
	align-items: stretch;

	gap: 0.25em;
}
.wb-input:not([data-type="radio"]),
.wb-input:not([data-type="checkbox"]),
.wb-input:not([data-type="file"]),
.wb-input:not([data-type="select"]){
	cursor: text;
}
.wb-input[data-type="radio"],
.wb-input[data-type="checkbox"],
.wb-input[data-type="file"],
.wb-input[data-type="select"]{
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
