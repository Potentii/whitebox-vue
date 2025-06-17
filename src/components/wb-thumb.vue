<template>
	<div class="wb-thumb">
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
		}
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
	initial-value: 0;
}
@property --wb-thumb--shadow {
	syntax: "<length-percentage> <length-percentage> <length-percentage> <length-percentage> <color>";
	inherits: true;
	initial-value: none;
}

.wb-thumb {
	/*min-width: var(--wb-thumb--size);*/
	/*min-height: var(--wb-thumb--size);*/
	/*width: var(--wb-thumb--size);*/
	/*height: var(--wb-thumb--size);*/
	/*max-width: var(--wb-thumb--size);*/
	/*max-height: var(--wb-thumb--size);*/

	border-radius: var(--wb-thumb--border-radius, 0);

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
