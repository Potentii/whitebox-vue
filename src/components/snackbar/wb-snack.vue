<template>
	<li class="wb-snack" :data-level="snack.level">

		<slot name="content" :snack="snack" :dismissable="dismissable" :dismiss="dismiss"></slot>


		<template v-if="!$slots.content">


			<wb-icon class="-icon" v-if="levelIcon">{{ levelIcon }}</wb-icon>

			<div class="--wb--flex-separator" v-if="levelIcon"></div>

			<!-- * Content * -->
			<div class="-content">
				<span class="-message">{{ snack.message }}</span>
				<span class="-submessage">{{ snack.submessage }}</span>
			</div>

			<!-- * Controls * -->
			<div class="-controls">

				<wb-button
					class="-dismiss"
					icon="close"
					v-if="dismissable"
					@click="dismiss">
				</wb-button>

			</div>

		</template>


	</li>
</template>



<script>
import Snack from "./snack.mjs";
import WbButton from "../wb-button.vue";
import WbIcon from "../wb-icon.vue";


export default {

	name: 'wb-snack',

	components: {WbIcon, WbButton},

	props: {

		'snack': {
			type: Snack,
			required: true
		},

		'dismissable': {
			type: Boolean,
			required: false,
			default: false,
		},

	},


	computed: {
		/**
		 *
		 * @return {?string}
		 */
		levelIcon(){
			switch (this.snack.level){
				case 'INFO': return 'info';
				case 'SUCCESS': return 'check_circle';
				case 'WARNING': return 'warning';
				case 'ERROR': return 'error';
				default: return null;
			}
		},
	},

	emits: [
		'dismiss',
	],



	methods: {
		dismiss(){
			this.$emit('dismiss', this.snack);
		},
	}
}
</script>




<style>
@property --wb-snack--font-size {
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: 16px;
}
@property --wb-snack--info-color {
	syntax: "<color>";
	inherits: true;
	initial-value: #42c2ff;
}
@property --wb-snack--success-color {
	syntax: "<color>";
	inherits: true;
	initial-value: #39ec8f;
}
@property --wb-snack--warning-color {
	syntax: "<color>";
	inherits: true;
	initial-value: #f8d232;
}
@property --wb-snack--error-color {
	syntax: "<color>";
	inherits: true;
	initial-value: #e63e4c;
}

@property --wb-snack--box-shadow {
	syntax: "<length-percentage> <length-percentage> <length-percentage> <length-percentage> <color>";
	inherits: true;
	initial-value: 0 8px 18px -4px rgba(0,0,0,0.4);
}

@property --wb-snack--border-size {
	syntax: "<length-percentage>";
	inherits: true;
	initial-value: 0;
}


.wb-snack{
	--var-fsize: var(--wb-snack--font-size, 16px);

	--var-info-color: var(--wb-snack--info-color, #4eb3fa);
	--var-success-color: var(--wb-snack--success-color, #3ee673);
	--var-warning-color: var(--wb-snack--warning-color, #e6c43e);
	--var-error-color: var(--wb-snack--error-color, #e63e4c);

	--var-shadow: var(--wb-snack--box-shadow, 0 8px 18px -4px rgba(0,0,0,0.4));
	--var-border-size: var(--wb-snack--border-size, 0);


	--var-bg-color: var(--wb-input--bg-color, hsl(from var(--wb--local-bg-color) h s calc(l + 5)));
	--var-fg-color: var(--wb-input--fg-color, var(--wb--local-fg-color));

	--wb-local-bg-color: var(--var-bg-color);
	--wb-local-fg-color: var(--var-fg-color);


	background: var(--var-bg-color);
	color: var(--var-fg-color);



	display: flex;
	flex-direction: row;
	align-items: stretch;

	padding: 1em;

	gap: 1em;

	/*background-color: var(--m-grey-900);*/

	border-radius: 6px;
	/*overflow: hidden;*/
	box-shadow:
		inset 0 0 0 var(--var-border-size) var(--var-level-color),
		var(--var-shadow);
}
.wb-snack[data-level="INFO"]{
	--var-level-color: var(--var-info-color);
}
.wb-snack[data-level="SUCCESS"]{
	--var-level-color: var(--var-success-color);
}
.wb-snack[data-level="WARNING"]{
	--var-level-color: var(--var-warning-color);
}
.wb-snack[data-level="ERROR"]{
	--var-level-color: var(--var-error-color);
}



/*
 * -----------------------------------------
 * Content
 * -----------------------------------------
 */
.wb-snack > .-icon{
	flex: 0 0 auto;

	user-select: none;

	display: flex;
	flex-direction: row;
	align-items: center;

	font-size: calc( var(--var-fsize) + 8px);

	color: var(--var-level-color);
}



/*
 * -----------------------------------------
 * Content
 * -----------------------------------------
 */
.wb-snack > .-content{
	flex: 1 1 auto;

	display: flex;
	flex-direction: column;
	align-items: stretch;

	gap: 0.2em;
}
.wb-snack > .-content > .-message{
	user-select: text;
	font-size: var(--var-fsize);
}
.wb-snack > .-content > .-submessage{
	user-select: text;
	opacity: 0.7;
	font-size: calc(var(--var-fsize) - 2px);
	font-style: italic;
}



/*
 * -----------------------------------------
 * Controls
 * -----------------------------------------
 */
.wb-snack > .-controls{
	flex: 0 0 auto;
	/*position: absolute;*/
	display: flex;
	flex-direction: row;
	align-items: center;

	gap: 0.5em;
	/*flex-wrap: wrap;*/

	/*top: 0;*/
	/*right: 0;*/
	/*width: auto;*/
	/*max-width: var(--var-sides-margin);*/

	/*padding: 0 0.5em;*/

	/*height: 100%;*/
}




/*.--wb-snackbar--floating .wb-snack{*/
/*	min-width: 10em;*/
/*	width: 50%;*/
/*	border-radius: 6px;*/
/*	!*box-shadow: 0 4px 10px -2px rgba(0,0,0,0.3);*!*/
/*}*/

</style>
