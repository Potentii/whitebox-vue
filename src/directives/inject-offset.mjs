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


export default class InjectOffset {

    static install(app, options) {
        app.directive('inject-offset', new InjectOffset());
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


        const commonParent = DomUtils.getCommonParent(el, $from);
        if (!commonParent)
            throw new Error(`v-inject-offset: Elements not on the same DOM tree "${el}" and "${$from}"`);

        /**
         * @type {boolean}
         */
        let isActive = true;
        /**
         * @type {?Vector2}
         */
        let lastOffset = null;
        const tickFn = deltaTime => {
            const newOffset = DomUtils.relativePosition(commonParent, document.querySelector('body')).plus(DomUtils.relativePosition($from, commonParent));

            if (!newOffset.equals(lastOffset)) {
                el.style.setProperty('--v-offset-x', newOffset.x + "px");
                el.style.setProperty('--v-offset-y', newOffset.y + "px");
                lastOffset = newOffset;
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