/**
 * @typedef {{ arg: ?string, modifiers: ?object, value: *, oldValue: *, instance: VNode, dir: AbsoluteAnchor }} VueDirectiveBinding
 */
import {DomUtils} from "@potentii/browser-utils";
import {MathUtils} from "@potentii/math-utils";


/**
 *
 * @type {Map<number, { tickId: ?number, active: boolean,  }>}
 */
const dataById = new Map();


export const InjectOffset = {

	// install(app, options) {
	// 	app.directive('inject-offset', this);
	// },

	// // called before bound element's attributes
	// // or event listeners are applied
	// created(el, binding, vnode, prevVnode) {
	// 	// see below for details on arguments
	// }
	//
	// // called right before the element is inserted into the DOM.
	// beforeMount(el, binding, vnode, prevVnode) {
	//
	// }


	/**
	 *
	 * @param {HTMLElement} el
	 */
	updateOffset(el){
		return deltaTime => {
			const $anchor = el._getAnchor();

			if($anchor) {
				const commonParent = DomUtils.getCommonParent(el, $anchor);
				if (!commonParent)
					return;
				// if (!commonParent)
				// 	throw new Error(`v-inject-offset: Elements not on the same DOM tree "${el}" and "${$anchor}"`);


				const newOffset = DomUtils.relativePosition(commonParent, document.querySelector('body')).plus(DomUtils.relativePosition($anchor, commonParent));

				// console.log(newOffset)
				if (!newOffset.equals(el._lastOffset)) {
					el.style.setProperty('--v-offset-x', newOffset.x + "px");
					el.style.setProperty('--v-offset-y', newOffset.y + "px");
					el._lastOffset = newOffset;

					// window.requestAnimationFrame(InjectOffset.updateOffset(el));
				}
			}

			if (el._isActive)
				window.requestAnimationFrame(InjectOffset.updateOffset(el));
		}
	},





	// called when the bound element's parent component
	// and all its children are mounted.
	/**
	 *
	 * @param {HTMLElement} el
	 * @param {?VueDirectiveBinding} binding
	 * @param {VNode} vnode
	 * @param {VNode} prevVnode
	 */
	mounted(el, binding, vnode, prevVnode) {

		el._getAnchor = binding.value.getAnchor;
		el._isActive = true;
		el._lastOffset = null;

		window.requestAnimationFrame(InjectOffset.updateOffset(el));
	},


	// // called before the parent component is updated
	// beforeUpdate(el, binding, vnode, prevVnode) {
	//
	// }

	// called after the parent component and
	// all of its children have updated
	updated(el, binding, vnode, prevVnode) {
		// window.requestAnimationFrame(InjectOffset.updateOffset(el));
		// console.log('aaaa')
		// InjectOffset.updateOffset(el)();
		// console.log(el)
	},

	// called before the parent component is unmounted
	beforeUnmount(el, binding, vnode, prevVnode) {

	},

	// called when the parent component is unmounted
	unmounted(el, binding, vnode, prevVnode) {

	},

};
