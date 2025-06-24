/**
 * @typedef {{ arg: ?string, modifiers: ?object, value: *, oldValue: *, instance: VNode, dir: AbsoluteAnchor }} VueDirectiveBinding
 */
import {Vector2} from "@potentii/geometry-utils";
import {DomUtils} from "@potentii/browser-utils";

export default class AbsoluteAnchor {

    static install(app, options) {
        app.directive('absolute-anchor', new AbsoluteAnchor());
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
        const $to = binding.value.$to;
        if (!$to)
            return;
        const $parent = binding.value.$parent;
        if (!$parent)
            return;


        const update = !!binding.value.update;

        const commonParent = AbsoluteAnchor.getCommonParent(el, $to);





        // console.log('par', el.parentElement)

        const offset = new Vector2($to.offsetLeft || 0, ($to.offsetTop + $to.offsetHeight) || 0);
        const width = $to.offsetWidth || 0;
        // console.log('aaa')
        el.style.position = 'absolute';
        el.style.left = offset.x + 'px';
        el.style.top = offset.y + 'px';
        el.style.width = width + 'px';

    }


    /**
     *
     * @param {HTMLElement} el
     * @param {boolean} [skipFirst]
     * @return {Set<HTMLElement>}
     */
    static getBackwardsLineageSet(el, skipFirst = false){
        const lineageSet = new Set();
        let currEl = skipFirst ? el?.parentElement : el;
        if(!currEl)
            return lineageSet;
        do{
            lineageSet.add(currEl);
        } while (!!(currEl = currEl.parentElement));

        return lineageSet;
    }


    /**
     *
     * @param {HTMLElement} el1
     * @param {HTMLElement} el2
     * @return {?HTMLElement}
     */
    static getCommonParent(el1, el2){
        if(!el1 || !el2)
            return null;
        if(!el1 == !el2)
            return el1.parentElement;
        if(el1 == el2.parentElement)
            return el1;
        if(el2 == el1.parentElement)
            return el2;

        const el1Parents = AbsoluteAnchor.getBackwardsLineageSet(el1, false);
        return DomUtils.getParentUsingPredicate(el2, el2Parent => el1Parents.has(el2Parent), false);
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