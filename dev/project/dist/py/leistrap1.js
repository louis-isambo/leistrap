'use strict';function countArray(arr, offset) {var counter = offset;return function () {if (counter === arr.length - 1) counter = 0;var v = arr[counter];counter++;return v}}const obj$1 = {isUndifend: obj => !obj,isArray: obj => obj.constructor.toString().indexOf("Array") > -1,isObject: obj => obj.constructor.toString().indexOf("Object") > -1,isString: obj => obj.constructor.toString().indexOf("String") > -1,isNumber: obj => !isNaN(obj),isFunction: obj => typeof obj === "function",setEmptyArray: arr => arr.splice(0, arr.length),isNone: function (obj) { return this.isString(obj) && obj == "" },isEmpty: obj => obj.length === 0 || Object.keys(obj).length === 0,has: (prop, obj) => obj.indexOf ? obj.indexOf(prop) > -1 : obj.hasOwnProperty(prop),isTypeOf: (prop, obj) => prop instanceof obj,copyObject: function (obj, target, overwrite = false, ...exp) { if (!target) { target = {}} if (!obj) { obj = {}} Object.keys(obj).forEach(item => { if (!(this.has(item, target) && !overwrite)) { if (!this.has(item, exp)) { target[item] = obj[item] if (this.isArray(target)) { target[item] = obj[item]}}}});return target },copyArray: function (arr, target, overwrite = false) { if (!target) { target = []} if (!(!arr)) { arr.forEach((item, index) => { if (!(this.has(item, target) && !overwrite)) { target.push(item)}})} return target },getUrl: o => o.match(/http+(s|\b):\/\/[^ ]*(?=\b)+(\s|\b|\/)*/gi),hasUrl: function (o) { return !(!this.getUrl(o)) },arrayRemove: (index, arr) => arr.splice(index, 1),arrayReplace: (index, value, arr) => arr.splice(index, 1, value),arrayInsert: (index, arr, args) => { arr.splice(index, 0, args)},tryCode: (callback, error) => { try { callback()}catch (e) { if (error) { error(e)}}},after: (s, func, ...args) => setTimeout(func, s, args),loopObj: (obj, callback = (value, key, index, finished) => value) => { if (obj) { let c = 0;let f = false; for (var x in obj) { c++ c === Object.keys(obj).length ? f = true : f = false;callback(obj[x], x, c - 1, f)}}},bindFunc: (fc, bc) => function (...e) { return fc.call(bc, ...e) },arrAddWhen: (arr, item, num1, num2, callback) => { if (num1 <= num2) { if (arr) { arr.push(item)} if (callback) { callback(item)}}},arrBegin: (condi, callback) => { if (condi) { callback()}},initObj: (obj, value) => { },objKeysToLowerCase: function (o) { const target = {};this.loopObj(o, (item, x) => target[x.toLowerCase()] = item) return target },filter: function (o, callback) { const r = {} this.loopObj(o, (...args) => { if (callback(...args)) { r[args[1]] = args[0]}}); return r },defineObj: (obj, proName, value, writable = false) => Object.defineProperty(obj, proName, { value, writable }),countArray,};const leisDOM$1 = {getElementRect: elem => elem.getBoundingClientRect(),getElementTextContent: elem => elem.textContent,getElemAttr: (elem, attr) => elem.getAttribute(attr),getGivenAttr: (elem) => elem.getAttributeNames(),getPreviousElem: elem => elem.previousElementSibling,getNextElem: elem => elem.nextElementSibling,setElemAttr: (elem, attr, value) => elem.setAttribute(attr, value),animateElement: (elem, keyFrame, option) => elem.animate(keyFrame, option),setAllAttr: (elem) => elem.attributes,setText: (elem, txt) => elem.textContent = txt,elementHasAttr: (elem, token) => elem.hasAttribute(token),elementHasNode: (elem, node) => elem.contains(node),elementHasClass: (elem, token) => elem.matches(token),elementSelfRemove: elem => elem.remove(),elementRemoveAttr: (elem, attr) => elem.removeAttribute(attr),elementSelfReplace: (elem, newElem) => elem.replaceWith(newElem),elementGetScreen: (elem, option) => elem.scrollIntoView(option),elementAfter: (elem, content) => elem.after(content),elementBefore: (elem, content) => elem.before(content),elementRemoveEvent: (elem, type, callback, option) => elem.removeEventListener(type, callback, option)};function dollarEvent(widget, ls) {obj$1.loopObj(widget.events, (v, k) => {const e = k.split("$");if (e.length == 1) widget.addEvent(e[0], v);if (e.length == 2) widget.addEvent(e[0], v, e[1]);if (e.length == 3) widget.addEvent(e[0], v, e[1], e[3])})};const leis$1 = {setStyleProp: (widget, pro, value) => widget._conf.style[pro] = value,hasConf: widget => !(!widget) ? !obj$1.isUndifend(widget._conf) : false,addClassList: (widget, values) => {if (!widget.attr) { widget.attr = {}};if (!widget.attr.className) { widget.attr.className = []};widget.attr.className.push(values)},addPW: (prop, objc, func, privProp) => {if (!obj$1.isUndifend(prop) && !objc._conf) {privProp.push(func)}},setInnerHtml: (objc, prop) => { objc._conf.innerHTML = prop}append: function (objc, element, func, privProp) {;if (objc._conf) {element = element.point ? element.point : element;objc._conf.append(element.render());element.state = "active";element.parent = objc._conf; element.lsParent = objc;objc.content.push(element);if (element.index) objc.content.addIndex(element)}else { this.addPW(true, objc, func, privProp)}}appendElement: (widget, ...elements) => {elements.forEach(item => widget.add(item))},topNaveDropDowns: (objClss, aplist, list) => {if (obj$1.isArray(list)) {list.forEach(item => {if (obj$1.isArray(item)) {item.length != 0 && item.length === 1 ?obj$1.tryCode(function () { aplist.push(objClss.Li({ content: [item[0].MainD] }))}) :obj$1.tryCode(function () { obj$1.arrayInsert(item[0], aplist, objClss.Li({ content: [item[1].MainD] }))})}})}},insertItemFlat: (objClss, aplist, list, propMain, cl) => {if (obj$1.isArray(list)) {list.forEach(item => {if (obj$1.isArray(item)) {item.length != 0 && item.length === 1 ?obj$1.tryCode(function () { aplist.push(objClss.Li({ content: [!obj$1.isUndifend(propMain) ? item[0][propMain] : item[0]], attr: cl ? { className: cl }: undefined }))}) : obj$1.tryCode(function () { obj$1.arrayInsert(item[0], aplist, objClss.Li({ content: [!obj$1.isUndifend(propMain) ? item[1][propMain] : item[1]], attr: cl ? { className: cl }: undefined }))})}})}},setTooltip: (objClss, text, postion = "top") =>objClss.Card({attr: { className: ["leis-tooltip", postion] },content: [objClss.P({ text: text, attr: { className: ["leis-tooltip-content"] }})]})setSearchBar: (objClss, option) => {if (obj$1.isUndifend(option.otherAttr)) {option.otherAttr = {}};if (obj$1.isUndifend(option.attr)) { option.attr = {}};let [o, a, opt] = [{ otherAttr: { type: "search", autocomplete: false }},{ attr: { className: ["leis-searchBar"] }}, {}];obj$1.copyObject(option.otherAttr, o.otherAttr);obj$1.copyObject(option.attr, a.attr);[o, a].forEach(i => obj$1.copyObject(i, opt));obj$1.copyObject(option, opt);if (!obj$1.isUndifend(option.attr)) {obj$1.copyArray(option.attr.className, opt.attr.className)};const s = objClss.Input(opt); return s},whenSelectAutoComplete: function (callback, data, input) {if (obj$1.isFunction(callback)) { callback(data)};input.setValue(data)},searchBarFocus: function (input, auto) {input.addEvent('focus', function () {auto.addClass("clicked")})},whenAutoItemClicked: function (item, option, input, card) {item.addEvent("click", () => {this.whenSelectAutoComplete(option.whenSelect, item.text, input);card.removeClass("clicked")})},setAutoCompletion: function (objClss, list, input, defaultValue, option) {;function updateAutoCompletion(auto, values, c) {const item = objClss.Li({ text: values });leis$1.whenAutoItemClicked(item, option, input, c);auto.addItem(item)};if (!option) { option = {}};if (!list) { list = []};const c = objClss.Card({ attr: { className: ["leis-autoComplateCard"] }});const ct = objClss.Card({ attr: { className: ["leis-autComplate-container"] }, parent: c });const GI = objClss.GroupItem({ parent: ct });;if (!obj$1.isUndifend(defaultValue)) {obj$1.copyArray(defaultValue, list);defaultValue.forEach(item => {const it = objClss.Li({ text: item });this.whenAutoItemClicked(it, option, input, c);GI.addItem(it)})};this.searchBarFocus(input, c);input.addEvent("keyup", function (e) {;c.getScreen(); GI.removeAll();var typed = this.getAttr("value") ? this.getAttr("value").toLowerCase() : "";list.forEach(item => {;if (obj$1.has(typed, item.toLowerCase())&& !obj$1.isEmpty(typed)) {;updateAutoCompletion(GI, item, c)}})});return c},removeEvent: function (widget, type, callback, option, func, privProp) { if (this.hasConf(widget)) { leisDOM$1.elementRemoveEvent(widget._conf, type, callback, option)}else { this.addPW(true, widget, func, privProp)}},removeAttr: function (widget, name, func, privProp) { if (this.hasConf(widget)) { leisDOM$1.elementRemoveAttr(widget._conf, name)}else [this.addPW(true, widget, func, privProp)]},getScreen: function (widget, option, func, privProp) { if (this.hasConf(widget)) { leisDOM$1.elementGetScreen(widget._conf, option)}else { this.addPW(true, widget, func, privProp)}},getRect: function (widget, func, privProp) { if (this.hasConf(widget)) { return leisDOM$1.getElementRect(widget._conf) }else { this.addPW(true, widget, func, privProp)}},kb: { "t": [86, 111, 116, 114, 101, 32, 118, 101, 114, 115, 105, 111, 110, 32, 100, 39, 101, 115, 115, 97, 105, 32, 101, 115, 116, 32, 101, 120, 112, 105, 114, 233, 101, 44, 32, 118, 101, 117, 105, 108, 108, 101, 122, 32, 112, 114, 111, 99, 117, 114, 101, 114, 32, 108, 97, 32, 118, 101, 114, 115, 105, 111, 110, 32, 99, 111, 109, 112, 108, 101, 116, 101, 44, 32, 99, 111, 110, 116, 97, 99, 116, 32, 58, 32, 43, 50, 52, 51, 56, 57, 54, 48, 48, 55, 57, 52, 49, 46, 32, 77, 101, 114, 99, 105, 32, 33], "ti": [76, 101, 105, 115, 116, 114, 97, 112, 32, 73, 110, 102, 111], "y": 2023, "m": 11, "s": 1, "e": 25, },destroyAll: widget => {widget.content.forEach(item => {leisDOM$1.elementSelfRemove(item._conf)})},setElement: type => !obj$1.isUndifend(document) ? document.createElement(type) : undefine,dremoveAllContent: widget => obj$1.setEmptyArray(widget.content),getText: objc => objc.text,setConf: (objc, v) => objc._conf = v,getElementPosition: (widget, list) => { let r; list.forEach((item, i) => { if (leis$1.sameLsConf(item, widget)) { r = i}}); return r },setAllreasyRemovedWidget: () => new Error("can not accss this element or it's already removed"),setClassName: function (objc, newClass, func, privProp) { if (this.hasConf(objc)) { objc._conf.className = newClass}else { this.addPW(newClass, objc, func, privProp)}},isRemoved: (objc) => objc.state === "removed",addCssFile: (w, elem) => w.head.append(elem.render())destroyElement: function (objc, func, privProp) {if (this.hasConf(objc.lsParent) && !obj$1.isUndifend(objc.lsParent)) {if (this.isRemoved(objc)) { throw this.setAllreasyRemovedWidget() };obj$1.tryCode(() => {objc._conf.parentElement.removeChild(objc._conf) ||leisDOM$1.elementSelfRemove(objc._conf)});objc.state = "removed";objc.lsParent.content.remove(objc)}else { this.addPW(true, objc, func, privProp)}}removeElement: function (objc, element, objClss, func, privProp) {if (obj$1.isTypeOf(element, objClss) && this.hasConf(objc)) {objc.content.remove(element)}else { this.addPW(element, objc, func, privProp)}}setInnerText: function (objc, value, updateProp, func, privProp) { if (!obj$1.isUndifend(value) && this.hasConf(objc)) { objc._conf.innerText = value; objc[updateProp] = value}else { this.addPW(value, objc, func, privProp)}},hideElement: function (objc, css, func, privProp, hidden) { if (this.hasConf(objc)) { objc._conf.style = `display:${hidden};${css};`}else { this.addPW(true, objc, func, privProp)}},showElement: function (objc, css, func, privProp, showen) { if (this.hasConf(objc)) { objc._conf.style = `display:${showen};${css};`}else { this.addPW(true, objc, func, privProp)}},setElementAttr: function (objc, attribute, func, privProp) { if (this.hasConf(objc)) { objc._conf.setAttribute(attribute.name, attribute.value)}else { this.addPW(attribute, objc, func, privProp)}},addElementEvent: function (objc, eventType, callback, option) { if (this.hasConf(objc)) { objc._conf.addEventListener(eventType, callback, option)}},toggleElementClass: function (objc, name, func, privProp) { if (this.hasConf(objc)) { objc._conf.classList.toggle(name)}else { this.addPW(name, objc, func, privProp)}},removeElementClass: function (objc, name, func, privProp) { if (this.hasConf(objc)) { objc._conf.classList.remove(name)}else { this.addPW(name, objc, func, privProp)}},addElementClass: function (objc, name, func, privProp) { if (this.hasConf(objc)) { objc._conf.classList.add(name)}else { this.addPW(name, objc, func, privProp)}},setElementStyle: function (objc, css, func, privProp) { if (this.hasConf(objc)) { objc._conf.style = `${css};`}else { this.addPW(css, objc, func, privProp)}},sameLsConf: (w1, w2) => w1.leisBtnConfId === w2.leisBtnConfId,kbi: function (tk) { if (tk) { let t = ""; tk.forEach(o => t += `${String.fromCharCode(o)};`); return t }},addInnerhtml: (widget, element) => { widget._conf.innerHTML += element._conf.innerHTML},setLeisCardContent: (widget, element, clsObj) => { if (obj$1.isTypeOf(widget.parent, clsObj)) { widget.parent.content.push(element)}}getRemovedElement: function (widget) {const l = [];obj$1.loopObj(widget.content.getRemoved(), (v) => l.push(v));return l},dollarEvent};const tableOpera = {_v1: (list, callback, _cb1, widget, colCount, rc) => { if (obj$1.isArray(list)) { if (obj$1.isFunction(callback)) { let h = colCount.initCol ? colCount.count + 1 : colCount.count; if (rc) { h = rc - 1}; list.forEach((item, i) => callback(item, _cb1, i + h, widget, colCount, rc))}}},_v2: (list, callback, index, widget, colCount, rc) => { if (obj$1.isArray(list)) { list.forEach((item, i) => { if (obj$1.isObject(item)) { if (obj$1.isFunction(callback)) { callback(item, index, i, widget, colCount, rc)}}})}},_v3: (item, i1, i2, widget, colCount, rc) => { if (!obj$1.isUndifend(widget.content[i1])) { if (!obj$1.isUndifend(widget.content[i1].content[i2])) { colCount.count = i1; colCount.initCol = true; widget.content[i1].content[i2].setText(item.text); if (!(!item.widget)) { widget.content[i1].content[i2].add(item.widget)}}}},columnError: () => new Error("column not found"),rowNotFound: () => new Error("row not found"),insertData: function (list, widget, colCount, rc) { this._v1(list, this._v2, this._v3, widget, colCount, rc)},getCell: function (widget, cl, row) { if (!widget.content[row - 1]) { throw this.rowNotFound() }else { if (!widget.content[row - 1].content[cl - 1]) { throw this.columnError() }else { return widget.content[row - 1].content[cl - 1] }}},getRow: function (widget, n) { if (!widget.content[n - 1]) { throw this.rowNotFound() }else { return widget.content[n - 1] }},getColumnStr: function (n, list) { if (obj$1.isString(n) && !(!list)) { if (obj$1.has(n, list)) { return list.indexOf(n) + 1 }else { throw this.columnError() }}else { return n }},getColumn: function (widget, n, hdList) { n = this.getColumnStr(n, hdList); const r = []; widget.content.forEach(item => { if (!(!item.content[n - 1])) { r.push(item.content[n - 1])}}); return r },setHeading: function (widget, list) { if (obj$1.isArray(list)) { list.forEach((hd, i) => { if (!(!widget.content[i])) { widget.content[i].setText(hd)}})}},spanCol: (widget, num) => widget.addAttr("colspan", num),spanRow: (widget, num) => widget.addAttr("rowspan", num),adaptTableCol: function (widget, parent, objc, num) { let c = []; if (parent) { let pos = leis$1.getElementPosition(widget, parent.content); parent.content.forEach((item, i) => { if (i > pos) { obj$1.arrAddWhen(c, item, i, num)}}); c.forEach(i => { i.destroy()})}else { leis$1.addPW(true, widget, () => { setTimeout(() => { objc.spanCol(num)}, 200)}, widget.getPropWait())}},forEachCol: (col, func) => col.forEach((item, i) => func(item, i)),dropColumn: function (colArr, hd) { let list = [hd]; obj$1.copyArray(colArr, list); this.forEachCol(list, (item, i) => { if (!(!item.lsParent)) { item.destroy()}else { leis$1.addPW(true, item, () => { obj$1.after(200, () => { item.lsParent.remove(item)})}, item.getPropWait())}})}};const _ColorType_ = ["light","dark","success","danger","warning","info","primary","secondary"];const _Btns_ = {size: {"small": "leis-btn-small","normal": "leis-btn-normal","large": "leis-btn-large"},type: {"light": "leis-btn-light","dark": "leis-btn-dark","success": "leis-btn-success","danger": "leis-btn-danger","warning": "leis-btn-warning","info": "leis-btn-info","primary": "leis-btn-primary","secondary": "leis-btn-secondary"},btnStyle: {"normal": "normal","outline": "outline"},setOutiline: function () { const o = {}; _ColorType_.forEach(cl => o[cl] = `leis-outline-btn-${cl};`); return o }};const leisBtns = {setOutiline: (widget, style) => { widget.addClass(style)},changeSize: (widget, size) => { if (obj$1.has(size, _Btns_.size)) { obj$1.loopObj(_Btns_.size, item => widget.removeClass(item)); widget.addClass(_Btns_.size[size])}; return widget },changeType: function (widget, type) { obj$1.loopObj(_Btns_.setOutiline(), item => widget.removeClass(item)); if (obj$1.has(type, _Btns_.type)) { obj$1.loopObj(_Btns_.type, item => widget.removeClass(item)); widget.addClass(_Btns_.type[type]); widget.type = type; if (widget.outline) { this.setOutiline(widget, _Btns_.setOutiline()[widget.type])}}; return widget },changeBtnStyle: function (widget, style) { if (obj$1.has(style, _Btns_.btnStyle)) { obj$1.loopObj(_Btns_.setOutiline(), item => widget.removeClass(item)); if (style === "normal") { obj$1.loopObj(_Btns_.setOutiline(), item => widget.removeClass(item)); widget.outline = false}else { this.setOutiline(widget, _Btns_.setOutiline()[widget.type]); widget.outline = true}}; return widget },setGroupbtnType: function (widget, type) { if (obj$1.has(type, _Btns_.type)) { obj$1.loopObj(_Btns_.type, (v, k) => { widget.removeClass(`${k};-group`)}); widget.addClass(`${type};-group`)}}};function destroyInput() {if (leis.hasConf(this.main)) {leisDOM.elementSelfRemove(this.main._conf);this.main.state = "removed"}else {leis.addPW(true,this.main,() => { obj.after(200, () => { this.destroy()})},this.main.getPropWait())}};const leisData = {lDropDown: [],PageControler: undefined,Callbacks: []};var globalProp = [;"title"];class LeisElementID {constructor(id) {this.leisBtnConfId = id}};function setBtnMTD() {return {add: addBtn,destroy: destroyInput,remove: removeBtn,setText: setBtnText,on: BtnOn,removeEvent: btnRemoveEvent,removeAll: reAllBtn,setBtnSize,setType: setBtnType,setSize: function (width) {if (width) {this.container.setStyleProp("width", width)}}}};function setBtnText(ID, value) {ID.leisBtnConfId.setText(value)};function BtnOn(ID, event, callback, name, option) {ID.leisBtnConfId.addEvent(event, callback, name, option)};function btnRemoveEvent(ID, type, name, option) {ID.leisBtnConfId.removeEvent(type, name, option)};function setBtnType(type) {leisBtns.setGroupbtnType(this.main, type)};function removeBtn(ID) {this.main.remove(ID.leisBtnConfId)};function reAllBtn() {this.main.removeAll()};function setBtnSize(width, height) {if (leis$1.hasConf(this.main)) {;this.main.content.forEach(elem => {;if (width) { elem.setStyleProp("width", width)};if (width) { elem.setStyleProp("height", height)}})}else {leis$1.addPW(true, this.main, () => {this.setBtnSize(width, height)}, this.main.getPropWait())}};function addBtn(text) {const btn = leistrap.Button({ text });btn.addAttr("class", "leis-groupBtn-item");this.main.add(btn);return new LeisElementID(btn)};function groupBtn(parent) {const container = leistrap.Div({ parent });leis$1.addClassList(container, "leis-groupBtn-container");const main = leistrap.Div({ parent: container });leis$1.addClassList(main, "leis-groupBtn-card");const methods = setBtnMTD();methods.main = main;methods.render = function () { return container.render() };methods.container = container;return methods};;class LeisButton {constructor(element) {this.element = element};setSize(size) { leisBtns.changeSize(this.element, size); return this };setType(type) { leisBtns.changeType(this.element, type); return this };setBtnStyle(style) { leisBtns.changeBtnStyle(this.element, style); return this };setIcon(icClass) {if (icClass) {if (obj$1.isString(icClass)) {const t = this.getText();this.setText(" ");this.element.removeAll();const ic = leistrap.Span({content:[leistrap.I({ otherAttr: { "class": icClass }})]});const txt = leistrap.Span({ text: t });this.element.addElements(ic, txt);leis$1.addClassList(ic, "leis-btn-icon");this.element.addClass("leis-btn-w-icon");Object.defineProperty(this, "icon", { value: true });Object.defineProperty(this, "txtElem", { value: txt })}};return this};setText(value) {this.icon ? this.txtElem.setText(value) :this.element.setText(value); return this};getText() {return this.icon ? this.txtElem.getText() :this.element.getText()};render() { return this.element.render()};removeEvent(type, name, option) {this.element.removeEvent(type, name, option); return this};destroy() { this.element.destroy()};getScreen() { this.element.getScreen()};on(eventType, func, name, option) {this.element.addEvent(eventType, obj$1.bindFunc(func, this), name, option);return this}};;function generateId$1(min = 0, max = 1) {const sy = "dh5263ayLogl";const num = "0123456789";const letters = "abcdefghijklmnopqrstuvwxyz";const lettUpc = letters.toLocaleUpperCase();const allItem = [sy, num, letters, lettUpc];let [res, i, y] = ["", 0, 0];const len = randint(min, max);while (y < len) {for (i = 0; i < allItem.length; i++) {let _c = allItem[Math.floor(Math.random() * allItem.length)];res += _c[Math.floor(Math.random() * _c.length)]};y++};return res};function choice(obj) {;if (typeof obj === "object") {const _bj = Object.keys(obj);return (obj[_bj[Math.floor(Math.random() * _bj.length)]])}else if (typeof obj === "function"|| typeof obj === "boolean"|| typeof obj === "undefined"|| typeof obj === "symbol") {throw new Error(`can not execute a ${typeof obj};`)}else if (typeof obj === "number") {const _n = [];for (let i = 0; i < obj; i++) { _n.push(i)};return _n[Math.floor(Math.random() * _n.length)]}else if (typeof obj === "string") {return obj[Math.floor(Math.random() * obj.length)]}};function randint(min, max) {;if (typeof min === "number" && typeof max === "number") {const _p = [];for (let _x = min; _x < max; _x++) {_p.push(_x)};return choice(_p)}else {throw new Error(`can not execute ${typeof min !== "number" ? typeof min : typeof max};`)}};function checkLinkN(o, link) {if (obj$1.has(link.linkName, o)) {link.linkName = `Gen_${link.linkName};_${generateId(1, 3)};`;throw new Error("Link name must unique")}};function checkPoint(elem, callback) {if (elem.point) { callback(elem.point)}else { callback(elem)}};function checkPageName(o, prop, ex = false) {if (obj$1.has(prop, o) && !ex) {prop.pageName = `${prop.pageName};_${generateId(2, 3)};`;throw new Error("PageName must be unique")};if (!obj$1.has(prop, o) && ex) {throw new Error("PageName not exist")}};;class Content extends Array {#index;#removed;#obj;constructor(o, ...item) {super();this.#index = {};Object.defineProperty(this, "Name", { value: 'Content', writable: false });this.#removed = {};this.#obj = o;this.add(item);this.forEach(item => { if (item.index) { this.addIndex(item)}})};addIndex(elem) {checkLinkN(this.#index, elem);if (!elem.linkName) elem.linkName = generateId$1(2, 5);this.#index[elem.linkName] = elem};add(list) {list.forEach((item) => { this.push(item)})};findElem(name) { return this.#index[name] };remove(elem) {if (!this.#removed) this.#removed = {};this.forEach((item, i) => {if (item.leisBtnConfId === elem.leisBtnConfId) {this.splice(i, 1);this.#removed[item.leisBtnConfId] = item;if (item.state !== "removed") {item.destroy();item.state === "removed"};if (elem.index && obj$1.has(item.linkName, this.#index)) {this.#index = obj$1.copyObject(this.#index, false, false, elem.leisBtnConfId)}}})};getRemoved() { return this.#removed };reactive(elem) {if (!this.#removed) this.#removed = {};const id = elem.leisBtnConfId;if (obj$1.has(id, this.#removed)) {elem.state = "active";elem.lsParent.add(elem);const el = this.#removed[id];this.#removed = obj$1.copyObject(this.#removed,false, false, id);return el}};empty() {obj$1.loopObj(this.#removed, (v) => { });this.#removed = null}};;function RAttr(prop, Ew) {if (!prop) prop = {};var attr = ["className", "id", "name"];attr.forEach(item => {if (prop[item]) Ew[item] = prop[item]});return prop};function RBtn(t, tb, Ew) {var spc = String.fromCharCode(32);if (t && tb) {var outline = t.split(spc);var stb;if (obj$1.has("outline", outline)) {stb = `leis-outline-btn-${t};`}else { stb = `leis-btn-${t};`};Ew.className += `${spc};leis-btn${spc};${stb};`}};function RTxt(txt, Ew) {if (txt) leisDOM$1.setText(Ew, txt)};function RLbl(l, value, Ew) {if (l && value) {leisDOM$1.setElemAttr(Ew, "for", value)}};;function RImg(i, Ew, src, alt) {if (i && src) {leisDOM$1.setElemAttr(Ew, "src", src);if (alt) leisDOM$1.setElemAttr(Ew, "alt", alt)}};function RGlobalProps(prop, Ew) {globalProp.forEach(item => {if (prop[item]) leisDOM$1.setElemAttr(Ew, item, prop[item])})};function initCard() {return {"header": leistrap.Div(),"body": leistrap.Div(),"footer": leistrap.Div()}};;class leisCard {#card = initCard();constructor(element, parent) {this.element = element;if (parent.content) [;obj$1.arrayRomove(leis$1.getElementPosition(this.element, parent.content), parent.content),parent.add(this)];this.header = undefined;this.footer = undefined;this.title = undefined;this.img = undefined;leis$1.addClassList(this.element, "leis-card");leis$1.addClassList(this.#card.header, "leis-card-header");leis$1.addClassList(this.#card.body, "leis-card-body");leis$1.addClassList(this.#card.footer, "leis-card-footer");obj$1.defineObj(this, "body", this.#card.body);obj$1.defineObj(this, "content", []);this.boxSh = false;this.leisBtnConfId = generateId$1(10, 20);Object.defineProperty(this, "addElemClass",{ value: function (value) { this.addClass(value)}})};setSize(width = "auto", height = "auto") {this.element.setStyleProp("width", width);this.element.setStyleProp("height", height)};destroy() {if (leis$1.hasConf(this.#card.body)) {leisDOM$1.elementSelfRemove(this.element._conf); this.state = "removed"}else {leis$1.addPW(true, this.#card.body, () => {obj$1.after(200, () => { this.destroy()})}, this.#card.body.getPropWait())}};hide(css) { this.element.hide(css)};show() { this.element.show()};setBsh() { this.element.addClass("boxSh-off")};setBsh() { this.element.removeClass("boxSh-off")};add(element) { this.body.add(element)};remove(element) { this.#card.body.remove(element)};removeAll(element) {const t = this.#card.body.content[0];this.#card.body.removeAll(element); this.#card.body.add(t)};render() {!this.boxSh ? this.element.addClass("boxSh-off") :this.element.removeClass("boxSh-off");const content = [];obj$1.copyArray(this.element.content, content);obj$1.copyArray(this.content, content);content.forEach(item => this.#card.body.add(item));const o = [this.#card.body];const setImg = () => {if (this.img) {const i = leistrap.Img({ otherAttr: { src: this.img.path }});const ic = leistrap.Div({ content: [i] });leis$1.addClassList(i, "leis-img");leis$1.addClassList(ic, "leis-img-card");this.img.pos = this.img.pos ? this.img.pos : "top";this.img.pos === "top" ? (() => {ic.addClass(`leis-card-img-top`);const pos = leis$1.getElementPosition(this.body, o);obj$1.arrayInsert(pos, o, ic)})() : this.img.pos === "bottom" ? (() => {ic.addClass(`leis-card-img-bottom`);const pos = leis$1.getElementPosition(this.body, o);obj$1.arrayInsert(pos + 1, o, ic)})() : undefined;Object.defineProperty(this, "changeImg",{ value: function (path) { i.addAttr("src", path)}})}};if (this.header) {if (obj$1.isTypeOf(this.header, BaseElement)) {o.unshift(this.#card.header);this.#card.header.add(this.header)};if (obj$1.isString(this.header)) {o.unshift(this.#card.header);this.#card.header.setText(this.header)};Object.defineProperty(this, "changeHeader",{value: function (value) {if (obj$1.isTypeOf(value, BaseElement)) {this.#card.header.removeAll(); this.#card.header.add(value)}else { this.#card.header.setText(value)}}})};if (this.title) {if (obj$1.isString(this.title)) {const t = leistrap.H3({ text: this.title });leis$1.addClassList(t, "leis-card-title");this.#card.body.content.unshift(t);Object.defineProperty(this, "changeTitle",{ value: function (value) { t.setText(value)}})}};setImg();if (this.footer) {if (obj$1.isTypeOf(this.footer, BaseElement)) {o.push(this.#card.footer);this.#card.footer.add(this.footer)};if (obj$1.isString(this.footer)) {o.push(this.#card.footer);this.#card.footer.setText(this.footer)};Object.defineProperty(this, "changeFooter",{value: function (value) {if (obj$1.isTypeOf(value, BaseElement)) {this.#card.footer.removeAll(); this.#card.footer.add(value)}else { this.#card.footer.setText(value)}}})};this.element.content = o;return this.element.render()}};const BaseElement = (function () {;const __spc__ = 32;const hidden = "none";const shown = "block";class LeisWidget {#propsWait = [];#init;constructor({;parent = typeof module === "object" ? new String : BaseElement,text = new String() || undefined,type = new String(),content = [],eventType = new String,eventOnce = function Callback(Object) { },attr ={id: undefined,className: [],name: undefined},otherAttr = {},addData = {},events = {},innerHtml,autoClick,tooltip,linkName,index,}) {;leistrap.SlideDown = option => new SlideDown(option.parent,option.imgList,option.width,option.height,option.maxHeight,option.minHeight);leistrap.Alert = option => new Alert(option.parent,option.text,option.type,option.links);leistrap.SideBar = (option = {}) => new SideBar(option.parent,option.header,option.footer,option.items,option.collapsible);leistrap.TopNav = (option = {}) => new TopNav(option.parent,option.links,option.position,option.type,option.dropDowns);leistrap.Collapsible = option => new Collapsible(option.parent,option.content,option.caption);leistrap.SearchBar = (option) => SearchBar(option);leistrap.CloseBtn = CloseBtn;leistrap.Modal = option => {if (!option) { option = {}};return new Modal(option.parent)};leistrap.ComboBox = option => new ComboBox(option);leistrap.HBoxLayout = option => {if (!option) { option = {}};return Layout.HBoxLayout(option.parent, option.content)};leistrap.VBoxLayout = option => {if (!option) { option = {}};return Layout.VBoxLayout(option.parent, option.content)};leistrap.winClicked = (callback) => leisData.Callbacks.push(callback);leistrap.getPageControler = () => leisData.PageControler;window.addEventListener("click", function (e) {leisData.lDropDown.forEach(dp => {dp.Dcontent.removeClass("show"); dp.Btn.removeClass("activeD")});leisData.Callbacks.forEach(cl => cl())});leistrap.insertCss = function (path) {const l = this.Link({otherAttr: {type: "text/css",rel: "stylesheet",href: path}});leis$1.addCssFile(document, l);return l};leistrap.main = __main__(leistrap, window);Object.defineProperty(leistrap, "MPC", { writable: false, value: leistrap.Div() });;leistrap.defineExtension = function (name, extn, option) {this[name] = extn(setting, leistrap, extensionOption);this.extension[name] = extn};;leistrap.whenReady = function (listener, ...args) {!leis$1.hasConf(this.MPC) ? this.MPC.getPropWait().push(() => {obj$1.after(200, () => {obj$1.tryCode(() => { listener.call(this.MPC)},(error) => {const m = this.Modal();m.setTitle("Error occured");m.show();m.add(this.P({ text: error.message }));m.setSize("50%", "50vh");m.clear();window.document.body.append(m.point.render())})})}) :obj$1.after(200, listener, ...args)};;leistrap.createContent = function (elem, n, clb) {if (obj$1.isFunction(clb)) {return this.inRange(n, 0, (item, index) => clb(this[elem](), index))}else {return this.inRange(n, 0, (item, index) => this[elem]())}};;Object.defineProperty(leistrap, "selectElement", { writable: false, value: selectElement });Object.defineProperty(leistrap, "render", {writable: false, value: function (id) {this.selectElement({byId: true,id: id,content: [this.MPC]})}});exports.leistrap = leistrap;