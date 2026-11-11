<template>
	<div class="wb-toggle-input-impl">

		<input
			class="-input -native"
			ref="input"
			type="checkbox"
			:id="randId"
			:name="name"
			:required="required"
			:disabled="disabled"
			value="ENABLED"
			v-show="false"
			v-model="value"
			@input="$emit('input', $event)"
			@change="$emit('change', $event)"
			@keyup="$emit('keyup', $event)"/>




		<label class="-label" :for="randId">
			<span class="-track">
				<span class="-handle">
					<Transition name="--fade">
						<slot name="toggleHandleContent" v-if="$slots.toggleHandleContent" :value="value"></slot>
						<wb-icon class="-icon" v-else-if="toggleHandleIcon?.trim?.()?.length">{{toggleHandleIcon}}</wb-icon>
<!--						<wb-icon class="-icon" v-else>{{ value ? 'check_circle' : 'cancel' }}</wb-icon>-->
					</Transition>
				</span>
			</span>
			<span class="-text" v-if="placeholder?.trim?.().length">{{ placeholder }}</span>
		</label>


	</div>
</template>


<script>


import WbIcon from "../../wb-icon.vue";

export default {

	name: 'wb-toggle-input-impl',


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
		toggleHandleIcon: {
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
		 * @type {?boolean}
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
		 * @return {?boolean}
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
			}
			return this.value === 'ENABLED';
		},

	},


	emits: [
		'update:modelValue',
		'input',
		'change',
		'keyup',
	],


	beforeMount() {
		this.randId = 'wb-toggle-input-impl-' + Math.floor(Math.random() * 10000);
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
.wb-toggle-input-impl {

	--wb-input--internal--toggle--height: min(calc(var(--wb-input--internal--height) - 1.2em), 2em);
	--wb-input--internal--toggle-disabled-bg: color-mix(in hsl, var(--wb--local-fg-color) 40%, var(--wb--local-bg-color));
	--wb-input--internal--toggle-track-bg: var(--wb-input--bg-color, hsl(from var(--wb--local-bg-color) h s calc(l + 10)));

	display: flex;
	flex-direction: row;
	align-items: center;


	/*gap: 0.5em;*/
}

.wb-toggle-input-impl > .-label {
	cursor: pointer;

	display: flex;
	flex-direction: row;
	align-items: center;
	gap: 0.5em;
}


.wb-toggle-input-impl > .-label > .-track {
	display: flex;
	flex-direction: row;
	align-items: stretch;

	height: var(--wb-input--internal--toggle--height);
	width: calc(var(--wb-input--internal--toggle--height) * 2);

	background-color: var(--wb-input--internal--toggle-disabled-bg);

	border-radius: 999px;
	/*overflow: hidden;*/

	transition: background-color 0.15s ease;
}
.wb-toggle-input-impl > .-input:checked + .-label > .-track{
	background-color: var(--wb-input--internal--toggle-enabled-bg);
}

.wb-toggle-input-impl > .-label > .-track > .-handle {
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;

	aspect-ratio: 1 / 1;

	background-color: #FAFAFA;

	border-radius: 999px;
	/*box-shadow: 0 0 1em 0 rgba(0,0,0,0.2);*/
	box-shadow: 0 0 0.5em 0 rgba(0,0,0,0.2);


	will-change: transform;
	transition: transform 0.15s ease;
}
.wb-toggle-input-impl > .-input:checked + .-label > .-track > .-handle{
	transform: translateX(100%);
}

.wb-toggle-input-impl > .-label > .-track > .-handle > .-icon {
	font-size: 1em;
}
.wb-toggle-input-impl > .-label > .-track > .-handle > .-icon.--fade-move,
.wb-toggle-input-impl > .-label > .-track > .-handle > .-icon.--fade-enter-active,
.wb-toggle-input-impl > .-label > .-track > .-handle > .-icon.--fade-leave-active {
	transition: opacity, transform, 0.15s ease;
}
.wb-toggle-input-impl > .-label > .-track > .-handle > .-icon.--fade-enter-from,
.wb-toggle-input-impl > .-label > .-track > .-handle > .-icon.--fade-leave-to {
	opacity: 0;
	transform: scale(0.95);
}
.wb-toggle-input-impl > .-label > .-track > .-handle > .-icon.--fade-leave-active {
	position: absolute;
}


.wb-toggle-input-impl > .-label > .-text {
	font-size: 1em;
}



</style>
