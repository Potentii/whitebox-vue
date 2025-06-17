<template>
<!--	<transition name="&#45;&#45;fade" :duration="200">-->
		<div class="wb-shimmer">
			<div class="-anim"></div>
		</div>
<!--	</transition>-->
</template>


<script>
export default {
	name: 'wb-shimmer',
}
</script>


<style>
@property --wb-shimmer--speed-multiplier {
	syntax: "<number>";
	inherits: true;
	initial-value: 1;
}


.wb-shimmer {
	--local--wb-shimmer--speed-multiplier: var(--wb-shimmer--speed-multiplier, 1);
	--local--wb-shimmer--fadein: 200ms;

	user-select: none;
	pointer-events: none;

	width: 100%;
	height: 100%;

	background-color: hsl(from var(--bg) h s calc(l - 6));

	overflow: hidden;

	transition: opacity 0.2s ease;
}


.wb-shimmer > .-anim{
	opacity: 1;
	position: absolute;
	width: 100%;
	height: 100%;

	top: 0;
	left: 0;

	background-image: linear-gradient(to right, transparent, hsl(from var(--bg) h s calc(l + 2)), transparent);

	animation: wb-shimmer--anim calc(0.7s * var(--local--wb-shimmer--speed-multiplier)) ease infinite;
}

@keyframes wb-shimmer--anim {
	0%{
		transform: translateX(-100%);
		/*background-image: linear-gradient(to right, #e6e6e6 8%, #f2f2f2 18%, #e6e6e6 33%);*/
	}
	100%{
		transform: translateX(100%);
		/*background-image: linear-gradient(to right, #e6e6e6 8%, #f2f2f2 18%, #e6e6e6 33%);*/
	}
}

/*.wb-shimmer.--fade-enter-from,*/
/*.wb-shimmer.--fade-enter-to{*/
/*	opacity: 0;*/
/*	!*background-color: rgba(0,0,0,0.06);*!*/
/*}*/
</style>
