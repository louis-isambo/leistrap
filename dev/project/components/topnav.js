import { leistrap } from "../dist/leisWidget.js";
import { BaseElement } from "../dist/baseElement.js";
import { obj } from "../../deps/PrimaryArray.js";
import { leis } from "../browser/leis.js";

/**
* leistrap `TopNav` component difinition
*/
class TopNav {
    #position;
    #type;
    #dropDowns;
    /**
     * 
     * @param {BaseElement} parent  TopNav parent widget 
     * @param {[{name:string, href:string}]} links the links to be displayed on the topNav 
     */
    constructor(parent, links, position, type, dropDowns) {
        this.parent = parent;
        this.links = links;
        this.type = type;
        this.#position = position;
        this.#dropDowns = dropDowns
        this.point = this.#setTop()
    }

    #setTop() {
        const MainTop = leistrap.Card({
            parent: this.parent,
            attr: { className: ["leis-topnav", `${this.type ? this.type : ""}`] },
        })

        if (!obj.isUndifend(this.links)) {
            if (obj.isArray(this.links)) {
                const o = this.links.map(item => leistrap.Li({
                    content: [leistrap.A({ otherAttr: { href: item.href }, text: item.name })]
                }))
                if (this.#dropDowns) { leis.topNaveDropDowns(leistrap, o, this.#dropDowns) }
                MainTop.add(leistrap.GroupItem({ items: o }).MainG)
            }
        }
        return MainTop
    }
}

export { TopNav }