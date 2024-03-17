import { leistrap } from "../dist/leisWidget.js";
import { BaseElement } from "../dist/baseElement.js";
import { leisData } from "../dist/global.js";
/**
* Leistrap `DropDown` component
*/

class DropDown {

    /**
     * the caption widget that will contain the text 
     */
    #CaptionDisplay;
    #contentDC
    /**
     * 
     * @param {BaseElement} parent  the widget parent
     * @param {string} caption  the text to be displayed
     * @param {BaseElement[]} items the items to be inserted in the `DropDown Container` 
     * @param {string} btnType the type of btn color e.g `primary`, `secondary`, 
     * `warning` and so more... reference `leistrap` style sheet   
     */
    constructor(parent, caption,
        items, btnType,
        attr, useBtn,
        contentStopPropagation = false,
        btnClass) {
        this.parent = parent;
        this.caption = caption;
        this.items = items
        this.btnType = btnType
        this.attr = attr;
        this.useBtn = useBtn;
        this.contentStopPropagation = contentStopPropagation;
        this.btnClass = btnClass
        this.point = this.#setD()
    }

    /**
     * 
     * @param {string} name caption name 
     */
    setCaption(name) { this.#CaptionDisplay.setText(name) }
    /**
     * 
     * @param {BaseElement} item the new Element 
     */
    addItem(item) {
        this.#contentDC.add(leistrap.Span({ content: [item] }));
    }
    #setD() {
        this.#CaptionDisplay = leistrap.Span({ text: this.caption })

        const MainD = leistrap.Card({
            attr: {
                className: ["leis-dropdown"].concat(this.attr ?
                    this.attr.className ? this.attr.className : [] : [])
            },
            parent: this.parent
        })
        let _useBtn;
        if (typeof this.useBtn !== "undefined") {
            _useBtn = leistrap.Card({
                attr: {
                    className: ["leis-dropBtn"]
                        .concat(this.btnClass ? this.btnClass : [])
                },
                content: [this.useBtn],
                eventType: "click",
                eventOnce: function (e) {
                    e.stopPropagation()
                    leisData.lDropDown.forEach(dp => {
                        dp.Dcontent.removeClass("show");
                        dp.Btn.removeClass("activeD")
                    })
                    this.addClass("activeD")
                    Dcontent.addClass("show")
                }
            })
        }
        const btnD = leistrap.Button({
            attr: {
                className: ["leis-dropBtn leis-flex leis-row", "leis-dropBtn-"
                    + String(this.btnType ? this.btnType : "primary")]
                    .concat(this.btnClass ? this.btnClass : [])
            },
            eventType: "click",
            content: [
                this.#CaptionDisplay,
                leistrap.Span({ otherAttr: { "class": "leis-arrow-down as" } })],
            eventOnce: function (e) {
                e.stopPropagation()
                leisData.lDropDown.forEach(dp => {
                    dp.Dcontent.removeClass("show");
                    dp.Btn.removeClass("activeD")
                })
                this.addClass("activeD")
                Dcontent.addClass("show")
            }
        })

        MainD.content.push(_useBtn ? _useBtn : btnD)
        const xD = leistrap.Card({
            attr: { className: ["leis-content"] },
            parent: MainD
        })

        const Dcontent = leistrap.Card({
            attr: {
                className: [
                    "leis-dropdown-content",
                    "leis-padding-6", "leis-border-"
                    + String(this.btnType ? this.btnType : "primary")
                ]
            },
            parent: xD,
        })
        const DC = leistrap.Card({
            attr: { className: ["leis-dropdwn-content-card"] },
            parent: Dcontent
        })

        this.#contentDC = DC
        if (this.contentStopPropagation === true) {
            DC.addEvent("click", function (e) { e.stopPropagation() })
        }
        if (typeof this.items !== "undefined" && typeof this.items.push === "function") {
            this.items.forEach(item => { DC.content.push(item) })
        }
        this.MainD = MainD
        this.Dcontent = Dcontent
        this.Btn = _useBtn ? _useBtn : btnD
        this.setSize = function (w, h) {
            if (w) { Dcontent.setStyleProp("width", w) }
            if (h) { Dcontent.setStyleProp("height", h) }
        }
        this.addClass = function (name) { Dcontent.addClass(name) }
        this.setStyle = function (css) { Dcontent.setStyle(css) }

        return MainD
    }
    /**
     * hide the content
     */
    hideContent() { window.document.body.click() }
    destroy() { this.point.destroy() }
}

export { DropDown }