import { leistrap } from "../dist/leisWidget.js";
import { leis } from "../browser/leis.js";
import { obj } from "../../deps/PrimaryArray.js";
import { leisData } from "../dist/global.js";
import { checkPageName } from "../dist/checker.js";
import { PageButton } from "./pagebutton.js";
import { BaseElement } from "../dist/baseElement.js";
/**
* leistrap.Page component
*/
class Page {
    #prop = { start: false }
    /**
     * 
     * @param {BaseElement} parent parent widget 
     * @param {BaseElement[]} legend  icon or text to be displayed
     * 
     */
    constructor(
        /**
         * the page parent
         */
        parent,
        /**
         * the legend or `icon`
         */
        legend,
        content,

    ) {

        this.parent = parent
        this.legend = legend ? legend : []
        this.content = content ? content : []
        this.point = this.#setPage()
        this.currentPage = "main"

    }
    removePage(pageName) {
        if (leis.hasConf(this.point) && pageName) {
            checkPageName(this.#prop, pageName, true)
            const button = this.#prop[pageName].button
            const content = this.#prop[pageName].content
            button.lsParent.remove(button)
            content.lsParent.remove(content)
            this.#prop = obj.copyObject(this.#prop, false, false, pageName)
        }
        else {
            leis.addPW(true, this.point, () => {
                this.removePage(pageName)
            }, this.point.getPropWait())
        }
    }

    invoke(pageName) {
        if (leis.hasConf(this.point) && pageName) {
            checkPageName(this.#prop, pageName, true)
            this.#prop[pageName].button.getAttr("click")

        }
        else {
            leis.addPW(true, this.point, () => {
                this.removePage(pageName)
            }, this.point.getPropWait())
        }
    }
    #setPage() {
        const props = this.#prop
        const page = this
        const _mainPage_ = leistrap.Card({
            attr: { className: "leis-mainPage" },
            parent: this.parent
        })

        const _controler = leistrap.Button({
            attr: { className: `leis-btn-controler hide ` },
            eventType: "click",
            parent: _mainPage_,
            eventOnce: function () {
                this.lsParent.content.forEach(itm => itm.hide())
                let contentPage = {}
                let contentHistory = []
                this.lsParent.history.forEach(item => {
                    if (item.leisBtnConfId in contentPage === false) {
                        contentHistory.push(item);
                        contentPage[item.leisBtnConfId] = item
                    }
                })

                if (contentHistory.length <= 1) {
                    this.hide();
                    this.lsParent.history = [this.lsParent.history[0]];
                    contentPage = {}
                    page.currentPage = "main"
                } else { this.show(); contentHistory.pop() }

                this.lsParent.history = contentHistory

                var currentContent = contentHistory[contentHistory.length - 1]
                currentContent.show()
                page.currentPage = currentContent
                if (contentHistory.length == 1) { this.hide(); page.currentPage = "main" }
            }
        })

        leisData.PageControler = _controler
        const _first = leistrap.Card({ content: this.content })

        const _cnt_ = leistrap.Card({
            attr: { className: ["contentP-Default", "noBP"] },
            content: [_first].concat(this.legend),
            parent: _mainPage_
        })

        _cnt_.accessPage = { p: _mainPage_, _controler }
        this.mainPage = _mainPage_
        this.home = _first
        _mainPage_.accessPage = { p: _mainPage_, _controler }
        _mainPage_.history = [_cnt_]
        _mainPage_.page = this

        if (typeof this.legend === "object" && typeof this.legend.push === "function") {
            this.legend.forEach(item => { setBtn(item, this) })
        }
        else { throw new Error("the ledende property needs only the array, verify if you used an array object") }

        function setBtn(item, o, parent) {
            if (obj.isTypeOf(item, PageButton)) {

                checkPageName(props, item)
                const elem = item.config({
                    access: "true",
                    parentPage: _mainPage_,
                    contentPage: item.contentPage
                })
                props[item.pageName] = { "button": elem, "content": item.contentPage }
                if (elem.parent === BaseElement && (!parent && !item.noP)) { o.home.add(elem) }
                if (obj.isTypeOf(parent, BaseElement)) {
                    parent.add(elem);
                }
            }

            else {
                item.pageConfig.contentPage.accessPage = { p: _mainPage_, _controler }
                _mainPage_.add(item.pageConfig.contentPage)

                item.pageConfig.contentPage.attr.className += `${String.fromCharCode(__spc__)}leis-page-content${String.fromCharCode(__spc__)}`
            }
        }
        this.addButton = (element, parent) => { setBtn(element, this, parent) }
        this.define = function (name, content) {
            if (name && content) {
                checkPageName(this.#prop, name, false)
                const elem = new PageButton({ otherAttr: { type: "hidden" } })
                const e = elem.config({
                    access: "true",
                    parentPage: _mainPage_,
                    contentPage: content
                })
                this.home.add(e)
                props[name] = {
                    "button": e,
                    "content": leistrap.Div({ content: [content] }),
                    hidden: true
                }
            }
        }
        return _mainPage_
    }
}

export { Page }