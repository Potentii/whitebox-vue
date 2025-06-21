<template>
	<div class="wb-shimmer">
	</div>
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

@property --wb-shimmer--color-1 {
	syntax: "<color>";
	inherits: true;
	initial-value: inherit;
}
@property --wb-shimmer--color-2 {
	syntax: "<color>";
	inherits: true;
	initial-value: inherit;
}

@property --wb-shimmer--border-radius {
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: 8px;
}


.wb-shimmer {
	--var-color-1: var(--wb-shimmer--color-1, color-mix(in hsl, var(--wb--local-bg-color-contrast) 12%, var(--wb--local-bg-color)));
	--var-color-2: var(--wb-shimmer--color-2, color-mix(in hsl, var(--wb--local-bg-color-contrast) 6%, var(--wb--local-bg-color)));
	--var-wb-shimmer--speed-multiplier: var(--wb-shimmer--speed-multiplier, 1);
	--var-wb-shimmer--fadein: 500ms;

	user-select: none;
	pointer-events: none;

	width: 100%;
	height: 100%;

	background-color: var(--var-color-1);

	border-radius: var(--wb-shimmer--border-radius);

	overflow: hidden;

	animation: wb-shimmer--anim-fadein var(--var-wb-shimmer--fadein) ease forwards;
}


.wb-shimmer::after{
	content: '';
	/*opacity: 1;*/
	position: absolute;
	width: 100%;
	height: 100%;

	top: 0;
	left: 0;

	background-image: linear-gradient(to right, transparent, var(--var-color-2), transparent);

	animation: wb-shimmer--anim-loading calc(0.7s * var(--var-wb-shimmer--speed-multiplier)) ease infinite;
}

@keyframes wb-shimmer--anim-fadein {
	0%{
		opacity: 0;
	}
	100%{
		opacity: 1;
	}
}

@keyframes wb-shimmer--anim-loading {
	0%{
		transform: translateX(-100%);
	}
	100%{
		transform: translateX(100%);
	}
}
</style>
