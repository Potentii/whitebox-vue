<template>
	<div class="wb-shimmer-item">

		<wb-shimmer class="-thumb"></wb-shimmer>

		<wb-shimmer class="-title"></wb-shimmer>

		<wb-shimmer class="-description"></wb-shimmer>

	</div>
</template>


<script>
import WbShimmer from "./wb-shimmer.vue";


export default {

	name: 'wb-shimmer-item',

	components: {WbShimmer},

}
</script>


<style>
@property --wb-shimmer-item--padding {
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: 0;
}



.wb-shimmer-item{
	display: grid;

	grid-template-columns: auto 1fr;
	grid-template-rows: 0.6fr 0.4fr;
	grid-template-areas:
		'thumb title'
		'thumb description';

	align-items: center;

	gap: 0.5em;

	padding: var(--wb-shimmer-item--padding);

	overflow: hidden;
}

.wb-shimmer-item > .-thumb{
	grid-area: thumb;
}
.wb-shimmer-item > .-title{
	grid-area: title;
}
.wb-shimmer-item > .-description{
	grid-area: description;
}

.wb-shimmer-item > .-thumb{
	height: 100%;
	aspect-ratio: 1 / 1;
}

</style>
