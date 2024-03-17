import { BaseElement } from "../dist/baseElement.js";
import { leistrap } from "../dist/leisWidget.js";
import { leis } from "../browser/leis.js";
import { obj } from "../../deps/PrimaryArray.js";

/**
* leistrap `SideBar` component definition
*/
class SideBar {
    #footer;
    #header;
    #items
    /**
     * @param {BaseElement} parent parent widget 
     */
    constructor(parent, header, footer, items, collapsibles) {
        this.parent = parent
        this.#header = header;
        this.#footer = footer
        this.#items = items
        this.collapsibles = collapsibles
        this.point = this.#setSB()
    }

    #setSB() {
        const hd = leistrap.Card({ attr: { className: ["sideNavHeader"] } })
        const ft = leistrap.Card({ attr: { className: ["sideNavFooter"] } })
        const i = []

        if (!obj.isUndifend(this.#items)) {
            let o = (_items) => {
                var ot = []
                _items.forEach(item => {
                    let fl = leistrap.Li()
                    fl.addEvent("click", function () {
                        i.forEach(it => it.removeClass("sideItemActive"));
                        this.addClass("sideItemActive");
                        if (!obj.isUndifend(item.action)) { item.action.call(this, this) }
                    })

                    // let verify  if the icon is clicked
                    function ic(e) { if (item.onIcon) item.onIcon(e) }
                    // verifying if the icon is set 
                    item.icon ? fl.content.push(leistrap.I({ otherAttr: { "class": item.icon }, events: { click: ic } })) : undefined
                    // put the textContent
                    item.caption ? fl.content.push(leistrap.Span({ text: item.caption })) : undefined
                    // verifying if the widget is required
                    item.widget ? fl.content.push(item.widget) : undefined
                    i.push(fl)
                    ot.push(fl)

                })
                return ot
            }
            obj.tryCode(() => { o(this.#items) })

            //create the method for adding news items into the sideBar
            this.addItems = function (_items) {
                obj.tryCode(() => {
                    o(_items).forEach(item => GL.addItem(item))
                })
            }

        }
        //insert all collapsible
        if (this.collapsibles) {
            leis.insertItemFlat(leistrap, i, this.collapsibles, "MainC", "colla-item")
        }

        const GL = leistrap.GroupItem({
            items: !obj.isEmpty(i) ? i : undefined,
            attr: { className: ["links"] }
        })

        const cont = [GL.MainG]
        if (!obj.isUndifend(this.#header)) { hd.add(this.#header); obj.arrayInsert(0, cont, hd) }
        if (!obj.isUndifend(this.#footer)) { ft.add(this.#footer); cont.push(ft) }
        const MainS = leistrap.Card({
            attr: { className: ["leis-sideNav"] },
            content: cont
        })
        this.setWidth = function (value) { if (value) { MainS.setStyleProp("width", value) } }
        this.addClass = function (name) { if (name) { MainS.addClass(name) } }
        this.MainS = MainS
        Object.defineProperty(this, "allItems", { value: i })
        return MainS
    }
}

export { SideBar }