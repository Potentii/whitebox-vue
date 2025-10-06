<template>
	<div class="wb-snackbar">

		<transition-group name="-snack-fade" :duration="{ enter: 150, leave: 150 }">
			<wb-snack
				class="-snack"
				:key="snack.id"
				:snack="snack"
				v-for="snack in snackStack"
				@dismiss="snack_onDismiss($event)"
				:dismissable="dismissable">
			</wb-snack>
		</transition-group>

	</div>
</template>



<script>
import WbSnack from "./wb-snack.vue";
import {mapActions, mapState} from "pinia";
import {useWbSnackbarStore} from "./wb-snack-store.mjs";


export default {

	name: 'wb-snackbar',

	components: { WbSnack },

	props: {
		'dismissable': {
			type: Boolean,
			required: false,
			default: false,
		},
	},


	computed: {


		...mapState(useWbSnackbarStore, [ 'snackStack' ]),

	},

	emits: [
		'dismiss'
	],


	methods: {

		...mapActions(useWbSnackbarStore, [ 'removeSnackById' ]),

		/**
		 *
		 * @param {Snack} snack
		 */
		snack_onDismiss(snack){
			this.removeSnackById(snack.id);
			this.$emit('dismiss', snack);
		},

	}
}
</script>



<style>
.wb-snackbar{
	position: fixed;
	bottom: 1em;
	left: 1em;

	display: flex;
	flex-direction: column;
	align-items: stretch;

	gap: 0.5em;

	min-width: 20em;
	width: auto;
	max-width: 100%;


	z-index: 22;
}
.wb-snackbar > .-snack{
	opacity: 0;

	animation-name: --wb-snackbar--snack-fade;
	animation-fill-mode: both;
	animation-timing-function: ease;
	animation-duration: 0.15s;

	transform: translateY(100%);
}
@keyframes --wb-snackbar--snack-fade {
	/*from {*/
	/*	opacity: 0;*/
	/*	transform: translateY(100%);*/
	/*}*/
	to {
		opacity: 1;
		transform: translateY(0);
	}
}
</style>
