<template>
	<component
		class="wb-button"
		v-bind="$attrs"
		:class="{
			'--capsule': !!capsule,
			'--outline': !!outline,
			'--fullwidth': !!fullwidth,
			'--box': !!box,
			'--bold': !!bold,
			'--italic': !!italic,
			'--uppercase': !!uppercase,

			'--custom-slot': !!customSlot,

			'--has-text': hasText,
			'--has-icon': hasIcon,

			'--unit-ratio': isUnitRatio,

			'--size-biggest': !!sizeBiggest,
			'--size-big': !!sizeBig,
			'--size-small': !!sizeSmall,
			'--size-smallest': !!sizeSmallest,

			'--is-button': type === 'button' && !to,
			'--is-submit': type === 'submit',
			'--is-link': !!to,
	 	}"
		:data-relevancy="relevancy"
		:data-intent="intent"
		:data-align="align"
		:is="component"
		:to="to"
		:form="formId"
		@click="$emit('click', $event)"
		@submit="$emit('submit', $event)"
		@mousedown="_onMouseDown($event)"
		:type="type"
		:title="title"
		:disabled="disabled">

		<template v-for="contentItem in contentOrderComputed">
			<wb-loading-spinner
				class="-loading"
				v-if="contentItem === 'loading' && loading">
			</wb-loading-spinner>


			<wb-icon
				class="-icon"
				v-if="contentItem === 'icon' && hasIcon && ((!loading) || showIconOnLoadingButton)"
				:icon-provider="iconProvider">{{ icon }}</wb-icon>


			<object
				class="-img"
				:data="imageUrl"
				v-if="contentItem === 'image' && imageUrl">
				<img class="-fallback" :src="fallbackImageUrl"/>
			</object>


			<span
				class="-text"
				v-if="contentItem === 'text' && hasText">
				{{ text }}
			</span>

			<div
				:class="customSlotClass"
				class="-slot"
				v-if="contentItem === 'slot' && customSlot">
				<slot></slot>
			</div>

		</template>



	</component>
</template>


<script>
import WbIcon from "./wb-icon.vue";
import WbLoadingSpinner from "./wb-loading-spinner.vue";
import {mapState} from "pinia";
import {useWhiteboxConfigsStore} from "../stores/whitebox-configs-store.mjs";

/**
 * @typedef {'start'|'center'|'end'|'space-between'|'stretch'} EWbButtonAlignment
 */
/**
 * @typedef {'normal'|'secondary'|'main'} EWbButtonRelevancy
 */
/**
 * @typedef {'neutral'|'positive'|'negative'} EWbButtonIntent
 */
/**
 * @typedef {'loading'|'icon'|'image'|'text'|'slot'} EWbButtonContentOrderItem
 */
/**
 * @typedef {'start'|'end'} EWbButtonIconPosition
 */
/**
 * @typedef {'start'|'end'} EWbButtonLoadingPosition
 */
/**
 * @typedef {'start'|'end'} EWbButtonIconPosition
 */
/**
 * @typedef {'start'|'end'} EWbButtonImagePosition
 */
/**
 * @typedef {'button'|'submit'} EWbButtonType
 */



export default {

	name: 'wb-button',

	components: {WbLoadingSpinner, WbIcon},

	props: {

		/**
		 * @type {EWbButtonContentOrderItem[]}
		 */
		contentOrder: {
			type: Array,
			required: false,
			validator: value => value?.length && value?.every(item => ['loading', 'icon', 'image', 'text', 'slot'].includes(item)),
		},

		/**
		 * @type {EWbButtonIconPosition}
		 */
		iconPosition: {
			type: String,
			required: false,
			validator: value => ['start','end'].includes(value),
		},


		loading: {
			type: Boolean,
			required: false,
			default: false
		},


		icon: {
			type: String,
			required: false
		},
		/**
		 * @type {EWbIconProvider}
		 */
		iconProvider: {
			type: String,
			required: false,
			validator: value => ['material-icons','material-symbols-outlined','material-symbols-rounded','material-symbols-sharp'].includes(value),
		},


		imageUrl: {
			type: String,
			required: false,
		},
		fallbackImageUrl: {
			type: String,
			required: false,
		},


		text: {
			type: String,
			required: false
		},
		bold: {
			type: Boolean,
			required: false,
			default: false
		},
		italic: {
			type: Boolean,
			required: false,
			default: false
		},
		uppercase: {
			type: Boolean,
			required: false,
			default: false
		},


		title: {
			type: String,
			required: false
		},
		to: {
			type: Object,
			required: false,
		},


		/**
		 * @type {EWbButtonType}
		 */
		type: {
			type: String,
			required: false,
			default: 'button',
			validator: value => ['button','submit'].includes(value),
		},
		form: {
			type: [String,Object],
			required: false,
		},



		customSlot: {
			type: Boolean,
			required: false,
			default: false,
		},

		customSlotClass: {
			type: String,
			required: false,
		},



		sizeBiggest: {
			type: Boolean,
			required: false,
			default: false
		},

		sizeBig: {
			type: Boolean,
			required: false,
			default: false
		},

		sizeSmall: {
			type: Boolean,
			required: false,
			default: false
		},

		sizeSmallest: {
			type: Boolean,
			required: false,
			default: false
		},


		outline: {
			type: Boolean,
			required: false,
			default: false
		},

		capsule: {
			type: Boolean,
			required: false,
			default: false
		},

		box: {
			type: Boolean,
			required: false,
			default: false
		},

		fullwidth: {
			type: Boolean,
			required: false,
			default: false
		},

		autofocus: {
			type: Boolean,
			required: false
		},

		dontFocusOnClick: {
			type: Boolean,
			required: false
		},

		disabled: {
			type: Boolean,
			required: false,
			default: false
		},

		/**
		 * @type {EWbButtonRelevancy}
		 */
		relevancy: {
			type: String,
			required: false,
			default: 'normal',
			validator: value => ['normal','secondary','main'].includes(value),
		},

		/**
		 * @type {EWbButtonIntent}
		 */
		intent: {
			type: String,
			required: false,
			default: 'neutral',
			validator: value => ['neutral','positive','negative'].includes(value),
		},


		/**
		 * @type {EWbButtonAlignment}
		 */
		align: {
			type: String,
			required: false,
			default: 'center',
			validator: value => ['start','center','end','space-between','stretch'].includes(value),
		},

	},


	computed: {

		...mapState(useWhiteboxConfigsStore, ['showIconOnLoadingButton']),


		/**
		 * @returns {'RouterLink'|'button'}
		 */
		component(){
			return this.to ? 'RouterLink' : 'button';
		},

		/**
		 * @returns {boolean}
		 */
		isOnlyIcon() {
			return this.hasIcon && !this.hasText && !this.customSlot && !this.loading;
		},

		/**
		 * @returns {boolean}
		 */
		isOnlyLoading() {
			return this.loading && !this.hasText && !this.customSlot && !this.hasIcon;
		},

		/**
		 * @returns {boolean}
		 */
		isUnitRatio() {
			return (this.isOnlyIcon || this.isOnlyLoading) && !(this.isOnlyIcon && this.isOnlyLoading);
		},

		/**
		 * @returns {boolean}
		 */
		hasText(){
			return !!this.text?.trim().length;
		},

		/**
		 * @returns {boolean}
		 */
		hasIcon(){
			return !!this.icon?.trim().length;
		},

		/**
		 * @returns {?string}
		 */
		formId(){
			if(this.form && typeof this.form == 'object'){
				if(!this.form.id)
					this.form.id = 'form-' + Math.floor(Math.random() * (999999 - 100000) + 100000);
				return this.form.id;
			}
			return this.form;
		},

		/**
		 * @returns {EWbButtonContentOrderItem[]}
		 */
		contentOrderComputed(){
			if(this.contentOrder?.length){
				return this.contentOrder;
			} else {
				if(this.iconPosition === 'end'){
					return ['loading', 'image', 'text', 'slot', 'icon'];
				} else {
					return ['loading', 'icon', 'image', 'text', 'slot'];
				}
			}
		},

	},


	mounted() {
		if (this.autofocus)
			this.focus();
	},


	methods: {
		getButton() {
			return this.$el;
		},

		isFocus() {
			return document.activeElement === this.getButton();
		},

		focus() {
			this.getButton().focus();
		},

		blur() {
			this.getButton().blur();
		},

		_onMouseDown(e) {
			if (this.dontFocusOnClick)
				e.preventDefault();
			this.$emit('mousedown', e);
		}

	},

	emits: [
		'click',
		'submit',
		'mousedown'
	],

}
</script>


<style>

@property --wb-button--width {
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: auto;
}
@property --wb-button--height {
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: auto;
}
@property --wb-button--padding {
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: auto;
}

@property --wb-button--bg {
	syntax: "<color>";
	inherits: true;
	initial-value: var(--wb--primary-color, none);
}

@property --wb-button--fg {
	syntax: "<color>";
	inherits: true;
	initial-value: var(--wb--on-primary-color, inherit);
}
@property --wb-button--font-size {
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: 1em;
}

@property --wb-button--border-color{
	syntax: "<color>";
	inherits: true;
	initial-value: none;
}
@property --wb-button--border-size{
	syntax: "<length>";
	inherits: true;
	initial-value: none;
}
@property --wb-button--border-radius{
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: 8px;
}

@property --wb-button--gap{
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: 0.5em;
}




/*
 * ==============================
 * Sizes
 * ==============================
 */
.wb-button.--size-biggest{
	--wb-button--height: 56px;
	--wb-button--padding: 28px;
	--wb-button--font-size: 16px;
	/*--wb-button--gap: 18px;*/
}
.wb-button.--size-big{
	--wb-button--height: 48px;
	--wb-button--padding: 24px;
	--wb-button--font-size: 16px;
	/*--wb-button--gap: 16px;*/
}
.wb-button{
	--wb-button--height: 32px;
	--wb-button--padding: 14px;
	--wb-button--font-size: 14px;
	/*--wb-button--gap: 14px;*/
}
.wb-button.--size-small{
	--wb-button--height: 28px;
	--wb-button--padding: 12px;
	--wb-button--font-size: 12px;
	/*--wb-button--gap: 12px;*/
}
.wb-button.--size-smallest{
	--wb-button--height: 24px;
	--wb-button--padding: 10px;
	--wb-button--font-size: 10px;
	/*--wb-button--gap: 10px;*/
}




/*
 * ==============================
 * Colors (with relevancy-normal)
 * ==============================
 */
.wb-button[data-relevancy="normal"][data-intent="neutral"]{
	--wb-button--bg: var(--wb--local-bg-color);
	--wb-button--fg: var(--wb--local-fg-color);
	--wb-button--border-color: var(--wb--local-fg-color);
}
.wb-button[data-relevancy="normal"][data-intent="positive"]{
	--wb-button--bg: var(--wb--local-bg-color);
	--wb-button--fg: var(--wb--positive-color);
	--wb-button--border-color: var(--wb--positive-color);
}
.wb-button[data-relevancy="normal"][data-intent="negative"]{
	--wb-button--bg: var(--wb--local-bg-color);
	--wb-button--fg: var(--wb--negative-color);
	--wb-button--border-color: var(--wb--negative-color);
}

/*
 * ==============================
 * Colors (with relevancy-secondary)
 * ==============================
 */
.wb-button[data-relevancy="secondary"][data-intent="neutral"]{
	--wb-button--bg: var(--wb--secondary-color);
	--wb-button--fg: var(--wb--on-secondary-color);
	--wb-button--border-color: var(--wb--local-fg-color);
}
.wb-button[data-relevancy="secondary"][data-intent="positive"]{
	--wb-button--bg: var(--wb--secondary-color);
	--wb-button--fg: var(--wb--positive-color);
	--wb-button--border-color: var(--wb--positive-color);
}
.wb-button[data-relevancy="secondary"][data-intent="negative"]{
	--wb-button--bg: var(--wb--secondary-color);
	--wb-button--fg: var(--wb--negative-color);
	--wb-button--border-color: var(--wb--negative-color);
}

/*
 * ==============================
 * Colors (with relevancy-main)
 * ==============================
 */
.wb-button[data-relevancy="main"][data-intent="neutral"]{
	--wb-button--bg: var(--wb--primary-color);
	--wb-button--fg: var(--wb--on-primary-color);
	--wb-button--border-color: var(--wb--local-fg-color);
}
.wb-button[data-relevancy="main"][data-intent="positive"]{
	--wb-button--bg: var(--wb--positive-color);
	--wb-button--fg: var(--wb--on-positive-color);
	--wb-button--border-color: var(--wb--local-fg-color);
}
.wb-button[data-relevancy="main"][data-intent="negative"]{
	--wb-button--bg: var(--wb--negative-color);
	--wb-button--fg: var(--wb--on-negative-color);
	--wb-button--border-color: var(--wb--local-fg-color);
}









/*
 * ==============================
 * Base
 * ==============================
 */
.wb-button {
	--var-width: var(--wb-button--width, auto);
	--var-height: var(--wb-button--height);
	--var-padding-h: var(--wb-button--padding);
	--var-font-size: var(--wb-button--font-size);

	--var-bg-color: var(--wb-button--bg, var(--wb--primary-color, transparent));
	--var-fg-color: var(--wb-button--fg, var(--wb--on-primary-color, #000000));

	--var-border-radius: var(--wb-button--border-radius);
	--var-border-color: var(--wb-button--border-color);

	--var-gap: var(--wb-button--gap, calc(var(--var-padding-h) * 0.66));

	display: flex;
	flex-direction: row;
	align-items: center;

	min-width: var(--var-width);
	width: var(--var-width);
	max-width: var(--var-width);

	min-height: var(--var-height);
	height: var(--var-height);
	max-height: var(--var-height);

	background: var(--var-bg-color);

	padding: 0 var(--var-padding-h);

	border-radius: var(--var-border-radius);

	gap: var(--var-gap);

	transition: background-color 0.15s ease;
}




/*
 * ==============================
 * States
 * ==============================
 */
.wb-button:focus {
	outline: 1px solid transparent;
}
.wb-button:not(:disabled):hover,
.wb-button:not(:disabled):focus {
	background-color: color-mix(in hsl, var(--wb--local-bg-color-contrast) 10%, var(--var-bg-color));
	/*background-color: light-dark(hsl(from var(--var-bg-color) h s calc(l - 5)), hsl(from var(--var-bg-color) h s calc(l + 5)));*/
}
.wb-button:not(:disabled):active {
	background-color: color-mix(in hsl, var(--wb--local-bg-color-contrast) 20%, var(--var-bg-color));
	/*background-color: light-dark(hsl(from var(--var-bg-color) h s calc(l - 15)), hsl(from var(--var-bg-color) h s calc(l + 15)));*/
}




/*
 * ==============================
 * Alignment
 * ==============================
 */
.wb-button[data-align="start"]{
	justify-content: flex-start;
}
.wb-button[data-align="center"]{
	justify-content: center;
}
.wb-button[data-align="end"]{
	justify-content: flex-end;
}
.wb-button[data-align="space-between"]{
	justify-content: space-between;
}
.wb-button[data-align="stretch"]{
	justify-content: stretch;
}




/*
 * ==============================
 * Outline
 * ==============================
 */
.wb-button.--outline {
	--var-border-size: var(--wb-button--border-size, 2pt);
}
/*.wb-button.--outline {*/
/*	border: var(--var-border-size) solid var(--var-border-color);*/
/*	!*box-shadow: inset 0 0 0 var(--var-border-size) var(--var-border-color);*!*/
/*}*/
.wb-button.--outline::after {
	opacity: 1;
	/*border: var(--var-border-size) solid var(--var-border-color);*/
	box-shadow: inset 0 0 0 var(--var-border-size) var(--var-border-color);
}




/*
 * ==============================
 * Special states
 * ==============================
 */
.wb-button.--unit-ratio {
	--var-width: var(--var-height, auto);
}

.wb-button:not(.--has-text):not(.--has-icon) {
	padding: 0;
}

.wb-button.--fullwidth {
	width: 100%;
}

.wb-button.--box {
	--wb-button--border-radius: 0;
}

.wb-button.--capsule {
	--wb-button--border-radius: 1000px;
	overflow: hidden;
}




/*
 * ==============================
 * Background overlay
 * ==============================
 */
.wb-button::after {
	pointer-events: none;
	content: '';
	opacity: 0;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;

	border-radius: var(--wb-button--border-radius);

	box-shadow: inset 0 0 0 calc(var(--var-border-size) * 0.5) var(--var-border-color);

	transition: opacity 0.15s ease;
}
.wb-button:not(:disabled):hover::after,
.wb-button:not(:disabled):focus::after {
	opacity: 1;
}
.wb-button:not(:disabled):active::after {
	opacity: 1;
}




/*
 * ==============================
 * Disabled
 * ==============================
 */
.wb-button:disabled {
	cursor: default;
	opacity: 0.5;
}




/*
 * ==============================
 * Parts
 * ==============================
 */
.wb-button:disabled > .-icon,
.wb-button:disabled > .-loading,
.wb-button:disabled > .-text {
	opacity: 0.7;
}




/*
 * ==============================
 * Loading
 * ==============================
 */
.wb-button > .-loading {
	--wb-loading-spinner--size: var(--var-font-size);
	--wb-loading-spinner--stroke-width: calc(var(--var-font-size) * 1);
	--wb-loading-spinner--color: var(--var-fg-color);
}




/*
 * ==============================
 * Icon
 * ==============================
 */
.wb-button > .-icon {
	font-size: var(--var-font-size);
	color: var(--var-fg-color);
}




/*
 * ==============================
 * Image
 * ==============================
 */
.wb-button > .-img{
	max-height: var(--var-height);
	height: var(--var-height);
	min-height: var(--var-height);

	max-width: var(--var-height);
	width: var(--var-height);
	min-width: var(--var-height);
}
.wb-button > .-img > .-fallback{
	height: 100%;
	width: 100%;
}




/*
 * ==============================
 * Text
 * ==============================
 */
.wb-button > .-text {
	color: var(--var-fg-color);
	font-size: var(--var-font-size);
	font-weight: 500;

	letter-spacing: 0.05em;

	transition: color 0.15s ease;
}
.wb-button > .-text:nth-child(1){
	margin-inline-start: calc( calc( var(--var-height) / 2 ) - var(--var-padding-h) );
}
.wb-button > .-text:nth-last-child(1){
	margin-inline-end: calc( calc( var(--var-height) / 2 ) - var(--var-padding-h) );
}
.wb-button.--bold > .-text {
	font-weight: 600;
}
.wb-button.--uppercase > .-text {
	text-transform: uppercase;
}
.wb-button.--italic > .-text {
	font-style: italic;
}
</style>
