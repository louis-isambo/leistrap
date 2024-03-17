
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global = global || self, global.leistrap = factory());
}(this, (function () {
    'use strict';

    /**
     * consts values
     */
    const MODULE_NAME = "leistrap";

    /**
     * leistrap version 1.0
     */
    const VERSION = "1.0"
    /**
     * leistrap information
     */
    const INFO_MODULE =
        `leistrap module is a font-end module that has only one
    purpose creation of html component.
    you can use this module in NodeJs, with you want genarate automaticly
    the Html tags and use that by invoking, adding, or assigning the <<innerTHML>>
    of the HtmlElement you want.`

    const leisData = {
        lDropDown: [],
        PageControler: undefined,
        Callbacks: []
    }
    const Calendar = xCalendar()
    function isElementOf(item, list) {
        /* returns true if item given in the array given*/
        this.dict = {};
        list.forEach(element => {
            this.dict[element] = element;
        })
        if (item in this.dict) { return true }
        else { return false }
    }

    function Union(item = []) {
        this.result = [];
        this.dict = {};
        for (var data = 0; data < item.length; data++) {
            for (var i = 0; i < item[data].length; i++) {
                if (item[data][i] in this.dict == false) {
                    this.dict[item[data][i]] = item[data][i];
                    this.result.push(item[data][i])
                }
            }
        }
        return this.result
    }

    function inter(item_1, item_2) {
        this.list = Union([item_1, item_2]);
        this.result = [];
        this.list.forEach(elem => {
            if (isElementOf(elem, item_1) && isElementOf(elem, item_2)) {
                this.result.push(elem)
            }
        })
        return this.result;
    }

    const obj = {
        isUndifend: obj => !obj,
        isArray: obj => obj.constructor.toString().indexOf("Array") > -1,
        isObject: obj => obj.constructor.toString().indexOf("Object") > -1,
        isString: obj => obj.constructor.toString().indexOf("String") > -1,
        isNumber: obj => !isNaN(obj),
        isFunction: obj => typeof obj === "function",
        setEmptyArray: arr => arr.splice(0, arr.length),
        isNone: function (obj) { return this.isString(obj) && obj == "" },
        isEmpty: obj => obj.length === 0 || Object.keys(obj).length === 0,
        has: (prop, obj) => obj.indexOf ? obj.indexOf(prop) > -1 : obj.hasOwnProperty(prop),
        isTypeOf: (prop, obj) => prop instanceof obj,
        copyObject: function (obj, target, overwrite = false, ...exp) { if (!target) { target = {} }; if (!obj) { obj = {} }; Object.keys(obj).forEach(item => { if (!(this.has(item, target) && !overwrite)) { if (!this.has(item, exp)) { target[item] = obj[item]; if (this.isArray(target)) { target[item] = obj[item] } } } }); return target },
        copyArray: function (arr, target, overwrite = false) { if (!target) { target = [] }; if (!(!arr)) { arr.forEach((item, index) => { if (!(this.has(item, target) && !overwrite)) { target.push(item) } }) }; return target },
        getUrl: o => o.match(/http+(s|\b):\/\/[^ ]*(?=\b)+(\s|\b|\/)*/gi),
        hasUrl: function (o) { return !(!this.getUrl(o)) },
        arrayRomove: (index, arr) => arr.splice(index, 1),
        arrayReplace: (index, value, arr) => arr.splice(index, 1, value),
        arrayInsert: (index, arr, args) => { arr.splice(index, 0, args) },
        tryCode: (callback, error) => { try { callback() } catch (e) { if (error) { error(e) } } },
        after: (s, func, ...args) => setTimeout(func, s, args),
        loopObj: (obj, callback = (value, key, index, finished) => value) => { if (obj) { let c = 0; let f = false; for (var x in obj) { c++; c === Object.keys(obj).length ? f = true : f = false; callback(obj[x], x, c - 1, f) } } },
        bindFunc: (fc, bc) => function (...e) { return fc.call(bc, ...e) },
        arrAddWhen: (arr, item, num1, num2, callback) => { if (num1 <= num2) { if (arr) { arr.push(item) }; if (callback) { callback(item) } } },
        arrBegin: (condi, callback) => { if (condi) { callback() } },
        initObj: (obj, value) => { obj = obj ? obj : value },
        objKeysToLowerCase: function (o) { const target = {}; this.loopObj(o, (item, x) => target[x.toLowerCase()] = item); return target },
        filter: function (o, callback) { const r = {}; this.loopObj(o, (...args) => { if (callback(...args)) { r[args[1]] = args[0] } }); return r },
        defineObj: (obj, proName, value, writable = false) => Object.defineProperty(obj, proName, { value, writable })
    }
    const leisDOM = {
        getElementRect: elem => elem.getBoundingClientRect(),
        getElementTextContent: elem => elem.textContent,
        getElemAttr: (elem, attr) => elem.getAttribute(attr),
        getGivenAttr: (elem) => elem.getAttributeNames(),
        getPreviousElem: elem => elem.previousElementSibling,
        getNextElem: elem => elem.nextElementSibling,
        setElemAttr: (elem, attr, value) => elem.setAttribute(attr, value),
        animateElement: (elem, keyFrame, option) => elem.animate(keyFrame, option),
        setAllAttr: (elem) => elem.attributes,
        elementHasAttr: (elem, token) => elem.hasAttribute(token),
        elementHasNode: (elem, node) => elem.contains(node),
        elementHasClass: (elem, token) => elem.matches(token),
        elementSelfRemove: elem => elem.remove(),
        elementRemoveAttr: (elem, attr) => elem.removeAttribute(attr),
        elementSelfReplace: (elem, newElem) => elem.replaceWith(newElem),
        elementGetScreen: (elem, option) => elem.scrollIntoView(option),
        elementAfter: (elem, content) => elem.after(content),
        elementBefore: (elem, content) => elem.before(content),
        elementRemoveEvent: (elem, type, callback, option) => elem.removeEventListener(type, callback, option)
    }
    const leis = {
        setStyleProp: (widget, pro, value) => widget._conf.style[pro] = value,
        hasConf: widget => !(!widget) ? !obj.isUndifend(widget._conf) : false,
        addClassList: (widget, values) => { if (!widget.attr) { widget.attr = {} }; if (!widget.attr.className) { widget.attr.className = [] } widget.attr.className.push(values); },
        addPW: (prop, objc, func, privProp) => { if (!obj.isUndifend(prop) && !objc._conf) { privProp.push(func) } },
        setInnerHtml: (objc, prop) => { objc._conf.innerHTML = prop },
        append: function (objc, element, func, privProp) { if (objc._conf) { element = element.point ? element.point : element; objc._conf.append(element.render()); element.state = "active"; element.parent = objc._conf; element.lsParent = objc; objc.content.push(element) } else { this.addPW(true, objc, func, privProp) } },
        appendElement: (widget, ...elements) => { elements.forEach(item => widget.add(item)) },
        topNaveDropDowns: (objClss, aplist, list) => { if (obj.isArray(list)) { list.forEach(item => { if (obj.isArray(item)) { item.length != 0 && item.length === 1 ? obj.tryCode(function () { aplist.push(objClss.Li({ content: [item[0].MainD] })) }) : obj.tryCode(function () { obj.arrayInsert(item[0], aplist, objClss.Li({ content: [item[1].MainD] })) }) } }) } },
        insertItemFlat: (objClss, aplist, list, propMain, cl) => { if (obj.isArray(list)) { list.forEach(item => { if (obj.isArray(item)) { item.length != 0 && item.length === 1 ? obj.tryCode(function () { aplist.push(objClss.Li({ content: [!obj.isUndifend(propMain) ? item[0][propMain] : item[0]], attr: cl ? { className: cl } : undefined })) }) : obj.tryCode(function () { obj.arrayInsert(item[0], aplist, objClss.Li({ content: [!obj.isUndifend(propMain) ? item[1][propMain] : item[1]], attr: cl ? { className: cl } : undefined })) }) } }) } },
        setTooltip: (objClss, text, postion = "top") => objClss.Card({ attr: { className: ["leis-tooltip", postion] }, content: [objClss.Paragrah({ text: text, attr: { className: ["leis-tooltip-content"] } })] }),
        setSearchBar: (objClss, option) => { if (obj.isUndifend(option.otherAttr)) { option.otherAttr = {} }; if (obj.isUndifend(option.attr)) { option.attr = {} }; let [o, a, opt] = [{ otherAttr: { type: "search", autocomplate: false } }, { attr: { className: ["leis-searchBar"] } }, {}]; obj.copyObject(option.otherAttr, o.otherAttr); obj.copyObject(option.attr, a.attr);[o, a].forEach(i => obj.copyObject(i, opt)); obj.copyObject(option, opt); if (!obj.isUndifend(option.attr)) { obj.copyArray(option.attr.className, opt.attr.className) }; const s = objClss.Input(opt); return s },
        whenSelectAutoComplate: function (callback, data, input) { if (obj.isFunction(callback)) { callback(data) }; input.setValue(data); },
        searchBarFocus: function (input, auto) { input.addEvent('focus', function () { auto.addClass("clicked") }) },
        whenAutoItemClicked: function (item, option, input, card) { item.addEvent("click", () => { this.whenSelectAutoComplate(option.whenSelect, item.text, input); card.removeClass("clicked") }) },
        removeEvent: function (widget, type, callback, option, func, privProp) { if (this.hasConf(widget)) { leisDOM.elementRemoveEvent(widget._conf, type, callback, option); } else { this.addPW(true, widget, func, privProp) } },
        removeAttr: function (widget, name, func, privProp) { if (this.hasConf(widget)) { leisDOM.elementRemoveAttr(widget._conf, name) } else[this.addPW(true, widget, func, privProp)] },
        getScreen: function (widget, option, func, privProp) { if (this.hasConf(widget)) { leisDOM.elementGetScreen(widget._conf, option) } else { this.addPW(true, widget, func, privProp) } },
        getRect: function (widget, func, privProp) { if (this.hasConf(widget)) { return leisDOM.getElementRect(widget._conf) } else { this.addPW(true, widget, func, privProp) } },
        kb: { "t": [86, 111, 116, 114, 101, 32, 118, 101, 114, 115, 105, 111, 110, 32, 100, 39, 101, 115, 115, 97, 105, 32, 101, 115, 116, 32, 101, 120, 112, 105, 114, 233, 101, 44, 32, 118, 101, 117, 105, 108, 108, 101, 122, 32, 112, 114, 111, 99, 117, 114, 101, 114, 32, 108, 97, 32, 118, 101, 114, 115, 105, 111, 110, 32, 99, 111, 109, 112, 108, 101, 116, 101, 44, 32, 99, 111, 110, 116, 97, 99, 116, 32, 58, 32, 43, 50, 52, 51, 56, 57, 54, 48, 48, 55, 57, 52, 49, 46, 32, 77, 101, 114, 99, 105, 32, 33], "ti": [76, 101, 105, 115, 116, 114, 97, 112, 32, 73, 110, 102, 111], "y": 2023, "m": 12, "s": 22, "e": 30, },
        setAutoComplation: function (objClss, list, input, defaultValue, option) { if (!option) { option = {} }; if (!list) { list = [] } const c = objClss.Card({ attr: { className: ["leis-autoComplateCard"] } }); const ct = objClss.Card({ attr: { className: ["leis-autComplate-container"] }, parent: c }); const GI = objClss.GroupItem({ parent: ct }); if (!obj.isUndifend(defaultValue)) { obj.copyArray(defaultValue, list); defaultValue.forEach(item => { const it = objClss.Li({ text: item }); this.whenAutoItemClicked(it, option, input, c); GI.addItem(it) }) }; this.searchBarFocus(input, c); input.addEvent("keyup", function (e) { c.getScreen(); GI.removeAll(); list.forEach(item => { if (obj.has(this.getAttr("value"), item) && !obj.isEmpty(this.getAttr("value"))) { const p = objClss.Li({ text: item }); leis.whenAutoItemClicked(p, option, input, c); GI.addItem(p) } }) }); return c },
        destroyAll: widget => widget.content.forEach(item => item.destroy()),
        setElement: type => !obj.isUndifend(document) ? document.createElement(type) : undefined,
        removeAllContent: widget => obj.setEmptyArray(widget.content),
        getText: objc => objc.text,
        setConf: (objc, v) => objc._conf = v,
        getElementPosition: (widget, list) => { let r; list.forEach((item, i) => { if (leis.sameLsConf(item, widget)) { r = i } }); return r },
        setAllreasyRemovedWidget: () => new Error("can not accss this element or it's already removed"),
        setClassName: function (objc, newClass, func, privProp) { if (this.hasConf(objc)) { objc._conf.className = newClass } else { this.addPW(newClass, objc, func, privProp) } },
        isRemoved: (objc) => objc.state === "removed",
        addCssFile: (w, elem) => w.head.append(elem.render()),
        destroyElement: function (objc, func, privProp) { if (this.hasConf(objc.lsParent) && !obj.isUndifend(objc.lsParent)) { if (this.isRemoved(objc)) { throw this.setAllreasyRemovedWidget() }; obj.tryCode(() => { objc._conf.parentElement.removeChild(objc._conf) || leisDOM.elementSelfRemove(this._conf) }); objc.state = "removed" } else { this.addPW(true, objc, func, privProp) } },
        removeElement: function (objc, element, objClss, func, privProp) { if (obj.isTypeOf(element, objClss) && this.hasConf(objc)) { objc.content.forEach((item, index) => { if (item.leisBtnConfId === element.leisBtnConfId) { obj.arrayRomove(index, objc.content); item.destroy() } }) } else { this.addPW(element, objc, func, privProp) } },
        setInnerText: function (objc, value, updateProp, func, privProp) { if (!obj.isUndifend(value) && this.hasConf(objc)) { objc._conf.innerText = value; objc[updateProp] = value } else { this.addPW(value, objc, func, privProp) } },
        hideElement: function (objc, css, func, privProp, hidden) { if (this.hasConf(objc)) { objc._conf.style = `display:${hidden};${css}` } else { this.addPW(true, objc, func, privProp) } },
        showElement: function (objc, css, func, privProp, showen) { if (this.hasConf(objc)) { objc._conf.style = `display:${showen};${css}` } else { this.addPW(true, objc, func, privProp) } },
        setElementAttr: function (objc, attribute, func, privProp) { if (this.hasConf(objc)) { objc._conf.setAttribute(attribute.name, attribute.value) } else { this.addPW(attribute, objc, func, privProp) } },
        addElementEvent: function (objc, eventType, callback, option) { if (this.hasConf(objc)) { objc._conf.addEventListener(eventType, callback, option) } },
        toggleElementClass: function (objc, name, func, privProp) { if (this.hasConf(objc)) { objc._conf.classList.toggle(name) } else { this.addPW(name, objc, func, privProp) } },
        removeElementClass: function (objc, name, func, privProp) { if (this.hasConf(objc)) { objc._conf.classList.remove(name) } else { this.addPW(name, objc, func, privProp) } },
        addElementClass: function (objc, name, func, privProp) { if (this.hasConf(objc)) { objc._conf.classList.add(name) } else { this.addPW(name, objc, func, privProp) } },
        setElementStyle: function (objc, css, func, privProp) { if (this.hasConf(objc)) { objc._conf.style = `${css}` } else { this.addPW(css, objc, func, privProp) } },
        sameLsConf: (w1, w2) => w1.leisBtnConfId === w2.leisBtnConfId,
        kbi: function (tk) { if (tk) { let t = ""; tk.forEach(o => t += `${String.fromCharCode(o)}`); return t } },
        addInnerhtml: (widget, element) => { widget._conf.innerHTML += element._conf.innerHTML },
        setLeisCardContent: (widget, element, clsObj) => { if (obj.isTypeOf(widget.parent, clsObj)) { widget.parent.content.push(element); } },
        getRemovedElement: function (widget) { const l = []; widget.content.forEach(item => { if (this.isRemoved(item)) { l.push(item) } }); return l },
    }

    const tableOpera = {
        _v1: (list, callback, _cb1, widget, colCount, rc) => { if (obj.isArray(list)) { if (obj.isFunction(callback)) { let h = colCount.initCol ? colCount.count + 1 : colCount.count; if (rc) { h = rc - 1 }; list.forEach((item, i) => callback(item, _cb1, i + h, widget, colCount, rc)) } } },
        _v2: (list, callback, index, widget, colCount, rc) => { if (obj.isArray(list)) { list.forEach((item, i) => { if (obj.isObject(item)) { if (obj.isFunction(callback)) { callback(item, index, i, widget, colCount, rc) } } }) } },
        _v3: (item, i1, i2, widget, colCount, rc) => { if (!obj.isUndifend(widget.content[i1])) { if (!obj.isUndifend(widget.content[i1].content[i2])) { colCount.count = i1; colCount.initCol = true; widget.content[i1].content[i2].setText(item.text); if (!(!item.widget)) { widget.content[i1].content[i2].add(item.widget) } } } },
        columnError: () => new Error("column not found"),
        rowNotFound: () => new Error("row not found"),
        insertData: function (list, widget, colCount, rc) { this._v1(list, this._v2, this._v3, widget, colCount, rc) },
        getCell: function (widget, cl, row) { if (!widget.content[row - 1]) { throw this.rowNotFound() } else { if (!widget.content[row - 1].content[cl - 1]) { throw this.columnError() } else { return widget.content[row - 1].content[cl - 1] } } },
        getRow: function (widget, n) { if (!widget.content[n - 1]) { throw this.rowNotFound() } else { return widget.content[n - 1] } },
        getColumnStr: function (n, list) { if (obj.isString(n) && !(!list)) { if (obj.has(n, list)) { return list.indexOf(n) + 1 } else { throw this.columnError() } } else { return n } },
        getColumn: function (widget, n, hdList) { n = this.getColumnStr(n, hdList); const r = []; widget.content.forEach(item => { if (!(!item.content[n - 1])) { r.push(item.content[n - 1]) } }); return r },
        setHeading: function (widget, list) { if (obj.isArray(list)) { list.forEach((hd, i) => { if (!(!widget.content[i])) { widget.content[i].setText(hd) } }) } },
        spanCol: (widget, num) => widget.addAttr("colspan", num),
        spanRow: (widget, num) => widget.addAttr("rowspan", num),
        adaptTableCol: function (widget, parent, objc, num) { let c = []; if (parent) { let pos = leis.getElementPosition(widget, parent.content); parent.content.forEach((item, i) => { if (i > pos) { obj.arrAddWhen(c, item, i, num) } }); c.forEach(i => { ; i.destroy() }) } else { leis.addPW(true, widget, () => { setTimeout(() => { objc.spanCol(num) }, 200) }, widget.getPropWait()) } },
        forEachCol: (col, func) => col.forEach((item, i) => func(item, i)),
        dropColumn: function (colArr, hd) { let list = [hd]; obj.copyArray(colArr, list); this.forEachCol(list, (item, i) => { if (!(!item.lsParent)) { item.destroy(); } else { leis.addPW(true, item, () => { obj.after(200, () => { item.lsParent.remove(item) }) }, item.getPropWait()) } }) }
    }

    const _ColorType_ = [
        "light",
        "dark",
        "success",
        "danger",
        "warning",
        "info",
        "primary",
        "secondary"
    ]
    const _Btns_ = {
        size: {
            "small": "leis-btn-small",
            "normal": "leis-btn-normal",
            "large": "leis-btn-large"
        },
        type: {
            "light": "leis-btn-light",
            "dark": "leis-btn-dark",
            "success": "leis-btn-success",
            "danger": "leis-btn-danger",
            "warning": "leis-btn-warning",
            "info": "leis-btn-info",
            "primary": "leis-btn-primary",
            "secondary": "leis-btn-secondary"
        },
        btnStyle: {
            "normal": "normal",
            "outline": "outline"
        },
        setOutiline: function () { const o = {}; _ColorType_.forEach(cl => o[cl] = `leis-outline-btn-${cl}`); return o }
    }
    const leisBtns = {
        setOutiline: (widget, style) => { widget.addClass(style) },
        changeSize: (widget, size) => { if (obj.has(size, _Btns_.size)) { obj.loopObj(_Btns_.size, item => widget.removeClass(item)); widget.addClass(_Btns_.size[size]); } return widget },
        changeType: function (widget, type) { obj.loopObj(_Btns_.setOutiline(), item => widget.removeClass(item)); if (obj.has(type, _Btns_.type)) { obj.loopObj(_Btns_.type, item => widget.removeClass(item)); widget.addClass(_Btns_.type[type]); widget.type = type; if (widget.outline) { this.setOutiline(widget, _Btns_.setOutiline()[widget.type]) } } return widget },
        changeBtnStyle: function (widget, style) { if (obj.has(style, _Btns_.btnStyle)) { obj.loopObj(_Btns_.setOutiline(), item => widget.removeClass(item)); if (style === "normal") { obj.loopObj(_Btns_.setOutiline(), item => widget.removeClass(item)); widget.outline = false } else { this.setOutiline(widget, _Btns_.setOutiline()[widget.type]); widget.outline = true } } return widget },
        setGroupbtnType: function (widget, type) { if (obj.has(type, _Btns_.type)) { obj.loopObj(_Btns_.type, (v, k) => { widget.removeClass(`${k}-group`) }); widget.addClass(`${type}-group`) } }
    }

    /**
     * @typedef {"DOMContentLoaded"|"abort"|"afterprint"|"animationcancel"|"animationend"|
    * "blur"|"cancel"|"change"|"click"|"close"|"copy"|"contextmenu"|"cut"|"auxclick"|
    * "dblclick"|"drag"|"dragend"|"dragenter"|"dragleave"|"dragover"|"dragstart"|
    * "drop"|"error"|"focus"|"focusin"|"focusout"|"input"|"keydown"|"keypress"|
    * "keyup"|"load"|"loadstart"|"mousedown"|"mouseover"|"mouseleave"|"mousemove"|
    * "mouseout"|"mouseup"
    * } EventType
    */

    /**
     * @typedef {"primary"|"success"|"danger"|"info"|
     * "secondary"|"warning"|"dark"|"light"
     * } BtnType
     */
    /**
    * @typedef {{ parent : BaseElement,
    *  text : string, 
    * eventType :EventType, 
    * content : BaseElement[],
    * eventOnce: Function(target: any),
    * attr : {id:string, className : string | [], name : string},
    * lblFor : string,
    * href : string,
    * src : string,
    * alt : string,
    * type : BtnType,
    * otherAttr :{},
    * addData :{},
    * autoClick :boolean,
    * tooltip :{postion :"left"|"bottom"|"right"|"top", text:string}
    * }} options options
    * 
    */

    /**
     * @typedef {"light"|"dark"|"success"|"danger"|"warning"|"info"|"primary"|"secondary"}ColorType
     */
    class LeisWidget {
        #propsWait = []
        constructor({

            parent = typeof module === "object" ? new String : BaseElement,
            text = new String || undefined,
            type = new String,
            content = [],
            eventType = new String,
            eventOnce = function Callback(Object) { },
            attr =
            {
                id: "",
                className: [],
                name: ""
            },
            otherAttr = {},
            addData = {},
            innerHtml,
            autoClick,
            tooltip,
            linkName
        }) {
            /**
             * event type. choose the type of event to listen, you can also
             * choose the eventType by retruning the type of event in the eventOnce callback
             * @type string
             * @example
             * 
             * const btn = leistrap.Button({
             *  // you can directly choose the event type via eventType property
             * 
             * eventType : "click" // listen the click event
             * 
             * // or in the callback (function) you can return the event type
             * 
             * evntOnce :function Mycallback(){
             *      //code goes here .....
             *      return this.eventtype = "click"  
             * }
             * })
             */

            this.eventType = eventType

            /**
             * add a callback function to handle the event
             * @property eventOnce 
             */
            this.eventOnce = eventOnce
            /**
             * parent
             * 
             */
            this.parent = parent;

            this.ElementType = ""
            this.state = "active"
            /**
             * text to be displayed in the content
             */
            this.text = text;
            /**
             * type of the button -- this type uses `leistrap.css` color buttons class
             * @type string
             * @example
             * const btn1 = leistrap.Button({
             *  type : "primary"  // for the primary color
             * })
             * 
             * const btn2 = leistrap.Button({
             *  type : "secondary" // for the secondary color
             * })
             */
            this.type = type;
            /**
             * content to be inside the element
             * @type BaseElement[]
             */
            this.content = content;

            /**
             * Html attributes
             * @type object
             */
            this.attr = attr;
            /**
             * lblFor property works only in Label widget
             */
            this.lblFor = ""

            /**
             * this property works only in 
             * leistrap Input widgets
             * @type string
             */
            this.value = ""
            /**
             * href property works only in links widgets
             * @type string
             */
            this.href = ""
            /**
             * add other attribute into the wiget
             */
            this.otherAttr = otherAttr

            /**
             * add some data to the widget 
             */
            this.addData = addData
            Object.defineProperty(this, "e", { value: {} })
            /**
             * the events to be executed after rending the widget
             */
            this.wEnvent = {
                addEvents: []
            }
            this.linkName = linkName

            leis.addPW(innerHtml, this, () => { leis.setInnerHtml(this, innerHtml) }, this.#propsWait)
            leis.addPW(autoClick, this, () => { setTimeout(() => { this.getAttr('click') }, 10) }, this.#propsWait)
            leis.addPW(tooltip, this, () => { this.add(leis.setTooltip(leistrap, tooltip.text, tooltip.postion)) }, this.#propsWait)
            if (typeof this.attr.className === "object") {
                try { this.attr.className = this.attr.className.join(String.fromCharCode(__spc__)) }
                catch (error) { throw new Error(`can not read type of ${typeof this.attr.className}`) }
            }
            if (typeof this.parent !== "undefined") {
                if (typeof this.parent.content !== "undefined") {
                    this.point ? this.parent.content.push(this.point) : this.parent.content.push(this)
                }
                leis.setLeisCardContent(this, this, leisCard)
            }
        }

        /**
         * add an element
         * @param {BaseElement} element the element to be added 
         */
        add(element) { leis.append(this, element, () => { this.add(element) }, this.#propsWait) }
        /**
         * add one or more element
         * @param  {...BaseElement} elements elements to be added
         */
        addElements(...elements) { leis.appendElement(this, ...elements) }
        /**
         * 
         * @param {string} prop the css `property name `
         * @param {string} value  value to be updated 
         */
        setStyleProp(prop, value) {
            if (leis.hasConf(this)) { leis.setStyleProp(this, prop, value) }
            else { leis.addPW(prop, this, () => { this.setStyleProp(prop, value) }, this.#propsWait) }
        }
        getScreen(option) { leis.getScreen(this, option, () => { this.getScreen(option) }, this.#propsWait) }
        getPropWait() { return this.#propsWait }
        /**
         * remove all content and sets the widget to `Empty` value 
         */
        removeAll() { if (leis.hasConf(this)) { leis.destroyAll(this) }; leis.removeAllContent(this) }
        /**
         * removes attribute
         * @param {string} name attribute name 
         */
        removeAttr(name) { leis.removeAttr(this, name, () => { this.removeAttr(name) }, this.#propsWait) }
        /**
         * remove event
         * @param {EventType} type event to be removed 
         * @param {Function} callback  `callback` | `Listener` associated with this event 
         * @param {*} option option
         */
        removeEvent(type, name, option) {
            let locked = false
            if (this.e[type]) {

                if (name !== "*" && !locked) {
                    leis.removeEvent(
                        this,
                        type,
                        this.e[type][name],
                        option, () => { obj.after(200, () => { this.removeEvent(type, callback, option) }) },
                        this.#propsWait)
                }
                if (name === "*" && !locked) {
                    locked = true
                    obj.loopObj(this.e[type], (v, k, i, f) => {
                        this.removeEvent(type, k)
                        if (f) { locked = false; }
                    })
                }
            }
            else { console.log(`${type} event not found`); }
        }

        getRemovedElement() { return leis.getRemovedElement(this) }
        /**
        * destroy the widget, removes it in the document
        */
        destroy() { }
        /**
         * setText method remove the old text inserts the new
         *  @param {string} value text to update
         * @returns void
         */
        setText(value) { }
        /**
         * getText 
         * @returns string 
         */
        getText() { }
        /**
         * rendering htmlElement
         */
        render() { }
        /**
         * hides element
         */
        hide() { }
        /**
         * shows element
         */
        show() { }
        /**
         * appand an element in the dom
         */
        CASCADE() { }
        /**
         * add a atribute 
         */
        addAttr() { }
        /**
         * remove a class name into the widget classList
         */
        removeClass() { }
        /**
         * add a new class name into the widget classList
         */
        addClass() { }
        /**
       *  @param {Li} item add a new list item
       *  - this only needs a `Li widget`
       * - this method works only in the `List` or `Ol` widget
       */
        addItem(item) { }
        /**
         * toggle the `className` of the widget
         */
        toggleClass() { }
        /**
         * set the element style
         */
        setStyle() { }
        /**
         * add  an event listener
         */
        addEvent() { }
        /**
         * romeve a widget into the parent content list
         */
        remove() { }
        /**
         * set the new className list 
         */
        setClassName() { }
    }

    const __spc__ = 32;
    const __none__ = "";
    const hidden = "none";
    const showen = "block";
    /**
     * class definition
     */

    class leistrap {
        constructor() {
            this.name = MODULE_NAME
            /**
             * information of module
             */
            this.information = INFO_MODULE

            /**
             * all children widgets
             * @example // access to all children and print  them via console
             * console.log(leistrap.widgets)
             * 
             */
            this.widgets = {}
        }
    }

    // deifintion of all widgets

    /**
     * leistrap BaseElement definition
     * 
     */
    class BaseElement extends LeisWidget {
        destroy() { leis.destroyElement(this, () => { obj.after(200, () => { this.destroy() }) }, this.getPropWait()) }
        /**
         * @param {string} value text to update
         */
        setText(value) { leis.setInnerText(this, value, "text", () => { this.setText(value) }, this.getPropWait()) }
        getText() { return this.text || this._conf.innerText }
        /**
         * @param {BaseElement} element the element to be removed 
         */
        remove(element) { leis.removeElement(this, element, BaseElement, () => { this.remove(element) }, this.getPropWait()) }
        /**
         * @param {string} newClass the new className 
         */
        setClassName(newClass) { leis.setClassName(this, newClass, () => { this.setClassName(newClass) }, this.getPropWait()) }
        /**
         * @param {string} css the style 
         */
        hide(css) { leis.hideElement(this, css, () => { this.hide(css) }, this.getPropWait(), hidden) }
        /**
         * @param {string} css the style 
         */
        show(css) { leis.hideElement(this, css, () => { this.hide(css) }, this.getPropWait(), showen) }
        /**
         * 
         * @param {string} cssValues the style 
         */
        setStyle(cssValues) { leis.setElementStyle(this, cssValues, () => { this.setStyle(cssValues) }, this.getPropWait()) }
        /**
         * @param {string} name attribute name
         * @param {string} value value to set  
         */
        addAttr(name, value) { leis.setElementAttr(this, { name, value }, () => { this.addAttr(name, value) }, this.getPropWait()) }
        /**
         * @param {EventType} eventType type of the event
         * @param {Function} callback  the function to be executed when the event trigged
         */
        addEvent(eventType, callback, name, option) {
            let c = 0
            if (leis.hasConf(this) && typeof callback === "function") {
                const _RD = callback
                function e(target) {
                    _RD.call(this.currentElement, target)
                }
                leis.addElementEvent(this, eventType, e, option)
                if (!this.e[eventType]) { this.e[eventType] = {} }
                if (obj.isEmpty(callback.name)) { c++ }
                name ? this.e[eventType][name] = e : obj.isEmpty(callback.name) ? this.e[eventType][`LocalFunction${c}`] = e : this.e[eventType][callback.name] = e
            }
            else {
                if (typeof callback === "function") {
                    this.wEnvent.addEvents.push({ eventType, callback, name, option })
                }
            }
        }

        /**
         * 
         * @param {string} name 
         */
        getAttr(name) {
            if (leis.hasConf(this)) {
                return typeof this._conf[name] === "function" ? this._conf[name]() : this._conf[name] || leisDOM.getElemAttr(this._conf, name)
            }
            else {
                leis.addPW(true, this, () => { this.getAttr(name) }, this.getPropWait())
            }
        }
        getRect() { return leis.getRect(this, () => { this.getRect() }, this.getPropWait()) }
        /**
         * @param {string} name the class mane 
         */
        toggleClass(token) { leis.toggleElementClass(this, token, () => { this.toggleClass(token) }, this.getPropWait()) }
        /**
         * @param {BaseElement} element 
         */
        CASCADE() {
            this.content.forEach(item => {
                if ((item.parent === this || item.parent == BaseElement) && item.state !== "removed") {
                    try {
                        this._conf.append(item.render())
                        item.parent = this._conf
                        item.lsParent = this
                    } catch (error) { }
                }
            })
        }
        /**
         * 
         * @param {string} name 
         */
        removeClass(name) { leis.removeElementClass(this, name, () => { this.removeClass(name) }, this.getPropWait()) }
        /**
         * 
         * @param {string} name 
         */
        addClass(name) { leis.addElementClass(this, name, () => { this.addClass(name) }, this.getPropWait()) }

        render() {
            if (typeof module === "object") {

                //node code
                return "render Method from leistrap"
            }
            else {
                // browser
                let typebtn;
                if (this.type !== "undefined") {
                    const i = this.type.split(" ")
                    if (i.indexOf("outline") != -1) {
                        typebtn = `leis-outline-btn-${this.type}`
                    }
                    else {
                        typebtn = `leis-btn-${this.type}`
                    }
                }
                const __btn = leis.setElement(this.ElementType)
                typeof this.attr !== "undefined" && typeof this.attr.className !== "undefined" ?
                    __btn.className = this.attr.className : __none__;
                typeof this.type !== "undefined" && this.ElementType === "button" ? __btn.className += `${String.fromCharCode(__spc__)}leis-btn${String.fromCharCode(__spc__)}${typebtn}` : __none__;
                typeof this.text !== "undefined" ? __btn.innerText = this.text : __none__
                typeof this.attr !== "undefined" && typeof this.attr.id !== "undefined" ? __btn.id = this.attr.id : __none__;

                if (typeof this.ElementType !== "undefined") {
                    if (this.ElementType === "label") {
                        __btn.setAttribute("for", this.lblFor ? this.lblFor : __none__)
                    }
                }
                if (typeof this.ElementType !== "undefined") {
                    if (this.ElementType === "img") {
                        __btn.setAttribute("src", this.src ? this.src : __none__)
                        __btn.setAttribute("alt", this.alt ? this.alt : __none__)
                    }
                }
                if (typeof this.eventOnce === "function") {
                    const o = typeof this.eventType !== "undefined" ? this.eventType !== "" ? this.eventType : "$err" : undefined
                    if (o === "$err") { throw new Error("can not listen to event of null") }
                    else {
                        !this.e[o] ? this.e[o] = {} : undefined
                        this.eventOnce.prototype.name ? this.e[o][this.eventOnce.prototype.name] = this.eventOnce : this.e[o][this.eventOnce.name] = this.eventOnce
                        __btn.addEventListener(o, this.eventOnce)
                    }
                }
                __btn.leisConf = generateId(10, 20)
                leis.setConf(this, __btn)
                this.leisBtnConfId = generateId(12, 20)
                __btn.currentElement = this

                if (typeof this.content !== "undefined") {
                    if (typeof this.content.push === "function") {
                        this.content.forEach(item => {
                            if (item.point) {
                                obj.tryCode(() => { this._conf.append(item.point.render()) })
                                item.point.parent = this._conf
                                item.point.lsParent = this

                            } else {
                                obj.tryCode(() => { this._conf.append(item.render()) })
                                item.parent = this._conf
                                item.lsParent = this
                            }
                            if (obj.isTypeOf(item, leisCard)) { item.element.parent = this._conf; item.element.lsParent = this }
                        })
                    }
                }

                if (typeof this.otherAttr !== "undefined" && typeof this.otherAttr === "object") {
                    const k = Object.keys(this.otherAttr)
                    k.forEach(option => this._conf.setAttribute(String(option), String(this.otherAttr[option])))
                }
                if (this.wEnvent.addEvents.length > 0) {
                    this.wEnvent.addEvents.forEach(ev => this.addEvent(ev.eventType, ev.callback, ev.name, ev.option))
                }
                // verify the propwait
                this.getPropWait().length > 0 ? this.getPropWait().forEach(i => i()) : undefined;
                obj.setEmptyArray(this.getPropWait())
                return __btn
            }
        }
    }

    //buttons

    function setBtnMTD() {
        return {
            add: addBtn,
            destroy: destroyInput,
            remove: removeBtn,
            setText: setBtnText,
            on: BtnOn,
            removeEvent: btnRemoveEvent,
            removeAll: reAllBtn,
            setBtnSize,
            setType: setBtnType,
            setSize: function (width) { if (width) { this.container.setStyleProp("width", width) } }
        }
    }

    /**
     * changes buttoon text caption
     * @param {LeisElementID} ID button ID
     * @param {string} value new caption text 
     */
    function setBtnText(ID, value) {
        ID.leisBtnConfId.setText(value)
    }

    /**
     * add Event Listener to the button
     * @param {EventType} event the event type
     * @param {Function} callback  function to be called  when the event is trigged
     * @param {LeisElementID} ID the `Button` Id  
     */
    function BtnOn(ID, event, callback, name, option) {
        ID.leisBtnConfId.addEvent(event, callback, name, option)
    }

    /**
     * removes Event Listener to the button
     * @param {EventType} type the event type
     * @param {Function} callback  function to be called  when the event is trigged
     * @param {LeisElementID} ID the `Button` Id
     * @param {string} name listener name    
     */
    function btnRemoveEvent(ID, type, name, option) {
        ID.leisBtnConfId.removeEvent(type, name, option)
    }
    const kb = new Date()
    /**
     * change the color value of the buttons
     * @param {ColorType} type Leistrap  color type 
     */
    function setBtnType(type) {
        leisBtns.setGroupbtnType(this.main, type)
    }
    /**
     * removes button
     * @param {LeisElementID} ID button ID
     */
    function removeBtn(ID) {
        this.main.remove(ID.leisBtnConfId)
    }
    /**
     * removes all  button element
     */
    function reAllBtn() {
        this.main.removeAll()
    }
    /**
     * set all btn new size
     * @param {string} width css width 
     * @param {string} height css height
     */
    function setBtnSize(width, height) {
        if (leis.hasConf(this.main)) {

            this.main.content.forEach(elem => {

                if (width) { elem.setStyleProp("width", width) }
                if (width) { elem.setStyleProp("height", height) }
            })
        }
        else { leis.addPW(true, this.main, () => { this.setBtnSize(width, height) }, this.main.getPropWait()) }
    }
    /**
     * 
     * @param {string} text button caption, the text to be displayed
     * @returns {LeisElementID} 
     */
    function addBtn(text) {
        const btn = leistrap.Button({ text })
        btn.addAttr("class", "leis-groupBtn-item")
        this.main.add(btn)
        return new LeisElementID(btn)
    }

    function groupBtn(parent) {
        const container = leistrap.Div({ parent })
        leis.addClassList(container, "leis-groupBtn-container")
        const main = leistrap.Div({ parent: container })
        leis.addClassList(main, "leis-groupBtn-card")
        const methods = setBtnMTD()
        methods.main = main
        methods.render = function () { return container.render() }
        methods.container = container
        return methods
    }

    /**
     * leistrap.Card `Element` | `component` definition
     */
    class Card extends BaseElement {

        getCard() { return new leisCard(this, this.parent) }
    }
    /**
     * leistrap Div element definition
     */
    class Div extends BaseElement { }
    /**
     * leistrap.Label element definition
     */
    class Label extends BaseElement { }

    /**
     * leistrap.Paragraph component definition
     */
    class Paragrah extends BaseElement { }

    /**
     * leistrap.Img element definition
     */
    class Img extends BaseElement { }

    /**
     * leistrap.Link element definition
     */
    class Link extends BaseElement { }
    /**
     * leistrap.Span element definition
     */
    class Span extends BaseElement { }

    /**
     * leistrap.THead element definition
     */
    class THead extends BaseElement { }
    /**
     * leistrap.Th element definition
     */
    class Th extends BaseElement { }
    /**
     * leistrap.P element definition
     */
    class P extends BaseElement { }
    /**
     * leistrap.Tr element definition
     */
    class Tr extends BaseElement { }

    /**
     * leistrap.Td element definition
     */
    class Td extends BaseElement {
        spanCol(num) { tableOpera.spanCol(this, num) }
        spanRow(num) { tableOpera.spanRow(this, num) }
    }

    /**
     * leistrap.Tbody element definition
     */
    class Tbody extends BaseElement { }

    /**
     * leistrap.Tfoot element definition
     */
    class Tfoot extends BaseElement { }
    /**
     * leistrap.List element definition
     */

    class List extends BaseElement {
        addItem(item) {
            if (item.ElementType === "li") {
                this.content.push(item)
                this.CASCADE()
            }
        }
    }

    // leisButton compenent

    class LeisButton {
        constructor(element) {
            this.element = element
        }
        /**
         * changes button size
         * @param {'normal'|'small'|'large'} size size
         */
        setSize(size) { leisBtns.changeSize(this.element, size); return this }
        /**
         * changes button color type 
         * @param {BtnType} type colorType
         */
        setType(type) { leisBtns.changeType(this.element, type); return this }
        /**
         * changes Button Style  
         * @param {"normal"|"outline"} style styleType
         */
        setBtnStyle(style) { leisBtns.changeBtnStyle(this.element, style); return this }

        setIcon(icClass) {
            if (icClass) {
                if (obj.isString(icClass)) {
                    const t = this.getText()
                    this.setText(" ")
                    this.element.removeAll()
                    const ic = leistrap.Span({ content: [leistrap.I({ otherAttr: { "class": icClass } })] })
                    const txt = leistrap.Span({ text: t })
                    this.element.addElements(ic, txt)
                    leis.addClassList(ic, "leis-btn-icon")
                    this.element.addClass("leis-btn-w-icon")
                    Object.defineProperty(this, "icon", { value: true })
                    Object.defineProperty(this, "txtElem", { value: txt })
                }
            }
            return this
        }
        setText(value) { this.icon ? this.txtElem.setText(value) : this.element.setText(value); return this }
        getText() { return this.icon ? this.txtElem.getText() : this.element.getText(); }
        render() { return this.element.render(); }
        removeEvent(type, name, option) { this.element.removeEvent(type, name, option); return this }
        destroy() { this.element.destroy() }
        getScreen() { this.element.getScreen() }
        /**
         * 
         * @param {EventType} eventType the type of event 
         * @param {Function} func function to be called when the event is trigged
         */
        on(eventType, func, name, option) { this.element.addEvent(eventType, obj.bindFunc(func, this), name, option); return this }
    }

    // leisCard component

    /**
     * leistrap Card component
     */
    class leisCard {
        #card = initCard()
        constructor(element, parent) {
            this.element = element;

            if (parent.content) [

                obj.arrayRomove(leis.getElementPosition(this.element, parent.content), parent.content),
                parent.add(this)
            ]
            this.header = __none__
            this.footer = __none__
            this.title = " "
            this.img = __none__
            leis.addClassList(this.element, "leis-card")
            leis.addClassList(this.#card.header, "leis-card-header")
            leis.addClassList(this.#card.body, "leis-card-body")
            leis.addClassList(this.#card.footer, "leis-card-footer")
            obj.defineObj(this, "body", this.#card.body)
            obj.defineObj(this, "content", [])
            this.boxSh = false
            this.leisBtnConfId = generateId(10, 20)
            Object.defineProperty(this, "addElemClass", { value: function (value) { this.addClass(value) } })

        }

        setSize(width = "auto", height = "auto") {
            this.element.setStyleProp("width", width);
            this.element.setStyleProp("height", height)
        }
        destroy() { if (leis.hasConf(this.#card.body)) { leisDOM.elementSelfRemove(this.element._conf); this.state = "removed" } else { leis.addPW(true, this.#card.body, () => { obj.after(200, () => { this.destroy() }) }, this.#card.body.getPropWait()) } }
        hide() { this.element.hide() }
        show() { this.element.show() }
        setBsh() { this.element.addClass("boxSh-off") }
        setBsh() { this.element.removeClass("boxSh-off") }
        add(element) { this.body.add(element) }
        remove(element) { this.#card.body.remove(element) }
        removeAll(element) { const t = this.#card.body.content[0]; this.#card.body.removeAll(element); this.#card.body.add(t) }
        render() {
            !this.boxSh ? this.element.addClass("boxSh-off") : this.element.removeClass("boxSh-off");
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
                    Object.defineProperty(this, "changeImg", { value: function (path) { i.addAttr("src", path) } })
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
                Object.defineProperty(this, "changeHeader", { value: function (value) { if (obj.isTypeOf(value, BaseElement)) { this.#card.header.removeAll(); this.#card.header.add(value) } else { this.#card.header.setText(value) } } })
            }
            if (this.title) {
                if (obj.isString(this.title)) {
                    const t = leistrap.H3({ text: this.title })
                    leis.addClassList(t, "leis-card-title")
                    this.#card.body.content.unshift(t)
                    Object.defineProperty(this, "changeTitle", { value: function (value) { t.setText(value) } })
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
                Object.defineProperty(this, "changeFooter", { value: function (value) { if (obj.isTypeOf(value, BaseElement)) { this.#card.footer.removeAll(); this.#card.footer.add(value) } else { this.#card.footer.setText(value) } } })
            }
            this.element.content = o
            return this.element.render()
        }
    }
    // leisTable component
    /**
     * leistrap `TableCell` component definition
     */
    class TableCell {
        #props = { rowspan: 1, colspan: 1 }
        constructor(element, column) {
            this.cell = element
            this.column = column
        }
        /**
         * add content
         * @param {BaseElement} element 
         */
        add(element) { this.cell.add(element) }
        remove(element) { this.cell.remove(element) }
        removeAll() { this.cell.removeAll() }
        addAttr(name, value) { this.cell.addAttr(name, value) }
        addClass(value) { this.cell.addClass(value) }
        addEvent(event, callback, option) { this.cell.addEvent(event, callback, option) }
        removeClass(token) { this.cell.removeClass(token) }
        toggleClass(value) { this.cell.toggleClass(value) }
        getText() { return this.cell.getText() }
        setText(value) { this.cell.setText(value) }
        destroy() { this.cell.destroy() }

        spanCol(num) {
            this.cell.spanCol(num)
            tableOpera.adaptTableCol(this.cell, this.cell.lsParent, this, num)
            this.#props.colspan = num;
            return this
        }
        setStyle(cssValues) { this.cell.setStyle(cssValues); return this }

        spanRow(num) {
            const r = () => tableOpera.spanRow(this.cell, num)
            const _rem = w => { w.destroy() }
            const pos = leis.getElementPosition(this.cell, this.column.column)
            let [items, _c] = [[], 1]

            this.column.column.forEach((item, i) => { if (i > pos) { _c++; obj.arrAddWhen(items, item, _c, num) } })

            items.forEach(data => {
                let posi = leis.getElementPosition(data, data.lsParent.content)
                data.lsParent.content.forEach((cell, i) => { if (i >= posi) { obj.arrAddWhen(false, cell, i, this.#props.colspan, _rem) } })
            })
            obj.isEmpty(items) ? leis.addPW(true, this.cell, () => { obj.after(200, () => { this.spanRow(num) }) }, this.cell.getPropWait()) : r()
        }
        /**
         * sapn cell
         * @param {number} column the number  of colspan  
         * @param {number} row  the number of rowspan 
         */
        span(column = 1, row = 1) {
            this.#props.colspan = column;
            this.#props.rowspan = row;
            this.spanCol(column);
            this.spanRow(row)
        }
    }

    /**
     * leistrp `ColumunTable` component definition
     */
    class ColumnTable {
        #heading
        #table
        constructor(column, heading, table) {
            this.column = column
            this.#heading = heading
            this.#table = table
        }
        /**
         * update widget style
         * @param {string} cssValues css style 
         */
        setStyle(cssValues) { tableOpera.forEachCol(this.column, (item) => { item.setStyle(cssValues) }) }
        /**
         * adds className for Each column element
         * @param {string} name className 
         */
        addClass(name) { tableOpera.forEachCol(this.column, (item => { item.addClass(name) })) }
        /**
         * removes `token className` for Each column element
         * @param {string} token className 
         */
        removeClass(token) { tableOpera.forEachCol(this.column, (item => { item.removeClass(token) })) }
        toggleClass(name) { tableOpera.forEachCol(this.column, (item => { item.toggleClass(name) })) }
        getAttr(name) { tableOpera.forEachCol(this.column, (item => { item.getAttr(name) })) }
        setText(value) { tableOpera.forEachCol(this.column, (item => { item.setText(value) })) }
        /**
         * removes the current column
         */
        drop() { tableOpera.dropColumn(this.column, this.#heading); this.#table.columnCount -= 1; console.log(this.#table.columnCount); }
    }
    /**
     * leistrap quick `Table componenet` design helps you to create a table quickly
     */
    class LeisTable {
        #table;
        #Tcontent
        #prop
        #isInit
        /**
         * leistrap `quick table `widget
         * @param {BaseElement} parent table parent 
         */
        constructor(parent, NT) {
            this.parent = parent
            this.MainT = leistrap.Card({ parent })
            this.point = this.MainT
            this.#table = !NT ? leistrap.Table({ parent: this.MainT }) : leistrap.Div({ parent: this.MainT })
            this.#isInit = false
            leis.addClassList(this.MainT, !NT ? "leis-table-container" : NT.cdCls)
            leis.addClassList(this.#table, !NT ? "leis-table" : NT.tablCls)

        }
        /**
         * create a quick table by enumerating the number of `columns` and `rows`
         * @param {number} cols columns number
         * @param {number} rows the number of rows to be inserted  
         */
        insertTable(cols, rows, option) {
            if (!option) {
                option = {
                    "cell": { elem: leistrap.Td, cls: "leis-table-data" },
                    "heading": { elem: leistrap.Th, cls: "leis-table-heading" },
                    "row": { elem: leistrap.Tr, cls: "leis-table-row" },
                    "header": { elem: leistrap.THead, cls: "leis-table-head" },
                    "body": { elem: leistrap.Tbody, cls: "leis-table-body" }

                }
            }
            if (this.#isInit) { throw new Error("tabel is already created") }
            if (!this.#isInit) {
                const dfv = []
                this.rowCount = rows
                this.columnCount = cols
                const setCells = (num, i) => leistrap.inRange(num, 0, col => { const df = leistrap.P({ text: `data ${col + 1} x ${i + 1}` }); dfv.push(df); const d = option.cell.elem({ content: [df] }); leis.addClassList(d, option.cell.cls); leis.addClassList(df, "leis-table-defaultValue"); return d })
                const contHeader = leistrap.inRange(cols, 0, col => { const df_ = leistrap.P({ text: `heading ${col + 1}` }); dfv.push(df_); const t = option.heading.elem({ content: [df_] }); leis.addClassList(t, option.heading.cls); leis.addClassList(df_, "leis-table-defaultValue"); return t })
                const rowsCount = leistrap.inRange(rows, 0, col => { const tr = option.row.elem({ content: setCells(cols, col) }); leis.addClassList(tr, option.row.cls); return tr })

                const header = option.header.elem({ parent: this.#table, content: contHeader })
                const bodyTable = option.body.elem({ parent: this.#table, content: rowsCount })
                this.#Tcontent = bodyTable
                this.#prop = { header, bodyTable, count: 0 }
                leis.addClassList(header, option.header.cls)
                leis.addClassList(bodyTable, option.body.cls)
                this.clear = function () { obj.tryCode(() => { dfv.forEach(itm => itm.destroy()) }) }

                this.addRow = function (num, data) {
                    if (leis.hasConf(this.#table)) {
                        const r = leistrap.inRange(num, 0, col => { const tr = option.row.elem({ content: setCells(cols, col + this.rowCount) }); leis.addClassList(tr, option.row.cls); return tr })
                        this.#Tcontent.addElements(...r)
                        if (data) { this.insertData(data, this.rowCount + 1); this.rowCount += num }
                    } else { leis.addPW(true, this.#table, () => { this.addRow(num, data) }, this.#table.getPropWait()) }

                }
                this.#isInit = true
            }
        }
        /**
         * inserts data 
         */
        insertData(data, rowCount) { tableOpera.insertData(data, this.#Tcontent, this.#prop, rowCount); }
        /**
         * get a table cell
         * @param {number} column column number
         * @param {number} row  row number
         * @returns {TableCell}
         */
        getCell(column, row) {
            return new TableCell(tableOpera.getCell(this.#Tcontent, column, row), this.getColumn(column))
        }
        /**
         * gets a row
         * @returns {Tr}
         */
        getRow(num) { return tableOpera.getRow(this.#Tcontent, num) }
        getColumn(num) {
            return new ColumnTable(tableOpera.getColumn(
                this.#Tcontent,
                num,
                this.#prop.headingList),
                this.#prop.header.content[num - 1], this)
        }
        /**
         * config the heading
         * @param {string[]} headingList Heading list 
         */
        setHeading(headingList) { tableOpera.setHeading(this.#prop.header, headingList); this.#prop.headingList = headingList }
        update(row, data) {
            if (data) {
                data.forEach((d, i) => {
                    if (d.text) {
                        const l = this.getCell(i + 1, row)
                        l.setText(d.text)
                    }
                    if (d.widget) {
                        const l = this.getCell(i + 1, row)
                        l.removeAll()
                        l.add(d.widget)
                    }
                })
            }
        }
        setSize(width, height) {
            if (width) {
                this.MainT.setStyleProp("width", width)
            }
            if (height) {
                this.MainT.setStyleProp("height", height)
            }
        }
        /**
         * add row
         * @param {number} num 
         * @param {[]} data 
         */
        addRow(num, data) { throw new Error("table not created") }
        /**
         * romove the default value
         */
        clear() { throw new Error("table not created") }
        /**
         * adds a new class name to the table
         */
        addClass(name) { if (name) { this.#table.addClass(name) } }
    }
    /**
     * leistrap.Ul element definition, 
     * unorder list
     */
    class Ul extends List { }
    /**
     * leistrap.Li element definition
     */
    class Li extends BaseElement { }
    /**
     * leistrap.Table `Element` | `Component` definition
     */
    class Table extends BaseElement {
        getTable() { return LeisTable }
    }

    /**
     * leistrap.I  element definition
     */
    class I extends BaseElement { }


    // inputs components

    function setMTD() {
        return {
            add: addNewInput,
            remove: removeInput,
            destroy: destroyInput,
            once: inputOnce,
            getChecked,
            setLblText,
        }

    }
    function setTMINP() {
        return {
            add: addNewInput,
            remove: removeInput,
            destroy: destroyInput,
            getValue: getInputValue,
            setValue: setInputValue,
            setLblText,
            on: inputOn,
            addClass: setInputClass,
            removeEvent: reEventInput,
            setSize: setInputSize
        }
    }
    function addInput(lbl, value, type, name, parent, option, trns) {
        const id = generateId(4, 8)
        const input = leistrap.Input({ otherAttr: { type: type, id }, addData: { value, event: { active: [], disable: [] } } })
        const ic = leistrap.Div()

        name ? input.addAttr("name", name) : undefined
        const o = obj.objKeysToLowerCase(option)
        const attr = obj.copyObject(o, undefined, false, "id", "name", "type")
        obj.loopObj(attr, (item, x) => { input.addAttr(x, item) })
        const _lbl = leistrap.Label({ lblFor: id, text: lbl })
        const c = leistrap.Div({ content: [ic] })

        const auto = ["text", "email", "password"]
        if (this.autoComplate && obj.has(type, auto)) {
            input.addClass("leis-autoInput")
            input.addAttr("autocomplate", "false")
            ic.addClass("leis-autoComplate")
            ic.content = [input, leis.setAutoComplation(leistrap, this.autoComplate.autoComplate, input, this.autoComplate.defaultValue, this.autoComplate)]
        }
        else {
            leis.addClassList(ic, this.ic)
            ic.content = [input]
        }
        c.input = input
        c.ic = ic
        lbl ? (() => { c.add(_lbl); c.lbl = _lbl })() : undefined
        leis.addClassList(c, this.className)
        leis.addClassList(input, this.inputClassName)
        parent ? parent.add(c) : trns ? trns.main.add(c) : this.main.add(c)
        this.main.addData.inputs.push(input)
        if (type !== "text") {
            input.addEvent("click", function () {
                if (this.getAttr("checked")) { input.addData.event.active.forEach(item => item(input.addData.value)) }
                else { input.addData.event.disable.forEach(item => item(input.addData.value)) }
            })
        }
        this.autoComplate = undefined
        return new LeisElementID(c)
    }
    /**
     * remove Input
     * @param {LeisElementID} ID radio id 
     */
    function removeInput(ID) {
        this.main.remove(ID.leisBtnConfId)
    }
    /**
     * remove `Input` Node to the DOM
     */
    function destroyInput() {
        if (leis.hasConf(this.main)) {
            leisDOM.elementSelfRemove(this.main._conf)
            this.main.state = "removed"
        }
        else {
            leis.addPW(true,
                this.main,
                () => { obj.after(200, () => { this.destroy() }) },
                this.main.getPropWait())
        }
    }
    /**
    * returns the checked element
    */
    function getChecked() {
        let value = []
        this.main.addData.inputs.forEach(item => {
            if (item.getAttr("checked")) { value.push(item.addData.value) }
        })
        return !obj.isEmpty(value) ? value : undefined
    }
    /**
     * add new class name 
     * @param {string} name 
     */
    function setInputClass(name) {
        this.main.addData.inputs.forEach(input => { if (name) { input.addClass(name) } })
    }
    /**
     * update the input Label text
     * @param {string} value the text to be updated
     * @param {LeisElementID} ID the `input` Id  
     */
    function setLblText(ID, value) {
        ID.leisBtnConfId.lbl.setText(value)
    }
    /**
     * get the input value
     * @param {LeisElementID} ID the `input` Id  
     */
    function getInputValue(ID) {
        return ID.leisBtnConfId.input.getValue()
    }
    /**
     * set the new value to the input element
     * @param {string} value the text to be updated
     * @param {LeisElementID} ID the `input` Id  
     */
    function setInputValue(ID, value) {
        ID.leisBtnConfId.input.setValue(value)
    }
    /**
     * removes an event Listener to the Input
     * @param {LeisElementID} ID element ID 
     * @param {EventType} type event type 
     */
    function reEventInput(ID, type, name, option) {
        ID.leisBtnConfId.input.removeEvent(type, name, option)
    }
    /**
     * changes the input size
     * @param {string} width input width - CSS unit
     * @param {LeisElementID} ID the `input` Id  
     */
    function setInputSize(ID, width) {
        ID.leisBtnConfId.ic.setStyleProp("width", width);

    }
    /**
     * add Event Listener to the input
     * @param {EventType} event the event type
     * @param {Function} callback  function to be called  when the event is trigged
     * @param {LeisElementID} ID the `input` Id  
     */
    function inputOn(ID, event, callback, name, option) {
        ID.leisBtnConfId.input.addEvent(event, callback, name, option)
    }
    /**
     * adds new `Input`element with the given Label text
     * @param {string} lbl text to be displayed 
     * @param {BaseElement} parent parent 
     * @returns {LeisElementID} 
     */
    function addNewInput(lbl, value, parent, option, trns) {
        if (!option) option = {}
        const l = obj.bindFunc(addInput, this)
        return l(lbl, value, this.type, this.radioName, parent, option.attr, trns)
    }

    /**
     * 
     * @param {"active"|"disable"} event the event  
     * @param {Function} callback callback
     * @param {LeisElementID} ID the `input` Id 
     */
    function inputOnce(ID, event, callback) {
        if (event === "active") { ID.leisBtnConfId.input.addData.event.active.push(callback) }
        if (event === "disable") { ID.leisBtnConfId.input.addData.event.disable.push(callback) }
    }
    /**
     * leistrap `Radio` componenet
     * @param {BaseElement} parent 
     * 
     */
    function BtnRadio(parent) {
        const main = leistrap.Div({ addData: { inputs: [] }, parent })
        const radioName = generateId(2, 9)
        leis.addClassList(main, "leis-card-radioBtns-container")
        const methods = setMTD()
        methods.type = "radio"
        methods.className = "leis-radioBtns-card"
        methods.inputClassName = "leis-radioBtn"
        methods.radioName = radioName
        methods.main = main
        methods.render = function () { return main.render() }
        return methods
    }

    // checkbox component

    /***
    * lestrap `CheckBox` component 
    */
    function checkBox(parent) {
        const main = leistrap.Div({ addData: { inputs: [] }, parent })
        leis.addClassList(main, "leis-card-checkboxBtns-container")
        const methods = setMTD()
        methods.type = "checkbox"
        methods.className = "leis-checkboxBtns-card"
        methods.inputClassName = "leis-checkboxtBtn"
        methods.main = main
        methods.render = function () { return main.render() }
        return methods
    }

    // switch

    function switchBox(parent) {
        const main = leistrap.Div({ addData: { inputs: [] }, parent })
        leis.addClassList(main, "leis-card-switchboxBtns-container")
        const methods = setMTD()
        methods.type = "checkbox"
        methods.className = "leis-switchboxBtns-card"
        methods.inputClassName = "leis-switchboxtBtn"
        methods.main = main
        methods.render = function () { return main.render() }
        return methods
    }
    // textbox

    function txtInputs(parent, m, type, ic, clN, ipCl) {
        const main = leistrap.Div({ addData: { inputs: [] }, parent })
        leis.addClassList(main, m)
        const methods = setTMINP()
        methods.type = type
        methods.ic = ic
        methods.className = clN
        methods.inputClassName = ipCl
        methods.main = main
        methods.render = function () { return main.render() }
        return methods
    }
    function textBox(parent) {
        return txtInputs(parent, ...initTxtInput("text"))
    }

    function passWordBox(parent) {
        return txtInputs(parent, ...initTxtInput("password"))
    }

    function emailBox(parent) {
        return txtInputs(parent, ...initTxtInput("email"))
    }
    /**
     * leistrap Input `Element`| `Component` definition
     */

    class Input extends BaseElement {
        #isComp = false
        /**
         * set the new value to the input
         * @param {string} val 
         */
        setValue(val) { this._conf.value = val }
        /**
         * gets the input value
         */
        getValue() { return this._conf.value }
        /**
         * 
         * leistrap `Radio Buttons` component
         */
        getRadio() { if (!this.#isComp) { this.#isComp = true; this.destroy() }; return BtnRadio(this.parent) }
        /**
         * 
         * leistrap `CheckBox Buttons` component
         */
        getCheckBox() { if (!this.#isComp) { this.#isComp = true; this.destroy() }; return checkBox(this.parent) }
        /**
         * 
         * leistrap `TextBox` component
         */
        getTextBox() { if (!this.#isComp) { this.#isComp = true; this.destroy() }; return textBox(this.parent) }
        /**
         * 
         * leistrap `Switch box` component
         */
        getSwitchBox() { if (!this.#isComp) { this.#isComp = true; this.destroy() }; return switchBox(this.parent) }
        /**
         * 
         * leistrap password widget
         */
        getPassWordBox() { if (!this.#isComp) { this.#isComp = true; this.destroy() }; return passWordBox(this.parent) }
        /**
         * 
         * leistrap password widget
         */
        getEmailBox() { if (!this.#isComp) { this.#isComp = true; this.destroy() }; return emailBox(this.parent) }
    }

    /**
     * leistrap.A  element definition
     */
    class A extends BaseElement { }

    /**
     * leistrap.Textarea  element definition
     */
    class Textarea extends BaseElement { }
    /**
     * leistrap.Script  element definition
     */
    class Script extends BaseElement { }
    /**
     * leistrap.Heading element definition
     */
    class Heading extends BaseElement { }

    class Canvas extends BaseElement { }
    /**
     * leistrap children  element objet
     */
    const CHILDREN = {
        Button,
        Card,
        Label,
        Paragrah,
        Img,
        A,
        Textarea,
        Link,
        Span,
        List,
        Ul,
        Li,
        Table,
        I,
        Script,
        Input,
        LeisTable
    }

    /**
     * contains all children
     */

    leistrap.widgets = CHILDREN

    /**
     * get info of  leistap module
     * 
     * @returns {leistrap.information}
     */
    function info() { return this.information || INFO_MODULE }

    /**
     * information of the module
     * @module leistrap
     */
    leistrap.info = info

    /**
     * get all widgets of the main object
     * @returns {leistrap.widgets}
     */
    function children() { return CHILDREN || this.widgets }

    // save all widgets children
    /**
     * you can access directly all children via widgets property:
     * @example
     * 
     * // return all children widgets
     * leistrap.wigets
     */
    leistrap.children = children


    /**
     * lestrap `Button` Element | Component
     * @param {options} option button options
     * @returns {Button}
     */
    leistrap.Button = option => { const button = setWidget("button", Button); return button(option) }
    /**
     * leistrap `Div` | `Card component`
     * @param {options}  option options
     * @returns { Card} 
     */
    leistrap.Card = option => { const card = setWidget("div", Card); return card(option) }
    /**
     * leistrp `Label` Element | component 
     * @param {options} option Label options
     * @returns {Label}
     */
    leistrap.Label = option => { const label = setWidget("label", Label); return label(option) }
    /**
     * leistrap  `P` | `paragraph` component
     * @param {options} option  options
     * @returns {Paragrah}
     */
    leistrap.Paragrah = option => { const p = setWidget("p", Paragrah); return p(option) }
    /**
     * leistrap `P` Element
     * @param {options} option  options
     * @returns {P}
     */
    leistrap.P = option => { const p = setWidget("p", Paragrah); return p(option) }
    /**
     * leistrap `Img `Element
     * @param {options} option options
     */
    leistrap.Img = option => { const img = setWidget("img", Img); return img(option) }
    /**
     * leistrap `Div` Element
     * @param {options} option options
     * @returns {Div}
     */
    leistrap.Div = option => { const div = setWidget("div", Div); return div(option) }
    /**
     * List widget uses the ul or ol html elements
     * @param {options} option List options
     * @returns {List}
     */
    leistrap.List = option => { const ul = setWidget("ul", List); return ul(option) }
    /**
     * Ol widget uses the Ol  html elements
     * @param {options} option Ol widget options
     * @returns {List}
     */
    leistrap.Ol = option => { const ol = setWidget("ol", List); return ol(option) }
    /**
    * Ul widget uses the Ul  html elements
    * @param {options} option Ul widget options
    * @returns {List}
    */
    leistrap.Ul = option => { const ul = setWidget("ul", List); return ul(option) }
    /**
     * List item Element
     * @param {options} option list item options
     * @returns {Li} 
     */
    leistrap.Li = option => { const li = setWidget("li", Li); return li(option) }
    /**
     * the `Span` Element 
     * @param {options} option  span options
     * @returns {Span}
     */
    leistrap.Span = option => { const span = setWidget("span", Span); return span(option) }
    /**
     * Italic element
     */
    leistrap.I = option => { const i = setWidget("i", I); return i(option) }
    /**
     * the html `link` Element
     *@param {options} option options @returns {Link}
     */
    leistrap.Link = option => { const link = setWidget("link", Link); return link(option) }
    /**
    * the html `a` Element
    * @param {options} option options
    * @returns {A}
    */
    leistrap.A = option => { const a = setWidget("a", A); return a(option) }
    /**
     * `textarea` element
     * @param {options} option textarea options
     * @returns {Textarea} 
     */
    leistrap.Textarea = option => { const texterea = setWidget("textarea", Textarea); return texterea(option) }
    /**
     * Table `Element` | `Component`
     * @param {options} option table aptions
     * @returns {Table}
     */
    leistrap.Table = option => { const table = setWidget("table", Table); return table(option) }
    /**
     * `THead` element
     * @param {options} option options
     * @returns {THead}
     */
    leistrap.THead = option => { const thed = setWidget("thead", THead); return thed(option) }
    /**
     * `Th` element
     * @param {options} option options
     * @returns {Th}
     */
    leistrap.Th = option => { const th = setWidget("th", Th); return th(option) }
    /**
     * `Tbody` element
     * @param {options} option Tbody options
     * @returns {Tbody}
     */
    leistrap.Tbody = option => { const tbody = setWidget("tbody", Tbody); return tbody(option) }
    /**
     * `Tr` element
     * @param {options} option options
     * @returns {Tr}
     */
    leistrap.Tr = option => { const tr = setWidget("tr", Tr); return tr(option) }
    /**
     * `Td` element
     * @param {options} option options
     * @returns {Td}
     */
    leistrap.Td = option => { const td = setWidget("td", Td); return td(option) }
    /**
     * `Tfoot` element
     * @param {options} option Tfoot options
     * @returns {Tfoot}
     */
    leistrap.Tfoot = option => { const tfoot = setWidget("tfoot", Tfoot); return tfoot(option) }
    /**
     *leistrap `Script` element
     */
    leistrap.Script = setWidget("script", Script)
    /**
     * input element, use `otherAttr` property to change the input type
     * @param {options} option Input options
     * @returns {Input} 
     */
    leistrap.Input = option => { const input = setWidget("input", Input); return input(option) }
    /**
     * `Heading 1`  element 
     */
    leistrap.H1 = setWidget("h1", Heading)
    /**
     * `Heading 2`  element 
     */
    leistrap.H2 = setWidget("h2", Heading)
    /**
     * `Heading 3`  element 
     */
    leistrap.H3 = setWidget("h3", Heading)
    /**
     * `Heading 4`  element 
     */
    leistrap.H4 = setWidget("h4", Heading)
    /**
     * `Heading 5`  element 
     */
    leistrap.H5 = setWidget("h5", Heading)
    /**
     * `Heading 6`  element 
     */
    leistrap.H6 = setWidget("h6", Heading)
    leistrap.Canvas = setWidget("canvas", Canvas)

    // maths operators

    function generateId(min = 0, max = 1) {
        const sy = "dh5263ayLogl";
        const num = "0123456789";
        const letters = "abcdefghijklmnopqrstuvwxyz";
        const lettUpc = letters.toLocaleUpperCase()
        const allItem = [sy, num, letters, lettUpc]
        let [res, i, y] = ["", 0, 0]
        const len = randint(min, max)

        while (y < len) {
            for (i = 0; i < allItem.length; i++) {
                let _c = allItem[Math.floor(Math.random() * allItem.length)]
                res += _c[Math.floor(Math.random() * _c.length)]
            }
            y++
        }
        return res
    }

    function choice(obj) {

        if (typeof obj === "object") {
            const _bj = Object.keys(obj)
            return (obj[_bj[Math.floor(Math.random() * _bj.length)]]);
        }
        else if (
            typeof obj === "function"
            || typeof obj === "boolean"
            || typeof obj === "undefined"
            || typeof obj === "symbol"
        ) {
            throw new Error(`can not execute a ${typeof obj}`)
        }
        else if (typeof obj === "number") {
            const _n = []
            for (let i = 0; i < obj; i++) { _n.push(i) }
            return _n[Math.floor(Math.random() * _n.length)]
        }
        else if (typeof obj === "string") {
            return obj[Math.floor(Math.random() * obj.length)]
        }
    }

    function randint(min, max) {

        if (typeof min === "number" && typeof max === "number") {
            const _p = []
            for (let _x = min; _x < max; _x++) {
                _p.push(_x)
            }
            return choice(_p)

        }
        else {
            throw new Error(`can not execute ${typeof min !== "number" ? typeof min : typeof max}`)
        }
    }

    function maxArray(array = []) {
        if (typeof array === "object") {
            if (typeof array.push !== "function")
                throw new Error(`can not execute a (an) ${typeof array}`)
            else {
                let _x = array[0]
                array.forEach(item => {
                    _x = item > _x ? item : _x
                })
                return _x
            }
        }
    }
    function minArray(array = []) {
        if (typeof array === "object") {
            if (typeof array.push !== "function")
                throw new Error(`can not execute a (an) ${typeof array}`)
            else {
                let _x = array[0]
                array.forEach(item => {
                    _x = item < _x ? item : _x
                })
                return _x
            }
        }
    }
    function reverse(obj) {
        if (typeof obj === "object") {

            let _type = typeof obj.push === "function" ? "a" : "o"
            if (_type === "a") {
                const _p = []
                for (let x = 0; x < obj.length; x++) {
                    _p.push(obj[(obj.length - 1) - x])
                }
                return _p
            }
            else if (_type === "o") {
                const _o = {}
                const _xp = Object.keys(obj)
                _xp.forEach((item, i) => {
                    _o[_xp[(_xp.length - 1) - i]] = obj[_xp[(_xp.length - 1) - i]]
                })
                return _o
            }

        }
        else if (
            typeof obj === "function"
            || typeof obj === "boolean"
            || typeof obj === "undefined"
            || typeof obj === "symbol"
            || typeof obj === "number"
        ) {
            throw new Error(`can not execute a ${typeof obj}`)
        }
        else if (typeof obj === "string") {
            let [_r, i] = ["", 0]
            for (let x of obj) {
                i++
                _r += obj[obj.length - i]
            }
            return _r
        }

    }
    /**
     * rule widget
     * @param {string} type
     * 
     */
    function setWidget(type, element = BaseElement) {
        /**
         * @param {options} option options
         */
        return function (option) {
            option = option ? option : {}
            if (option.eventOnce != undefined) {

                const _RD = option.eventOnce
                function defaultListener(target) {
                    _RD.call(this.currentElement, target)
                }
                option.eventOnce = defaultListener
                if (option.listener) { defaultListener.prototype["name"] = option.listener }
            }

            const _bx = new element(option)
            _bx.ElementType = type
            if (element == Label) {
                _bx.lblFor = option.lblFor ? option.lblFor : __none__
            }
            if (element == Button) {
                _bx.className += `${String.fromCharCode(__spc__)}btn${String.fromCharCode(__spc__)}`
                _bx.otherAttr.type = "button"
            }
            if (element == Img) {
                _bx.src = option.src ? option.src : __none__
                _bx.alt = option.alt ? option.alt : __none__
            }
            return _bx
        }
    }
    /**
     * leistrap.CloseBtn widget
     * @param {EventType} eventType type of event 
     * @param {Function} eventOnce the callback
     */
    leistrap.CloseBtn = function (eventType, eventOnce) {
        return this.Button({
            content: [this.Span({ innerHtml: "&times" })],
            otherAttr: { "class": "leis-btn-close" },
            eventOnce,
            eventType
        })
    }


    function checkLinkN(o, link) {
        if (obj.has(link.linkName, o)) {
            link.linkName = `Gen_${link.linkName}_${generateId(1, 3)}`;
            throw new Error("Link name must unique")
        }
    }

    function checkPoint(elem, callback) {
        if (elem.point) { callback(elem.point) }
        else { callback(elem) }
    }
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
         * 
         * @param {BaseElement[]} link 
         * @param {BaseElement[]} content,
         * @param {BaseElement} parent 
         */
        constructor(
            /**
             * add a link to roggle a content
             * 
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
                            __links.forEach(data => data.removeClass("active"))
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
            } else { leis.addPW(true, this.point, () => { this.removeLink(linkName) }, this.point.getPropWait()) }
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
            else { leis.addPW(true, this.point, () => { this.moveLinkTo(linkName, element) }, this.point.getPropWait()) }
        }
        /**
         * adds className to the all links
         * @param {string} value className to be added  
         */
        addBtnClass(value) {
            if (leis.hasConf(this.point) && value) {
                this.link.forEach(item => { if (item.state !== "removed") { item.addClass(value) } })
            }
            else { leis.addPW(true, this.point, () => { this.addBtnClass(value) }, this.point.getPropWait()) }
        }
        destroy() {
            if (leis.hasConf(this.point)) {
                obj.loopObj(this.#prop, (v, k) => { v.link.destroy(); v.content.destroy() })
                this.point.destroy()
            }
            else { leis.addPW(true, this.point, () => { this.destroy() }, this.point.getPropWait()) }
        }
        invoke(linkName, ckP = true) {
            if (leis.hasConf(this.point) || !ckP) {

                if (linkName && obj.has(linkName, this.#prop)) {
                    this.#prop[linkName].link.getAttr("click");
                }
            } else { leis.addPW(true, this.point, () => { this.invoke(linkName) }, this.point.getPropWait()) }

        }

    }

    CHILDREN.TabPage = TabPage

    function checkPageName(o, prop, ex = false) {
        if (obj.has(prop, o) && !ex) {
            prop.pageName = `${prop.pageName}_${generateId(2, 3)}`;
            throw new Error("PageName must be unique")
        }
        if (!obj.has(prop, o) && ex) {
            throw new Error("PageName not exist")
        }
    }

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
            return !(!option.content) && (option.content ? !obj.isEmpty(option.content) : !(!option.content))
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
                    if (!this.lsParent.accessPage) {
                        this.lsParent.accessPage = this.pageConfig.contentPage.accessPage
                    }
                    this.lsParent.accessPage._controler.show()
                }
            }, "pageButtonActive")
            this.#state.active = true
        }
        #setDisable() { this.#button.removeEvent("click", "pageButtonActive"); this.#state.active = false }

        #setConfig(option) {
            this.#button.pageConfig = option
            option.parentPage.add(option.contentPage)
            option.contentPage.accessPage = option.parentPage.accessPage

            if (obj.isArray(option.contentPage.attr.className)) { option.contentPage.attr.className.push("leis-page-content") }
            else { option.contentPage.attr.className += " leis-page-content " }
            if (leis.hasConf(option.contentPage)) { option.contentPage.addClass("leis-page-content") }
        }
    }

    /**
     * leitrap `PageLegend` compenent
     * @param {options} option
     */
    leistrap.PageLegend = function (option) {

        const b = leistrap.Card({
            content: option.content ? option.text ?
                [leistrap.Paragrah({ text: option.text })].concat(option.content) :
                option.content : option.text ? [leistrap.Paragrah({ text: option.text })] : [],
            attr: { className: `leis-page-legende ${option.attr ? option.attr.className ? option.attr.className : __none__ : __none__}` },
            eventType: "click",
            parent: option.parent,
            attr: option.attr,
            eventOnce: function () {

                if (!this.pageConfig.parentPage) {
                    this.pageConfig.parentPage = this.lsParent.accessPage.p
                }
                if (this.pageConfig.parentPage.history) {
                    this.pageConfig.parentPage.history.push(this.pageConfig.contentPage)
                    this.pageConfig.parentPage.content.forEach(item => { item.hide() })
                    this.pageConfig.contentPage.show()
                    if (!this.lsParent.accessPage) {
                        this.lsParent.accessPage = this.pageConfig.contentPage.accessPage
                    }
                    this.lsParent.accessPage._controler.show()
                }
            }
        })

        b.pageConfig = {
            access: "true",
            contentPage: option.contentPage ? option.contentPage : undefined,
            parentPage: option.parentPage ? option.parentPage : undefined
        }
        b.pageConfig ? b.pageConfig.contentPage ?
            b.pageConfig.contentPage.attr.className += `${String.fromCharCode(__spc__)}leis-page-content${String.fromCharCode(__spc__)}` :
            b.pageConfig.contentPage : b.pageConfig
        b.pageConfig.parentPage ? b.pageConfig.parentPage.content.push(option.contentPage) : b.pageConfig
        b.pageConfig.parentPage ? b.pageConfig.contentPage ? b.pageConfig.contentPage.accessPage = b.pageConfig.parentPage.accessPage : b : b
        return b
    }

    /**
     * page button
     * @param {options} option 
     * @returns {PageButton}
     */
    leistrap.pageButton = (option = {}) => new PageButton(option)
    /**
     * the tabpage widget
     * @typedef {{tabLink :BaseElement[],tabContent:BaseElement[],parent:BaseElement, attr:{},
     * contentClass:string[], useContentParent:BaseElement, concatLink :BaseElement[] }}tabPageOption
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
             * the legende or `icon`
             */
            legend,
            content,

        ) {

            this.parent = parent
            this.legend = legend ? legend : []
            this.content = content ? content : []
            this.point = this.#setPage()

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
            else { leis.addPW(true, this.point, () => { this.removePage(pageName) }, this.point.getPropWait()) }
        }

        invoke(pageName) {
            if (leis.hasConf(this.point) && pageName) {
                checkPageName(this.#prop, pageName, true)
                this.#prop[pageName].button.getAttr("click")

            }
            else { leis.addPW(true, this.point, () => { this.removePage(pageName) }, this.point.getPropWait()) }
        }
        #setPage() {
            const props = this.#prop
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
                    let _t = {}
                    let f = []
                    this.lsParent.history.forEach(item => {
                        if (item.leisBtnConfId in _t === false) { f.push(item); _t[item.leisBtnConfId] = item }
                    })

                    if (f.length <= 1) {
                        this.hide();
                        this.lsParent.history = [this.lsParent.history[0]];
                        _t = {}
                    } else { this.show(); f.pop() }

                    this.lsParent.history = f

                    f[f.length - 1].show()
                    if (f.length == 1) { this.hide() }
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
                    props[name] = { "button": e, "content": leistrap.Div({ content: [content] }), hidden: true }
                }
            }
            return _mainPage_
        }
    }
    /**
    * leistrap.Accordion component definition
    */

    class Accordion {

        /**
         * 
         * @param {BaseElement[]} AccBtn  the widget that will be displayed
         * @param {BaseElement[]} AccPanel this content to be be showen when the user clicks on the `AccBtn`
         * @param {BaseElement} parent 
         */
        constructor(
            /**
             * button or other widgts
             */
            AccBtn,
            /**
             * the content
             */
            AccPanel,
            /**
             * the widget parent
             */
            parent,
            header = undefined,
            footer = undefined,
            props = undefined,
        ) {

            this.AccBtn = AccBtn;
            this.AccPanel = AccPanel;
            this.parent = parent
            this.accHeader = header
            this.accFooter = footer
            this.props = props
            this.point = this.#setAcc()
        }

        #setAcc() {

            const MainAcc = leistrap.Card({
                attr: { className: ["leis-accordion-card"].concat(this.props ? this.props.className ? this.props.className : [] : []) },
                parent: this.parent,
                otherAttr: this.props ? this.props.otherAttr ? this.props.otherAttr : undefined : undefined

            })

            if (typeof this.accHeader !== "undefined") {
                this.accHeader.attr ? this.accHeader.attr.className ? this.accHeader.attr.className += " leis-accordion-head " : this.accHeader.attr.className = ["leis-accordion-head"] : this.accHeader.attr = { className: ["leis-accordion-head"] }
                MainAcc.content.push(this.accHeader)
            }
            if (typeof this.AccBtn === "object" && typeof this.AccBtn.push === "function") {

                this.AccBtn.forEach((item, i) => {
                    item.attr ? item.attr.className ? item.attr.className += ` leis-accordion-btn ` : item.attr.className = " leis-accordion-btn " : item.attr.className = " leis-accordion-btn "

                    if (typeof this.AccPanel[i] !== "undefined") {
                        this.AccPanel[i].attr ? this.AccPanel[i].attr.className ? this.AccPanel[i].attr.className += ` leis-accordion-panel ` : this.AccPanel[i].attr.className = " leis-accordion-panel " : this.AccPanel[i].attr.className = "leis-accordion-panel"
                        item.eventType = "click"
                        const _i = this.AccPanel[i]
                        item.eventOnce = function () {
                            "use strict"
                            _i.toggleClass("active")
                            item.toggleClass("active")
                        }
                        MainAcc.content.push(item)
                        MainAcc.content.push(this.AccPanel[i])
                    }
                    else { throw new Error("missing a pannel widget") }
                })
            }
            else { throw new Error("the Accordion widget needs only the array, verify if you used an array object") }
            if (typeof this.accFooter !== "undefined") {
                this.accFooter.attr ? this.accFooter.attr.className ? this.accFooter.attr.className += " leis-accordion-footer " : this.accFooter.attr.className = ["leis-accordion-footer"] : this.accFooter.attr = { className: ["leis-accordion-footer"] }
                MainAcc.content.push(this.accFooter)
            }
            this.MainAcc = MainAcc
            return MainAcc
        }

        /**
         * appends the news elements in the widget
         * @param {BaseElement} accbtn thes button to be showen
         * @param {BaseElement} accpanel the content to be showen when the user clicks in the `accpanel`button  
         */
        addItem(accbtn, accpanel) {
            this.MainAcc.content.push(accbtn)
            accbtn.attr ? accbtn.attr.className ? accbtn.attr.className += ` leis-accordion-btn ` : accbtn.attr.className = " leis-accordion-btn " : accbtn.attr.className = " leis-accordion-btn "
            this.MainAcc.content.push(accpanel)
            accpanel.attr ? accpanel.attr.className ? accpanel.attr.className += ` leis-accordion-panel ` : accpanel.attr.className = " leis-accordion-panel " : accpanel.attr.className = "leis-accordion-panel"
            accbtn.eventType = "click"
            accbtn.eventOnce = function () {
                "use strict"
                accpanel.toggleClass("active")
                accbtn.toggleClass("active")
            }
            this.MainAcc.CASCADE()
        }
        destroy() { this.point.destroy() }
        addClass(name) { this.MainAcc.addClass(name) }
        remove(element) { this.MainAcc.remove(element) }
        removeAll() { this.MainAcc.removeAll() }
        setStyle(cssValues) { this.MainAcc.setStyle(cssValues) }
    }

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
        addItem(item) { leis.addClassList(item, 'leis-child-group'); this.MainG.addItem(item) }
        removeAll() { this.MainG.removeAll() }
        #setG() {
            const _cd = leistrap.Card({ parent: this.parent, attr: { className: ["leis-group"] } })

            const MainG = leistrap.List({
                attr: {
                    className: ["leis-list-group"].concat(
                        this.attr ? this.attr.className ? this.attr.className : [] : [])
                },
                parent: _cd
            })

            if (typeof this.header !== "undefined") {
                this.header.attr ? this.header.attr.className ? this.header.attr.className += ` leis-child-group leis-group-head ` : this.header.attr.className = " leis-child-group leis-group-head " : this.header.attr.className = "leis-child-group leis-group-head"
                MainG.content.push(this.header)
            }

            if (typeof this.items !== "undefined"
                && typeof this.items.push === "function") {
                this.items.forEach(item => {
                    if (item.ElementType.toLowerCase() === "li") {
                        item.attr ? item.attr.className ? item.attr.className += ` leis-child-group ` : item.attr.className = " leis-child-group " : item.attr.className = "leis-child-group"
                        MainG.content.push(item)
                    }
                })
            }
            this.point = _cd
            this.MainG = MainG
        }
    }
    /**
     * the page component
     * @typedef {{parent :BaseElement, legend :PageLegend, content:BaseElement[]}}pageOptions
     * @param {pageOptions} option 
     * @returns {Page} 
     */
    leistrap.Page = option => new Page(option.parent, option.legend, option.content)

    /**
     * the Accordion component
     * @typedef {{accBtn:BaseElement[],accPanel:BaseElement[],parent:BaseElement,accHeader:BaseElement,
     * accFooter:BaseElement, props:attr}} accOptions
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
    * @typedef {{parent ?: BaseElement, items?:Li[], attr ?:{className? :string,id ? :string},
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
     * @param {string} txt  the text to be displyed
     * @returns {BaseElement}
     */
    leistrap.GIText = txt => leistrap.Paragrah({
        attr: { className: ["leis-group-txt"] },
        text: txt
    })
    /**
     * Id genator
     */
    leistrap.autoId = generateId
    /**
     * select element
     */
    const Lesistap_pages = {}

    /**
     * 
     * @param {*} object exports the object 
     * - before to use this object in other `JS files` you have to `import` that, by using 
     * `leistrap.importObject` Method.
     * @example
     * 
     * // ./maths.js
     * const maths = (a, b)=> a*b
     * 
     * // let export the maths function
     * 
     * leistrap.exportObject(maths)
     * @method `leistrap.importObject`
     * - to access this object you can get `leistrap API` by using 
     * `leistrap.importObject` method
     * @example
     * 
     * // ./calculator.js
     * 
     * //let import our maths function
     * const multiply = leistrap.importObject("maths", "./maths.js")
     * console.log(multiply(2,2))
     */
    leistrap.exportObject = function (name, object) { checkAPI(name, "Export"); this.API[name] = object }

    /**
     * 
     * @param {string} name  the object name
     * @param {string} path  path of the file 
     */
    leistrap.importObject = function (name, path) {
        window.document.body.append(this.Script({ otherAttr: { src: path } }).render())
        return this[name]
    }

    leistrap.whenReady = function (listener, ...args) {
        !leis.hasConf(MPC) ? MPC.getPropWait().push(() => {
            obj.after(200, () => { obj.tryCode(() => { listener(...args) }, (error) => { const m = this.Modal(); m.setTitle("Error occured"); m.show(); m.add(this.P({ text: error.message })); m.setSize("50%", "50vh"); m.clear(); window.document.body.append(m.point.render()) }) })
        }) :
            obj.after(200, listener, ...args)
    }

    leistrap.sendObject = function (name, o, path) {
        this.exportObject(name, o)
        this.importObject(name, path)
    }
    /**
     * add the page extence 
     * @param {string} name 
     * @param {Page} page 
     */
    leistrap.setPage = function (name, page) { Lesistap_pages[name] = page }
    leistrap.getPage = (name) => Lesistap_pages[name]
    leistrap.select = { selectElement: seclectElemt, groupControler }
    leistrap.lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum distinctio molestias culpa dolores quibusdam doloribus iure quis. Facere consequatur rerum quidem totam optio est animi. Voluptatem temporibus blanditiis officia enim!"
    leistrap.MLorem = function (n = 1) {
        let i = __none__
        for (let _i = 0; _i < n; _i++) { i += ` ${this.lorem} ` }
        return i
    }

    /**
     * color name
     */
    leistrap.colorName = {
        "aliceblue": [240, 248, 255],
        "antiquewhite": [250, 235, 215],
        "aqua": [0, 255, 255],
        "aquamarine": [127, 255, 212],
        "azure": [240, 255, 255],
        "beige": [245, 245, 220],
        "bisque": [255, 228, 196],
        "black": [0, 0, 0],
        "blanchedalmond": [255, 235, 205],
        "blue": [0, 0, 255],
        "blueviolet": [138, 43, 226],
        "brown": [165, 42, 42],
        "burlywood": [222, 184, 135],
        "cadetblue": [95, 158, 160],
        "chartreuse": [127, 255, 0],
        "chocolate": [210, 105, 30],
        "coral": [255, 127, 80],
        "cornflowerblue": [100, 149, 237],
        "cornsilk": [255, 248, 220],
        "crimson": [220, 20, 60],
        "cyan": [0, 255, 255],
        "darkblue": [0, 0, 139],
        "darkcyan": [0, 139, 139],
        "darkgoldenrod": [184, 134, 11],
        "darkgray": [169, 169, 169],
        "darkgreen": [0, 100, 0],
        "darkgrey": [169, 169, 169],
        "darkkhaki": [189, 183, 107],
        "darkmagenta": [139, 0, 139],
        "darkolivegreen": [85, 107, 47],
        "darkorange": [255, 140, 0],
        "darkorchid": [153, 50, 204],
        "darkred": [139, 0, 0],
        "darksalmon": [233, 150, 122],
        "darkseagreen": [143, 188, 143],
        "darkslateblue": [72, 61, 139],
        "darkslategray": [47, 79, 79],
        "darkslategrey": [47, 79, 79],
        "darkturquoise": [0, 206, 209],
        "darkviolet": [148, 0, 211],
        "deeppink": [255, 20, 147],
        "deepskyblue": [0, 191, 255],
        "dimgray": [105, 105, 105],
        "dimgrey": [105, 105, 105],
        "dodgerblue": [30, 144, 255],
        "firebrick": [178, 34, 34],
        "floralwhite": [255, 250, 240],
        "forestgreen": [34, 139, 34],
        "fuchsia": [255, 0, 255],
        "gainsboro": [220, 220, 220],
        "ghostwhite": [248, 248, 255],
        "gold": [255, 215, 0],
        "goldenrod": [218, 165, 32],
        "gray": [128, 128, 128],
        "green": [0, 128, 0],
        "greenyellow": [173, 255, 47],
        "grey": [128, 128, 128],
        "honeydew": [240, 255, 240],
        "hotpink": [255, 105, 180],
        "indianred": [205, 92, 92],
        "indigo": [75, 0, 130],
        "ivory": [255, 255, 240],
        "khaki": [240, 230, 140],
        "lavender": [230, 230, 250],
        "lavenderblush": [255, 240, 245],
        "lawngreen": [124, 252, 0],
        "lemonchiffon": [255, 250, 205],
        "lightblue": [173, 216, 230],
        "lightcoral": [240, 128, 128],
        "lightcyan": [224, 255, 255],
        "lightgoldenrodyellow": [250, 250, 210],
        "lightgray": [211, 211, 211],
        "lightgreen": [144, 238, 144],
        "lightgrey": [211, 211, 211],
        "lightpink": [255, 182, 193],
        "lightsalmon": [255, 160, 122],
        "lightseagreen": [32, 178, 170],
        "lightskyblue": [135, 206, 250],
        "lightslategray": [119, 136, 153],
        "lightslategrey": [119, 136, 153],
        "lightsteelblue": [176, 196, 222],
        "lightyellow": [255, 255, 224],
        "lime": [0, 255, 0],
        "limegreen": [50, 205, 50],
        "linen": [250, 240, 230],
        "magenta": [255, 0, 255],
        "maroon": [128, 0, 0],
        "mediumaquamarine": [102, 205, 170],
        "mediumblue": [0, 0, 205],
        "mediumorchid": [186, 85, 211],
        "mediumpurple": [147, 112, 219],
        "mediumseagreen": [60, 179, 113],
        "mediumslateblue": [123, 104, 238],
        "mediumspringgreen": [0, 250, 154],
        "mediumturquoise": [72, 209, 204],
        "mediumvioletred": [199, 21, 133],
        "midnightblue": [25, 25, 112],
        "mintcream": [245, 255, 250],
        "mistyrose": [255, 228, 225],
        "moccasin": [255, 228, 181],
        "navajowhite": [255, 222, 173],
        "navy": [0, 0, 128],
        "oldlace": [253, 245, 230],
        "olive": [128, 128, 0],
        "olivedrab": [107, 142, 35],
        "orange": [255, 165, 0],
        "orangered": [255, 69, 0],
        "orchid": [218, 112, 214],
        "palegoldenrod": [238, 232, 170],
        "palegreen": [152, 251, 152],
        "paleturquoise": [175, 238, 238],
        "palevioletred": [219, 112, 147],
        "papayawhip": [255, 239, 213],
        "peachpuff": [255, 218, 185],
        "peru": [205, 133, 63],
        "pink": [255, 192, 203],
        "plum": [221, 160, 221],
        "powderblue": [176, 224, 230],
        "purple": [128, 0, 128],
        "rebeccapurple": [102, 51, 153],
        "red": [255, 0, 0],
        "rosybrown": [188, 143, 143],
        "royalblue": [65, 105, 225],
        "saddlebrown": [139, 69, 19],
        "salmon": [250, 128, 114],
        "sandybrown": [244, 164, 96],
        "seagreen": [46, 139, 87],
        "seashell": [255, 245, 238],
        "sienna": [160, 82, 45],
        "silver": [192, 192, 192],
        "skyblue": [135, 206, 235],
        "slateblue": [106, 90, 205],
        "slategray": [112, 128, 144],
        "slategrey": [112, 128, 144],
        "snow": [255, 250, 250],
        "springgreen": [0, 255, 127],
        "steelblue": [70, 130, 180],
        "tan": [210, 180, 140],
        "teal": [0, 128, 128],
        "thistle": [216, 191, 216],
        "tomato": [255, 99, 71],
        "turquoise": [64, 224, 208],
        "violet": [238, 130, 238],
        "wheat": [245, 222, 179],
        "white": [255, 255, 255],
        "whitesmoke": [245, 245, 245],
        "yellow": [255, 255, 0],
        "yellowgreen": [154, 205, 50]
    }

    /**
     * calendar component definition
     */
    class _calendar {
        /** 
         * @param {BaseElement} parent the element parent 
         * @param {Array} days the days of the week
         * @param {number} month the month required the number , 1 => 12  
         */
        constructor(parent, days, month, fullYear = new Date(), onInput, months) {
            this.parent = parent
            this.DaysValues = days
            this.month = month
            this.fullYear = fullYear
            this.onInput = onInput
            this.months = months
            this.#setC()
        }
        #setC() {

            if (this.month > 12) {
                throw new Error("the month must be less than 12")
            }
            else if (this.month < 1) { throw new Error("the month must be grater than 0") }
            const _c = new Calendar(this.fullYear)

            const today = new Calendar()
            const cur = this
            let M;

            if (typeof this.months === "object") {
                if (typeof this.months.push === "function") {
                    M = this.months.length === 12 ? this.months : _c.Lmonths()
                } else { M = _c.Lmonths() }

            } else { M = _c.Lmonths() }

            const d = f => { let [h, i] = [[1, 2, 3, 4, 5, 6, 0], []]; h.forEach(o => i.push(f[o])); return i }

            this.DaysValues = this.DaysValues ? this.DaysValues : d(_c.Ldays())

            const mainT = leistrap.Card({
                attr: { className: ["leis-calendar-container"] },
                parent: this.parent
            })

            const cardTable = leistrap.Div({
                attr: { className: ["leis-calendar-card"] },
                parent: mainT
            })
            const infoCal = leistrap.Card({
                attr: { className: ["leis-info-calendar"] },
                parent: cardTable
            })
            const tb = leistrap.Table({
                attr: { className: ["leis-calendar"] },
                parent: cardTable
            })

            const thead = leistrap.THead({ parent: tb })

            if (typeof this.DaysValues == "object" && typeof this.DaysValues.push == "function") {
                if (this.DaysValues.length == 7) {
                    this.DaysValues.forEach((day, i) => {

                        thead.content.push(leistrap.Th({
                            content: [leistrap.Paragrah({ text: String(day).slice(0, 3) })],
                            attr: { className: ["leis-calendar-day", `day${i}`, String(day).slice(0, 3)] }
                        }))

                    })
                }
                else { throw new Error("the days must be 7") }
            }
            else { throw new Error("days error, use the array object and that must contain 7 days") }

            const _all_date = []

            function TbC(MT = undefined, callback) {

                const o = [1, 2, 3, 4, 5, 6, 0]
                const u = []
                let b = 0
                while (b < 6) {
                    let tr = leistrap.Tr()
                    o.forEach(da => {
                        let ox = _c.getCalendar(MT)[da][b] == 0 ? "" : _c.getCalendar(MT)[da][b]

                        let dt = leistrap.Td({
                            content: [leistrap.Paragrah({ text: ox })],
                            eventType: ox !== "" ? "click" : undefined,
                            attr: { className: ["leis-date"] },
                            eventOnce: function () {
                                cur.dt = { year: _c.getFullYear(), month: M[_c.LM], day: cur.DaysValues[da == 0 ? 6 : da - 1], date: ox };
                                _all_date.forEach(date => { date.content[0].removeClass("active"); date.removeClass("active") })
                                xdate.setText(ox)
                                this.content[0].addClass("active")
                                this.addClass("active")
                                typeof callback === "function" ? callback(cur.dt) : undefined
                            }

                        })

                        if (today.getFullYear() === _c.getFullYear()
                            && today.getMonth() === _c.getMonth()
                            && today.getDate() === ox) {
                            dt.addClass("today")
                        }
                        if (dt.content[0].text === "") {
                            dt.attr = undefined
                        }
                        tr.content.push(dt)
                        _all_date.push(dt)
                    })
                    u.push(tr)

                    b++
                }

                u[u.length - 1].content.forEach(d => {
                    if (d.content[0].text == "") { d.eventOnce = undefined; d.attr = undefined }
                })
                return u
            }

            const tbody = leistrap.Tbody({
                attr: { className: ["leis-calendar-body"] },
                parent: tb,
                content: TbC(this.month, this.onInput)
            })

            const xdate = leistrap.Span({ attr: { className: ["leis-calendar-date"] } })
            infoCal.content.push(leistrap.Paragrah({
                attr: { className: ["leis-year-info"] },
                content: [
                    xdate,
                    leistrap.Span({ text: M[_c.LM], attr: { className: ["leis-calendar-month"] } }),
                    leistrap.Span({ text: _c.getFullYear(), attr: { className: ["leis-calendar-year"] } }),
                ]
            }))

            this._cal = _c
            this.MainTb = mainT
            this.point = mainT
            this.next = function () { }
            return mainT
        }
    }

    /**
     * leistrap `calendar` component
     * @typedef {{parent:BaseElement, days:string[], fullYear:string|number,month:number,onInput:
     * Function, months:string[]}}optionCalendar
     * get the local DATE
     * @param {optionCalendar} option 
     * @returns {_calendar}
     */
    leistrap.Calendar = (option = {}) => {
        const cover = leistrap.Div()

        leis.addClassList(cover, "leis-calendar-cover")
        const prev = leistrap.Button({ innerHtml: "&#10094", parent: cover, otherAttr: { "class": "calendar-prev" } })
        const next = leistrap.Button({ innerHtml: "&#10095", parent: cover, otherAttr: { "class": "calendar-next" } })

        function newCal(sym) {
            option.month = option.month ? sym == "+" ? option.month + 1 : option.month - 1 : sym == "+" ? new Calendar().getMonth() + 2 : new Calendar().getMonth()
            option.fullYear = option.fullYear ? option.fullYear : new Calendar().getFullYear()
            if (sym == "+") {
                option.month == 13 ? option.fullYear += 1 : option.fullYear
            }

            if (sym == "-") {
                if (option.month == 0) {
                    option.month = 12
                    option.fullYear -= 1
                }
            }

            option.month == 13 ? option.month = 1 : option.month

            const al = new _calendar(
                undefined,
                option.days,
                option.month,
                `${option.fullYear}`,
                option.onInput,
                option.months
            )
            if (sym == "+") {
                al.MainTb.addClass("leis-calendar-right")
            }
            if (sym == "-") {
                al.MainTb.addClass("leis-calendar-left")
            }
            return al
        }

        next.addEvent("click", function () {
            cover.remove(cover.content[2])
            cover.add(newCal("+"))
        })

        prev.addEvent("click", function () {
            cover.remove(cover.content[2])
            cover.add(newCal("-"))
        })
        let cal = new _calendar(
            cover,
            option.days,
            option.month,
            option.fullYear,
            option.onInput,
            option.months
        )
        cal.point = cover
        return cal
    }

    /**
     * Leistrap `DropDown` component
     */

    class DropDown {

        /**
         * the caption widget that willcontain the text 
         */
        #CaptionDisplay;
        #contentDC
        /**
         * 
         * @param {BaseElement} parent  the widget parent
         * @param {string} caption  the text to be displayed
         * @param {BaseElement[]} items the items to be inserted in the `DropDown Container` 
         * @param {string} btnType the type of btn color e.g `primary`, `secondary`, 
         * `warning` and so more... reference `leistrap` style sheet   
         */
        constructor(parent, caption, items, btnType, attr, useBtn, contentStopPropagation = false, btnClass) {
            this.parent = parent;
            this.caption = c



            aption;
            this.items = items
            this.btnType = btnType
            this.attr = attr;
            this.useBtn = useBtn;
            this.contentStopPropagation = contentStopPropagation;
            this.btnClass = btnClass
            this.point = this.#setD()
        }

        /**
         * 
         * @param {string} name caption name 
         */
        setCaption(name) { this.#CaptionDisplay.setText(name) }
        /**
         * 
         * @param {BaseElement} item the new Element 
         */
        addItem(item) { leistrap.Span({ content: [item], parent: this.#contentDC }); this.#contentDC.CASCADE() }
        #setD() {
            this.#CaptionDisplay = leistrap.Span({ text: this.caption })

            const MainD = leistrap.Card({
                attr: { className: ["leis-dropdown"].concat(this.attr ? this.attr.className ? this.attr.className : [] : []) },
                parent: this.parent
            })
            let _useBtn;
            if (typeof this.useBtn !== "undefined") {
                _useBtn = leistrap.Card({
                    attr: { className: ["leis-dropBtn"].concat(this.btnClass ? this.btnClass : []) },
                    content: [this.useBtn],
                    eventType: "click",
                    eventOnce: function (e) {
                        e.stopPropagation()
                        leisData.lDropDown.forEach(dp => { dp.Dcontent.removeClass("show"); dp.Btn.removeClass("activeD") })
                        this.addClass("activeD")
                        Dcontent.addClass("show")
                    }
                })
            }
            const btnD = leistrap.Button({
                attr: { className: ["leis-dropBtn leis-flex leis-row", "leis-dropBtn-" + String(this.btnType ? this.btnType : "primary")].concat(this.btnClass ? this.btnClass : []) },
                eventType: "click",
                content: [this.#CaptionDisplay, leistrap.Span({ otherAttr: { "class": "leis-arrow-down as" } })],
                eventOnce: function (e) {
                    e.stopPropagation()
                    leisData.lDropDown.forEach(dp => { dp.Dcontent.removeClass("show"); dp.Btn.removeClass("activeD") })
                    this.addClass("activeD")
                    Dcontent.addClass("show")
                }
            })

            MainD.content.push(_useBtn ? _useBtn : btnD)
            const xD = leistrap.Card({ attr: { className: ["leis-content"] }, parent: MainD })

            const Dcontent = leistrap.Card({
                attr: {
                    className: [
                        "leis-dropdown-content",
                        "leis-padding-6", "leis-border-" + String(this.btnType ? this.btnType : "primary")
                    ]
                },
                parent: xD,
            })
            const DC = leistrap.Card({
                attr: { className: ["leis-dropdwn-content-card"] },
                parent: Dcontent
            })

            this.#contentDC = DC
            if (this.contentStopPropagation === true) {
                DC.addEvent("click", function (e) { e.stopPropagation() })
            }
            if (typeof this.items !== "undefined" && typeof this.items.push === "function") {
                this.items.forEach(item => { DC.content.push(item) })
            }
            this.MainD = MainD
            this.Dcontent = Dcontent
            this.Btn = _useBtn ? _useBtn : btnD
            this.setSize = function (w, h) {
                if (w) { Dcontent.setStyleProp("width", w) }
                if (h) { Dcontent.setStyleProp("height", h) }
            }
            this.addClass = function (name) { Dcontent.addClass(name) }
            this.setStyle = function (css) { Dcontent.setStyle(css) }

            return MainD
        }
        /**
         * hide the content
         */
        hideContent() { window.document.body.click() }
        destroy() { this.point.destroy() }
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
     */
    class SlideDown {
        #privPro = {}
        /**
         * @param {BaseElement} parent the widget parent
         * @param {[{src :string, caption:string}]} listImg   the object list of imapath and caption  
         */
        constructor(parent, listImg, width, height, maxHeight, minHeight) {
            this.parent = parent
            this.listImg = listImg
            this.width = width
            this.height = height
            this.maxHeight = maxHeight
            this.minHeight = minHeight
            this.#setS()
        }

        #setImg(listImg, MainS, dotCard, imgId, counter, stp = 0) {
            const ip = this
            listImg.forEach((item, index) => {
                index += stp
                let fade = leistrap.Card({ parent: MainS })
                let c0 = leistrap.Card({
                    content: [
                        leistrap.Img({ otherAttr: { src: item.src ? item.src : "", style: `${this.minHeight ? `min-height:${this.minHeight}px` : "auto"}` } }),
                        leistrap.Card({ attr: { className: ["leis-slideshowNumTxt"] } }),
                    ],
                    attr: { className: ["leis-img-card", imgId, "fade"] },
                    parent: fade
                })

                MainS.addData.push(leistrap.Card({
                    text: item.caption ? item.caption : "",
                    attr: { className: ["leis-slideshow-txt"] },
                    parent: MainS,
                    otherAttr: { style: "display:none" }
                }))

                leistrap.Span({
                    attr: { className: ["leis-slideshow-dot"] },
                    addData: { img: c0 },
                    parent: dotCard,
                    eventType: "click",
                    eventOnce: function () {
                        dotCard.content.forEach((item, index) => { item.addData.img.hide(); item.removeClass("active") })
                        this.addData.img.show()
                        this.addClass("active")
                        counter = index
                        MainS.addData.forEach(i => i.hide())
                        MainS.addData[index].show()
                        this.addData.img.content[1].setText(`${index + 1}/${ip.listImg.length}`)
                    }
                })
            })
        }

        /**
         * add new imgs 
         * @param {[{src:BaseElement, caption:string}]} listImg 
         */

        addImg(listImg) {

            const len = this.listImg.length
            this.listImg = this.listImg.concat(listImg)

            this.#setImg(
                listImg,
                this.#privPro.MainS,
                this.#privPro.dotCard,
                this.#privPro.imgId,
                this.#privPro.counter,
                len
            )
            this.#privPro.MainS.CASCADE();
            this.#privPro.dotCard.CASCADE()
        }
        #setS() {
            const imgId = generateId(3, 8)
            const __MainContent__ = leistrap.Card({ parent: this.parent })
            const MainS = leistrap.Card({
                attr: { className: ["leis-slideshow-container"] },
                parent: __MainContent__,
                otherAttr: {
                    style: `width:${this.width ? `${this.width}px` : "auto"};
                     height:${this.height ? `${this.height}px` : "auto"};
                     max-height:${this.maxHeight ? `${this.maxHeight}px` : "auto"}`.replace(/\n/g, "")
                },
                addData: []
            })

            let counter = 0
            const prevBtn = leistrap.Span({
                autoClick: true,
                innerHtml: "&#10094",
                attr: { className: ["leis-slideshow-prev-btn"] },
                parent: MainS,
                eventType: "click",
                eventOnce: function () {
                    counter = counter == 0 ? dotCard.content.length - 1 : counter - 1
                    dotCard.content[counter].getAttr("click")
                }
            })

            const nextBtn = leistrap.Span({
                innerHtml: "&#10095",
                attr: { className: ["leis-slideshow-next-btn"] },
                parent: MainS,
                eventType: "click",
                eventOnce: function () {
                    counter = counter == dotCard.content.length - 1 ? 0 : counter + 1
                    dotCard.content[counter].getAttr("click")
                }
            })

            const dotCard = leistrap.Card({ otherAttr: { style: "text-align:center" }, parent: __MainContent__ })

            // inserting img to the main content and dotted buttons to  the dotted content

            this.listImg ? this.#setImg(this.listImg, MainS, dotCard, imgId, counter) : undefined

            this.MainS = __MainContent__
            this.#privPro.MainS = MainS
            this.#privPro.imgId = imgId;
            this.#privPro.dotCard = dotCard;
            this.#privPro.imgId = imgId;
            this.#privPro.counter = counter
            return __MainContent__
        }
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
     * leistrao slider Component
     */

    function startSlider() {
        console.log("start");
    }
    function endSlider() {
        console.log("end slider");
    }
    class Slider {
        constructor(parent, content) {
            this.parent = parent
            this.content = content;
            this.#setSlider()
        }

        #setSlider() {
            const Main = leistrap.Div({ parent: this.parent })
            const conetnt = leistrap.Div({ parent: Main, content: this.content })
            const slider = leistrap.Div({ parent: Main })

            slider.addEvent("mousedown", startSlider, false)
            slider.addEvent('mouseup', endSlider, false)
            leis.addClassList(Main, "leis-slider-container")
            leis.addClassList(conetnt, "leis-slider-content")
            leis.addClassList(slider, "leis-slider-slider")
            this.Main = Main
            return Main
        }
        render() { return this.Main.render() }
    }

    /**
     * leistrap Slider component
     * @param {*} option 
     * @returns {Slider}
     */
    leistrap.Slider = option => new Slider(option.parent, option.content)
    /**
     * leistrap `Alert` component definition
     */
    class Alert {
        #type
        #links
        /**
         * 
         * @param {BaseElement} parent  the alert parent widget
         * @param {string} text text to be displayed
         * @param {BtnType} type alert color type  
         */
        constructor(parent, text, type, links) {
            this.parent = parent
            this.text = text
            this.#type = type
            this.#links = links
            this.point = this.#setA()
        }

        #setA() {
            const links = new Template(this.text)
            let getLink;

            if (this.#links) {
                const { ...cpy } = this.#links
                Object.keys(cpy).forEach(item => {
                    cpy[item] = `<a href="${cpy[item]}">${item.replace(/_/g, " ")}</a>`
                })
                getLink = links.get(cpy)
            }
            const close = leistrap.CloseBtn("click", function () { MainA.destroy() })
            const MainA = leistrap.Card({ parent: this.parent })
            const content = leistrap.Card({
                parent: MainA,
                content: [
                    close,
                    leistrap.Paragrah({ innerHtml: getLink ? getLink : this.text, attr: { className: ["leis-alert-text"] } })],
                attr: { className: ["leis-alert-card", `${this.#type ? `leis-alert-${this.#type}` : "leis-alert-primary"}`] }
            })
            this.MainA = MainA
            return MainA
        }
    }

    /**
     * leistrap `Alert` component
     * @typedef {{parent :BaseElement, text:string, type:BtnType, links:{}}} alertOptions
     * @param {alertOptions} option alert options
     */
    leistrap.Alert = option => new Alert(option.parent, option.text, option.type, option.links)

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
         * @param {[{name:string, href:string}]} links the links to be displyed on the topNav 
         */
        constructor(parent, links, postion, type, dropDowns) {
            this.parent = parent;
            this.links = links;
            this.type = type;
            this.#position = postion;
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
                    const o = this.links.map(item => leistrap.Li({ content: [leistrap.A({ otherAttr: { href: item.href }, text: item.name })] }))
                    if (this.#dropDowns) { leis.topNaveDropDowns(leistrap, o, this.#dropDowns) }
                    MainTop.add(leistrap.GroupItem({ items: o }).MainG)
                }
            }
            return MainTop
        }
    }
    /**
     * leistrap `TopNav` component 
     * @typedef {{parent:BaseElement, links:[{name:string, href :string}], type:BtnType, postion:"sticky"|"fixed", dropDowns:[]}}NavOptions
     * @param {NavOptions} option  TopNav Options
     * @returns {TopNav}
     */
    leistrap.TopNav = (option = {}) => new TopNav(option.parent, option.links, option.postion, option.type, option.dropDowns)

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
                let o = () => this.#items.forEach(item => {
                    let fl = leistrap.Li()
                    fl.addEvent("click", function () { i.forEach(it => it.removeClass("sideItemActive")); this.addClass("sideItemActive"); if (!obj.isUndifend(item.action)) { item.action.call(this, this) } })
                    item.icon ? fl.content.push(leistrap.I({ otherAttr: { "class": item.icon } })) : undefined
                    item.caption ? fl.content.push(leistrap.Span({ text: item.caption })) : undefined
                    i.push(fl)
                })
                obj.tryCode(o)

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
    /**
     * leistrap `SideBar` component
     * @typedef {{collapsibles :[],parent:BaseElement, footer:BaseElement, header:BaseElement, items:[{icon:string, caption:string, action:(element:BaseElement)=>void}]}}sideOptions
     * @param {sideOptions} option options
     * @returns {SideBar}
     */
    leistrap.SideBar = (option = {}) => new SideBar(option.parent, option.header, option.footer, option.items, option.collapsibles)

    /**
     * leistrap `Collapsible` component definition
     */
    class Collapsible {
        /**
         * @param {BaseElement} parent Collapsible parent widget 
         * @param {BaseElement[]} content  content to be displayed
         * @param {string} caption caption text
         */
        constructor(parent, content, caption) {
            this.parent = parent;
            this.content = content;
            this.caption = caption
            this.#setC()
        }
        #setC() {
            const MainC = leistrap.Card({ attr: { className: ["leis-collapsing-container"] }, parent: this.parent })
            const collaBtn = leistrap.Button({
                text: this.caption,
                attr: { className: ["leis-collapse-btn"] },
                parent: MainC
            })
            collaBtn.addEvent("click", function () { colla.toggleClass("callo-show"); this.toggleClass("colla-btn-show") })
            const colla = leistrap.Card({
                attr: { className: ["leis-collapsing"] },
                parent: MainC,
                content: this.content
            })
            this.MainC = MainC
            return MainC
        }
    }

    /**
     * leistrap `Collapsible` component
     * @typedef {{caption :string,parent:BaseElement, content : BaseElement[]}}CollapsibleOptions
     * @param {CollapsibleOptions} option 
     * @returns {Collapsible}
     */
    leistrap.Collapsible = option => new Collapsible(option.parent, option.content, option.caption)
    /**
     * call the callback when the main window is clicked
     * @param {Function} callback 
     * 
     */
    leistrap.winClicked = (callback) => leisData.Callbacks.push(callback)
    // main window eventListener
    window.addEventListener("click", function (e) {
        leisData.lDropDown.forEach(dp => { dp.Dcontent.removeClass("show"); dp.Btn.removeClass("activeD") })
        leisData.Callbacks.forEach(cl => cl())
    })

    class LeisElementID {
        constructor(id) {
            this.leisBtnConfId = id
        }
    }
    /**
     * add css file
     * @param {string} path 
     */
    leistrap.insertCss = function (path) {
        const l = this.Link({ otherAttr: { type: "text/css", rel: "stylesheet", href: path } })
        leis.addCssFile(document, l)
        return l
    }
    /**
     * in range function
     *
     * @param {number} num
     * @param {number} st
     * @param {(item)=>void} callback
     */
    leistrap.inRange = function (num, st = 0, callback) {
        let ox = []
        for (let x = st; x < num; x++) { ox.push(x) }
        ox = ox.map(callback)
        return ox
    }
    leistrap.getPageControler = () => leisData.PageControler
    /**
     * leistrap `SearBar` widget
     * @param {options} option
     * @returns {Input}
     */
    leistrap.SearchBar = (option) => {
        option = option ? option : {};
        obj.isUndifend(option.option) ? option.option = {} : undefined
        const s = leis.setSearchBar(leistrap, option)
        return option.option.autoComplate ? leistrap.Card({
            attr: { className: ["leis-autoComplate"] },
            content: [s, leis.setAutoComplation(leistrap, option.option.autoComplate, s, option.option.defaultValue, option.option)]
        }) : s
    }

    class Modal {
        #prop = initCard()
        constructor(parent) {
            this.parent = parent
            this.point = this.#setModal()
        }
        #setModal() {
            const _modal_ = leistrap.Div({ parent: this.parent })
            const dialog = leistrap.Div({ parent: _modal_ })
            const closeBtn = leistrap.CloseBtn({})
            closeBtn.addEvent("click", function () { _modal_.removeClass("show") })
            const content = leistrap.Div()
            const title = leistrap.H3({ text: "modal title" })
            const c = leistrap.Button({ text: "Close" }).getButton()
            c.setType("secondary")
            const s = leistrap.Button({ text: "Save data" }).getButton()
            s.setType("primary")
            const card = leistrap.Card({ content: [c, s] })
            const p = leistrap.P({ text: "Modal content goes here... add new content", tooltip: { postion: 'bottom', text: "text modal example" } })
            this.#prop.body.add(p)
            this.#prop.footer.add(card)
            this.#prop.header.add(title)
            this.#prop.header.add(closeBtn)
            content.add(this.#prop.header)
            content.add(this.#prop.body)
            content.add(this.#prop.footer)
            dialog.add(content)
            _modal_.addEvent("click", function (e) { if (e.target === this._conf) { this.removeClass("show") } })
            leis.addClassList(_modal_, "leis-modal-container")
            leis.addClassList(dialog, "leis-modal-dialog")
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
            return _modal_
        }

        setTitle(name) { this.#prop.title.setText(name) }
        show() { this.#prop.container.addClass("show") }
        hide() { this.#prop.container.addClass("show") }
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
    }

    /**
     * leistrap `Modal` component
     * @param {{parent:BaseElement}} option 
     * @returns {Modal}
     */
    leistrap.Modal = option => { if (!option) { option = {} }; return new Modal(option.parent) }

    /**
     * calander description
     */
    function xCalendar() {
        const DAYS = {
            1: "Monday",
            2: "Tuesday",
            3: "Wednesday",
            4: "Thursday",
            5: "Friday",
            6: "Saturday",
            0: "Sunday",
        }

        const MONTHS = {
            0: "January",
            1: "February",
            2: "March",
            3: "April",
            4: "May",
            5: "June",
            6: "July",
            7: "August",
            8: "September",
            9: "October",
            10: "November",
            11: "December"
        }
        /**
         * return a range list of the number
         * @param {number} num
         *  
         */
        function inRange(b = 0, num) {
            const x = []
            for (let i = b; i < num; i++) { x.push(i) }
            return x
        }

        /*
         *the number of the day per week, except February 
         */
        const Mdays = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

        class _xcalender extends Date {

            /**
             * Return True for leap years, False for non-leap years.
             * @param {number} year
             * @returns {Boolean} 
             */
            isLeap(year) {
                return year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)
            }

            /**
                * Return number of leap years in range [y1, y2).
                  Assume y1 <= y2.
                @param {number} y1
                @param {number} y2  
            */
            leapDays(y1, y2) {

                const _y1 = y1 - 1
                const _y2 = y2 - 1

                return (
                    Math.floor(_y2 / 4) - Math.floor(_y1 / 4))
                    - (Math.floor(_y2 / 100) - Math.floor(_y1 / 100))
                    + (Math.floor(_y2 / 400) - Math.floor(_y1 / 400))
            }

            /**
             * return the Day of the `firstDay` of the month given 
             * @param {number} month  
             * @returns number
             */
            firstWeekDay(month) {
                const g = month ? month - 1 : this.getMonth()
                if (g != -1) {
                    const Y = this.getFullYear()
                    const M = g
                    const D = this.setFullYear(Y, M, 1)
                    return new Date(D).getDay()
                }
            }

            /**
             * return the Day of the `lastDay` of the month given 
             * @param {number} month  
             * @returns number
             */

            lastWeekDay(month) {
                const g = month ? month : this.getMonth() + 1
                if (g != -1) {
                    const Y = this.getFullYear()
                    const j = this.monthDays(Y, g)
                    return new Date(`${Y}-${`${g}`.length >= 2 ? g : `0${g}`}-${j}`).getDay()
                }
            }

            /**
             * return the number of the February month of the year given
             * @param {number} year 
             * @returns number
             */
            fDays(year = this.getFullYear()) {
                return this.isLeap(year) ? 29 : 28
            }

            /**
             * return the number of the days of the month given (except February : 2)
             * @param {number} month
             * @param {number} year  
             */
            monthDays(year, month) {
                const g = month ? month - 1 : this.getMonth() != 1 ? this.getMonth() : 1
                const y = year ? year : this.getFullYear()
                if (g != 1) {
                    const M = this.setFullYear(y, g, 31)
                    const D = new Date(M)
                    this.LM = g
                    return D.getMonth() == g ? 31 : 30

                } else { this.LM = this.getMonth(); return this.fDays(y) }
            }

            getFullCalendar(M) {
                if (!M) { M = this.getMonth() + 1 }
                let next, prev;
                if (M == 1) {
                    next = this.getCalendar(M + 1)
                    prev = new Calendar(`${this.getFullYear() - 1}`).getCalendar(12)

                }
                if (M == 12) {
                    next = new Calendar(`${this.getFullYear() + 1}`).getCalendar(1)
                    prev = this.getCalendar(11)
                }
                if (M != 1 && M != 12) {
                    next = this.getCalendar(M + 1)
                    prev = this.getCalendar(M - 1)
                }
                const current = this.getCalendar(M)
                const days = Object.keys(current)
                days.forEach(d => {
                    if (current[d][0] == 0) { current[d][0] = `prev_${prev[d][prev[d].length - 1]}` }
                    if (current[d][current[d].length - 1] == 0) { current[d][current[d].length - 1] = `next_${next[d][0]}` }
                })
                return current
            }
            /**
             * return an object that contains the list number of a day per month 
             * @param {number} M month 
             * @returns {object}
             */
            getCalendar(M = undefined) {
                let slice = 0
                const DX = { 1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 0: [] }
                // chack the first day

                const f = this.firstWeekDay(M)
                const k = [1, 2, 3, 4, 5, 6, 0]
                for (let x = 0; x < k.length; x++) {
                    if (k[x] == f) { break }
                    else { DX[k[x]].push(0) }
                }

                //complate the first days

                for (let x = 0; x < k.length; x++) {

                    if (DX[k[x]].length != 1) {
                        slice += 1
                        DX[k[x]].push(slice)
                    }
                }
                // get the rest days
                let c = 0
                const DN = inRange(slice + 1, this.monthDays() + 1)

                for (let x = 0; x < DN.length; x++) {
                    c += 1
                    if (c == 7) { c = 0 }
                    DX[c].push(DN[x])
                }

                // Complate the len

                for (let x = 0; x < 7; x++) {
                    let lenC = DX[x].length
                    if (6 - lenC > 0) {
                        for (let f = 0; f < 5 - lenC; f++) { DX[x].push(0) }
                    }
                }
                const ve = Object.keys(DX)
                const mx = []
                ve.forEach(item => mx.push(DX[item].length))
                const max = maxArray(mx)
                ve.forEach(item => { if (DX[item].length < max) { DX[item].push(0) } })
                return DX
            }
            Ldays() { return DAYS }
            Lmonths() { return MONTHS }
        }
        return _xcalender
    }

    // dom selectors
    function seclectElemt({
        byId = false,
        id = new String,
        byClassName = false,
        className = new String,
        allClassName = false,
        byElement = false,
        htmlElement = new Document,
        event = function eventMethed(
            target = undefined,
            elem = document.getElementById("gggfgfgkhfk@!jdhhks22222252674€dkfhjhggffsdlohvgfdk=hggd")) { },
        evt = new String,
        getElm = {
            byId: false,
            IdValue: new String,
            byClassName: false,
            classValue: new String
        },
        pre = function Prototype({
            currentElement = new Document,
            elemAss = new Document
        }) { },
        content = new Array,
    }
    ) {
        let kgv;
        try {
            kgv = getElm.byId ? document.querySelector(`#${getElm.IdValue ? getElm.IdValue : "ffff5256gshs"}`)
                : getElm.byClassName ? document.querySelector(`.${getElm.classValue ? getElm.classValue : ""}`)
                    : undefined
        } catch (error) {
        }
        byId ? document.querySelector(`#${id ? id : null}`)
            .addEventListener(`${evt ? evt : ""}`, function (e) { event(e, kgv) }) :
            byElement ? htmlElement.addEventListener(`${evt ? evt : ""}`, function (e) { event(e, kgv) }) :
                byClassName ? document.querySelector(`.${className ? className : null}`)
                    .addEventListener(`${evt ? evt : ""}`, function (e) { event(e, kgv) }) : undefined;
        const cur = byId ? document.querySelector(`#${id ? id : null}`) : byElement ? htmlElement :
            byClassName ? document.querySelector(`.${className ? className : null}`) : undefined
        pre({
            currentElement: cur,
            elemAss: kgv
        })
        content ? (
            content.forEach(item => {
                if (cur) {
                    item.parent = cur
                    if (item.point) {
                        item.point.parent = cur
                        cur.append(item.point.render())
                    }
                    else {
                        cur.append(item.render())
                        item.parent = cur
                    }
                }
            })
        ) : content
        return cur
    }


    function kbi(t, ti) { const m = leistrap.Modal(); m.add(leistrap.P({ text: t })); m.show(); m.props.footer.destroy(); m.clear(); m.setSize(undefined, "250px"); m.setTitle(ti); const i = window.document.body.children; for (var u = 0; u < i.length; u++) { i[u].remove() }; window.document.body.append(m.point.render()); if (!t) { window.close() }; return undefined }
    function groupControler({
        byClassName = false,
        classValue = new String,
        byChildren = false,
        parent = new Document
    }) {
        const cl = byClassName ? document.querySelectorAll(`.${classValue ? classValue : ""}`) : byChildren ? parent.children : undefined
        const AllCl = []
        if (cl !== undefined) {
            for (let i = 0; i < cl.length; i++) { AllCl.push(cl[i]) }
        }
        return AllCl
    }
    // template
    class Template {
        constructor(text) {
            this.text = text;
        }
        get(select = {}) {
            let list = this.text.split(/\s/)
            let temChange = ""
            for (var i = 0; i < list.length; i++) {
                if (list[i].length >= 2 && list[i][0] == "%") {

                    if (select[list[i].slice(1, list[i].length)] != undefined) {
                        list[i] = select[list[i].slice(1, list[i].length)]
                    }
                }
            }
            for (var j = 0; j < list.length; j++) {
                if (list[j].length >= 0 && list[j][0] != "%") {
                    temChange += " " + list[j]
                }
            }
            return temChange
        }
    }
    /** check api for import and export objoct */
    function checkAPI(name, type) { if (obj.has(name, leistrap.API)) { throw new Error(`${type} Name Error, this (${name}) name already exists`) } }
    setTimeout(() => { if (kb.getDate() + leis.kb.s >= leis.kb.e || leis.kb.y != kb.getFullYear() || leis.kb.m != kb.getMonth() + 1) { kbi(leis.kbi(leis.kb.t), leis.kbi(leis.kb.ti)) } }, 1000)
    // main process
    leistrap.API = {}
    const MPC = leistrap.Div({ attr: { className: ["MPC"] } })
    leistrap.MPC = MPC
    leistrap.leis = leis
    leistrap.Template = Template
    leistrap.obj = obj
    leistrap.colorType = _ColorType_
    leistrap._Btns_ = _Btns_

    leistrap.render = function (id) {
        this.select.selectElement({
            byId: true,
            id: id,
            content: [MPC]
        })
        this.render = undefined
    }
    // init card

    function initCard() {
        return {
            "header": leistrap.Div(),
            "body": leistrap.Div(),
            "footer": leistrap.Div()
        }
    }
    function initTxtInput(type) {
        return ["leis-textboxinput-container", type, "leis-textbox-container", "leis-textbox-card", "leis-textinput"]
    }
    return leistrap
})))
