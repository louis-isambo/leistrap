import { _EventEmitter } from "../commands/eventEmitter.js";
import { obj } from "../../deps/PrimaryArray.js";
import { leis } from "../browser/leis.js";
import { leisData } from "./global.js";
import { Button } from "../elements/button.js";
import { Card, Div } from "../elements/card.js";
import { Label } from "../elements/label.js"
import { Paragraph, P } from "../elements/paragraph.js";
import { Img } from "../elements/img.js";
import { List } from "../elements/list.js"
import { Li } from "../elements/li.js";
import { Span, I } from "../elements/inline.js";
import { Link, A, Script } from "../elements/meta.js";
import { Textarea, Input } from "../elements/input.js";
import { Table, Tbody, Tr, Th, Td, Thead, Tfoot } from "../elements/table.js"
import { Heading } from "../elements/heading.js";
import { Style } from "../elements/style.js";
import { TabPage } from "../components/tabpage.js";
import { PageButton } from "../components/pagebutton.js";
import { Page } from "../components/page.js";
import { Accordion } from "../components/accordion.js";
import { GroupItem } from "../components/groupitem.js";
import { setWidget } from "./rule.js";
import { SlideDown } from "../components/slidedown.js";
import { DropDown } from "../components/dropdown.js";
import { TopNav } from "../components/topnav.js";
import { SideBar } from "../components/sidebar.js";
import { Collapsible } from "../components/collapsible.js";
import { SearchBar } from "../components/searchbar.js";
import { Modal } from "../components/modal.js";
import { __main__ } from "./leisMain.js";

import { CloseBtn } from "../components/closebtn.js";
import { Alert } from "../components/alerts.js";
import { ComboBox } from "../components/combobox.js";

// extensions


import { groupController, selectElement } from "../../deps/domSelector.js";
import { theme } from "../Apps/theme/theme.js";
import { template } from "../Apps/uimodel/template.js";
import { Layout } from "../components/layout.js";
import { setting } from "./setting.js";
import { BaseElement } from "./baseElement.js";
import { leisDOM } from "../browser/leisDom.js";
import { generateId } from "../../deps/rand.js";
import { ExtensionInit, ExtensionRender, OptionsInit, useState } from "./global.js";
import { Head } from "../elements/head.js";
import { LeisFileAPI } from "../browser/impExport.js";
/**
 * class definition
 */


const Lesistap_pages = {}

const extensionOption = {
    BaseElement, leis, obj, leisDOM,
    generateId, selectElement,
    groupController,
    ExtensionInit, ExtensionRender,
    OptionsInit, useState
}
function leistrap(conf) {
    if (!conf) conf = {};
    obj.copyObject(conf, setting, true)
    if (conf.plugin) conf.plugin.forEach(item => { obj.tryCode(() => item(setting)) })

}

leistrap.prototype.setting = setting
Object.defineProperty(leistrap, "extension", { writable: false, value: {} })
Object.defineProperty(leistrap, "event", { writable: false, value: _EventEmitter() })

/**
* leistrap `Button` Element | Component
* @param {options} option button options
* @returns {Button}
*/
leistrap.Button = option => {
    const button = setWidget("button", Button, "Button");
    return button(option)
}
/**
* leistrap `Div` | `Card component`
* @param {options}  option options
* @returns { Card} 
*/
leistrap.Card = option => {
    const card = setWidget("div", Card, "div");
    return card(option)
}
/**
* leistrap `Label` Element | component 
* @param {options} option Label options
* @returns {Label}
*/
leistrap.Label = option => {
    const label = setWidget("label", Label, "label");
    return label(option)
}
/**
* leistrap  `P` | `paragraph` component
* @param {options} option  options
* @returns {Paragraph}
*/
leistrap.Paragraph = option => {
    const p = setWidget("p", Paragraph, "paragraph");
    return p(option)
}
/**
* leistrap `P` Element
* @param {options} option  options
* @returns {P} 
*/
leistrap.P = option => {
    const p = setWidget("p", Paragraph, "paragraph");
    return p(option)
}
/**
* leistrap `Img `Element
* @param {options} option options
* @returns {Img}
*/
leistrap.Img = option => {
    const img = setWidget("img", Img, "img");
    return img(option)
}
/**
* leistrap `Div` Element
* @param {options} option options
* @returns {Div}
*/
leistrap.Div = option => {
    const div = setWidget("div", Div, "div");
    return div(option)
}
/**
* List widget uses the ul or ol html elements
* @param {options} option List options
* @returns {List}
*/
leistrap.List = option => {
    const ul = setWidget("ul", List, 'ul');
    return ul(option)
}
/**
 * Ol widget uses the Ol  html elements
 * @param {options} option Ol widget options
 * @returns {List}
 */
leistrap.Ol = option => {
    const ol = setWidget("ol", List, "ol");
    return ol(option)
}
/**
* Ul widget uses the Ul  html elements
* @param {options} option Ul widget options
* @returns {List}
*/
leistrap.Ul = option => {
    const ul = setWidget("ul", List);
    return ul(option)
}
/**
* List item Element
* @param {options} option list item options
* @returns {Li} 
*/
leistrap.Li = option => {
    const li = setWidget("li", Li, "li");
    return li(option)
}
/**
* the `Span` Element 
* @param {options} option  span options
* @returns {Span}
*/
leistrap.Span = option => {
    const span = setWidget("span", Span, "span");
    return span(option)
}
/**
* Italic element
*/
leistrap.I = option => {
    const i = setWidget("i", I, "i");
    return i(option)
}
leistrap.Link = option => {
    const link = setWidget("link", Link, "link");
    return link(option)
}
/**
* the html `a` Element
* @param {options} option options
* @returns {A}
*/
leistrap.A = option => {
    const a = setWidget("a", A, "a");
    return a(option)
}
/**
* `textarea` element
* @param {options} option textarea options
* @returns {Textarea} 
 */
leistrap.Textarea = option => {
    const textarea = setWidget("textarea", Textarea, "textarea");
    return textarea(option)
}
/**
* Table `Element` | `Component`
* @param {options} option table options
* @returns {Table}
*/
leistrap.Table = option => {
    const table = setWidget("table", Table, "table");
    return table(option)
}
/**
* `THead` element
* @param {options} option options
* @returns {THead}
*/
leistrap.THead = option => {
    const thed = setWidget("thead", Thead, "thead");
    return thed(option)
}
/**
 * `Th` element
 * @param {options} option options
 * @returns {Th}
 */
leistrap.Th = option => {
    const th = setWidget("th", Th, "th");
    return th(option)
}
/**
 * `Tbody` element
 * @param {options} option Tbody options
 * @returns {Tbody}
 */
leistrap.Tbody = option => {
    const tbody = setWidget("tbody", Tbody, "tbody");
    return tbody(option)
}
/**
 * `Tr` element
 * @param {options} option options
 * @returns {Tr}
 */
leistrap.Tr = option => {
    const tr = setWidget("tr", Tr, "tr");
    return tr(option)
}
/**
 * `Td` element
 * @param {options} option options
 * @returns {Td}
 */
leistrap.Td = option => {
    const td = setWidget("td", Td, "td");
    return td(option)
}
/**
 * `Tfoot` element
 * @param {options} option Tfoot options
 * @returns {Tfoot}
 */
leistrap.Tfoot = option => {
    const tfoot = setWidget("tfoot", Tfoot, "tfoot");
    return tfoot(option)
}
/**
*leistrap `Script` element
*/
leistrap.Script = setWidget("script", Script, "script")
/**
* input element, use `otherAttr` property to change the input type
* @param {options} option Input options
* @returns {Input} 
*/
leistrap.Input = option => {
    const input = setWidget("input", Input, "input");
    return input(option)
}
/**
* `Heading 1`  element 
*/
leistrap.H1 = setWidget("h1", Heading, "h1")
/**
 * `Heading 2`  element 
 */
leistrap.H2 = setWidget("h2", Heading, "h2")
/**
 * `Heading 3`  element 
 */
leistrap.H3 = setWidget("h3", Heading, "h3")
/**
 * `Heading 4`  element 
 */
leistrap.H4 = setWidget("h4", Heading, "h4")
/**
 * `Heading 5`  element 
 */
leistrap.H5 = setWidget("h5", Heading, "h5")
/**
 * `Heading 6`  element 
 */
leistrap.H6 = setWidget("h6", Heading, "h6")

leistrap.Style = setWidget("style", Style, "style")
leistrap.Head = Head(leistrap.Div)
leistrap.addStyle = function (css) { leis.addCssFile(document, this.Style({ text: css })) }
leistrap.inRange = function (num, st = 0, callback) {
    let ox = []
    for (let x = st; x < num; x++) { ox.push(x) }
    ox = ox.map(callback)
    return ox
}
/**
* the tabpage widget
* @typedef {{
* tabLink :BaseElement[],
* tabContent:BaseElement[],
* parent:BaseElement, attr:{},
* contentClass:string[], 
* useContentParent:BaseElement, 
* concatLink :BaseElement[] }}tabPageOption
* @param {tabPageOption} option 
* @returns {TabPage} 
*/

leistrap.TabPage = option => {
    if (!option) { option = {} };
    return new TabPage(
        option.tabLink,
        option.tabContent,
        option.parent,
        option.attr,
        option.contentClass,
        option.useContentParent,
        option.concatLink
    )
}
/**
* page button
* @param {options} option 
* @returns {PageButton}
*/
leistrap.pageButton = (option = {}) => new PageButton(option)

/**
* the page component
* @typedef {{
* parent :BaseElement, 
* legend :PageLegend, 
* content:BaseElement[]}} pageOptions
* @param {pageOptions} option 
* @returns {Page} 
*/
leistrap.Page = option => new Page(
    option.parent,
    option.legend,
    option.content
)

/**
* the Accordion component
* @typedef {{
* accBtn:BaseElement[],
* accPanel:BaseElement[],
* parent:BaseElement,
* accHeader:BaseElement,
* accFooter:BaseElement, 
* props:attr}} accOptions
* @param {accOptions} option 
* @returns {Accordion} 
*/
leistrap.Accordion = option => new Accordion(
    option.accBtn,
    option.accPanel,
    option.parent,
    option.accHeader,
    option.accFooter,
    option.props
)

/**
* the `GroupItem` component
* @typedef {{
* parent ?: BaseElement, 
* items?:Li[], 
* attr ?:{className? :string,id ? :string},
* header ? :BaseElement}}optionsGroup
* @param {optionsGroup} option 
* @returns {GroupItem} 
*/
leistrap.GroupItem = option => new GroupItem(
    option.parent,
    option.items,
    option.attr,
    option.header
)

/**
* leistrap  GroupItem `left image` widget
* @param {string} path the img `path`
* @returns {BaseElement}
*/
leistrap.GILeftImg = path => leistrap.Card({
    attr: { className: ["leis-img-group-left"] },
    content: [leistrap.Img({ otherAttr: { src: path } })]
})
/**
 * leistrap  GroupItem `Text` widget
 * @param {string} txt  the text to be displayed
 * @returns {BaseElement}
 */
leistrap.GIText = txt => leistrap.Paragraph({
    attr: { className: ["leis-group-txt"] },
    text: txt
})
/**
* add the page extence 
* @param {string} name 
* @param {Page} page 
*/
leistrap.setPage = function (name, page) { Lesistap_pages[name] = page }
leistrap.getPage = (name) => Lesistap_pages[name]
leistrap.lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum distinctio molestias culpa dolores quibusdam doloribus iure quis. Facere consequatur rerum quidem totam optio est animi. Voluptatem temporibus blanditiis officia enim!"
leistrap.MLorem = function (n = 1) {
    let i = ""
    for (let _i = 0; _i < n; _i++) { i += ` ${this.lorem} ` }
    return i
}

/**
* leistrap `DropDown` component
* @typedef {{parent ? : BaseElement,
* caption?:string,
* items?: BaseElement[],
* btnType?:ColorType,
* attr? : {className:string, id:string},
* useBtn? :BaseElement,
* stopPropagation? :boolean,
* btnClass? :string[]}}dropOptions
* @param {dropOptions} option
* @returns {DropDown}
*/
leistrap.DropDown = (option = {}) => {
    const d = new DropDown(
        option.parent,
        option.caption,
        option.items,
        option.btnType,
        option.attr,
        option.useBtn,
        option.stopPropagation,
        option.btnClass
    )
    leisData.lDropDown.push(d)
    return d
}

/**
* leistrap `SlideDown` / `carousel` component 
* @typedef {{parent:BaseElement, imgList :[{src:string, caption:string}],
* width : number, height:number, maxHeight:number, minHeight:number}}SlideOption
* @param {SlideOption} option  the slideDow option
* @returns {SlideDown}
*/
leistrap.SlideDown = option => new SlideDown(
    option.parent,
    option.imgList,
    option.width,
    option.height,
    option.maxHeight,
    option.minHeight
)

/**
* leistrap `Alert` component
* @typedef {{
* parent :BaseElement, 
* text:string, 
* type:BtnType,
* links:{}}} alertOptions
* @param {alertOptions} option alert options
*/
leistrap.Alert = option => new Alert(
    option.parent,
    option.text,
    option.type,
    option.links)


/**
* leistrap `SideBar` component
* @typedef {{collapsible :[],
* parent:BaseElement,
* footer:BaseElement,
* header:BaseElement, 
* items:[{
*    icon:string,
*    caption:string,
*    action:(element:BaseElement)=>void
* }]}}sideOptions
* @param {sideOptions} option options
* @returns {SideBar}
*/
leistrap.SideBar = (option = {}) => new SideBar(
    option.parent,
    option.header,
    option.footer,
    option.items,
    option.collapsible
)
/**
 * leistrap `TopNav` component 
 * @typedef {{parent:BaseElement, 
 * links:[{name:string, href :string}], 
 * type:BtnType,
 *  position:"sticky"|"fixed",
 *  dropDowns:[]}}NavOptions
 * @param {NavOptions} option  TopNav Options
 * @returns {TopNav}
 */
leistrap.TopNav = (option = {}) => new TopNav(
    option.parent,
    option.links,
    option.position,
    option.type,
    option.dropDowns)

/**
* leistrap `Collapsible` component
* @typedef {{caption :string,
* parent:BaseElement,
* content : BaseElement[]}}CollapsibleOptions
* @param {CollapsibleOptions} option 
* @returns {Collapsible}
*/
leistrap.Collapsible = option => new Collapsible(
    option.parent,
    option.content,
    option.caption
)

/**
* leistrap `SearBar` widget
* @param {options} option
* @returns {Input}
 */
leistrap.SearchBar = (option) => SearchBar(option)
/**
* leistrap.CloseBtn widget
* @param {EventType} eventType type of event 
* @param {Function} eventOnce the callback
*/
leistrap.CloseBtn = CloseBtn
/**
* leistrap `Modal` component
* @param {{parent:BaseElement}} option 
* @returns {Modal}
*/
leistrap.Modal = option => {
    if (!option) { option = {} };
    return new Modal(option.parent)
}
/**
 * leistrap ComboBox Component
 */
leistrap.ComboBox = option => new ComboBox(option)

/**
 * leistrap Horizontal box Layout
 */
leistrap.HBoxLayout = option => {
    if (!option) { option = {} };
    return Layout.HBoxLayout(option.parent, option.content)
}

leistrap.VBoxLayout = option => {
    if (!option) { option = {} };
    return Layout.VBoxLayout(option.parent, option.content)
}
/**
* call the callback when the main window is clicked
* @param {Function} callback 
*/
leistrap.winClicked = (callback) => leisData.Callbacks.push(callback)
leistrap.getPageControler = () => leisData.PageControler
// main window eventListener
window.addEventListener("click", function (e) {
    leisData.lDropDown.forEach(dp => {
        dp.Dcontent.removeClass("show"); dp.Btn.removeClass("activeD")
    })
    leisData.Callbacks.forEach(cl => cl())
})
/**
* add css file
* @param {string} path 
*/
leistrap.insertCss = function (path) {
    const l = this.Link({
        otherAttr: {
            type: "text/css",
            rel: "stylesheet",
            href: path
        }
    })
    leis.addCssFile(document, l)
    return l
}

/**
 * main element
 */

leistrap.main = __main__(leistrap, window);
Object.defineProperty(leistrap, "MPC", { writable: false, value: leistrap.Div() })


// extensions 

leistrap.defineExtension = function (name, extn, option) {
    this[name] = obj.after(200, () => { extn(setting, leistrap, extensionOption) })
    this.extension[name] = extn;
}

// MPC and render | when app ready
leistrap.whenReady = function (listener, ...args) {
    !leis.hasConf(this.MPC) ? this.MPC.getPropWait().push(() => {
        obj.after(200, () => {
            obj.tryCode(() => { listener.call(this.MPC) },
                (error) => {
                    console.error(error);
                    const m = this.Modal();
                    m.setTitle("Error occured");
                    m.show();
                    m.add(this.P({ text: error.message }));
                    m.setSize("50%", "50vh");
                    m.clear();
                    window.document.body.append(m.point.render())
                })
        })
    }) :
        obj.after(200, listener, ...args)
}
// creations of elements

leistrap.createContent = function (elem, n, clb) {
    if (obj.isFunction(clb)) {
        return this.inRange(n, 0, (item, index) => clb(this[elem](), index, this[elem]));
    }
    else {
        return this.inRange(n, 0, (item, index) => this[elem]())
    }
}
// files API
const FileAPI = LeisFileAPI(globalThis, leistrap)
leistrap.exports = (object, channel) => FileAPI.exportsLeisObject(object, channel)
leistrap.imports = (path) => FileAPI.importsObject(path, leistrap)
leistrap.dep = extensionOption
// render  our page
Object.defineProperty(leistrap, "selectElement", { writable: false, value: selectElement })
Object.defineProperty(leistrap, "render", {
    writable: false, value: function (id) {
        this.selectElement({
            byId: true,
            id: id,
            content: [this.MPC]
        })
    }
})

export { leistrap }