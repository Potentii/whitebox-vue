<template>
	<span
		class="wb-chip"
		:class="{
			'--size-biggest': !!sizeBiggest,
			'--size-big': !!sizeBig,
			'--size-small': !!sizeSmall,
			'--size-smallest': !!sizeSmallest,

			'--unit-ratio': !!isUnitRatio,
		}">
		<template v-for="contentItem in contentOrder">
			<wb-icon class="-icon" v-if="contentItem === 'icon' && icon">{{ icon }}</wb-icon>
			<span class="-text" v-if="contentItem === 'text' && text">{{ text }}</span>
		</template>
	</span>
</template>


<script>
import WbIcon from "./wb-icon.vue";

export default {

	name: 'wb-chip',

	components: {WbIcon},

	props: {

		/**
		 * @type {EVButtonContentOrderItem[]}
		 */
		contentOrder: {
			type: Array,
			required: false,
			default: ['loading', 'icon', 'image', 'text'],
			validator: value => value?.length && value?.every(item => ['loading', 'icon', 'image', 'text'].includes(item)),
		},


		icon: {
			type: String,
			required: false
		},


		text: {
			type: String,
			required: false
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
	},




	computed: {

		isOnlyIcon(){
			return this.icon && !this.text;
		},


		isUnitRatio(){
			return this.isOnlyIcon;
		}


	}

}
</script>


<style>

@property --wb-chip--height {
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: auto;
}
@property --wb-chip--padding {
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: 0;
}
@property --wb-chip--gap {
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: 0.5em;
}


@property --wb-chip--font-size {
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: 1em;
}



@property --wb-chip--border-size {
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: 0;
}
@property --wb-chip--border-color {
	syntax: "<color>";
	inherits: true;
	initial-value: none;
}
@property --wb-chip--border-radius {
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: 8px;
}
@property --wb-chip--background {
	syntax: "<color>";
	inherits: true;
	initial-value: none;
}
@property --wb-chip--fg-color {
	syntax: "<color>";
	inherits: true;
	initial-value: none;
}
@property --wb-chip--icon--color {
	syntax: "<color>";
	inherits: true;
	initial-value: none;
}





/*
 * ==============================
 * Sizes
 * ==============================
 */
.wb-chip.--size-biggest{
	--wb-chip--height: 48px;
	--wb-chip--padding: 24px;
	--wb-chip--font-size: 18px;
}
.wb-chip.--size-big{
	--wb-chip--height: 40px;
	--wb-chip--padding: 20px;
	--wb-chip--font-size: 16px;
}
.wb-chip{
	--wb-chip--height: 32px;
	--wb-chip--padding: 16px;
	--wb-chip--font-size: 16px;
}
.wb-chip.--size-small{
	--wb-chip--height: 28px;
	--wb-chip--padding: 12px;
	--wb-chip--font-size: 14px;
}
.wb-chip.--size-smallest{
	--wb-chip--height: 24px;
	--wb-chip--padding: 10px;
	--wb-chip--font-size: 12px;
}







.wb-chip {
	--var-gap: var(--wb-chip--gap, calc(var(--wb-chip--padding) * 0.8));
	--var-fg-color: var(--wb-chip--fg-color, var(--wb--local-fg-color));
	--var-icon-color: var(--wb-chip--icon--color, var(--var-fg-color));
	--var-bg-color: var(--wb-chip--background, color-mix(in hsl, var(--wb--local-bg-color-contrast) 7%, var(--wb--local-bg-color)));


	user-select: text;

	display: inline-flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	gap: var(--var-gap);

	height: var(--wb-chip--height);

	background: var(--var-bg-color);



	border: var(--wb-chip--border-size) solid var(--wb-chip--border-color);
	border-radius: var(--wb-chip--border-radius);

	padding: 0 var(--wb-chip--padding);
}

.wb-chip.--unit-ratio{
	width: var(--wb-chip--height);
	padding: 0;
}


.wb-chip > .-icon{
	color: var(--var-icon-color);
	font-size: calc(var(--wb-chip--font-size) + 2px);

}
.wb-chip > .-text{
	color: var(--var-fg-color);
	font-size: var(--wb-chip--font-size, 1em);
}
</style>
