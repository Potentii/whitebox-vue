<template>
	<div class="wb-checkbox-input-impl">

		<input
			class="-input -native"
			ref="input"
			type="checkbox"
			:id="randId"
			:name="name"
			:required="required"
			:disabled="disabled"
			:value="checkboxValue"
			v-show="false"
			v-model="value"
			@input="$emit('input', $event)"
			@change="$emit('change', $event)"
			@keyup="$emit('keyup', $event)"/>




		<label class="-label" :for="randId">
			<span class="-icon-container">
				<Transition name="--fade">
					<wb-icon class="-icon -checked" v-if="isChecked">check_box</wb-icon>
					<wb-icon class="-icon -unchecked" v-else>check_box_outline_blank</wb-icon>
				</Transition>
			</span>
			<span class="-text" v-if="placeholder?.trim?.().length">{{ placeholder }}</span>
		</label>


	</div>
</template>


<script>


import WbIcon from "../../wb-icon.vue";

export default {

	name: 'wb-checkbox-input-impl',


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
		 * @type {?*}
		 */
		checkboxValue: {
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
		 * @type {?(boolean|string[])}
		 */
		modelValue: {
			type: [Boolean, Array],
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
		 * @return {?(boolean|string[])}
		 */
		value: {
			get() {
				return this.modelValue;
			},
			set(value) {
				this.$emit('update:modelValue', value);
			}
		},


		/**
		 * @type {boolean}
		 */
		isChecked(){
			if(typeof this.value === 'boolean'){
				return this.value;
			} else if(Array.isArray(this.value)){
				return this.value.includes(this.checkboxValue);
			}

			return this.value === this.checkboxValue;
		},

	},


	emits: [
		'update:modelValue',
		'input',
		'change',
		'keyup',
	],


	beforeMount() {
		this.randId = 'wb-checkbox-input-impl-' + Math.floor(Math.random() * 10000);
	},


	methods: {

		getParentWbInput(){
			return this.$parent;
		},

		getMainInput(){
			return this.$refs.input;
		},
	}

}
</script>


<style>
.wb-checkbox-input-impl {
	display: flex;
	flex-direction: row;
	align-items: center;

	/*gap: 0.5em;*/
}

.wb-checkbox-input-impl > .-label {
	cursor: pointer;

	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5em;
}

.wb-checkbox-input-impl > .-label > .-icon-container {
	display: flex;
	/*width: 1em;*/
}
.wb-checkbox-input-impl > .-label > .-icon-container > .-icon {
	font-size: 1em;
}
.wb-checkbox-input-impl > .-label > .-icon-container > .-icon.--fade-move,
.wb-checkbox-input-impl > .-label > .-icon-container > .-icon.--fade-enter-active,
.wb-checkbox-input-impl > .-label > .-icon-container > .-icon.--fade-leave-active {
	transition: opacity, transform, 0.15s ease;
}
.wb-checkbox-input-impl > .-label > .-icon-container > .-icon.--fade-enter-from,
.wb-checkbox-input-impl > .-label > .-icon-container > .-icon.--fade-leave-to {
	opacity: 0;
	transform: scale(0.95);
}
.wb-checkbox-input-impl > .-label > .-icon-container > .-icon.--fade-leave-active {
	position: absolute;
}





/*.wb-checkbox-input-impl > .-icon-container > .-icon.fade-leave-active {*/
/*	position: absolute;*/
/*}*/


.wb-checkbox-input-impl > .-label > .-text {
	font-size: 1em;
}



</style>
