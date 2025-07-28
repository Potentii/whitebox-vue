<template>
	<div class="wb-radio-input-impl">

		<input
			class="-input -native"
			ref="input"
			type="radio"
			:id="randId"
			:name="name"
			:required="required"
			:disabled="disabled"
			:value="radioValue"
			v-show="false"
			v-model="value"/>




		<label class="-label" :for="randId">
			<span class="-icon-container">
				<Transition name="--fade">
					<wb-icon class="-icon -checked" v-if="value === radioValue">radio_button_checked</wb-icon>
					<wb-icon class="-icon -unchecked" v-else>radio_button_unchecked</wb-icon>
				</Transition>
			</span>
			<span class="-text" v-if="placeholder?.trim?.().length">{{ placeholder }}</span>
		</label>


	</div>
</template>


<script>


import WbIcon from "./wb-icon.vue";

export default {

	name: 'wb-radio-input-impl',


	components: {WbIcon},


	props: {

		/**
		 * @type {?string}
		 */
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
		 * @type {?string}
		 */
		modelValue: {
			type: [String],
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
		 * @return {?string}
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
	],


	beforeMount() {
		this.randId = 'wb-radio-input-impl-' + Math.floor(Math.random() * 10000);
	},


	methods: {

		getMainInput(){
			return this.$refs.input;
		},
	}

}
</script>


<style>
.wb-radio-input-impl {
	display: flex;
	flex-direction: row;
	align-items: center;

	/*gap: 0.5em;*/
}

.wb-radio-input-impl > .-label {
	cursor: pointer;

	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5em;
}

.wb-radio-input-impl > .-label > .-icon-container {
	display: flex;
	/*width: 1em;*/
}
.wb-radio-input-impl > .-label > .-icon-container > .-icon {
	font-size: 1em;
}
.wb-radio-input-impl > .-label > .-icon-container > .-icon.--fade-move,
.wb-radio-input-impl > .-label > .-icon-container > .-icon.--fade-enter-active,
.wb-radio-input-impl > .-label > .-icon-container > .-icon.--fade-leave-active {
	transition: opacity, transform, 0.15s ease;
}
.wb-radio-input-impl > .-label > .-icon-container > .-icon.--fade-enter-from,
.wb-radio-input-impl > .-label > .-icon-container > .-icon.--fade-leave-to {
	opacity: 0;
	transform: scale(0.95);
}
.wb-radio-input-impl > .-label > .-icon-container > .-icon.--fade-leave-active {
	position: absolute;
}





/*.wb-radio-input-impl > .-icon-container > .-icon.fade-leave-active {*/
/*	position: absolute;*/
/*}*/


.wb-radio-input-impl > .-label > .-text {
	font-size: 1em;
}



</style>
