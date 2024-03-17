import { leistrap } from "../dist/leisWidget.js"
import { leis } from "../browser/leis.js"
import { initCard } from "./init.js"
import { obj } from "../../deps/PrimaryArray.js"


function modalEvents(modal) {
    modal
}
class Modal {
    #prop = initCard()
    constructor(parent) {
        this.parent = parent
        this.point = this.#setModal()
        Object.defineProperty(this, "events", {
            writable: false, value: { close: [], active: [] }
        })
    }
    #setModal() {
        const _modal_ = leistrap.Div({ parent: this.parent })
        const dialog = leistrap.Div({ parent: _modal_ })

        const closeBtn = leistrap.CloseBtn({})
        closeBtn.addEvent("click", function () { closeModal() })
        const content = leistrap.Div()
        const title = leistrap.H3({ text: "modal title" })

        //closebtn
        const c = leistrap.Button({ text: "Close" }).getButton()
        c.setType("secondary")
        this.closeBtn = c
        // the saveBtn element
        const s = leistrap.Button({ text: "Save data" }).getButton()
        s.setType("primary")
        this.saveBtn = s
        const card = leistrap.Div({ content: [c, s] })
        const p = leistrap.P({
            text: "Modal content goes here... add new content",
            tooltip: { postion: 'bottom', text: "text modal example" }
        })
        this.#prop.body.add(p)
        this.#prop.footer.add(card)
        this.#prop.header.add(title)
        this.#prop.header.add(closeBtn)
        content.add(this.#prop.header)
        content.add(this.#prop.body)
        content.add(this.#prop.footer)
        dialog.add(content)
        _modal_.addEvent("click", function (e) {
            if (e.target === this._conf) { closeModal() }
        })

        leis.addClassList(_modal_, "leis-modal-container")
        leis.addClassList(dialog, "leis-modal-dialog modal-transform")
        leis.addClassList(content, "leis-modal-content")
        leis.addClassList(this.#prop.header, "leis-modal-header")
        leis.addClassList(this.#prop.body, "leis-modal-body")
        leis.addClassList(this.#prop.footer, "leis-modal-footer")
        leis.addClassList(title, "leis-modal-title")
        leis.addClassList(card, "leis-modal-footer-card")
        leis.addClassList(p, "leis-modal-dafault")

        this.#prop.content = content
        this.#prop.title = title
        this.#prop.container = _modal_
        this.#prop.p = p
        this._modal_ = _modal_
        this.#prop.dialog = dialog
        Object.defineProperty(this, "props", { value: this.#prop })
        //closing a modal
        var o = this
        function closeModal() {
            var closed = { closable: true }
            o.events.close.forEach((item, index) => { item(closed) })
            if (closed.closable) _modal_.removeClass("show")
        }
        this.hide = closeModal
        Object.defineProperty(this, "body", { writable: false, value: this.#prop.body })
        this.setEffect = function (name) { dialog.setStyleProp("animationName", `${name}`) }
        this.moveTo = function (x, y) {
            dialog.setStyleProp("top", `${(y * 100) / window.screen.availHeight}%`)
            dialog.setStyleProp("left", `${(x * 100) / window.screen.availWidth}%`)
            dialog.removeClass("modal-transform")
            _modal_.setStyleProp("background", "inherit")
            this.show()
        }
        return _modal_
    }

    setTitle(name) { this.#prop.title.setText(name) }
    show() {
        var active = { active: true }
        this.events.active.forEach((item, index) => { item(active) })
        if (active.active) this.#prop.container.addClass("show")
    }
    add(element) { this.#prop.body.add(element) }
    addElements(...element) { this.#prop.body.addElements(...element) }
    setSize(width, height) {
        if (width) { this.#prop.dialog.setStyleProp("width", width) };
        if (height) { this.#prop.dialog.setStyleProp("height", height) }
    }
    addClass(value) { if (value) { this.#prop.dialog.addClass(value) } }
    clearDefault() { this.#prop.p.destroy() }
    clear() { this.#prop.p.destroy() }
    destroy() { this.#prop.container.destroy() }
    once(event, callback) {
        if (obj.has(event, this.events)) this.events[event].push(callback)
    }
    removeFooter() { this.#prop.footer.destroy() }
    removeHeader() { this.#prop.header.destroy() }

}

export { Modal }