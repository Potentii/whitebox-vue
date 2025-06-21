<template>
	<div
		class="wb-thumb"
		:class="{
			'--size-biggest': !!sizeBiggest,
			'--size-big': !!sizeBig,
			'--size-small': !!sizeSmall,
			'--size-smallest': !!sizeSmallest,
		}">
		<wb-shimmer class="-loading" v-if="loading"></wb-shimmer>
		<object class="-img" :data="src" v-else>
			<img class="-fallback" :src="srcFallback"/>
		</object>
	</div>

</template>


<script>
import WbShimmer from "./wb-shimmer.vue";

export default {
	name: 'wb-thumb',

	components: {WbShimmer},

	props: {
		src: {
			type: String,
			required: false,
		},
		srcFallback: {
			type: String,
			required: false,
		},
		loading: {
			type: Boolean,
			required: false,
			default: false,
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
}
</script>


<style>
@property --wb-thumb--border-size {
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: 0;
}
@property --wb-thumb--border-radius {
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: 8px;
}
@property --wb-thumb--shadow {
	syntax: "<length-percentage> <length-percentage> <length-percentage> <length-percentage> <color>";
	inherits: true;
	initial-value: none;
}




/*
 * ==============================
 * Sizes
 * ==============================
 */
.wb-thumb.--size-biggest{
	--wb-thumb--height: 84px;
	--wb-thumb--width: 84px;
}
.wb-thumb.--size-big{
	--wb-thumb--height: 64px;
	--wb-thumb--width: 64px;
}
.wb-thumb{
	--wb-thumb--height: 48px;
	--wb-thumb--width: 48px;
}
.wb-thumb.--size-small{
	--wb-thumb--height: 32px;
	--wb-thumb--width: 32px;
}
.wb-thumb.--size-smallest{
	--wb-thumb--height: 24px;
	--wb-thumb--width: 24px;
}




.wb-thumb {
	--var-height: var(--wb-thumb--height);
	--var-width: var(--wb-thumb--width);

	min-width: var(--var-width);
	min-height: var(--var-height);
	width: var(--var-width);
	height: var(--var-height);
	max-width: var(--var-width);
	max-height: var(--var-height);

	border-radius: var(--wb-thumb--border-radius);

	box-shadow: var(--wb-thumb--shadow, none);
	overflow: hidden;
}
.wb-thumb > .-loading{
	width: 100%;
	height: 100%;
}
.wb-thumb > .-img{
	width: 100%;
	height: 100%;
	object-fit: cover;
}
</style>
