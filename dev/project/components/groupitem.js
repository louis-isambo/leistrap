import { leistrap } from "../dist/leisWidget.js"
import { leis } from "../browser/leis.js"

/**
* leistrap `GroupItem` component groups items within 
*/
class GroupItem {
    /**
     * 
     * @param {BaseElement} parent 
     * @param {Li[]} item 
     */
    constructor(
        /**
         * the parent of `groupItem`
         */
        parent,
        /**
         * the items to be grouped, this required only `Li` widget
         */
        item,
        attr,
        header,
    ) {

        /**
         * the items to be grouped, this required only `Li` widget
         */
        this.items = item
        /**
         * the items to be grouped, this required only `Li` widget
         */
        this.parent = parent
        /**
         * attributes
         */
        this.attr = attr
        this.header = header
        this.checked = null
        this.#setG()
    }

    /**
     * add a new element
     * @param {Li} item `Li` element
     */
    addItem(item) {
        leis.addClassList(item, 'leis-child-group');
        this.MainG.addItem(item)
    }
    removeAll() { this.MainG.removeAll(); }
    #setG() {
        const _cd = leistrap.Card({
            parent: this.parent,
            attr: { className: ["leis-group"] }
        })

        const MainG = leistrap.List({
            attr: {
                className: ["leis-list-group"].concat(
                    this.attr ? this.attr.className ? this.attr.className : [] : [])
            },
            parent: _cd
        })

        if (typeof this.header !== "undefined") {
            this.header.attr ? this.header.attr.className ?
                this.header.attr.className += ` leis-child-group leis-group-head ` :
                this.header.attr.className = " leis-child-group leis-group-head " :
                this.header.attr.className = "leis-child-group leis-group-head"
            MainG.content.push(this.header)
        }

        if (typeof this.items !== "undefined"
            && typeof this.items.push === "function") {
            this.items.forEach(item => {
                if (item.ElementType.toLowerCase() === "li") {
                    item.attr ? item.attr.className ?
                        item.attr.className += ` leis-child-group ` :
                        item.attr.className = " leis-child-group " :
                        item.attr.className = "leis-child-group"
                    MainG.content.push(item)
                }
            })
        }
        this.point = _cd
        this.MainG = MainG
    }
}

export { GroupItem }