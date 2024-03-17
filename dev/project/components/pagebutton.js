import { leistrap } from "../dist/leisWidget.js"
import { leis } from "../browser/leis.js"
import { obj } from "../../deps/PrimaryArray.js"
import { generateId } from "../../deps/rand.js"


class PageButton {
    #button
    #state = { active: false, disable: false }
    constructor(option) {
        this.#button = this.#setBtn(option)
        this.contentPage = option.contentPage
        this.pageName = option.pageName ? option.pageName : `Rand_${generateId(2, 5)}`
        Object.defineProperty(this, 'button', { value: this.#button })
    }
    /**
     * text if button has any content
     * @param {*} btn 
     */
    hasContent(option) {
        return !(!option.content)
            && (option.content ? !obj.isEmpty(option.content) :
                !(!option.content))
    }

    #setBtn(option) {
        const o = obj.copyObject(option, false, false, "parent")
        const cnt = leistrap.Div(o)
        const elem = leistrap.Div({ content: [cnt], parent: option.parent })
        leis.addClassList(elem, "leis-page-legende")
        elem.btnPage = this
        return elem
    }
    config(option) {
        this.#setConfig(option)
        this.active()
        return this.#button
    }
    active() { if (!this.#state.active) { this.#setActive() } }
    disable() { if (this.#state.active) { this.#setDisable() } }

    #setActive() {
        this.#button.addEvent("click", function (e) {
            if (!this.pageConfig.parentPage) {
                this.pageConfig.parentPage = this.lsParent.accessPage.p
            }
            if (this.pageConfig.parentPage.history) {
                this.pageConfig.parentPage.history.push(this.pageConfig.contentPage)
                this.pageConfig.parentPage.content.forEach(item => { item.hide() })
                this.pageConfig.contentPage.show()
                this.pageConfig.parentPage.page.currentPage = this.pageConfig.contentPage
                if (!this.lsParent.accessPage) {
                    this.lsParent.accessPage = this.pageConfig.contentPage.accessPage
                }
                this.lsParent.accessPage._controler.show()
            }
        }, "pageButtonActive")
        this.#state.active = true
    }
    #setDisable() {
        this.#button.removeEvent("click", "pageButtonActive");
        this.#state.active = false
    }

    #setConfig(option) {
        this.#button.pageConfig = option
        option.parentPage.add(option.contentPage)
        option.contentPage.accessPage = option.parentPage.accessPage

        if (obj.isArray(option.contentPage.attr.className)) {
            option.contentPage.attr.className.push("leis-page-content")
        }
        else { option.contentPage.attr.className += " leis-page-content " }
        if (leis.hasConf(option.contentPage)) {
            option.contentPage.addClass("leis-page-content")
        }
    }
}

export { PageButton }