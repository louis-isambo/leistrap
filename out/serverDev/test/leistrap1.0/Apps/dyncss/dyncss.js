import { leistrap } from "../../leistrap.js";

export function DynCss() {

    leistrap.defineExtension("DynCss", function (setting, ls, { ExtensionRender,
        OptionsInit, obj, useState, BaseElement, leis }) {
        ls.dynList = []
        var AltStyle = {};
        // the set method is used to set the StyleOption as interface 
        ls.set = o => o;
        ls.defineDynCss = o => o;
        // add a hook to verify if  the element's state is changed 
        useState.push(function (prev, current, o) {
            if (o) {
                if (o.method === "addEvent") {
                    ls.dynList.forEach((item, index) => {
                        Dyn(item)
                    })
                }
            }

        })

        //check if the style property is set when the constructor  is  called 
        OptionsInit.push(function (option, element) {
            if (option.style) element.style = option.style;
        })
        // inject the Dynamic style to check and execute the styleObject
        ExtensionRender.push(Dyn)

        // when a new element is created let add this to the "dynList array"
        ExtensionRender.push(function (elem) {
            ls.dynList.push(elem)
        })

        // change thr "setStyle Method" for verifying  the DynCss
        BaseElement.prototype.setStyle = function (cssValues) {
            if (obj.isString(cssValues)) {
                leis.setElementStyle(this, cssValues, () => {
                    this.setStyle(cssValues);
                }, this.getPropWait());
            }
            else {
                AltStyle = cssValues
                if (!this.style) this.style = {};
                obj.copyObject(cssValues, this.style, true)
            }
        }
        // execute the dynamic style declaration.
        function Dyn(element) {

            if (element.style) {
                obj.copyObject(AltStyle, element.style, true)
                var style = obj.copyObject(window.getComputedStyle(element._conf), false, true)
                obj.copyObject(element.style, style, true)

                // dynamic declaration
                obj.loopObj(element.style, (v, k,) => {
                    if (obj.isFunction(v)) v.call(style, element.style)
                })

                // execute the style set

                obj.loopObj(element.style, (v, k,) => {
                    element.setStyleProp(k, v)
                })

            }
        }
    })

}

