import { leistrap } from "../dist/leisWidget.js";
import { BaseElement } from "../dist/baseElement.js";

/**
* leistrap.Accordion component definition
*/

class Accordion {

    /**
     * @param {BaseElement[]} AccBtn  the widget that will be displayed
     * @param {BaseElement[]} AccPanel this content to be be shown when 
     * the user clicks on the `AccBtn`
     * @param {BaseElement} parent 
     */
    constructor(
        /**
         * button or other widgts
         */
        AccBtn,
        /**
         * the content
         */
        AccPanel,
        /**
         * the widget parent
         */
        parent,
        header = undefined,
        footer = undefined,
        props = undefined,
    ) {

        this.AccBtn = AccBtn;
        this.AccPanel = AccPanel;
        this.parent = parent
        this.accHeader = header
        this.accFooter = footer
        this.props = props
        this.point = this.#setAcc()
    }

    #setAcc() {

        const MainAcc = leistrap.Card({
            attr: {
                className: ["leis-accordion-card"].concat(this.props ?
                    this.props.className ? this.props.className : [] : [])
            },
            parent: this.parent,
            otherAttr: this.props ? this.props.otherAttr ?
                this.props.otherAttr : undefined : undefined

        })

        if (typeof this.accHeader !== "undefined") {
            this.accHeader.attr ? this.accHeader.attr.className ?
                this.accHeader.attr.className += " leis-accordion-head " :
                this.accHeader.attr.className = ["leis-accordion-head"] :
                this.accHeader.attr = { className: ["leis-accordion-head"] }
            MainAcc.content.push(this.accHeader)
        }
        if (typeof this.AccBtn === "object" && typeof this.AccBtn.push === "function") {

            this.AccBtn.forEach((item, i) => {
                item.attr ? item.attr.className ? item.attr.className += ` leis-accordion-btn ` :
                    item.attr.className = " leis-accordion-btn " :
                    item.attr.className = " leis-accordion-btn "

                if (typeof this.AccPanel[i] !== "undefined") {
                    this.AccPanel[i].attr ? this.AccPanel[i].attr.className ?
                        this.AccPanel[i].attr.className += ` leis-accordion-panel ` :
                        this.AccPanel[i].attr.className = " leis-accordion-panel " :
                        this.AccPanel[i].attr.className = "leis-accordion-panel"
                    item.eventType = "click"
                    const _i = this.AccPanel[i]
                    item.eventOnce = function () {
                        "use strict"
                        _i.toggleClass("active")
                        item.toggleClass("active")
                    }
                    MainAcc.content.push(item)
                    MainAcc.content.push(this.AccPanel[i])
                }
                else { throw new Error("missing a pannel widget") }
            })
        }
        else { throw new Error("the Accordion widget needs only the array, verify if you used an array object") }
        if (typeof this.accFooter !== "undefined") {
            this.accFooter.attr ? this.accFooter.attr.className ?
                this.accFooter.attr.className += " leis-accordion-footer " :
                this.accFooter.attr.className = ["leis-accordion-footer"] :
                this.accFooter.attr = { className: ["leis-accordion-footer"] }
            MainAcc.content.push(this.accFooter)
        }
        this.MainAcc = MainAcc
        return MainAcc
    }

    /**
     * appends the news elements in the widget
     * @param {BaseElement} accbtn thes button to be showen
     * @param {BaseElement} accpanel the content to be showen when 
     * the user clicks in the `accpanel`button  
     */
    addItem(accbtn, accpanel) {
        this.MainAcc.content.push(accbtn)
        accbtn.attr ? accbtn.attr.className ?
            accbtn.attr.className += ` leis-accordion-btn ` :
            accbtn.attr.className = " leis-accordion-btn " :
            accbtn.attr.className = " leis-accordion-btn "
        this.MainAcc.content.push(accpanel)
        accpanel.attr ? accpanel.attr.className ?
            accpanel.attr.className += ` leis-accordion-panel `
            : accpanel.attr.className = " leis-accordion-panel " :
            accpanel.attr.className = "leis-accordion-panel"
        accbtn.eventType = "click"
        accbtn.eventOnce = function () {
            "use strict"
            accpanel.toggleClass("active")
            accbtn.toggleClass("active")
        }
        this.MainAcc.CASCADE()
    }
    destroy() { this.point.destroy() }
    addClass(name) { this.MainAcc.addClass(name) }
    remove(element) { this.MainAcc.remove(element) }
    removeAll() { this.MainAcc.removeAll() }
    setStyle(cssValues) { this.MainAcc.setStyle(cssValues) }
}

export { Accordion }