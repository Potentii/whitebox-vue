<template>
	<i class="wb-icon --wb--not-selectable" :class="{ [iconProviderComputed]: true }"><slot></slot></i>
</template>


<script>
import {defaultIconProvider} from "../configs.mjs";

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
		/**
		 *
		 * @returns {?EWbIconProvider}
		 */
		iconProviderComputed(){
			if(this.iconProvider)
				return this.iconProvider;
			return defaultIconProvider.value;
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
}
</style>
