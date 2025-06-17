<template>
	<i class="wb-icon --wb--not-selectable" :class="{ [iconProviderComputed]: true }"><slot></slot></i>
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
.wb-icon{
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	font-display: block;
}
</style>
