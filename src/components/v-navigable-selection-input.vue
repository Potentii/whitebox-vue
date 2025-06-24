<template>
  <v-navigable-selection-group
      class="v-navigable-selection-input"
      :type="$attrs.type"
      :wrap="$attrs.wrap"
      tabindex="0"
      @keydown="onKeyDown"
      @keyup="onKeyup"
      @blur="onBlur"
      @focus="onFocus"
      ref="root">
    <slot></slot>
  </v-navigable-selection-group>
</template>


<script>
import {MathUtils} from "@potentii/math-utils";
import VNavigableSelectionGroup from "./v-navigable-selection-group.vue";
import Selection from "./selection.mjs";
import {DomUtils} from "@potentii/browser-utils";


export default {

  name: 'v-navigable-selection-input',


  components: {VNavigableSelectionGroup},


  props: {

    /**
     * @type {Selection}
     */
    selection: {
      type: Selection,
      required: true,
    },

    /**
     * @type {boolean}
     */
    disabled: {
      type: Boolean,
      required: false,
      default: false,
    },

    /**
     * @type {boolean}
     */
    autofocus: {
      type: Boolean,
      required: false,
      default: false,
    },

    /**
     * @type {'multiple'|'single'}
     */
    mode: {
      type: String,
      required: false,
      validator: value => ['multiple', 'single'].includes(value),
      default: 'multiple',
    },

    //TODO
    /**
     * @type {boolean}
     */
    wrapNavigation: {
      type: Boolean,
      required: false,
      default: false,
    },

    // /**
    //  * The selected IDs
    //  * @type {string[]}
    //  */
    // modelValue: {
    //   type: Array,
    //   required: false,
    //   // default: [],
    // },

  },

  emits: [
    // 'update:modelValue',
    'highlightChange',
    'selectionChange',
    'unhighlightedItem',
    'highlightedItem',
    'deselectedItem',
    'selectedItem',
    'triedWrapNavigation',
  ],


  data() {
    return {
      // newChip: null,
      // refHighlighted: { value: undefined },
    };
  },


  computed: {
    // selection: {
    //   get() {
    //     return this.modelValue;
    //   },
    //   set(value) {
    //     this.$emit('update:modelValue', value);
    //   }
    // },
    //
    // highlighted: {
    //   get() {
    //     return this.refHighlighted.value;
    //   },
    //   set(value) {
    //     this.refHighlighted.value = value;
    //   }
    // },


  },


  watch: {
    'selection.selectedIds': {
      handler(newVal, oldVal) {
        this.$emit('selectionChange', newVal);
      },
      immediate: false,
    },

    'selection.highlightedIds': {
      handler(newVal, oldVal) {
        this.$emit('highlightChange', newVal);
      },
      immediate: false,
    },
  },


  provide() {
    return {
      selection: this.selection,
      // highlighted: this.refHighlighted,
    }
  },


  mounted() {
    if (this.autofocus)
      this.focus();
  },


  methods: {
    focus() {
      // console.log(document.activeElement);
      this.$el.focus();

      // setInterval(() => {
      //   console.log(document.activeElement);
      // }, 100)
      // console.log(document.activeElement);
      this.highlightFirst();

    },

    blur() {
      this.selection.highlightedIds = [];
    },

    clear() {
      this.selection.highlightedIds = [];
      this.selection.selectedIds = [];
    },


    onBlur(e) {
      this.selection.highlightedIds = [];
    },

    onFocus(e) {
    },


    /**
     * @param {KeyboardEvent} e
     */
    onKeyDown(e) {
      let movementRow = 0;
      let movementColumn = 0;
      if (e.key == 'ArrowDown') {
        e.preventDefault();
        movementRow++;
      }
      if (e.key == 'ArrowUp') {
        e.preventDefault();
        movementRow--;
      }
      if (e.key == 'ArrowRight') {
        e.preventDefault();
        movementColumn++;
      }
      if (e.key == 'ArrowLeft') {
        e.preventDefault();
        movementColumn--;
      }

      this.moveHighlight(movementRow, movementColumn, e.shiftKey);
    },

    /**
     * @param {KeyboardEvent} e
     */
    onKeyup(e) {


      switch (e.key) {
        case 'Enter': {
          e.preventDefault();
          if (!this.selection.highlightedIds.length)
            break;

          for (let highlightedId of this.selection.highlightedIds) {
            const index = this.selection.selectedIds.indexOf(highlightedId);
            if (index >= 0) {
              this.selection.selectedIds.splice(index, 1);
              this.$emit('deselectedItem', highlightedId);
            } else {
              if (this.mode == 'single') {
                const previouslySelectedIds = [...this.selection.selectedIds];
                this.selection.selectedIds = [highlightedId];
                for (let previouslySelectedId of previouslySelectedIds)
                  this.$emit('deselectedItem', highlightedId);
              } else {
                this.selection.selectedIds.push(highlightedId);
              }
              this.$emit('selectedItem', highlightedId);
            }
          }

          break;
        }
        case 'ArrowDown':
        case 'ArrowUp':
        case 'ArrowRight':
        case 'ArrowLeft':
          e.preventDefault();
          break;
      }
    },


    highlightFirst() {
      this.moveHighlight(1, 0, false);
    },


    /**
     *
     * @param {number} movementRow
     * @param {number} movementColumn
     * @param {boolean} isAppend
     */
    moveHighlight(movementRow, movementColumn, isAppend) {
      if (movementRow == 0 && movementColumn == 0)
        return;

      const idsMatrix = this.getIds2(this.$el, `.v-navigable-selection-item`, 3);

      if (!idsMatrix.length)
        return;

      if (!this.selection.highlightedIds.length) {
        this.selection.highlightedIds = [idsMatrix[0][0]];
        return;
      }

      let foundLast = false;
      let lastRow;
      let lastColumn;
      (() => {
        const lastHighlightedId = this.selection.highlightedIds?.[this.selection.highlightedIds?.length - 1];
        if (!lastHighlightedId) {
          foundLast = false;
          return;
        }

        for (let row = 0; row < idsMatrix.length; row++) {
          for (let column = 0; column < idsMatrix[row].length; column++) {
            if (lastHighlightedId === idsMatrix[row][column]) {
              foundLast = true;
              lastRow = row;
              lastColumn = column;
              return;
            }
          }
        }
        // for (let row = 0; row < idsMatrix.length; row++) {
        // 	for (let column = 0; column < idsMatrix[row].length; column++) {
        // 		console.log(idsMatrix[row][column])
        // 		if (this.selection.highlightedIds.includes(idsMatrix[row][column])) {
        // 			console.log(true)
        // 			foundLast = true;
        // 			lastRow = row;
        // 			lastColumn = column;
        // 			return;
        // 		}
        // 	}
        // }
      })();


      let triedToWrapY;
      let targetRow;
      if (!foundLast) {
        if (movementRow < 0) {
          targetRow = idsMatrix.length - 1;
        } else if (movementRow > 0) {
          targetRow = 0;
        } else {
          targetRow = lastRow;
        }
        triedToWrapY = false;
      } else if ((lastRow + movementRow) > idsMatrix.length - 1) {
        targetRow = this.wrapNavigation ? 0 : lastRow;
        triedToWrapY = true;
      } else if ((lastRow + movementRow) < 0) {
        targetRow = this.wrapNavigation ? idsMatrix.length - 1 : lastRow;
        triedToWrapY = true;
      } else {
        targetRow = lastRow + movementRow;
        triedToWrapY = false;
      }

      let triedToWrapX;
      let targetColumn;
      if (!foundLast) {
        targetColumn = 0;
        triedToWrapX = false;
      } else if ((lastColumn + movementColumn) > idsMatrix[targetRow].length - 1) {
        targetColumn = this.wrapNavigation ? 0 : lastColumn;
        triedToWrapX = true;
      } else if ((lastColumn + movementColumn) < 0) {
        targetColumn = this.wrapNavigation ? idsMatrix[targetRow].length - 1 : lastColumn;
        triedToWrapX = true;
      } else {
        targetColumn = lastColumn + movementColumn;
        triedToWrapX = false;
      }

      if (!this.wrapNavigation && (triedToWrapX || triedToWrapY))
        this.$emit('triedWrapNavigation', {
          top: triedToWrapY && movementRow < 0,
          bottom: triedToWrapY && movementRow > 0,
          left: triedToWrapX && movementColumn < 0,
          right: triedToWrapX && movementColumn > 0
        })

      if (targetRow >= idsMatrix.length || targetRow < 0 || targetColumn >= idsMatrix[targetRow].length || targetColumn < 0)
        return;

      const highlightedId = idsMatrix[targetRow][targetColumn];

      const highlightedIndex = this.selection.highlightedIds.indexOf(highlightedId);
      if (highlightedIndex > -1)
        this.selection.highlightedIds.splice(highlightedIndex, 1);

      if (isAppend) {
        this.selection.highlightedIds.push(highlightedId);
      } else {
        this.selection.highlightedIds = [highlightedId];
      }
    },


    getIds() {
      // TODO essa logica não funciona bem quando os itens estão exatamente encostando na borda do container (padding=0)
      const selectableItemsEls = [...this.$el.querySelectorAll('.v-navigable-selection-item')];
      const matrix = [];
      let row = -1;
      let column;
      let lastY = 0;
      for (let selectableItemEl of selectableItemsEls) {
        const y = selectableItemEl.offsetTop;

        if (!MathUtils.moreOrLess(lastY, y, 3)) {
          lastY = y;
          row++;
        }

        if (!Array.isArray(matrix[row])) {
          column = -1;
          matrix[row] = [];
        }

        column++;

        matrix[row][column] = selectableItemEl.dataset.id;
      }
      return matrix;
    },


    /**
     *
     * @param {HTMLElement} root
     * @param {string} selectorQuery
     * @param {number} [deviation]
     * @return {string[][]}
     */
    getIds2(root, selectorQuery, deviation = 0) {
      const matrix = DomUtils.getElementsMatrix(root, selectorQuery, deviation);
      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
          matrix[i][j] = matrix[i][j].dataset.id;
        }
      }

      return matrix;


      // const selectedItems = [...root.querySelectorAll(selectorQuery)]
      //     .map(selected => ({ selected: selected, id: selected.dataset.id,  offset: DomUtils.relativePosition(selected, root) }))
      //     .filter(item => !!item.id)
      //     .sort((i1, i2) => (i1.offset.x + i2.offset.y) - (i1.offset.x + i2.offset.y));
      //
      // const matrix = [];
      // let row = 0;
      // let column = 0;
      // let firstItemOfCurrRow = null;
      //
      // for (let item of selectedItems) {
      //
      //   if(!firstItemOfCurrRow)
      //     firstItemOfCurrRow = item;
      //
      //   if(!MathUtils.moreOrLess(item.offset.y, firstItemOfCurrRow.offset.y, MathUtils.clamp(deviation, 0, Number.MAX_SAFE_INTEGER))){
      //     row++;
      //     column = 0;
      //     firstItemOfCurrRow = null;
      //   }
      //
      //   if(!matrix[row])
      //     matrix[row] = [];
      //
      //   matrix[row][column] = item.id;
      //   column++;
      // }
      //
      // return matrix;
    },


  }

}
</script>


<style>
.v-navigable-selection-input {
  background-color: #ddd;
}
</style>
