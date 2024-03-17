import { obj } from "../../deps/PrimaryArray.js";
import { generateId } from "../../deps/rand.js";
import { leis } from "../browser/leis.js";
import { leisDOM } from "../browser/leisDom.js";
import { initCard } from "./init.js";
import { BaseElement } from "../dist/baseElement.js";
import { leistrap } from "../dist/leisWidget.js";


// leisCard component

/**
 * leistrap Card component
 */
class leisCard {
    #card = initCard()
    constructor(element, parent) {
        this.element = element;

        if (parent.content) [
            obj.arrayRomove(leis.getElementPosition(
                this.element, parent.content), parent.content),
            parent.add(this)
        ]
        this.header = undefined
        this.footer = undefined
        this.title = undefined
        this.img = undefined
        leis.addClassList(this.element, "leis-card")
        leis.addClassList(this.#card.header, "leis-card-header")
        leis.addClassList(this.#card.body, "leis-card-body")
        leis.addClassList(this.#card.footer, "leis-card-footer")
        obj.defineObj(this, "body", this.#card.body)
        obj.defineObj(this, "content", [])
        this.boxSh = false
        this.leisBtnConfId = generateId(10, 20)
        Object.defineProperty(this, "addElemClass",
            { value: function (value) { this.addClass(value) } })

    }

    setSize(width = "auto", height = "auto") {
        this.element.setStyleProp("width", width);
        this.element.setStyleProp("height", height)
    }
    destroy() {
        if (leis.hasConf(this.#card.body)) {
            leisDOM.elementSelfRemove(this.element._conf); this.state = "removed"
        } else {
            leis.addPW(true, this.#card.body, () => {
                obj.after(200, () => { this.destroy() })
            }, this.#card.body.getPropWait())
        }
    }
    hide(css) { this.element.hide(css) }
    show(css) { this.element.show(css) }
    setBsh() { this.element.toggleClass("boxSh-off") }
    setBsh() { this.element.removeClass("boxSh-off") }
    add(element) { this.body.add(element) }
    remove(element) { this.#card.body.remove(element) }
    removeAll(element) {
        const t = this.#card.body.content[0];
        this.#card.body.removeAll(element); this.#card.body.add(t)
    }
    render() {
        !this.boxSh ? this.element.addClass("boxSh-off") :
            this.element.removeClass("boxSh-off");
        const content = []
        obj.copyArray(this.element.content, content)
        obj.copyArray(this.content, content)
        content.forEach(item => this.#card.body.add(item))
        const o = [this.#card.body]

        const setImg = () => {
            if (this.img) {
                const i = leistrap.Img({ otherAttr: { src: this.img.path } })
                const ic = leistrap.Div({ content: [i] })
                leis.addClassList(i, "leis-img")
                leis.addClassList(ic, "leis-img-card")

                this.img.pos = this.img.pos ? this.img.pos : "top"
                this.img.pos === "top" ? (() => {
                    ic.addClass(`leis-card-img-top`);
                    const pos = leis.getElementPosition(this.body, o);
                    obj.arrayInsert(pos, o, ic)

                })() : this.img.pos === "bottom" ? (() => {
                    ic.addClass(`leis-card-img-bottom`);
                    const pos = leis.getElementPosition(this.body, o);
                    obj.arrayInsert(pos + 1, o, ic)
                })() : undefined
                Object.defineProperty(this, "changeImg",
                    { value: function (path) { i.addAttr("src", path) } })
            }
        }

        if (this.header) {
            if (obj.isTypeOf(this.header, BaseElement)) {
                o.unshift(this.#card.header)
                this.#card.header.add(this.header)
            }
            if (obj.isString(this.header)) {
                o.unshift(this.#card.header)
                this.#card.header.setText(this.header)
            }
            Object.defineProperty(this, "changeHeader",
                {
                    value: function (value) {
                        if (obj.isTypeOf(value, BaseElement)) {
                            this.#card.header.removeAll(); this.#card.header.add(value)
                        } else { this.#card.header.setText(value) }
                    }
                })
        }
        if (this.title) {
            if (obj.isString(this.title)) {
                const t = leistrap.H3({ text: this.title })
                leis.addClassList(t, "leis-card-title")
                this.#card.body.content.unshift(t)
                Object.defineProperty(this, "changeTitle",
                    { value: function (value) { t.setText(value) } })
            }
        }
        setImg()

        if (this.footer) {
            if (obj.isTypeOf(this.footer, BaseElement)) {
                o.push(this.#card.footer)
                this.#card.footer.add(this.footer)
            }
            if (obj.isString(this.footer)) {
                o.push(this.#card.footer)
                this.#card.footer.setText(this.footer)
            }
            Object.defineProperty(this, "changeFooter",
                {
                    value: function (value) {
                        if (obj.isTypeOf(value, BaseElement)) {
                            this.#card.footer.removeAll(); this.#card.footer.add(value)
                        } else { this.#card.footer.setText(value) }
                    }
                })
        }
        this.element.content = o
        return this.element.render()
    }
}

export { leisCard }