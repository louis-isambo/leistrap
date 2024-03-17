
import { generateId } from "../../deps/rand.js";
import { leis, tableOpera, leisBtns } from "../browser/leis.js"
import { obj } from "../../deps/PrimaryArray.js";
import { leisDOM } from "../browser/leisDom.js"
import { leistrap } from "./leisWidget.js";
import { Content } from "../commands/cmcnt.js";
import { RAttr, RBtn, RGlobalProps, RImg, RLbl, RTxt } from "../commands/render.js";
import { resizeElem } from "../components/slider.js";
import { leisCard } from "../components/card.js";
import { ExtensionInit, ExtensionRender, exeHook, useState } from "./global.js";

ExtensionInit

const BaseElement = (function () {

    const __spc__ = 32;
    const __none__ = "";
    const hidden = "none";
    const shown = "block";
    class LeisWidget {
        #propsWait = []
        #init;
        constructor({

            parent = typeof module === "object" ? new String : BaseElement,
            text = new String() || undefined,
            type = new String(),
            content = [],
            eventType = new String,
            eventOnce = function Callback(Object) { },
            attr =
            {
                id: undefined,
                className: [],
                name: undefined
            },
            otherAttr = {},
            addData = {},
            events = {},
            innerHtml,
            autoClick,
            tooltip,
            linkName,
            index,

        }) {
            ExtensionInit.forEach(item => item(this))
            const { ...preState } = this
            /**
             * event type. choose the type of event to listen, you can also
             * choose the eventType by retruning the type of event in the eventOnce callback
             * @type string
             * @example
             * 
             * const btn = leistrap.Button({
             *  // you can directly choose the event type via eventType property
             * 
             * eventType : "click" // listen the click event
             * 
             * // or in the callback (function) you can return the event type
             * 
             * eventOnce :function MyCallback(){
             *      //code goes here .....
             *      return this.eventtype = "click"  
             * }
             * })
             */

            this.eventType = eventType

            /**
             * add a callback function to handle the event
             * @property eventOnce 
             */
            this.eventOnce = eventOnce
            /**
             * parent
             * 
             */
            this.parent = parent;

            this.ElementType = ""
            this.state = "active"
            /**
             * text to be displayed in the content
             */
            this.text = text;
            /**
             * type of the button -- this type uses `leistrap.css` color buttons class
             * @type string
             * @example
             * const btn1 = leistrap.Button({
             *  type : "primary"  // for the primary color
             * })
             * 
             * const btn2 = leistrap.Button({
             *  type : "secondary" // for the secondary color
             * })
             */
            this.type = type;
            /**
             * content to be inside the element
             * @type Content 
             * */
            this.content = new Content(this, ...content);
            this.index = index
            /**
             * Html attributes
             * @type object
             */
            this.attr = attr;
            /**
             * lblFor property works only in Label widget
             */
            this.lblFor = ""

            /**
             * this property works only in 
             * leistrap Input widgets
             * @type string
             */
            this.value = ""
            /**
             * href property works only in links widgets
             * @type string
             */
            this.href = ""
            /**
             * add other attribute into the widget
             */
            this.otherAttr = otherAttr

            /**
             * add some data to the widget 
             */
            this.addData = addData
            Object.defineProperty(this, "e", { value: {} })
            /**
             * the events to be executed after rending the widget
             */
            this.wEnvent = {
                addEvents: []
            }
            this.linkName = linkName
            /**
             * add events to elements
             */
            this.events = events;

            // set innerHtml to the element
            leis.addPW(innerHtml, this, () => {
                leis.setInnerHtml(this, innerHtml)
            }, this.#propsWait)

            // set autoClick to the element
            leis.addPW(autoClick, this, () => {
                setTimeout(() => { this.getAttr('click') }, 10)
            }, this.#propsWait)

            // set tooltip component to the element
            leis.addPW(tooltip, this, () => {
                this.add(leis.setTooltip(leistrap, tooltip.text, tooltip.postion))
            }, this.#propsWait)

            // check if attr className is an array or not
            if (typeof this.attr.className === "object") {
                try { this.attr.className = this.attr.className.join(String.fromCharCode(__spc__)) }
                catch (error) { throw new Error(`can not read type of ${typeof this.attr.className}`) }
            }

            // check the element parent if it's a BaseElement type
            // and the current element to the parent Content list
            if (typeof this.parent !== "undefined") {
                if (typeof this.parent.content !== "undefined") {
                    this.point ? this.parent.content.push(this.point) :
                        this.parent.content.push(this)
                }
                leis.setLeisCardContent(this, this, leisCard)
            }

            // useState
            useState.forEach(hook => hook(preState, this))
            // testing init method

            if (this.#init) { this.#init() }
        }

        /**
         * add an element
         * @param {BaseElement} element the element to be added 
         */
        add(element) {
            const { ...prevState } = this
            leis.append(this, element, () => { this.add(element) },
                this.#propsWait
            )
            exeHook(prevState, this, obj, useState, {
                method: "add",
                param: [element]
            })
        }
        addBefore(existEleme, newElem) {
            const { ...prevState } = this
            leis.append(this, newElem, () => { this.add(newElem) },
                this.#propsWait, existEleme
            )
            exeHook(prevState, this, obj, useState, {
                method: "addBefore",
                param: [newElem]
            })
        }
        /**
         * add one or more element
         * @param  {...BaseElement} elements elements to be added
         */
        addElements(...elements) {
            const { ...prevState } = this
            leis.appendElement(this, ...elements)
            exeHook(prevState, this, obj, useState, {
                method: "&ddElements",
                param: elements
            })
        }

        /** 
         * @param {string} prop the css `property name `
         * @param {string} value  value to be updated 
         */
        setStyleProp(prop, value) {
            const { ...prevState } = this
            if (leis.hasConf(this)) {
                leis.setStyleProp(this, prop, value);
                exeHook(prevState, this, obj, useState, {
                    method: "setStyleProp",
                    param: [prop, value]
                })
            }
            else {
                leis.addPW(prop, this, () => {
                    this.setStyleProp(prop, value)
                }, this.#propsWait)
            }
        }

        getScreen(option) {
            const { ...prevState } = this
            leis.getScreen(this, option, () => {
                this.getScreen(option)
            }, this.#propsWait)
            exeHook(prevState, this, obj, useState, {
                method: "getScreen",
                param: [option]
            })
        }
        getPropWait() { return this.#propsWait }

        /**
         * remove all content and sets the widget to `Empty` value 
         */
        removeAll() {

            if (leis.hasConf(this)) {
                const { ...prevState } = this
                leis.destroyAll(this)
                exeHook(prevState, this, obj, useState, {
                    method: "removeAll",
                    param: []
                })
            };
            leis.removeAllContent(this)
        }

        /**
         * removes attribute
         * @param {string} name attribute name 
         */
        removeAttr(name) {
            const { ...prevState } = this
            leis.removeAttr(this, name, () => {
                this.removeAttr(name)
            }, this.#propsWait)
            exeHook(prevState, this, obj, useState, {
                method: "removeAttr",
                param: [name]
            })
        }

        /**
         * remove event
         * @param {EventType} type event to be removed 
         * @param {Function} callback  `callback` |
         *  `Listener` associated with this event 
         * @param {*} option option
         */
        removeEvent(type, name, option) {
            const { ...preState } = this
            let locked = false
            if (this.e[type]) {

                if (name !== "*" && !locked) {
                    leis.removeEvent(
                        this,
                        type,
                        this.e[type][name],
                        option,
                        () => {
                            obj.after(200, () => {
                                this.removeEvent(type, callback, option)
                            })
                        },
                        this.#propsWait)
                }
                if (name === "*" && !locked) {
                    locked = true
                    obj.loopObj(this.e[type], (v, k, i, f) => {
                        this.removeEvent(type, k)
                        if (f) { locked = false; }
                    })
                }
                exeHook(preState, this, obj, useState, {
                    method: "removeEvent",
                    param: [type, name, option]
                })
            }
            else { console.log(`${type} event not found`); }
        }

        getRemovedElement() { return leis.getRemovedElement(this) }

    }

    // deifintion of all widgets

    /**
     * leistrap BaseElement definition
     * 
     */
    class BaseElement extends LeisWidget {
        destroy() {
            const { ...preState } = this
            leis.destroyElement(this, () => {
                obj.after(200, () => { this.destroy() })
            }, this.getPropWait())
            exeHook(preState, this, obj, useState, {
                method: "destroy",
                param: []
            })
        }

        /**
         * @param {string} value text to update
         */
        setText(value) {
            const { ...preState } = this
            leis.setInnerText(this, value, "text", () => {
                this.setText(value)
            }, this.getPropWait())
            exeHook(preState, this, obj, useState, {
                method: "setText",
                param: [value]
            })
        }

        getText() { return this.text || this._conf.innerText }

        /**
         * @param {BaseElement} element the element to be removed 
         */
        remove(element) {
            const { ...preState } = this
            leis.removeElement(this, element, BaseElement, () => {
                this.remove(element)
            }, this.getPropWait())
            exeHook(preState, this, obj, useState, {
                method: "remove",
                parm: [element]
            })
        }

        /**
         * @param {string} newClass the new className 
         */
        setClassName(newClass) {
            const { ...preState } = this
            leis.setClassName(this, newClass, () => {
                this.setClassName(newClass)
            }, this.getPropWait());
            exeHook(preState, this, obj, useState,
                { method: "setClassName", parm: [newClass] })
        }

        /**
         * @param {string} css the style 
         */
        hide(css) {
            const { ...preState } = this
            leis.hideElement(this, css, () => {
                this.hide(css)
            }, this.getPropWait(), hidden)
            exeHook(preState, this, obj, useState)
        }

        /**
         * @param {string} css the style 
         */
        show(css) {
            const { ...preState } = this
            leis.hideElement(this, css, () => {
                this.hide(css)
            }, this.getPropWait(), shown)
            exeHook(preState, this, obj, useState, "show")
        }

        /** 
         * @param {string} cssValues the style 
         */
        setStyle(cssValues) {
            const { ...preState } = this
            leis.setElementStyle(this, cssValues, () => {
                this.setStyle(cssValues)
            }, this.getPropWait())
            exeHook(preState, this, obj, useState, "setStyle")
        }

        /**
         * @param {string} name attribute name
         * @param {string} value value to set  
         */
        addAttr(name, value) {
            const { ...preState } = this
            leis.setElementAttr(this, { name, value }, () => {
                this.addAttr(name, value)
            }, this.getPropWait())
            exeHook(preState, this, obj, useState, "addAttr")
        }

        /**
         * @param {EventType} eventType type of the event
         * @param {Function} callback  the function to be executed when the event trigged
         */
        addEvent(eventType, callback, name, option) {
            const { ...preState } = this
            let c = 0
            if (leis.hasConf(this) && typeof callback === "function") {
                const _RD = callback
                function e(target) {
                    _RD.call(this.currentElement, target);
                    exeHook(preState, this, obj, useState, { name, method: "addEvent", eventType, })

                }
                leis.addElementEvent(this, eventType, e, option)
                if (!this.e[eventType]) { this.e[eventType] = {} }
                if (obj.isEmpty(callback.name)) { c++ }
                name ? this.e[eventType][name] = e : obj.isEmpty(callback.name) ?
                    this.e[eventType][`LocalFunction${c}`] = e :
                    this.e[eventType][callback.name] = e
            }
            else {
                if (typeof callback === "function") {
                    this.wEnvent.addEvents.push({ eventType, callback, name, option })
                }
            }
        }

        /** 
         * return any properties , methods of the element
         * @param {string} name  
         */
        getAttr(name) {
            if (leis.hasConf(this)) {
                return typeof this._conf[name] === "function" ?
                    this._conf[name]() : this._conf[name]
                    || leisDOM.getElemAttr(this._conf, name)
            }
            else {
                leis.addPW(true, this, () => {
                    this.getAttr(name)
                }, this.getPropWait())
            }
        }

        getRect() {
            const { ...preState } = this
            return leis.getRect(this, () => {
                this.getRect()
            }, this.getPropWait())
            exeHook(preState, this, obj, useState, "getRect")
        }

        /**
         * @param {string} name the class mane 
         */
        toggleClass(token) {
            leis.toggleElementClass(this, token, () => {
                this.toggleClass(token)
            }, this.getPropWait())
        }

        CASCADE() {
            this.content.forEach(item => {
                if ((item.parent === this ||
                    item.parent == BaseElement)
                    && item.state !== "removed") {
                    try {
                        this._conf.append(item.render())
                        item.parent = this._conf
                        item.lsParent = this
                    } catch (error) { }
                }
            })
        }

        /** 
         * @param {string} name 
         */
        removeClass(name) {
            const { ...preState } = this
            leis.removeElementClass(this, name, () => {
                this.removeClass(name)
            }, this.getPropWait())
            exeHook(preState, this, obj, useState, "removeClass")
        }

        /**
         * @param {string} name 
         */
        addClass(name) {
            const { ...preState } = this
            leis.addElementClass(this, name, () => {
                this.addClass(name)
            }, this.getPropWait());
            exeHook(preState, this, obj, useState, "addClass")
        }

        /**
         * define a keymap | shortcut
         */
        bind(key, callback, name) {
            if (leistrap.extension.keymap);
            leistrap.extension.keymap.Bind(this, key, callback, name);
        }
        render() {
            if (typeof module === "object") {

                //node code
                return "render Method from leistrap"
            }
            else {
                // browser

                const __btn = leis.setElement(this.ElementType)
                // check className, id , name
                RAttr(this.attr, __btn)
                // check button type and set the button color type and then if
                // the type matches the outline we set btnstyle to outline 
                RBtn(this.type, this.ElementType === "button", __btn);

                // set text content to element
                RTxt(this.text, __btn);

                // check Label for attribute to element
                RLbl(this.ElementType === "label", this.lblFor, __btn)

                // set img src and alt message
                RImg(this.ElementType === "img", __btn, this.src, this.alt)

                // set global propertis
                RGlobalProps(this, __btn);

                // fill the event listener to the element
                if (typeof this.eventOnce === "function") {
                    const o = typeof this.eventType !== "undefined" ? this.eventType !== "" ?
                        this.eventType : "$err" : undefined
                    if (o === "$err") { throw new Error("can not listen to event of null") }
                    else {
                        !this.e[o] ? this.e[o] = {} : undefined
                        this.eventOnce.prototype.name ?
                            this.e[o][this.eventOnce.prototype.name] = this.eventOnce :
                            this.e[o][this.eventOnce.name] = this.eventOnce
                        __btn.addEventListener(o, this.eventOnce)
                    }
                }

                __btn.leisConf = generateId(10, 20)
                leis.setConf(this, __btn)
                this.leisBtnConfId = generateId(12, 20)
                __btn.currentElement = this

                if (typeof this.content !== "undefined") {
                    if (typeof this.content.push === "function") {
                        this.content.forEach(item => {
                            if (item.point) {
                                obj.tryCode(() => { this._conf.append(item.point.render()) })
                                item.point.parent = this._conf
                                item.point.lsParent = this

                            } else {
                                obj.tryCode(() => { this._conf.append(item.render()) })
                                item.parent = this._conf
                                item.lsParent = this
                            }
                            // if (obj.isTypeOf(item, leisCard)) { item.element.parent = this._conf; item.element.lsParent = this }
                        })
                    }
                }

                if (typeof this.otherAttr !== "undefined" && typeof this.otherAttr === "object") {
                    const k = Object.keys(this.otherAttr)
                    k.forEach(option => this._conf.setAttribute(String(option), String(this.otherAttr[option])))
                }
                if (this.wEnvent.addEvents.length > 0) {
                    this.wEnvent.addEvents.forEach(ev => this.addEvent(ev.eventType, ev.callback, ev.name, ev.option))
                }
                // add events object 
                leis.dollarEvent(this)
                // verify the propwait
                this.getPropWait().length > 0 ? this.getPropWait().forEach(i => i()) : undefined;
                obj.setEmptyArray(this.getPropWait())
                ExtensionRender.forEach(item => item(this));
                return __btn
            }
        }
    }
    return BaseElement
})()



export { BaseElement }