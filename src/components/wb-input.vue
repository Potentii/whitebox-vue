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
				size="1"
				:min="min"
				:max="max"
				:minlength="minLength"
				:maxlength="maxLength"
				:disabled="disabled"
				@input="$emit('input', $event)"
				:placeholder="placeholder"
				v-model="value"
			/>

			<slot name="end"></slot>

		</div>

		<slot name="bottom"></slot>

<!--		<ul class="-summary" v-if="summary?.length">-->
<!--			<li class="-summary-item" :key="summaryItem" v-for="summaryItem in summary">{{ summaryItem }}</li>-->
<!--		</ul>-->


	</div>
</template>


<script>

export default {

	name: 'wb-input',


	props: {

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
@property --wb-input--background {
	syntax: "<color>";
	inherits: true;
	initial-value: #ffffff;
}
@property --wb-input--box-shadow {
	syntax: "<length-percentage> <length-percentage> <length-percentage> <length-percentage> <color>";
	inherits: true;
	initial-value: 0 0 0 0 none;
}
@property --wb-input--input-color {
	syntax: "<color>";
	inherits: true;
	initial-value: #000000;
}
@property --wb-input--font-size {
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: 1em;
}
/*@property --wb-input--line-color {*/
/*	syntax: "<color>";*/
/*	inherits: true;*/
/*	initial-value: #000000;*/
/*}*/
@property --wb-input--height {
	syntax: "<lenght-percentage>";
	inherits: true;
	initial-value: auto;
}
@property --wb-input--padding {
	syntax: "<length-percentage> <lenght-percentage> <lenght-percentage> <lenght-percentage>";
	inherits: true;
	initial-value: 1em;
}
@property --wb-input--input-padding {
	syntax: "<length-percentage> <lenght-percentage> <lenght-percentage> <lenght-percentage>";
	inherits: true;
	initial-value: 0;
}
@property --wb-input--border-radius {
	syntax: "<lenght-percentage>";
	inherits: true;
	initial-value: 0;
}



.wb-input{
	cursor: text;

	display: flex;
	flex-direction: column;
	align-items: stretch;
	/*gap: 1em;*/


	/*color: var(--wb-input--input-color);*/
	/*overflow: hidden;*/
}
.wb-input > .-input-container{
	flex: 1 0 auto;
	display: flex;
	flex-direction: row;
	align-items: center;

	gap: 0.3em;


	height: var(--wb-input--height);
	/*max-height: var(--wb-input--height);*/
	padding: var(--wb-input--padding);
	background: var(--wb-input--background);
	border-radius: var(--wb-input--border-radius);
	box-shadow: var(--wb-input--box-shadow);
}
.wb-input > .-input-container > input{
	flex: 1 1 auto;

	/*width: auto;*/
	/*min-width: 10px;*/

	padding: var(--wb-input--input-padding);
	background: var(--wb-input--background);
	color: var(--wb-input--input-color);
	font-size: var(--wb-input--font-size);
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
