/**
 * @typedef {{ arg: ?string, modifiers: ?object, value: *, oldValue: *, instance: VNode, dir: AbsoluteAnchor }} VueDirectiveBinding
 */
import {MathUtils} from "@potentii/math-utils";
import {Vector2} from "@potentii/geometry-utils";


/**
 *
 * @type {Map<number, { tickId: ?number, active: boolean,  }>}
 */
const dataById = new Map();


export const InjectSize = {


	// install(app, options) {
	// 	app.directive('inject-size', this);
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
	 * @return {(function(*))|*}
	 */
	updateSize(el){
		return deltaTime => {
			const refEl = el._getEl();

			if (refEl) {
				const newSize = new Vector2(refEl.offsetWidth, refEl.offsetHeight);

				if (!newSize.equals(el._lastSize)) {
					el.style.setProperty('--v-size-width', newSize.x + "px");
					el.style.setProperty('--v-size-height', newSize.y + "px");
					el._lastSize = newSize;
					// window.requestAnimationFrame(InjectSize.updateSize(el));
				}
			}

			if (el._isActive)
				window.requestAnimationFrame(InjectSize.updateSize(el));
		};
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
		el._getEl = binding.value.getEl;
		el._isActive = true;
		el._lastSize = null;

		window.requestAnimationFrame(InjectSize.updateSize(el));
	},


	// // called before the parent component is updated
	// beforeUpdate(el, binding, vnode, prevVnode) {
	//
	// }

	// called after the parent component and
	// all of its children have updated
	updated(el, binding, vnode, prevVnode) {

	},

	// called before the parent component is unmounted
	beforeUnmount(el, binding, vnode, prevVnode) {

	},

	// called when the parent component is unmounted
	unmounted(el, binding, vnode, prevVnode) {

	},

};

