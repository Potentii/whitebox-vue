<template>
	<div
		class="wb-tokens-input"
		@focusout="onFocusOut"
		@keydown="onkeydown">


		<template v-for="(token, i) in tokens">

			<input
				class="-fake-input"
				tabindex="-1"
				:data-fake-input-index="i"
				@focusout="fakeInput_onFocusOut"
				@input="fakeInput_onInput"
				@keydown="fakeInput_onKeydown"
				@click="fakeInput_onClick"
				type="text"/>

			<span class="-token" :data-id="token.id" :data-token-index="i">
				<slot name="token" :token="token"></slot>
			</span>

		</template>

		<input
			class="-fake-input --last"
			tabindex="-1"
			:data-fake-input-index="tokens?.length || 0"
			@focusout="fakeInput_onFocusOut"
			@input="fakeInput_onInput"
			@keydown="fakeInput_onKeydown"
			@click="fakeInput_onClick"
			ref="lastFakeInput"
			type="text"
			:placeholder="placeholder"/>

	</div>
</template>


<script>
import VNavigableSelectionItem from "./v-navigable-selection-item.vue";
import VNavigableSelectionGroup from "./v-navigable-selection-group.vue";
import VNavigableSelectionInput from "./v-navigable-selection-input.vue";
import Selection from "./selection.mjs";
import WbSuggestionsRequiredEvent from "./wb-suggestions-required-event.mjs";
import {DomUtils, ProbeUtils} from "@potentii/browser-utils";


/**
 *
 *
 * Suportar:
 * - Digitar ao final da caixa, e também entre os itens
 *
 * - Navegação com cursor (setas direcionais quando focado):
 *   - Navegar com o cursor entre os itens
 *   - Se segurar shift+setas: vai selecionando/des-selecionando os itens que passar
 *   - Se segurar shift+end/home: seleciona tudo até o fim/começo do campo
 *
 *
 *
 *
 *
 *
 *
 */
export default {

	name: 'wb-tokens-input',


	components: {VNavigableSelectionInput, VNavigableSelectionGroup, VNavigableSelectionItem},


	props: {

		/**
		 * @type {string}
		 */
		popupParent: {
			type: String,
			required: false,
			default: 'body',
		},

		/**
		 * @type {string}
		 */
		popupClass: {
			type: String,
			required: false,
		},

		// TODO
		/**
		 * @type {boolean}
		 */
		disabled: {
			type: Boolean,
			required: false,
			default: false
		},

		// TODO
		/**
		 * @type {?string}
		 */
		placeholder: {
			type: String,
			required: false
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
		 * @type {boolean}
		 */
		autoclear: {
			type: Boolean,
			required: false,
			default: false,
		},

		/**
		 * @type {boolean}
		 */
		suggestionsEnabled: {
			type: Boolean,
			required: false,
			default: false,
		},

		/**
		 * @type {?((text: string) => boolean)}
		 */
		onValidateTextForSuggestions: {
			type: Function,
			required: false,
		},

		/**
		 * @type {?((text: string) => (Suggestion[]|Promise<Suggestion[]>))}
		 */
		onSuggestionsRequired: {
			type: Function,
			required: false,
		},

		/**
		 * @type {number}
		 */
		suggestionsRequiredDelay: {
			type: Number,
			required: false,
			default: 0,
		},

		/**
		 * @type {WbToken[]}
		 */
		modelValue: {
			type: Array,
			required: false
		},

		/**
		 * @type {(text:string) => shouldCommit:boolean}
		 */
		onCommit: {
			type: Function,
			required: false,
		},

	},


	data() {
		return {

			suggestionsControl: {
				showPanel: false,
				isLoading: false,
				isUserNavigatingOnSuggestions: false,
				/**
				 * @type {Suggestion[]}
				 */
				suggestions: [],
				/**
				 * @deprecated
				 * @type {?string}
				 */
				suggestionsQueryText: undefined,

				/**
				 * @type {?number}
				 */
				triggeredByFakeInputIndex: undefined,

				/**
				 * @type {Selection}
				 */
				selection: new Selection([], []),

				closeSuggestionsPanel() {
					this.isUserNavigatingOnSuggestions = false;
					this.isLoading = false;
					this.showPanel = false;
					this.triggeredByFakeInputIndex = undefined;
					this.selection.highlightedIds = [];
					this.selection.selectedIds = [];
				}
			},
		}
	},


	computed: {
		/**
		 * @returns {WbToken[]}
		 */
		tokens: {
			get() {
				return this.modelValue;
			},
			set(value) {
				this.$emit('update:modelValue', value);
			}
		},

	},


	emits: [
		'update:modelValue',
		'suggestionChosen'
	],


	mounted() {
		if (this.autofocus)
			this.focus();
		if (this.autoclear)
			this.clear();
	},


	methods: {

		focus() {
			if(this.$refs.lastFakeInput){
				this.$refs.lastFakeInput.focus();
			} else {
				this.$el?.focus();
			}
		},

		blur() {
			this.$el?.blur();
		},

		clear() {
			this.tokens = [];
		},


		/**
		 * @param {InputEvent} e
		 */
		fakeInput_onInput(e) {
			const textRect = ProbeUtils.probeInputValueRect(e.target);
			const newInputSize = Math.ceil(textRect.widthAbs) + 2 + 'px';
			e.target.style.setProperty('--var-width', newInputSize);

			this.tryShowSuggestionPanelForFakeInput(e.target, true, false);
		},

		/**
		 * @param {MouseEvent} e
		 */
		fakeInput_onClick(e) {
			this.tryShowSuggestionPanelForFakeInput(e.target, false, false);
		},

		/**
		 * @param {KeyboardEvent} e
		 */
		fakeInput_onKeydown(e) {

			// console.log(e.key)
			switch (e.key) {
				case 'Backspace': {
					if (e.target.selectionStart === 0 && e.target.selectionEnd === 0) {
						// *If the user is pressing 'backspace' on the start of a fake input:
						const fakeInputIndex = Number(e.target.dataset.fakeInputIndex);
						if (fakeInputIndex > 0 && this.tokens.length) {
							// *If this fake input has a previous token:

							const textOnCurrFakeInput = e.target.value;
							const textOnPrevFakeInput = this.$el.querySelector(`.-fake-input[data-fake-input-index="${fakeInputIndex - 1}"]`)?.value;

							this.tokens.splice(fakeInputIndex - 1, 1);

							setTimeout(() => {
								const targetFakeInput = this.$el.querySelector(`.-fake-input[data-fake-input-index="${fakeInputIndex - 1}"]`);
								if (!targetFakeInput)
									return;

								this.changeInputValue(targetFakeInput, textOnPrevFakeInput + textOnCurrFakeInput);

								this.focusAndSetCaretOnInput(targetFakeInput, textOnPrevFakeInput.length);
							}, 0);
						}
					}
					break;
				}
				case 'Delete': {
					if (e.target.selectionStart === e.target.value?.length && e.target.selectionEnd === e.target.value?.length) {
						// *If the user is pressing 'delete' on the end of a fake input:
						const fakeInputIndex = Number(e.target.dataset.fakeInputIndex);
						if (fakeInputIndex < this.tokens.length) {
							// *If this fake input has a next token:

							const textOnCurrFakeInput = e.target.value;
							const textOnNextFakeInput = this.$el.querySelector(`.-fake-input[data-fake-input-index="${fakeInputIndex + 1}"]`)?.value;

							this.tokens.splice(fakeInputIndex, 1);

							setTimeout(() => {
								const targetFakeInput = this.$el.querySelector(`.-fake-input[data-fake-input-index="${fakeInputIndex}"]`);
								if (!targetFakeInput)
									return;

								this.changeInputValue(targetFakeInput, textOnCurrFakeInput + textOnNextFakeInput);

								this.focusAndSetCaretOnInput(targetFakeInput, textOnCurrFakeInput.length);
							}, 0);
						}
					}
					break;
				}
				case 'Enter': {
					e.preventDefault();
					break;
				}
				case 'ArrowUp': {
					e.preventDefault();
					break;
				}
				case 'ArrowDown': {
					e.preventDefault();
					this.tryShowSuggestionPanelForFakeInput(e.target, false, true);
					break;
				}
				case 'ArrowLeft':
				case 'ArrowRight': {
					const selectionRange = [e.target.selectionStart, e.target.selectionEnd];
					if (selectionRange[0] === selectionRange[1]) {
						// *If just moved caret (without selecting things):
						const movedTo = selectionRange[0];
						const fakeInputIndex = Number(e.target.dataset.fakeInputIndex);
						let indexDelta = 0;
						if (movedTo == 0 && e.key == 'ArrowLeft') {
							// *The user caret is on the left bound and wants to continue:
							indexDelta--;
						} else if (movedTo == e.target.value.length && e.key == 'ArrowRight') {
							// *The user caret is on the right bound and wants to continue:
							indexDelta++;
						}

						// *Returning, if the fake input index shall not change:
						if (indexDelta === 0)
							return;

						// *Getting the target fake input for the movement that the user have performed:
						const targetFakeInput = this.$el.querySelector(`.-fake-input[data-fake-input-index="${fakeInputIndex + indexDelta}"]`);
						if (!targetFakeInput)
							return;

						// *Moving the caret position inside the input accordingly with the movement performed:
						this.focusAndSetCaretOnInput(targetFakeInput, indexDelta === 1 ? 'start' : 'end');

						// // *Focusing on the input:
						// targetFakeInput.focus();
						//
						// // *Moving the caret position inside the input accordingly with the movement performed:
						// const newCaretPosOnTarget = (indexDelta === 1) ? 0 : targetFakeInput.value.length;
						// setTimeout(() => {
						// 	targetFakeInput.setSelectionRange(newCaretPosOnTarget, newCaretPosOnTarget);
						// }, 0);

					} else {
						// *If the user is selecting things:

					}

					break;
				}
			}
		},

		/**
		 *
		 * @param {HTMLInputElement} inputEl
		 * @param {('start'|'end')|number} [caretPosition=start]
		 */
		focusAndSetCaretOnInput(inputEl, caretPosition = 'start') {
			inputEl.focus();

			caretPosition = caretPosition == 'start' ? 0 : caretPosition;
			caretPosition = caretPosition == 'end' ? (inputEl.value?.length || 0) : caretPosition;

			const newCaretPosOnTarget = caretPosition;
			setTimeout(() => {
				inputEl.setSelectionRange(newCaretPosOnTarget, newCaretPosOnTarget);
			}, 0);
		},


		/**
		 * @param {KeyboardEvent} e
		 */
		onkeydown(e) {
			switch (e.key) {
				case 'Enter': {
					e.preventDefault();
					break;
				}
			}
		},


		/**
		 * @param {FocusEvent} e
		 */
		onFocusOut(e) {
			if (this.$refs.$suggestionsSelection?.$el && e.relatedTarget != this.$refs.$suggestionsSelection.$el)
				this.$nextTick(() => {
					this.suggestionsControl.closeSuggestionsPanel();
				});
		},

		/**
		 * @param {FocusEvent} e
		 */
		fakeInput_onFocusOut(e) {
			if (this.$refs.$suggestionsSelection?.$el && e.relatedTarget != this.$refs.$suggestionsSelection.$el && (!e.relatedTarget || !DomUtils.getParentUsingPredicate(e.relatedTarget, $el => $el == this.$refs.$suggestionsSelection)))
				this.$nextTick(() => {
					this.suggestionsControl.closeSuggestionsPanel();
				});
		},


		/**
		 *
		 * @param {HTMLInputElement} fakeInputEl
		 * @param {boolean} refreshSuggestions
		 * @param {boolean} focusOnFirstSuggestion
		 * @return {Promise<void>}
		 */
		async tryShowSuggestionPanelForFakeInput(fakeInputEl, refreshSuggestions, focusOnFirstSuggestion) {
			try {
				if (!this.suggestionsEnabled) {
					this.suggestionsControl.closeSuggestionsPanel();
					return;
				}

				const text = fakeInputEl.value;

				if (typeof (this.onValidateTextForSuggestions) == 'function' && !this.onValidateTextForSuggestions(text)) {
					this.suggestionsControl.closeSuggestionsPanel();
					return;
				}

				const fakeInputIndex = Number(fakeInputEl.dataset.fakeInputIndex);

				this.suggestionsControl.isLoading = false;
				this.suggestionsControl.showPanel = true;
				this.suggestionsControl.triggeredByFakeInputIndex = fakeInputIndex;

				if (refreshSuggestions && typeof (this.onSuggestionsRequired) == 'function') {
					this.suggestionsControl.isLoading = true;
					const suggestions = await this.onSuggestionsRequired(new WbSuggestionsRequiredEvent(text));
					this.suggestionsControl.suggestions = suggestions || [];
				}

				if (this.suggestionsControl.suggestions.length && focusOnFirstSuggestion)
					this.$refs.$suggestionsSelection.focus();

			} catch (err) {
				console.error(`ERR SHOWING SUGGESTIONS: `, err);
				//TODO set error on suggestions panel summary
			} finally {
				this.suggestionsControl.isLoading = false;
			}
		},


		/**
		 *
		 * @param {HTMLInputElement} inputEl
		 * @param {string|number} newValue
		 */
		changeInputValue(inputEl, newValue) {
			inputEl.value = newValue;
			inputEl.dispatchEvent(new Event('input'));
		},


	}

}
</script>


<style>
.wb-tokens-input {
	flex: 1 1 auto;

	display: flex;
	flex-direction: row;
	align-items: center;



}

.wb-tokens-input > .-fake-input {
	flex: 0 0 auto;


	font-size: 1em;
	width: 1ch;
	/*min-width: 1ch;*/
	outline: none;
	border: none;
}

.wb-tokens-input > .-fake-input.--last {
	flex: 1 1 auto;
}

.wb-tokens-input > .-token {
	user-select: none;
	/*display: inline-block;*/
	display: flex;
	flex-direction: row;
	align-items: center;
	/*padding: 0.2em 0.7em;*/
	/*background-color: #aaa;*/
	/*border-radius: 5em;*/
}

.wb-tokens-input > .-token + .-token {
	/*margin-left: 0.2em;*/
}

</style>
