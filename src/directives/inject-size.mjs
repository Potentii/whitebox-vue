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


export default class InjectSize {

    static install(app, options) {
        app.directive('inject-size', new InjectSize());
    }


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
        // console.log(binding)
        /**
         * @type {?HTMLElement}
         */
        const $from = binding.value.$from;
        if (!$from)
            return;

        /**
         * @type {boolean}
         */
        const once = !!binding.value.once;
        /**
         * @type {number}
         */
        const tick = MathUtils.clamp(
            Number.isNaN(Number(binding.value.tick))
                ? 0
                : Number(binding.value.tick),
            0,
            Number.MAX_VALUE
        );

        /**
         * @type {boolean}
         */
        let isActive = true;
        /**
         * @type {?Vector2}
         */
        let lastSize = null;
        const tickFn = deltaTime => {
            const newSize = new Vector2($from.offsetWidth, $from.offsetHeight);

            if (!newSize.equals(lastSize)) {
                el.style.setProperty('--v-size-width', newSize.x + "px");
                el.style.setProperty('--v-size-height', newSize.y + "px");
                lastSize = newSize;
            }

            if (isActive)
                window.requestAnimationFrame(tickFn);
        }

        window.requestAnimationFrame(tickFn);
    }


    // // called before the parent component is updated
    // beforeUpdate(el, binding, vnode, prevVnode) {
    //
    // }

    // called after the parent component and
    // all of its children have updated
    updated(el, binding, vnode, prevVnode) {

    }

    // called before the parent component is unmounted
    beforeUnmount(el, binding, vnode, prevVnode) {

    }

    // called when the parent component is unmounted
    unmounted(el, binding, vnode, prevVnode) {

    }

}