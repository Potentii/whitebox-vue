<template>
	<div class="wb-input" @focus="focus" tabindex="0">

		<slot name="top"></slot>

		<div class="-input-container">

			<slot name="start"></slot>

			<input
				class="-input"
				ref="input"
				:type="type"
				:required="required"
				:size="size"
				:min="min"
				:max="max"
				:minlength="minLength"
				:maxlength="maxLength"
				:disabled="disabled"
				@input="$emit('input', $event)"
				:placeholder="placeholder"
				v-model="value"/>

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
 * @typedef {'text'|'email'|'search'|'password'|'file'|'number'} WbInputType
 */

export default {

	name: 'wb-input',


	props: {

		/**
		 * @type {WbInputType}
		 */
		type: {
			type: String,
			required: true,
			default: 'text',
			validate: val => ['text','email','search','password','file','number'].includes(val),
		},

		placeholder: {
			type: String,
			required: false,
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
			type: [Number,String,Date],
			required: false,
		}

	},


	emits: [
		'update:modelValue',
		'input',
	],


	computed: {

		value: {
			get(){
				return this.modelValue;
			},
			set(newVal){
				this.$emit('update:modelValue', newVal);
			}
		},

		// summary: {
		// 	get(){
		// 		return [];
		// 	},
		// 	set(newVal){
		// 		// TODO
		// 	}
		// },

	},


	mounted(){
		if(this.autoFocus)
			this.focus();

	},


	methods: {

		focus(){
			this.$refs.input.focus();
		},

		/**
		 *
		 * @param {string} message
		 */
		setCustomValidity(message){
			this.$refs.input.setCustomValidity(message);
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

	--var-bg-color: var(--wb-input--bg-color, var(--wb--surface-color));
	--var-fg-color: var(--wb-input--fg-color, var(--wb--on-surface-color));

	cursor: text;

	display: flex;
	flex-direction: column;
	align-items: stretch;

	gap: 0.25em;
}
.wb-input > .-input-container{
	flex: 0 0 auto;
	display: flex;
	flex-direction: row;
	align-items: center;

	gap: 0.5em;

	height: var(--wb-input--height);

	padding: 0 0.8em;

	font-size: var(--wb-input--font-size);

	background: var(--var-bg-color);
	color: var(--var-fg-color);

	box-shadow: var(--wb-input--box-shadow);
	border-radius: var(--wb-input--border-radius);
}
.wb-input > .-input-container > input{
	flex: 1 1 auto;

	/*width: auto;*/
	/*min-width: 8em;*/

	/*font-size: 16px;*/
	font-size: var(--wb-input--font-size);
	/*padding: var(--wb-input--input-padding);*/
	padding: 1em 0.5em;
	/*background: var(--wb-input--bg-color);*/

}
/*.wb-input > .-input-container > .-line{*/
/*	flex: 0 0 auto;*/

/*	background: var(--wb-input--line-color);*/
/*	width: 100%;*/
/*	height: 3pt;*/
/*	min-height: 3pt;*/
/*	max-height: 3pt;*/
/*	border-radius: 100px;*/
/*}*/
</style>
