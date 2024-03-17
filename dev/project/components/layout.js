import { leis } from "../browser/leis.js"
import { leistrap } from "../dist/leisWidget.js"

class Layout {
    constructor(parent, content, cls) {
        this.point = leistrap.Div({ parent, content })
        leis.addClassList(this.point, cls[0]);
        this.#setHB(content, cls[1])
    }

    #setHB(list, cls) {
        list.forEach(item => {
            item.addClass(cls);
            item.setStyleProp("flex", `${list.length}`)
        })
    }
    #setItemFlex(index, prop, value) {
        if (this.point.content[index]) {
            this.point.content[index].setStyleProp(prop, value)
        }
    }
    setItemGrow(index, n) { this.#setItemFlex(index, "flexGrow", n) };
    setItemShrink(index, n) { this.#setItemFlex(index, "flexShrink", n) };
    setItemBasis(index, value) { this.#setItemFlex(index, "flexBasis", value) };
    setItemOrder(index, n) { this.#setItemFlex(index, "flexOrder", n) };
}

Layout.HBoxLayout = function (parent, content) {
    return new this(parent, content, [
        "leis-flex leis-row leis-layout",
        "leis-hbox-item"])
}

Layout.VBoxLayout = function (parent, content) {
    return new this(parent, content, [
        "leis-flex leis-coluùn leis-layout",
        "leis-vbox-item"])
}
export { Layout }