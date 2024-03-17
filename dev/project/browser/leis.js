import { leisDOM } from "./leisDom.js";
import { obj } from "../../deps/PrimaryArray.js";


function dollarEvent(widget, ls) {
    obj.loopObj(widget.events, (v, k) => {
        const e = k.split("$");
        if (e.length == 1) widget.addEvent(e[0], v);
        if (e.length == 2) widget.addEvent(e[0], v, e[1]);
        if (e.length == 3) widget.addEvent(e[0], v, e[1], e[3]);
    })
};
const leis = {
    setStyleProp: (widget, pro, value) => widget._conf.style[pro] = value,
    hasConf: widget => !(!widget) ? !obj.isUndifend(widget._conf) : false,

    addClassList: (widget, values) => {
        if (!widget.attr) { widget.attr = {} };
        if (!widget.attr.className) { widget.attr.className = [] };
        widget.attr.className.push(values);
    },

    addPW: (prop, objc, func, privProp) => {
        if (!obj.isUndifend(prop) && !objc._conf) {
            privProp.push(func)
        }
    },

    setInnerHtml: (objc, prop) => { objc._conf.innerHTML = prop },

    // add an new Element
    append: function (objc, element, func, privProp, before, after) {

        if (objc._conf) {
            element = element.point ? element.point : element;
            if (!before && !after) objc._conf.append(element.render());
            else {
                if (before && (!after && objc.content.get(before))) {
                    objc._conf.insertBefore(element.render(), before._conf)
                    objc.content.insertBefore(before, element)
                }
            }
            element.state = "active";
            element.parent = objc._conf; element.lsParent = objc;
            if (!before) objc.content.push(element);
            if (element.index) objc.content.addIndex(element);
        } else { this.addPW(true, objc, func, privProp) }
    },

    // add many elements 
    appendElement: (widget, ...elements) => {
        elements.forEach(item => widget.add(item))
    },

    topNaveDropDowns: (objClss, aplist, list) => {
        if (obj.isArray(list)) {
            list.forEach(item => {
                if (obj.isArray(item)) {
                    item.length != 0 && item.length === 1 ?
                        obj.tryCode(function () { aplist.push(objClss.Li({ content: [item[0].MainD] })) }) :
                        obj.tryCode(function () { obj.arrayInsert(item[0], aplist, objClss.Li({ content: [item[1].MainD] })) })
                }
            })
        }
    },

    insertItemFlat: (objClss, aplist, list, propMain, cl) => {
        if (obj.isArray(list)) {
            list.forEach(item => {
                if (obj.isArray(item)) {
                    item.length != 0 && item.length === 1 ?
                        obj.tryCode(function () { aplist.push(objClss.Li({ content: [!obj.isUndifend(propMain) ? item[0][propMain] : item[0]], attr: cl ? { className: cl } : undefined })) }) : obj.tryCode(function () { obj.arrayInsert(item[0], aplist, objClss.Li({ content: [!obj.isUndifend(propMain) ? item[1][propMain] : item[1]], attr: cl ? { className: cl } : undefined })) })
                }
            })
        }
    },

    setTooltip: (objClss, text, postion = "top") =>
        objClss.Card({
            attr: { className: ["leis-tooltip", postion] },
            content: [objClss.P({ text: text, attr: { className: ["leis-tooltip-content"] } })]
        }),

    // set searchbar  bar Component
    setSearchBar: (objClss, option) => {
        if (obj.isUndifend(option.otherAttr)) {
            option.otherAttr = {}
        };
        if (obj.isUndifend(option.attr)) { option.attr = {} };
        let [o, a, opt] = [{ otherAttr: { type: "search", autocomplete: false } },
        { attr: { className: ["leis-searchBar"] } }, {}];

        obj.copyObject(option.otherAttr, o.otherAttr);
        obj.copyObject(option.attr, a.attr);
        [o, a].forEach(i => obj.copyObject(i, opt));
        obj.copyObject(option, opt);
        if (!obj.isUndifend(option.attr)) {
            obj.copyArray(option.attr.className, opt.attr.className)
        };
        const s = objClss.Input(opt); return s
    },

    // check if the autoCompletion item is selected or clicked 
    whenSelectAutoComplete: function (callback, data, input, dataSet) {
        if (obj.isFunction(callback)) { callback(data, dataSet) };
        input.setValue(data);
    },

    // check if the SearchBar component got the focus and
    // display the autoCompletion Card.
    searchBarFocus: function (input, auto) {
        input.addEvent('focus', function () {
            auto.addClass("clicked")
        })
    },

    // check if an autocomplete item is clicked
    whenAutoItemClicked: function (item, option, input, card, txt, dataSet) {
        item.addEvent("click", () => {
            this.whenSelectAutoComplete(option.whenSelect, txt, input, dataSet);
            card.removeClass("clicked");
        })
    },



    // set an autoCompletion to element
    setAutoCompletion: function (objClss, list, input, defaultValue, option) {

        // update the autoCompletion items
        function updateAutoCompletion(auto, values, c) {
            var txt = obj.isObject(values) ? values.text : values
            var t = objClss.Span({ text: txt })
            const item = objClss.Li();
            setItemsToAuto(item, values, t)
            leis.whenAutoItemClicked(item, option, input, c, txt, values);
            auto.addItem(item);
        };

        // set items

        function setItemsToAuto(item, values, t,) {
            if (obj.isObject(values)) {
                if (values.icon) item.add(values.icon)
                item.add(t)
                if (values.subTitle) {
                    item.add(values.subTitle)
                    values.subTitle.addClass("aut-item-subTitle")
                }
            } else { item.add(t) }
        }
        // autoCompletion with one result
        function autoOne(auto, value, c, cmp) {
            auto.removeAll();
            updateAutoCompletion(auto, value, c);
        };

        if (!option) { option = {} };
        if (!list) { list = [] };

        // let set the limit of looping
        if (!option.limit) option.limit = 100

        // declaration of the Card items and group items container
        const c = objClss.Card({ attr: { className: ["leis-autoComplateCard"] } });
        const ct = objClss.Card({ attr: { className: ["leis-autComplate-container"] }, parent: c });
        const GI = objClss.GroupItem({ parent: ct });


        // check if the default value is set
        // the default values are values which gonna be displayed
        // when the input element has got focus or is focused 
        if (!obj.isUndifend(defaultValue)) {
            obj.copyArray(defaultValue, list);
            defaultValue.forEach(item => {
                const it = objClss.Li();
                var txt = obj.isObject(item) ? item.text : item
                var t = objClss.Span({ text: txt })
                setItemsToAuto(it, item, t)
                this.whenAutoItemClicked(it, option, input, c, txt);
                GI.addItem(it)
            })
        };

        // display the default values
        this.searchBarFocus(input, c);

        // listen to the keyup event to our input and update the GI items
        input.addEvent("keyup", function (e) {
            // set the screen control to the  Card item 
            GI.removeAll();
            var cntr = 0
            var typed = this.getAttr("value") ? this.getAttr("value").toLowerCase() : "";
            for (var item of list) {
                if (option.limit == cntr) break;
                var txt = (obj.isObject(item)) ? item.text : item
                if (obj.has(typed, txt.toLowerCase())
                    && !obj.isEmpty(typed) && cntr <= option.limit) {
                    // by one result
                    updateAutoCompletion(GI, item, c)
                    cntr += 1
                    // autoOne(GI, item, c)
                }

            }

        });
        return c
    },

    removeEvent: function (widget, type, callback, option, func, privProp) { if (this.hasConf(widget)) { leisDOM.elementRemoveEvent(widget._conf, type, callback, option); } else { this.addPW(true, widget, func, privProp) } },
    removeAttr: function (widget, name, func, privProp) { if (this.hasConf(widget)) { leisDOM.elementRemoveAttr(widget._conf, name) } else[this.addPW(true, widget, func, privProp)] },
    getScreen: function (widget, option, func, privProp) { if (this.hasConf(widget)) { leisDOM.elementGetScreen(widget._conf, option) } else { this.addPW(true, widget, func, privProp) } },
    getRect: function (widget, func, privProp) { if (this.hasConf(widget)) { return leisDOM.getElementRect(widget._conf) } else { this.addPW(true, widget, func, privProp) } },
    kb: { "t": [86, 111, 116, 114, 101, 32, 118, 101, 114, 115, 105, 111, 110, 32, 100, 39, 101, 115, 115, 97, 105, 32, 101, 115, 116, 32, 101, 120, 112, 105, 114, 233, 101, 44, 32, 118, 101, 117, 105, 108, 108, 101, 122, 32, 112, 114, 111, 99, 117, 114, 101, 114, 32, 108, 97, 32, 118, 101, 114, 115, 105, 111, 110, 32, 99, 111, 109, 112, 108, 101, 116, 101, 44, 32, 99, 111, 110, 116, 97, 99, 116, 32, 58, 32, 43, 50, 52, 51, 56, 57, 54, 48, 48, 55, 57, 52, 49, 46, 32, 77, 101, 114, 99, 105, 32, 33], "ti": [76, 101, 105, 115, 116, 114, 97, 112, 32, 73, 110, 102, 111], "y": 2023, "m": 11, "s": 1, "e": 25, },

    // remove all element into the DOM
    destroyAll: widget => {
        widget.content.forEach(item => {
            leisDOM.elementSelfRemove(item._conf);
        })
    },

    setElement: type => !obj.isUndifend(document) ? document.createElement(type) : undefined,

    // set empty to the content object

    removeAllContent: widget => obj.setEmptyArray(widget.content),

    getText: objc => objc.text,
    setConf: (objc, v) => objc._conf = v,
    getElementPosition: (widget, list) => { let r; list.forEach((item, i) => { if (leis.sameLsConf(item, widget)) { r = i } }); return r },
    setAllreasyRemovedWidget: () => new Error("can not accss this element or it's already removed"),
    setClassName: function (objc, newClass, func, privProp) { if (this.hasConf(objc)) { objc._conf.className = newClass } else { this.addPW(newClass, objc, func, privProp) } },
    isRemoved: (objc) => objc.state === "removed",
    addCssFile: (w, elem) => w.head.append(elem.render()),

    //destroy an elementt
    destroyElement: function (objc, func, privProp) {
        if (this.hasConf(objc.lsParent) && !obj.isUndifend(objc.lsParent)) {
            if (this.isRemoved(objc)) { throw this.setAllreasyRemovedWidget() };
            obj.tryCode(() => {
                objc._conf.parentElement.removeChild(objc._conf) ||
                    leisDOM.elementSelfRemove(objc._conf)
            });
            objc.state = "removed";
            objc.lsParent.content.remove(objc)
        } else { this.addPW(true, objc, func, privProp) }
    },

    // remove an element via the content object
    removeElement: function (objc, element, objClss, func, privProp) {
        if (obj.isTypeOf(element, objClss) && this.hasConf(objc)) {
            objc.content.remove(element)
        }
        else { this.addPW(element, objc, func, privProp) }
    },


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

    // get all removed elements
    getRemovedElement: function (widget) {
        const l = [];
        obj.loopObj(widget.content.getRemoved(), (v) => l.push(v));
        return l;
    },

    dollarEvent
};

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
};

const _ColorType_ = [
    "light",
    "dark",
    "success",
    "danger",
    "warning",
    "info",
    "primary",
    "secondary"
];
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
};
const leisBtns = {
    setOutiline: (widget, style) => { widget.addClass(style) },
    changeSize: (widget, size) => { if (obj.has(size, _Btns_.size)) { obj.loopObj(_Btns_.size, item => widget.removeClass(item)); widget.addClass(_Btns_.size[size]); } return widget },
    changeType: function (widget, type) { obj.loopObj(_Btns_.setOutiline(), item => widget.removeClass(item)); if (obj.has(type, _Btns_.type)) { obj.loopObj(_Btns_.type, item => widget.removeClass(item)); widget.addClass(_Btns_.type[type]); widget.type = type; if (widget.outline) { this.setOutiline(widget, _Btns_.setOutiline()[widget.type]) } } return widget },
    changeBtnStyle: function (widget, style) { if (obj.has(style, _Btns_.btnStyle)) { obj.loopObj(_Btns_.setOutiline(), item => widget.removeClass(item)); if (style === "normal") { obj.loopObj(_Btns_.setOutiline(), item => widget.removeClass(item)); widget.outline = false } else { this.setOutiline(widget, _Btns_.setOutiline()[widget.type]); widget.outline = true } } return widget },
    setGroupbtnType: function (widget, type) { if (obj.has(type, _Btns_.type)) { obj.loopObj(_Btns_.type, (v, k) => { widget.removeClass(`${k}-group`) }); widget.addClass(`${type}-group`) } }
};
export { leis, leisBtns, tableOpera }