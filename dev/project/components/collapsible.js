import { leistrap } from "../dist/leisWidget.js";
import { BaseElement } from "../dist/baseElement.js";
import { obj } from "../../deps/PrimaryArray.js";

/**
* leistrap `Collapsible` component definition
*/
class Collapsible {
    /**
     * @param {BaseElement} parent Collapsible parent widget 
     * @param {BaseElement[]} content  content to be displayed
     * @param {string} caption caption text
     */
    constructor(parent, content, caption) {
        this.parent = parent;
        this.content = content;
        this.caption = caption
        this.point = this.#setC()
    }
    #setC() {
        const MainC = leistrap.Card({
            attr: {
                className: ["leis-collapsing-container"]
            },
            parent: this.parent
        })
        const collaBtn = leistrap.Button({
            text: this.caption,
            attr: { className: ["leis-collapse-btn"] },
            parent: MainC
        })
        collaBtn.addEvent("click", function () {
            colla.toggleClass("callo-show");
            this.toggleClass("colla-btn-show")
        })
        const colla = leistrap.Card({
            attr: { className: ["leis-collapsing"] },
            parent: MainC,
            content: this.content
        })
        this.MainC = MainC
        return MainC
    }
}

export { Collapsible }