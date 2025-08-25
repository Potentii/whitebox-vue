<template>
	<i
		class="wb-icon --wb--not-selectable"
		:class="{
			[iconProviderComputed]: true,

			'--size-biggest': !!sizeBiggest,
			'--size-big': !!sizeBig,
			'--size-small': !!sizeSmall,
			'--size-smallest': !!sizeSmallest,

		}"><slot></slot></i>
</template>


<script>

import {mapState} from "pinia";
import {useWhiteboxConfigsStore} from "../stores/whitebox-configs-store.mjs";

/**
 * @typedef {'material-icons'|'material-symbols-outlined'|'material-symbols-rounded'|'material-symbols-sharp'} EWbIconProvider
 */



export default {

	name: 'wb-icon',

	props: {
		/**
		 * @type {?EWbIconProvider}
		 */
		iconProvider: {
			type: String,
			required: false,
			validator: value => ['material-icons','material-symbols-outlined','material-symbols-rounded','material-symbols-sharp'].includes(value),
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

		...mapState(useWhiteboxConfigsStore, ['getDefaultIconProvider']),

		/**
		 *
		 * @returns {?EWbIconProvider}
		 */
		iconProviderComputed(){
			if(this.iconProvider)
				return this.iconProvider;
			return this.getDefaultIconProvider;
		}
	}

}
</script>


<style>



/*
 * ==============================
 * Sizes
 * ==============================
 */
.wb-icon.--size-biggest{
	font-size: calc(1em + 8px);
}
.wb-icon.--size-big{
	font-size: calc(1em + 4px);
}
.wb-icon{
	font-size: 1em;
}
.wb-icon.--size-small{
	font-size: calc(1em - 3px);
}
.wb-icon.--size-smallest{
	font-size: calc(1em - 6px);
}




.wb-icon{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	font-display: block;
}
</style>
