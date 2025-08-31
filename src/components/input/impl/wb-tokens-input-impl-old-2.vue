<template>
	<div
		class="wb-tokens-input-impl-old-2"
		contenteditable="true"
		@input="onInput($event)">

		<template v-for="(token, i) in tokens">
			{{token}}
		</template>

<!--		<template v-for="(token, i) in tokens">-->

<!--			<input-->
<!--				class="-fake-input"-->
<!--				tabindex="-1"-->
<!--				:data-fake-input-index="i"-->
<!--				@input="fakeInput_onInput($event)"-->
<!--				@keydown="fakeInput_onKeydown($event)"-->
<!--				@keyup="fakeInput_onKeyup($event)"-->
<!--				@focus="fakeInput_onFocus($event)"-->
<!--				@blur="fakeInput_onBlur($event)"-->
<!--				type="text"/>-->

<!--			<span class="-token" :class="tokenSlotClass" :data-token-index="i">-->
<!--				<slot name="token" :token="token"></slot>-->
<!--				<template v-if="!$slots.token">{{ token }}</template>-->
<!--			</span>-->

<!--		</template>-->

<!--		<input-->
<!--			class="-fake-input &#45;&#45;last"-->
<!--			tabindex="-1"-->
<!--			:data-fake-input-index="tokens?.length || 0"-->
<!--			@input="fakeInput_onInput($event)"-->
<!--			@keydown="fakeInput_onKeydown($event)"-->
<!--			@keyup="fakeInput_onKeyup($event)"-->
<!--			@focus="fakeInput_onFocus($event)"-->
<!--			@blur="fakeInput_onBlur($event)"-->
<!--			ref="lastFakeInput"-->
<!--			type="text"-->
<!--			:placeholder="!tokens?.length ? placeholder : undefined"/>-->

	</div>
</template>


<script>

import {ProbeUtils} from "@potentii/browser-utils";

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

	name: 'wb-tokens-input-impl-old-2',


	props: {
		/**
		 * @type {?string}
		 */
		tokenSlotClass: {
			type: String,
			required: false
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
		 * @type {boolean}
		 */
		required: {
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
		 * @type {?(*[])}
		 */
		modelValue: {
			type: Array,
			required: false
		},

	},


	data() {
		return {
			/**
			 * @type {?number}
			 */
			lastFocusedFakeInputIndex: null,
		};
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
		'input',
		'keydown',
		'keyup',
	],


	methods: {

		getParentWbInput(){
			return this.$parent;
		},

		getMainInput() {
			return this.$refs.lastFakeInput;
		},


		/**
		 *
		 * @param {WbDatalistSelectedEvent} e
		 */
		onSelectedFromDatalist(e) {
			let newTokenIndex = this.lastFocusedFakeInputIndex === null || this.lastFocusedFakeInputIndex === undefined
				? this.tokens.length
				: this.lastFocusedFakeInputIndex;

			console.log('newTokenIndex', newTokenIndex);

			let fakeInput = this.$el.querySelector(`.-fake-input[data-fake-input-index="${newTokenIndex}"]`);
			if (fakeInput) {
				fakeInput.value = '';
				this.updateFakeInputSize(fakeInput);
			}

			// *Adding the selected suggestion on the input as a new token:
			if (!this.tokens) {
				this.tokens = [e.value]
			} else {
				this.tokens.splice(newTokenIndex, 0, e.value);
			}


			setTimeout(() => {
				let nextFakeInput = this.$el.querySelector(`.-fake-input[data-fake-input-index="${newTokenIndex + 1}"]`);
				if (nextFakeInput) {
					// nextFakeInput.value = '';
					// nextFakeInput.focus();
					this.focusAndSetCaretOnInput(nextFakeInput, 'start');
				}
			}, 0);

		},


		clear() {
			this.tokens = [];
		},


		/**
		 *
		 * @param {InputEvent} e
		 */
		onInput(e){
			// e.preventDefault();

			if(!this.tokens)
				this.tokens = [];

			const selection = document.getSelection();
			const newCaretPosition = selection.focusOffset;
			// console.log(newCaretPosition)

			const nodes = [...e.target.childNodes];

			const texts = nodes
				.filter(node => node.nodeName === '#text' && node.data?.trim())
				.map(node => node.data?.trim());

			const tokens = texts.join('').split(' ');
			console.log(tokens)

			this.tokens = tokens;
			// console.dir(e.target.childNodes)
			// e.data

			// this.tokens = e.target.nodes;
		},




		/**
		 * @param {InputEvent} e
		 */
		fakeInput_onInput(e) {
			this.$emit('input', e);
			this.updateFakeInputSize(e.target);
		},

		/**
		 *
		 * @param {HTMLInputElement} fakeInput
		 */
		updateFakeInputSize(fakeInput){
			const textRect = ProbeUtils.probeInputValueRect(fakeInput);
			const newInputSize = Math.ceil(textRect.widthAbs) + 2 + 'px';
			fakeInput.style.setProperty('--var-width', newInputSize);
		},


		/**
		 * @param {KeyboardEvent} e
		 */
		fakeInput_onKeydown(e) {
			this.$emit('keydown', e);

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
				// case 'ArrowUp': {
				// 	e.preventDefault();
				// 	break;
				// }
				// case 'ArrowDown': {
				// 	e.preventDefault();
				// 	this.tryShowSuggestionPanelForFakeInput(e.target, false, true);
				// 	break;
				// }
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
		 * @param {KeyboardEvent} e
		 */
		fakeInput_onKeyup(e) {
			this.$emit('keyup', e);
		},

		/**
		 * @param {FocusEvent} e
		 */
		fakeInput_onFocus(e) {
			setTimeout(() => {
				this.lastFocusedFakeInputIndex = Number(e.target.dataset.fakeInputIndex);
				console.log('focus-index', this.lastFocusedFakeInputIndex)
			}, 0)
			// console.log(e.target.dataset)

		},

		/**
		 * @param {FocusEvent} e
		 */
		fakeInput_onBlur(e) {
			// this.lastFocusedFakeInputIndex = null;
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


		// /**
		//  * @param {FocusEvent} e
		//  */
		// onFocusOut(e) {
		// 	if (this.$refs.$suggestionsSelection?.$el && e.relatedTarget != this.$refs.$suggestionsSelection.$el)
		// 		this.$nextTick(() => {
		// 			this.suggestionsControl.closeSuggestionsPanel();
		// 		});
		// },

		// /**
		//  * @param {FocusEvent} e
		//  */
		// fakeInput_onFocusOut(e) {
		// 	if (this.$refs.$suggestionsSelection?.$el && e.relatedTarget != this.$refs.$suggestionsSelection.$el && (!e.relatedTarget || !DomUtils.getParentUsingPredicate(e.relatedTarget, $el => $el == this.$refs.$suggestionsSelection)))
		// 		this.$nextTick(() => {
		// 			this.suggestionsControl.closeSuggestionsPanel();
		// 		});
		// },


		// /**
		//  *
		//  * @param {HTMLInputElement} fakeInputEl
		//  * @param {boolean} refreshSuggestions
		//  * @param {boolean} focusOnFirstSuggestion
		//  * @return {Promise<void>}
		//  */
		// async tryShowSuggestionPanelForFakeInput(fakeInputEl, refreshSuggestions, focusOnFirstSuggestion) {
		// 	try {
		// 		if (!this.suggestionsEnabled) {
		// 			this.suggestionsControl.closeSuggestionsPanel();
		// 			return;
		// 		}
		//
		// 		const text = fakeInputEl.value;
		//
		// 		if (typeof (this.onValidateTextForSuggestions) == 'function' && !this.onValidateTextForSuggestions(text)) {
		// 			this.suggestionsControl.closeSuggestionsPanel();
		// 			return;
		// 		}
		//
		// 		const fakeInputIndex = Number(fakeInputEl.dataset.fakeInputIndex);
		//
		// 		this.suggestionsControl.isLoading = false;
		// 		this.suggestionsControl.showPanel = true;
		// 		this.suggestionsControl.triggeredByFakeInputIndex = fakeInputIndex;
		//
		// 		if (refreshSuggestions && typeof (this.onSuggestionsRequired) == 'function') {
		// 			this.suggestionsControl.isLoading = true;
		// 			const suggestions = await this.onSuggestionsRequired(new WbSuggestionsRequiredEvent(text));
		// 			this.suggestionsControl.suggestions = suggestions || [];
		// 		}
		//
		// 		if (this.suggestionsControl.suggestions.length && focusOnFirstSuggestion)
		// 			this.$refs.$suggestionsSelection.focus();
		//
		// 	} catch (err) {
		// 		console.error(`ERR SHOWING SUGGESTIONS: `, err);
		// 		//TODO set error on suggestions panel summary
		// 	} finally {
		// 		this.suggestionsControl.isLoading = false;
		// 	}
		// },


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
.wb-tokens-input-impl-old-2 {
	flex: 1 1 auto;

	display: flex;
	flex-direction: row;
	align-items: center;

	flex-wrap: wrap;

	/*column-gap: 0.2em;*/
	row-gap: 0.5em;


}

.wb-tokens-input-impl-old-2 > .-fake-input {
	flex: 0 0 auto;

	font-size: 1em;
	width: var(--var-width, 1px);
	min-width: 1px;
	outline: none;
	border: none;
}
.wb-tokens-input-impl-old-2 > .-fake-input{

}

.wb-tokens-input-impl-old-2 > .-fake-input.--last {
	flex: 1 1 auto;
}

.wb-tokens-input-impl-old-2 > .-token {
	user-select: none;
	/*display: inline-block;*/
	display: flex;
	flex-direction: row;
	align-items: center;
	/*padding: 0.2em 0.7em;*/
	/*background-color: #aaa;*/
	/*border-radius: 5em;*/
}

.wb-tokens-input-impl-old-2 > .-token + .-token {
	/*margin-left: 0.2em;*/
}

</style>
