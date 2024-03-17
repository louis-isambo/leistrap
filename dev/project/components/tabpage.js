
import { BaseElement } from "../dist/baseElement.js"
import { obj } from "../../deps/PrimaryArray.js"
import { leis } from "../browser/leis.js"
import { leistrap } from "../dist/leisWidget.js"
import { generateId } from "../../deps/rand.js"
import { checkLinkN, checkPoint } from "../dist/checker.js"


/**
* leistrap.TapPage component definition
* 
*/
class TabPage {
    /*
    this private property saves all Links and their content
    and other properties that are privates
    */
    #prop = {}
    /**
     * @param {BaseElement[]} link 
     * @param {BaseElement[]} content,
     * @param {BaseElement} parent 
     */
    constructor(
        /**
         * add a link to toggle a content 
         */
        link,
        /**
         * add the content to be show when the user click the link widget
         */
        content,

        /**
         * parent widget
         */
        parent,
        attr,
        contentClass,
        useContentParent,
        concatLink
    ) {

        this.parent = parent
        this.link = link || []
        this.content = content || []
        this.attr = attr
        this.contentClass = contentClass
        this.useContentParent = useContentParent
        this.concatLink = concatLink
        this.#setTab()

    }
    #setTab() {
        let __spc__ = 32;
        let __none__ = ""
        const [...cpy] = this.link
        if (typeof this.content === "object" && typeof this.content.push === "function") {
            this.concatLink ? this.link = this.link.concat(this.concatLink) : undefined
            const _ei = generateId(1, 4)
            const __iConfig = generateId(1, 4)
            const __items = this.content
            const __links = this.link

            this.props = { _ei, __iConfig, widgtes: { __items, __links } }

            this.content.forEach((content, index) => {
                let _id = generateId(1, 5)
                if (typeof this.link[index] !== "undefined") {
                    checkLinkN(this.#prop, this.link[index])
                    content.attr ? content.attr.className ? content.attr.className += `${String.fromCharCode(__spc__)}leis-tab-content${String.fromCharCode(__spc__)}${__iConfig}` : content.attr.className = `leis-tab-content${String.fromCharCode(__spc__)}${__iConfig}` : content.attr.className = `leis-tab-content${String.fromCharCode(__spc__)}${__iConfig}`
                    content.attr ? content.attr.id ? content.attr.id = _id : content.attr.id = _id : content.attr.id = _id
                    this.link[index].attr ? this.link[index].attr.className ? this.link[index].attr.className += `${String.fromCharCode(__spc__)}leis-tabs-btn${String.fromCharCode(__spc__)}${_ei}Btn ` : this.link[index].attr.className = `leis-tabs-btn${String.fromCharCode(__spc__)}${_ei}Btn ` : this.link[index].attr.className = `leis-tabs-btn${String.fromCharCode(__spc__)}${_ei}Btn `
                    this.link[index].leisDataTab = { "name": "data-leis-tab", "value": `${_id} ${__iConfig} ${_ei}Btn` }

                    /*
                    get link name for getting  the id if we want to remove the link
                    and its content.
                    if there is no linkName we generate a Random LinkName.
                     */
                    if (!this.link[index].linkName) { this.link[index].linkName = generateId(2, 10) }
                    /*
                    save the link and its content to the pri pro
                     */
                    this.#prop[this.link[index].linkName] = { "link": this.link[index], "content": content }

                    /*
                    config the link to its content, if we want to get immediately the content link, just we
                    invoke link `assContent` property. vice versa to its content.  
                     */
                    this.link[index].assContent = content
                    content.assLink = this.link[index]

                    /*
                        config the event of link  if a user clicks on a current link will show the current 
                        link content
                     */
                    this.link[index].eventType = "click"
                    this.link[index].eventOnce = function () {
                        "use strict"
                        __items.forEach(data => { checkPoint(data, it => { it.hide(); it.removeClass("active") }) })
                        __links.forEach(data => data.removeClass("active"));
                        checkPoint(content, c => { c.addClass("active"); c.show() })
                        __links[index].addClass("active")
                    }
                }
                /*
                  a link must have a content if there is no content  an error will be thrown 
                 */
                else { throw new Error("miss a tabLink or tabContent, verify if you used array") }
            })
        }
        else { throw new Error("can only read a type of array") }

        const _parent_ = leistrap.Card({
            attr: { className: "leis-maintab" },
            parent: this.parent
        })

        const _tabBtn = leistrap.Card({
            attr: { className: `leis-tabs-card ${this.attr ? this.attr.className ? this.attr.className.join(' ') : "" : ""}` },
            parent: _parent_,
            content: cpy,
        })

        const _tabContent_ = leistrap.Card({
            attr: { className: `leis-mainContentTab ${this.contentClass ? this.contentClass.join(" ") : ""}` },
            parent: this.useContentParent ? this.useContentParent : _parent_,
            content: this.content
        })

        /**
         * the mainTab contains all children like `tabLinks`, `tabContents` and lot more
         */
        this.mainTab = _parent_
        this.point = _parent_
        this.__links__ = _tabBtn
        this.__contents__ = _tabContent_
        return _parent_

    }

    /**
     * add a new tab
     * @param {BaseElement} link  - the link to be desplayed
     * @param {BaseElement} tabContent - the content to be desplayed when 
     * the user clicks on the link associated (`tabContent`)
     * @param {boolean} [externalLink=false] if you want to use an external link set the property `true` 
     */

    addTab(link, tabContent, externalLink = false, stp) {
        checkLinkN(this.#prop, link)
        tabContent.attr ? tabContent.attr.className ? tabContent.attr.className += `${String.fromCharCode(__spc__)}leis-tab-content${String.fromCharCode(__spc__)}${this.props.__iConfig}` : tabContent.attr.className = `leis-tab-content${String.fromCharCode(__spc__)}${this.props.__iConfig}` : tabContent.attr.className = `leis-tab-content${String.fromCharCode(__spc__)}${this.props.__iConfig}`
        const _idf = generateId(1, 5)
        tabContent.attr ? tabContent.attr.id ? tabContent.attr.id = _idf : tabContent.attr.id = _idf : tabContent.attr.id = _idf
        link.attr ? link.attr.className ? link.attr.className += `${String.fromCharCode(__spc__)}leis-tabs-btn${String.fromCharCode(__spc__)}${this.props._ei}Btn ` : link.attr.className = `leis-tabs-btn${String.fromCharCode(__spc__)}${this.props._ei}Btn ` : link.attr.className = `leis-tabs-btn${String.fromCharCode(__spc__)}${this.props._ei}Btn `
        link.leisDataTab = { "name": "data-leis-tab", "value": `${_idf} ${this.props.__iConfig} ${this.props._ei}Btn` }

        /*
        get link name for getting  the id if we want to remove the link
        and its content.
        if there is no linkName we generate a Random LinkName.
        */

        if (!link.linkName) { link.linkName = generateId(2, 4) }
        /*
        save the link and its content to the pri pro
         */
        this.#prop[link.linkName] = { "link": link, "content": tabContent }

        /*
        config the link to its content, if we want to get immediately the content link, just we
        invoke link `assContent` property. vice versa to its content.  
        */

        link.assContent = tabContent
        tabContent.assLink = link

        /*
        config the event of link  if a user clicks on a current link will show the current 
        link content
         */


        const o = this.props.widgtes
        link.addEvent("click", function (e) {
            if (stp) { e.stopPropagation() }
            o.__items.forEach(data => { data.hide(); data.removeClass("active") })
            o.__links.forEach(data => data.removeClass("active"))

            tabContent.addClass("active")
            tabContent.show()
            link.addClass("active")
        })
        /*
            verify if  exeternal link is used
        */
        if (!externalLink) { this.__links__.add(link) }
        this.__contents__.add(tabContent)
        this.content.push(tabContent)
        this.link.push(link)
    }
    /**
     * removes the link with its content
     * @param {string} linkName link name 
     */
    removeLink(linkName) {
        if (leis.hasConf(this.point)) {
            if (linkName && obj.has(linkName, this.#prop)) {
                const l = this.#prop[linkName];
                l.link.lsParent.remove(l.link);
                l.content.lsParent.remove(l.content)
                const n = {}
                obj.copyObject(this.#prop, n, false, linkName)
                this.#prop = n
            }
        } else {
            leis.addPW(true, this.point, () => {
                this.removeLink(linkName)
            }, this.point.getPropWait())
        }
    }

    /**
     * move the link to another element
     * @param {string} linkName link name 
     * @param {BaseElement} element element 
     */
    moveLinkTo(linkName, element) {
        if (leis.hasConf(this.point)) {
            if (obj.isTypeOf(element, BaseElement) && obj.has(linkName, this.#prop)) {
                const l = this.#prop[linkName]
                l.link.lsParent.remove(l.link)
                element.add(l.link)
            }
            else { throw new Error("can only use the BaseElement or linkName not found") }
        }
        else {
            leis.addPW(true, this.point, () => {
                this.moveLinkTo(linkName, element)
            }, this.point.getPropWait())
        }
    }
    /**
     * adds className to the all links
     * @param {string} value className to be added  
     */
    addBtnClass(value) {
        if (leis.hasConf(this.point) && value) {
            this.link.forEach(item => {
                if (item.state !== "removed") { item.addClass(value) }
            })
        }
        else {
            leis.addPW(true, this.point, () => {
                this.addBtnClass(value)
            }, this.point.getPropWait())
        }
    }
    destroy() {
        if (leis.hasConf(this.point)) {
            obj.loopObj(this.#prop, (v, k) => {
                v.link.destroy(); v.content.destroy()
            })
            this.point.destroy()
        }
        else {
            leis.addPW(true, this.point, () => {
                this.destroy()
            }, this.point.getPropWait())
        }
    }
    invoke(linkName, ckP = true) {
        if (leis.hasConf(this.point) || !ckP) {

            if (linkName && obj.has(linkName, this.#prop)) {
                this.#prop[linkName].link.getAttr("click");
            }
        } else {
            leis.addPW(true, this.point, () => {
                this.invoke(linkName)
            }, this.point.getPropWait())
        }

    }

}

export { TabPage }