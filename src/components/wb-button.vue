<template>
	<component
		class="wb-button"
		v-bind="$attrs"
		:class="{
			'--capsule': !!capsule,
			'--round': !!round,
			'--outline': !!outline,
			'--outline-interaction': !!computed_outline_interaction,
			'--fullwidth': !!fullwidth,
			'--bold': !!bold,
			'--italic': !!italic,
			'--uppercase': !!uppercase,

			'--custom-slot': !!customSlot,

			'--unit-ratio': is_unit_ratio,


			'--is-button': type === 'button' && !to,
			'--is-submit': type === 'submit',
			'--is-link': !!to,
	 	}"
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

		<template v-for="contentItem in contentOrder">
<!--			<v-loading-spinner-->
<!--				class="-loading"-->
<!--				v-if="contentItem == 'loading' && loading">-->
<!--			</v-loading-spinner>-->


<!--			<wb-icon-->
<!--				class="-icon"-->
<!--				block-mode-->
<!--				v-if="contentItem == 'icon' && icon"-->
<!--				:icon-provider="iconProviderClass">{{ icon }}</wb-icon>-->


			<object
				class="-img"
				:data="imageUrl"
				v-if="contentItem == 'image' && imageUrl">
				<img class="-fallback" :src="fallbackImageUrl"/>
			</object>


			<span
				class="-text"
				v-if="contentItem == 'text' && text">
				{{ text }}
			</span>

			<div
				:class="customSlotClass"
				class="-slot"
				v-if="contentItem == 'slot' && customSlot">
				<slot></slot>
			</div>

		</template>



	</component>
</template>


<script lang="ts">

/**
 * @typedef {'material-icons'|'material-symbols-outlined'|'material-symbols-rounded'|'material-symbols-sharp'} EVButtonIconProvider
 */
/**
 * @typedef {'loading'|'icon'|'image'|'text'|'slot'} EVButtonContentOrderItem
 */
/**
 * @typedef {'start'|'end'} EVButtonLoadingPosition
 */
/**
 * @typedef {'start'|'end'} EVButtonIconPosition
 */
/**
 * @typedef {'start'|'end'} EVButtonImagePosition
 */
/**
 * @typedef {'button'|'submit'} EVButtonType
 */
export default {

	name: 'wb-button',


	// components: {WbIcon, VLoadingSpinner},


	props: {

		/**
		 * @type {EVButtonContentOrderItem[]}
		 */
		contentOrder: {
			type: Array,
			required: false,
			default: ['loading', 'icon', 'image', 'text', 'slot'],
			validator: value => value?.length && value?.every(item => ['loading', 'icon', 'image', 'text', 'slot'].includes(item)),
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
		 * @type {EVButtonIconProvider}
		 */
		iconProviderClass: {
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
		 * @type {EVButtonType}
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


		// sizeXxs: {
		// 	type: Boolean,
		// 	required: false,
		// 	default: false
		// },
		// sizeXs: {
		// 	type: Boolean,
		// 	required: false,
		// 	default: false
		// },
		// sizeS: {
		// 	type: Boolean,
		// 	required: false,
		// 	default: false
		// },
		// sizeM: {
		// 	type: Boolean,
		// 	required: false,
		// 	default: false
		// },
		// sizeL: {
		// 	type: Boolean,
		// 	required: false,
		// 	default: false
		// },
		// sizeXl: {
		// 	type: Boolean,
		// 	required: false,
		// 	default: false
		// },



		outline: {
			type: Boolean,
			required: false,
			default: false
		},

		outlineInteraction: {
			type: Boolean,
			required: false,
			default: false
		},

		round: {
			type: Boolean,
			required: false,
			default: false
		},

		capsule: {
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
		 * @type {'start'|'center'|'end'}
		 */
		align: {
			type: String,
			required: false,
			default: 'center',
			validator: value => ['start','center','end'].includes(value),
		},

	},


	computed: {

		component(){
			return this.to ? 'RouterLink' : 'button';
		},

		is_unit_ratio() {
			return !this.text && !this.customSlot;
		},

		computed_outline_interaction() {
			return this.outlineInteraction || this.outline;
		},

		formId(){
			if(this.form && typeof this.form == 'object'){
				if(!this.form.id)
					this.form.id = 'form-' + Math.floor(Math.random() * (999999 - 100000) + 100000);
				return this.form.id;
			}
			return this.form;
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

@property --wb-button--bg {
	syntax: "<color>";
	inherits: true;
	initial-value: transparent;
}

@property --wb-button--fg {
	syntax: "<color>";
	inherits: true;
	initial-value: #000000;
}
@property --wb-button--fsize {
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: 1em;
}

@property --wb-button--border-color{
	syntax: "<color>";
	inherits: true;
	initial-value: transparent;
}
@property --wb-button--border-size{
	syntax: "<length>";
	inherits: true;
	initial-value: 0;
}
@property --wb-button--border-radius{
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: 0;
}

@property --wb-button--icon--bg{
	syntax: "<color>";
	inherits: true;
	initial-value: auto;
}
@property --wb-button--icon--fg{
	syntax: "<color>";
	inherits: true;
	initial-value: auto;
}
@property --wb-button--icon--bg--hover{
	syntax: "<color>";
	inherits: true;
	initial-value: auto;
}
@property --wb-button--icon--fg--hover{
	syntax: "<color>";
	inherits: true;
	initial-value: auto;
}
@property --wb-button--icon--padding{
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: auto;
}


.wb-button {
	--var-fsize: var(--wb-button--fsize, 1em);
	--var-width: var(--wb-button--width, auto);
	--var-height: var(--wb-button--height, auto);
	--var-padding-v: var(--wb-button--padding-v, calc(var(--var-height) / 8));
	--var-padding-h: var(--wb-button--padding-h, var(--var-padding-v));
	--var-bg: var(--wb-button--bg, transparent);
	--var-bg--hover: var(--wb-button--bg--hover, rgba(0, 0, 0, 0.04));
	--var-bg--active: var(--wb-button--bg--active, rgba(0, 0, 0, 0.08));
	--var-fg: var(--wb-button--fg, #000000);
	--var-fg--hover: var(--wb-button--fg--hover, var(--var-fg));
	--var-border-radius: var(--wb-button--border-radius, 0);
	--var-border-size: var(--wb-button--border-size, 0);
	--var-border-color: var(--wb-button--border-color, transparent);
	/*--var-loading-size: var(--wb-button--loading-size, 48px);*/
	--var-loading-stroke: var(--wb-button--loading-stroke, 5px);
	--var-loading-color: var(--wb-button--loading-color, var(--var-fg));
	--var-gap: var(--wb-button--gap, 1em);

	display: flex;
	flex-direction: row;
	align-items: center;

	min-width: var(--var-width);
	width: var(--var-width);
	max-width: var(--var-width);

	min-height: var(--var-height);
	height: var(--var-height);
	max-height: var(--var-height);

	background: var(--var-bg);

	padding: var(--var-padding-v) var(--var-padding-h);

	/*font-size: var(--var-fsize);*/

	border-radius: var(--var-border-radius);

	gap: var(--var-gap);
}

.wb-button[data-align="start"]{
	justify-content: flex-start;
}
.wb-button[data-align="center"]{
	justify-content: center;
}
.wb-button[data-align="end"]{
	justify-content: flex-end;
}

.wb-button:focus {
	outline: 1px solid transparent;
}


.wb-button.--unit-ratio {
	--var-height: var(--wb-button--height);
	--var-width: var(--wb-button--width, var(--var-height, auto));
	padding: 0;
	/*--var-padding-v: calc(var(--wb-button--padding-v) * 2);*/


	/*--var-padding-v: var(--wb-button--padding-v, 0.8em);*/
	/*--var-padding-h: var(--wb-button--padding-h, var(--var-padding-v));*/
}


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

	box-shadow: inset 0 0 0 calc(var(--var-border-size) * 0.5) transparent;

	transition: opacity, background-color, box-shadow, 0.15s ease;
}

.wb-button:not(:disabled):hover::after,
.wb-button:not(:disabled):focus::after {
	opacity: 1;
	background-color: var(--var-bg--hover);
}

.wb-button:not(:disabled):active::after {
	opacity: 1;
	background-color: var(--var-bg--active);
}

.wb-button.--outline-interaction:not(:disabled):focus::after {
	box-shadow: inset 0 0 0 var(--var-border-size) var(--var-border-color);
}

.wb-button:disabled {
	cursor: default;
	opacity: 0.5;
}

.wb-button:disabled > .-icon,
.wb-button:disabled > .-loading,
.wb-button:disabled > .-text {
	opacity: 0.7;
}

.wb-button.--fullwidth {
	width: 100%;
}

.wb-button.--capsule {
	--wb-button--border-radius: 1000px;
	/*padding: var(--var-padding-v) calc(var(--var-padding-h) * 1.2);*/

	/*--var-padding-v: var(--wb-button--padding-v, 0.8em);*/
	/*--var-padding-h: var(--wb-button--padding-h, var(--var-padding-v));*/
	overflow: hidden;
}

.wb-button.--round {
	--wb-button--border-radius: 50%;
	overflow: hidden;
}

.wb-button.--outline::after {
	opacity: 1;
	box-shadow: inset 0 0 0 var(--var-border-size) var(--var-border-color);
}


.wb-button > .-loading {
	--v-loading-spinner--size: calc(var(--var-height) - calc(var(--var-padding-v) * 2));
	--v-loading-spinner--stroke-width: var(--var-loading-stroke);
	--v-loading-spinner--color: var(--var-loading-color);
}


.wb-button > .-icon {
	/*font-size: calc(var(--var-fsize) + 2em);*/
	/*color: var(--var-fg);*/
	/*--wb-icon--fg: ;*/

	--wb-icon--fg: var(--wb-button--icon--fg, var(--var-fg));
	--wb-icon--bg: var(--wb-button--icon--bg, var(--var-bg));
	--wb-icon--height: 100%;
	--wb-icon--width: auto;
	/*--wb-icon--font-size: calc(var(--var-fsize) + 0.5em);*/
	--wb-icon--padding: calc( min( var(--var-padding-v), var(--var-padding-h) ) / 2 );

	/*transition: color 0.15s ease;*/
	transition: background-color, color, 0.15s ease;
	/*text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.6);*/
	/*z-index: 2;*/
}
.wb-button.--unit-ratio > .-icon{
	--wb-icon--padding: calc(var(--wb-button--icon--padding) + var(--wb-button--padding-v));
	/*--wb-icon--padding: min(var(--var-padding-v), var(--var-padding-h));*/
}

.wb-button:not(:disabled):hover > .-icon {
	/*color: var(--var-fg--hover);*/
	/*--wb-icon--fg: var(--wb-button--icon--fg--hover, var(--var-fg--hover));*/
	/*--wb-icon--bg: var(--wb-button--icon--bg--hover, var(--var-bg--hover));*/
}

/*.wb-button.--italic > .-icon {*/
/*	font-style: italic;*/
/*}*/


.wb-button > .-img{
	height: var(--var-height);
	width: var(--var-height);
	max-height: var(--var-height);
	max-width: var(--var-height);
	min-height: var(--var-height);
	min-width: var(--var-height);
}
.wb-button > .-img > .-fallback{
	height: 100%;
	width: 100%;
}

/*
 * ----------------------------------------
 * Text
 * ----------------------------------------
 */
.wb-button > .-text {
	color: var(--var-fg);
	/*font-family: 'Roboto', sans-serif;*/
	font-weight: bold;
	font-size: var(--var-fsize);

	/*text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.6);*/
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
	/*font-family: 'Roboto', sans-serif;*/
	font-weight: 500;
}
.wb-button.--uppercase > .-text {
	text-transform: uppercase;
}
.wb-button.--italic > .-text {
	font-style: italic;
}
.wb-button:not(:disabled):focus > .-text,
.wb-button:not(:disabled):hover > .-text {
	color: var(--var-fg--hover);
}
</style>
