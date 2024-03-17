import { BaseElement } from "./baseElement.js";
import { globalProp } from "./global.js";
import { OptionsInit } from "./global.js";
/**
     * rule widget
     * @param {string} type
     * 
     */
function setWidget(type, element = BaseElement, elem) {
    let __none__ = ""
    let __spc__ = 32
    /**
     * @param {options} option options
     */
    return function (option) {
        option = option ? option : {}

        if (option.eventOnce != undefined) {

            const _RD = option.eventOnce
            function defaultListener(target) {
                _RD.call(this.currentElement, target)
            }
            option.eventOnce = defaultListener
            if (option.listener) { defaultListener.prototype["name"] = option.listener }
        }


        const _bx = new element(option)

        _bx.ElementType = type

        const op = {
            label: () => _bx.lblFor = option.lblFor ? option.lblFor : __none__,
            button: () => {
                _bx.className += `${String.fromCharCode(__spc__)}btn${String.fromCharCode(__spc__)}`
                _bx.otherAttr.type = "button"
            },
            img: () => {
                _bx.src = option.src ? option.src : __none__
                _bx.alt = option.alt ? option.alt : __none__
            }
        }

        let e = op[elem.toLowerCase()]
        globalProp.forEach(item => {
            _bx[item] = option[item] ? option[item] : __none__
        })
        if (e) e()
        // check the option set via an extension
        OptionsInit.forEach(ext => ext(option, _bx))
        return _bx
    }
}

export { setWidget }