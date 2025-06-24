<template>
  <div
      class="v-navigable-selection-item"
      :class="{
        '--highlighted': selection?.highlightedIds?.includes(itemId),
        '--selected': selection?.selectedIds?.includes(itemId),
      }"
      :data-id="itemId" @click="item_onClick" @dblclick="item_onDblClick">
    <slot></slot>
  </div>
</template>


<script>
export default {

  name: 'v-navigable-selection-item',


  components: {},


  props: {
    itemId: {
      required: true,
    }
  },


  emits: [],


  data() {
    return {};
  },


  inject: [
    'selection'
  ],


  methods: {

    item_onClick(e){
      this.selection.highlightedIds = [this.itemId];
    },

    item_onDblClick(e){
      const index = this.selection.selectedIds.indexOf(this.itemId);
      if(index >= 0){
        this.selection.selectedIds.splice(index, 1);
      } else{
        this.selection.selectedIds.push(this.itemId);
      }
    },

  },
}
</script>


<style>
.v-navigable-selection-item {

}

.v-navigable-selection-item.--highlighted {
  box-shadow: inset 0 0 0 2px #333;
}
.v-navigable-selection-item.--selected {
  background-color: #bbb;
}
</style>
