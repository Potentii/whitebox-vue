<template>
	<div
		class="v-navigable-selection-group"
		:class="{
        '--is-column': type === 'column',
        '--is-row': type === 'row',
        '--is-grid': type === 'grid',

        '--is-wrap': !!wrap,
      }">
		<span class="-title" :title="title" v-if="title !== undefined && title !== null">{{ title }}</span>
		<div class="-content">
			<slot></slot>
		</div>
	</div>
</template>


<script>

/**
 *
 * TODO:
 * - Allow to select all items of a group if the user dbl-click on the group title. Make this as an option, to enable this feature.
 */
export default {

	name: 'v-navigable-selection-group',


	components: {},


	props: {
		title: {
			required: false,
		},
		type: {
			type: String,
			required: false,
			validator: value => ['column', 'row', 'grid'].includes(value),
			default: 'column',
		},
		wrap: {
			type: Boolean,
			required: false,
			default: false,
		},
	},


	emits: [],


	data() {
		return {};
	},


	methods: {}
}
</script>


<style>
.v-navigable-selection-group {
	display: flex;
	flex-direction: column;
	gap: 0.5em;
}

.v-navigable-selection-group.--is-column > .-content {
	display: flex;
	flex-direction: column;
}

.v-navigable-selection-group.--is-row > .-content {
	display: flex;
	flex-direction: row;
}

.v-navigable-selection-group.--is-column.--is-wrap > .-content,
.v-navigable-selection-group.--is-row.--is-wrap > .-content {
	flex-wrap: wrap;
}

.v-navigable-selection-group.--is-grid > .-content {
	display: grid;
	grid-template-columns: repeat(auto-fit, auto);
}
</style>
