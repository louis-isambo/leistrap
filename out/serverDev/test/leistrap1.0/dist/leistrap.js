const ls = (function () {
    "use strict";
    var __spc__ = 32;
    function countArray(arr, offset) {
        var counter = offset;
        return function () {
            if (counter === arr.length - 1) counter = 0;
            var v = arr[counter];
            counter++;
            return v;
        }
    }
    const obj$1 = {
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
        copyObject: function (obj, target, overwrite = false, ...exp) { if (!target) { target = {}; } if (!obj) { obj = {}; } Object.keys(obj).forEach(item => { if (!(this.has(item, target) && !overwrite)) { if (!this.has(item, exp)) { target[item] = obj[item]; if (this.isArray(target)) { target[item] = obj[item]; } } } }); return target },
        copyArray: function (arr, target, overwrite = false) { if (!target) { target = []; } if (!(!arr)) { arr.forEach((item, index) => { if (!(this.has(item, target) && !overwrite)) { target.push(item); } }); } return target },
        getUrl: o => o.match(/http+(s|\b):\/\/[^ ]*(?=\b)+(\s|\b|\/)*/gi),
        hasUrl: function (o) { return !(!this.getUrl(o)) },
        arrayRemove: (index, arr) => arr.splice(index, 1),
        arrayReplace: (index, value, arr) => arr.splice(index, 1, value),
        arrayInsert: (index, arr, args) => { arr.splice(index, 0, args); },
        tryCode: (callback, error) => { try { callback(); } catch (e) { if (error) { error(e); } } },
        after: (s, func, ...args) => setTimeout(func, s, args),
        loopObj: (obj, callback = (value, key, index, finished) => value) => { if (obj) { let c = 0; let f = false; for (var x in obj) { c++; c === Object.keys(obj).length ? f = true : f = false; callback(obj[x], x, c - 1, f); } } },

        bindFunc: (fc, bc) => function (...e) { return fc.call(bc, ...e) },

        arrAddWhen: (arr, item, num1, num2, callback) => { if (num1 <= num2) { if (arr) { arr.push(item); } if (callback) { callback(item); } } },
        arrBegin: (condi, callback) => { if (condi) { callback(); } },
        initObj: (obj, value) => { },
        objKeysToLowerCase: function (o) { const target = {}; this.loopObj(o, (item, x) => target[x.toLowerCase()] = item); return target },
        filter: function (o, callback) { const r = {}; this.loopObj(o, (...args) => { if (callback(...args)) { r[args[1]] = args[0]; } }); return r },
        defineObj: (obj, proName, value, writable = false) => Object.defineProperty(obj, proName, { value, writable }),
        countArray,
    };

    const _EventEmitter = function () {
        const channels = {};
        var inWaitChannel = {};
        // create the event object that will be like a middleware
        var data = null;
        const event_ = { send: (d) => { data = d; } };

        //invoke method emits  an event and waiting for the 
        // execution. if there is no channel in our channels object
        // the current channel will be saved into the "inWaitChannel" object
        // this method checks if there is an exist "handler" or channel to the 
        // channels object. 
        async function invoke(channel, listener, ...args) {

            //verify if there is an exist channel
            // an execute firstly "the channel handler" which is 
            // saved in the channels object and
            // after executing the channel handler, we execute
            // !the  invoke listener
            // todo: the handle mothed allows use the save a channel name in the channels object

            async function exe() {
                channels[channel].listener(event_, ...args);
                if (listener) listener(data);
                data = null;
            }
            if (obj$1.has(channel, channels)) {
                obj$1.after(1, exe);
            }
            else {
                inWaitChannel[channel] = () => obj$1.after(1, exe);
            }
        }

        // handle method, this method allows us to define 
        // an channel to listen to 
        async function handle(channel, listener) {
            channels[channel] = { listener };
            if (obj$1.has(channel, inWaitChannel)) {
                inWaitChannel[channel]();
                inWaitChannel = obj$1.copyObject(inWaitChannel, false, true, channel);
            }
        }

        //the default event
        function readContent(e) {
            var counter = 0;
            e.handle("readContent", function (event, listener, content, timeout) {
                if (!timeout) timeout = 1000;
                if (!content) content = [];
                var len = content.length;
                var id = setInterval(function () {
                    listener(content[counter]);
                    if (counter + 1 === len) clearInterval(id); counter++;
                }, timeout);
            });
        }
        const eventEmitter_ = { invoke, handle };
        readContent(eventEmitter_);
        return eventEmitter_
    };

    const leisDOM$1 = {
        getElementRect: elem => elem.getBoundingClientRect(),
        getElementTextContent: elem => elem.textContent,
        getElemAttr: (elem, attr) => elem.getAttribute(attr),
        getGivenAttr: (elem) => elem.getAttributeNames(),
        getPreviousElem: elem => elem.previousElementSibling,
        getNextElem: elem => elem.nextElementSibling,
        setElemAttr: (elem, attr, value) => elem.setAttribute(attr, value),

        animateElement: (elem, keyFrame, option) => elem.animate(keyFrame, option),
        setAllAttr: (elem) => elem.attributes,
        setText: (elem, txt) => elem.textContent = txt,

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
    };

    function dollarEvent(widget, ls) {
        obj$1.loopObj(widget.events, (v, k) => {
            const e = k.split("$");
            if (e.length == 1) widget.addEvent(e[0], v);
            if (e.length == 2) widget.addEvent(e[0], v, e[1]);
            if (e.length == 3) widget.addEvent(e[0], v, e[1], e[3]);
        });
    } const leis$1 = {
        setStyleProp: (widget, pro, value) => widget._conf.style[pro] = value,
        hasConf: widget => !(!widget) ? !obj$1.isUndifend(widget._conf) : false,

        addClassList: (widget, values) => {
            if (!widget.attr) { widget.attr = {}; } if (!widget.attr.className) { widget.attr.className = []; } widget.attr.className.push(values);
        },

        addPW: (prop, objc, func, privProp) => {
            if (!obj$1.isUndifend(prop) && !objc._conf) {
                privProp.push(func);
            }
        },

        setInnerHtml: (objc, prop) => { objc._conf.innerHTML = prop; },

        // add an new Element
        append: function (objc, element, func, privProp, before, after) {

            if (objc._conf) {
                element = element.point ? element.point : element;
                if (!before && !after) objc._conf.append(element.render());
                else {
                    if (before && (!after && objc.content.get(before))) {
                        objc._conf.insertBefore(element.render(), before._conf);
                        objc.content.insertBefore(before, element);
                    }
                }
                element.state = "active";
                element.parent = objc._conf; element.lsParent = objc;
                if (!before) objc.content.push(element);
                if (element.index) objc.content.addIndex(element);
            } else { this.addPW(true, objc, func, privProp); }
        },

        // add many elements 
        appendElement: (widget, ...elements) => {
            elements.forEach(item => widget.add(item));
        },

        topNaveDropDowns: (objClss, aplist, list) => {
            if (obj$1.isArray(list)) {
                list.forEach(item => {
                    if (obj$1.isArray(item)) {
                        item.length != 0 && item.length === 1 ?
                            obj$1.tryCode(function () { aplist.push(objClss.Li({ content: [item[0].MainD] })); }) :
                            obj$1.tryCode(function () { obj$1.arrayInsert(item[0], aplist, objClss.Li({ content: [item[1].MainD] })); });
                    }
                });
            }
        },

        insertItemFlat: (objClss, aplist, list, propMain, cl) => {
            if (obj$1.isArray(list)) {
                list.forEach(item => {
                    if (obj$1.isArray(item)) {
                        item.length != 0 && item.length === 1 ?
                            obj$1.tryCode(function () { aplist.push(objClss.Li({ content: [!obj$1.isUndifend(propMain) ? item[0][propMain] : item[0]], attr: cl ? { className: cl } : undefined })); }) : obj$1.tryCode(function () { obj$1.arrayInsert(item[0], aplist, objClss.Li({ content: [!obj$1.isUndifend(propMain) ? item[1][propMain] : item[1]], attr: cl ? { className: cl } : undefined })); });
                    }
                });
            }
        },

        setTooltip: (objClss, text, postion = "top") =>
            objClss.Card({
                attr: { className: ["leis-tooltip", postion] },
                content: [objClss.P({ text: text, attr: { className: ["leis-tooltip-content"] } })]
            }),

        // set searchbar  bar Component
        setSearchBar: (objClss, option) => {
            if (obj$1.isUndifend(option.otherAttr)) {
                option.otherAttr = {};
            } if (obj$1.isUndifend(option.attr)) { option.attr = {}; } let [o, a, opt] = [{ otherAttr: { type: "search", autocomplete: false } },
            { attr: { className: ["leis-searchBar"] } }, {}];

            obj$1.copyObject(option.otherAttr, o.otherAttr);
            obj$1.copyObject(option.attr, a.attr);
            [o, a].forEach(i => obj$1.copyObject(i, opt));
            obj$1.copyObject(option, opt);
            if (!obj$1.isUndifend(option.attr)) {
                obj$1.copyArray(option.attr.className, opt.attr.className);
            } const s = objClss.Input(opt); return s
        },

        // check if the autoCompletion item is selected or clicked 
        whenSelectAutoComplete: function (callback, data, input, dataSet) {
            if (obj$1.isFunction(callback)) { callback(data, dataSet); } input.setValue(data);
        },

        // check if the SearchBar component got the focus and
        // display the autoCompletion Card.
        searchBarFocus: function (input, auto) {
            input.addEvent('focus', function () {
                auto.addClass("clicked");
            });
        },

        // check if an autocomplete item is clicked
        whenAutoItemClicked: function (item, option, input, card, txt, dataSet) {
            item.addEvent("click", () => {
                this.whenSelectAutoComplete(option.whenSelect, txt, input, dataSet);
                card.removeClass("clicked");
            });
        },



        // set an autoCompletion to element
        setAutoCompletion: function (objClss, list, input, defaultValue, option) {

            // update the autoCompletion items
            function updateAutoCompletion(auto, values, c) {
                var txt = obj$1.isObject(values) ? values.text : values;
                var t = objClss.Span({ text: txt });
                const item = objClss.Li();
                setItemsToAuto(item, values, t);
                leis$1.whenAutoItemClicked(item, option, input, c, txt, values);
                auto.addItem(item);
            }
            // set items

            function setItemsToAuto(item, values, t,) {
                if (obj$1.isObject(values)) {
                    if (values.icon) item.add(values.icon);
                    item.add(t);
                    if (values.subTitle) {
                        item.add(values.subTitle);
                        values.subTitle.addClass("aut-item-subTitle");
                    }
                } else { item.add(t); }
            }

            if (!option) { option = {}; } if (!list) { list = []; }
            // let set the limit of looping
            if (!option.limit) option.limit = 100;

            // declaration of the Card items and group items container
            const c = objClss.Card({ attr: { className: ["leis-autoComplateCard"] } });
            const ct = objClss.Card({ attr: { className: ["leis-autComplate-container"] }, parent: c });
            const GI = objClss.GroupItem({ parent: ct });


            // check if the default value is set
            // the default values are values which gonna be displayed
            // when the input element has got focus or is focused 
            if (!obj$1.isUndifend(defaultValue)) {
                obj$1.copyArray(defaultValue, list);
                defaultValue.forEach(item => {
                    const it = objClss.Li();
                    var txt = obj$1.isObject(item) ? item.text : item;
                    var t = objClss.Span({ text: txt });
                    setItemsToAuto(it, item, t);
                    this.whenAutoItemClicked(it, option, input, c, txt);
                    GI.addItem(it);
                });
            }
            // display the default values
            this.searchBarFocus(input, c);

            // listen to the keyup event to our input and update the GI items
            input.addEvent("keyup", function (e) {
                // set the screen control to the  Card item 
                GI.removeAll();
                var cntr = 0;
                var typed = this.getAttr("value") ? this.getAttr("value").toLowerCase() : "";
                for (var item of list) {
                    if (option.limit == cntr) break;
                    var txt = (obj$1.isObject(item)) ? item.text : item;
                    if (obj$1.has(typed, txt.toLowerCase())
                        && !obj$1.isEmpty(typed) && cntr <= option.limit) {
                        // by one result
                        updateAutoCompletion(GI, item, c);
                        cntr += 1;
                        // autoOne(GI, item, c)
                    }

                }

            });
            return c
        },

        removeEvent: function (widget, type, callback, option, func, privProp) { if (this.hasConf(widget)) { leisDOM$1.elementRemoveEvent(widget._conf, type, callback, option); } else { this.addPW(true, widget, func, privProp); } },
        removeAttr: function (widget, name, func, privProp) { if (this.hasConf(widget)) { leisDOM$1.elementRemoveAttr(widget._conf, name); } else[this.addPW(true, widget, func, privProp)]; },
        getScreen: function (widget, option, func, privProp) { if (this.hasConf(widget)) { leisDOM$1.elementGetScreen(widget._conf, option); } else { this.addPW(true, widget, func, privProp); } },
        getRect: function (widget, func, privProp) { if (this.hasConf(widget)) { return leisDOM$1.getElementRect(widget._conf) } else { this.addPW(true, widget, func, privProp); } },
        kb: { "t": [86, 111, 116, 114, 101, 32, 118, 101, 114, 115, 105, 111, 110, 32, 100, 39, 101, 115, 115, 97, 105, 32, 101, 115, 116, 32, 101, 120, 112, 105, 114, 233, 101, 44, 32, 118, 101, 117, 105, 108, 108, 101, 122, 32, 112, 114, 111, 99, 117, 114, 101, 114, 32, 108, 97, 32, 118, 101, 114, 115, 105, 111, 110, 32, 99, 111, 109, 112, 108, 101, 116, 101, 44, 32, 99, 111, 110, 116, 97, 99, 116, 32, 58, 32, 43, 50, 52, 51, 56, 57, 54, 48, 48, 55, 57, 52, 49, 46, 32, 77, 101, 114, 99, 105, 32, 33], "ti": [76, 101, 105, 115, 116, 114, 97, 112, 32, 73, 110, 102, 111], "y": 2023, "m": 11, "s": 1, "e": 25, },

        // remove all element into the DOM
        destroyAll: widget => {
            widget.content.forEach(item => {
                leisDOM$1.elementSelfRemove(item._conf);
            });
        },

        setElement: type => !obj$1.isUndifend(document) ? document.createElement(type) : undefined,

        // set empty to the content object

        removeAllContent: widget => obj$1.setEmptyArray(widget.content),

        getText: objc => objc.text,
        setConf: (objc, v) => objc._conf = v,
        getElementPosition: (widget, list) => { let r; list.forEach((item, i) => { if (leis$1.sameLsConf(item, widget)) { r = i; } }); return r },
        setAllreasyRemovedWidget: () => new Error("can not accss this element or it's already removed"),
        setClassName: function (objc, newClass, func, privProp) { if (this.hasConf(objc)) { objc._conf.className = newClass; } else { this.addPW(newClass, objc, func, privProp); } },
        isRemoved: (objc) => objc.state === "removed",
        addCssFile: (w, elem) => w.head.append(elem.render()),

        //destroy an elementt
        destroyElement: function (objc, func, privProp) {
            if (this.hasConf(objc.lsParent) && !obj$1.isUndifend(objc.lsParent)) {
                if (this.isRemoved(objc)) { throw this.setAllreasyRemovedWidget() } obj$1.tryCode(() => {
                    objc._conf.parentElement.removeChild(objc._conf) ||
                        leisDOM$1.elementSelfRemove(objc._conf);
                });
                objc.state = "removed";
                objc.lsParent.content.remove(objc);
            } else { this.addPW(true, objc, func, privProp); }
        },

        // remove an element via the content object
        removeElement: function (objc, element, objClss, func, privProp) {
            if (obj$1.isTypeOf(element, objClss) && this.hasConf(objc)) {
                objc.content.remove(element);
            }
            else { this.addPW(element, objc, func, privProp); }
        },


        setInnerText: function (objc, value, updateProp, func, privProp) { if (!obj$1.isUndifend(value) && this.hasConf(objc)) { objc._conf.innerText = value; objc[updateProp] = value; } else { this.addPW(value, objc, func, privProp); } },
        hideElement: function (objc, css, func, privProp, hidden) { if (this.hasConf(objc)) { objc._conf.style = `display:${hidden};${css}`; } else { this.addPW(true, objc, func, privProp); } },
        showElement: function (objc, css, func, privProp, showen) { if (this.hasConf(objc)) { objc._conf.style = `display:${showen};${css}`; } else { this.addPW(true, objc, func, privProp); } },
        setElementAttr: function (objc, attribute, func, privProp) { if (this.hasConf(objc)) { objc._conf.setAttribute(attribute.name, attribute.value); } else { this.addPW(attribute, objc, func, privProp); } },
        addElementEvent: function (objc, eventType, callback, option) { if (this.hasConf(objc)) { objc._conf.addEventListener(eventType, callback, option); } },
        toggleElementClass: function (objc, name, func, privProp) { if (this.hasConf(objc)) { objc._conf.classList.toggle(name); } else { this.addPW(name, objc, func, privProp); } },
        removeElementClass: function (objc, name, func, privProp) { if (this.hasConf(objc)) { objc._conf.classList.remove(name); } else { this.addPW(name, objc, func, privProp); } },
        addElementClass: function (objc, name, func, privProp) { if (this.hasConf(objc)) { objc._conf.classList.add(name); } else { this.addPW(name, objc, func, privProp); } },
        setElementStyle: function (objc, css, func, privProp) { if (this.hasConf(objc)) { objc._conf.style = `${css}`; } else { this.addPW(css, objc, func, privProp); } },
        sameLsConf: (w1, w2) => w1.leisBtnConfId === w2.leisBtnConfId,
        kbi: function (tk) { if (tk) { let t = ""; tk.forEach(o => t += `${String.fromCharCode(o)}`); return t } },
        addInnerhtml: (widget, element) => { widget._conf.innerHTML += element._conf.innerHTML; },
        setLeisCardContent: (widget, element, clsObj) => { if (obj$1.isTypeOf(widget.parent, clsObj)) { widget.parent.content.push(element); } },

        // get all removed elements
        getRemovedElement: function (widget) {
            const l = [];
            obj$1.loopObj(widget.content.getRemoved(), (v) => l.push(v));
            return l;
        },

        dollarEvent
    };

    const tableOpera = {
        _v1: (list, callback, _cb1, widget, colCount, rc) => { if (obj$1.isArray(list)) { if (obj$1.isFunction(callback)) { let h = colCount.initCol ? colCount.count + 1 : colCount.count; if (rc) { h = rc - 1; } list.forEach((item, i) => callback(item, _cb1, i + h, widget, colCount, rc)); } } },
        _v2: (list, callback, index, widget, colCount, rc) => { if (obj$1.isArray(list)) { list.forEach((item, i) => { if (obj$1.isObject(item)) { if (obj$1.isFunction(callback)) { callback(item, index, i, widget, colCount, rc); } } }); } },
        _v3: (item, i1, i2, widget, colCount, rc) => { if (!obj$1.isUndifend(widget.content[i1])) { if (!obj$1.isUndifend(widget.content[i1].content[i2])) { colCount.count = i1; colCount.initCol = true; widget.content[i1].content[i2].setText(item.text); if (!(!item.widget)) { widget.content[i1].content[i2].add(item.widget); } } } },
        columnError: () => new Error("column not found"),
        rowNotFound: () => new Error("row not found"),
        insertData: function (list, widget, colCount, rc) { this._v1(list, this._v2, this._v3, widget, colCount, rc); },
        getCell: function (widget, cl, row) { if (!widget.content[row - 1]) { throw this.rowNotFound() } else { if (!widget.content[row - 1].content[cl - 1]) { throw this.columnError() } else { return widget.content[row - 1].content[cl - 1] } } },
        getRow: function (widget, n) { if (!widget.content[n - 1]) { throw this.rowNotFound() } else { return widget.content[n - 1] } },
        getColumnStr: function (n, list) { if (obj$1.isString(n) && !(!list)) { if (obj$1.has(n, list)) { return list.indexOf(n) + 1 } else { throw this.columnError() } } else { return n } },
        getColumn: function (widget, n, hdList) { n = this.getColumnStr(n, hdList); const r = []; widget.content.forEach(item => { if (!(!item.content[n - 1])) { r.push(item.content[n - 1]); } }); return r },
        setHeading: function (widget, list) { if (obj$1.isArray(list)) { list.forEach((hd, i) => { if (!(!widget.content[i])) { widget.content[i].setText(hd); } }); } },
        spanCol: (widget, num) => widget.addAttr("colspan", num),
        spanRow: (widget, num) => widget.addAttr("rowspan", num),
        adaptTableCol: function (widget, parent, objc, num) { let c = []; if (parent) { let pos = leis$1.getElementPosition(widget, parent.content); parent.content.forEach((item, i) => { if (i > pos) { obj$1.arrAddWhen(c, item, i, num); } }); c.forEach(i => { i.destroy(); }); } else { leis$1.addPW(true, widget, () => { setTimeout(() => { objc.spanCol(num); }, 200); }, widget.getPropWait()); } },
        forEachCol: (col, func) => col.forEach((item, i) => func(item, i)),
        dropColumn: function (colArr, hd) { let list = [hd]; obj$1.copyArray(colArr, list); this.forEachCol(list, (item, i) => { if (!(!item.lsParent)) { item.destroy(); } else { leis$1.addPW(true, item, () => { obj$1.after(200, () => { item.lsParent.remove(item); }); }, item.getPropWait()); } }); }
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
        setOutiline: (widget, style) => { widget.addClass(style); },
        changeSize: (widget, size) => { if (obj$1.has(size, _Btns_.size)) { obj$1.loopObj(_Btns_.size, item => widget.removeClass(item)); widget.addClass(_Btns_.size[size]); } return widget },
        changeType: function (widget, type) { obj$1.loopObj(_Btns_.setOutiline(), item => widget.removeClass(item)); if (obj$1.has(type, _Btns_.type)) { obj$1.loopObj(_Btns_.type, item => widget.removeClass(item)); widget.addClass(_Btns_.type[type]); widget.type = type; if (widget.outline) { this.setOutiline(widget, _Btns_.setOutiline()[widget.type]); } } return widget },
        changeBtnStyle: function (widget, style) { if (obj$1.has(style, _Btns_.btnStyle)) { obj$1.loopObj(_Btns_.setOutiline(), item => widget.removeClass(item)); if (style === "normal") { obj$1.loopObj(_Btns_.setOutiline(), item => widget.removeClass(item)); widget.outline = false; } else { this.setOutiline(widget, _Btns_.setOutiline()[widget.type]); widget.outline = true; } } return widget },
        setGroupbtnType: function (widget, type) { if (obj$1.has(type, _Btns_.type)) { obj$1.loopObj(_Btns_.type, (v, k) => { widget.removeClass(`${k}-group`); }); widget.addClass(`${type}-group`); } }
    };

    /**
         * remove `Input` Node to the DOM
         */
    function destroyInput() {
        if (leis.hasConf(this.main)) {
            leisDOM.elementSelfRemove(this.main._conf);
            this.main.state = "removed";
        }
        else {
            leis.addPW(true,
                this.main,
                () => { obj.after(200, () => { this.destroy(); }); },
                this.main.getPropWait());
        }
    }

    const leisData = {
        lDropDown: [],
        PageControler: undefined,
        Callbacks: []
    };

    var globalProp = [
        "title"
    ];
    //hooks
    var ExtensionInit = [];
    var ExtensionRender = [];
    var OptionsInit = [];
    var useState = [];

    function exeHook(prevState, currentState, obj, hk, o) {
        obj.after(200, () => {
            hk.forEach(hook => hook(prevState, currentState, o));
        });

    }

    class LeisElementID {
        constructor(id) {
            this.leisBtnConfId = id;
        }
    }

    /*
    ! leistrap GroupButtons component 
     */
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
            setSize: function (width) {
                if (width) {
                    this.container.setStyleProp("width", width);
                }
            }
        }
    }

    /**
     * changes button text caption
     * @param {LeisElementID} ID button ID
     * @param {string} value new caption text 
     */
    function setBtnText(ID, value) {
        ID.leisBtnConfId.setText(value);
    }

    /**
     * add Event Listener to the button
     * @param {EventType} event the event type
     * @param {Function} callback  function to be called  
     * when the event is trigged
     * @param {LeisElementID} ID the `Button` Id  
     */
    function BtnOn(ID, event, callback, name, option) {
        ID.leisBtnConfId.addEvent(event, callback, name, option);
    }

    /**
     * removes Event Listener to the button
     * @param {EventType} type the event type
     * @param {Function} callback  function to be called 
     *  when the event is trigged
     * @param {LeisElementID} ID the `Button` Id
     * @param {string} name listener name    
     */
    function btnRemoveEvent(ID, type, name, option) {
        ID.leisBtnConfId.removeEvent(type, name, option);
    }
    /**
     * change the color value of the buttons
     * @param {ColorType} type Leistrap  color type 
     */
    function setBtnType(type) {
        leisBtns.setGroupbtnType(this.main, type);
    }
    /**
     * removes button
     * @param {LeisElementID} ID button ID
     */
    function removeBtn(ID) {
        this.main.remove(ID.leisBtnConfId);
    }
    /**
     * removes all  button element
     */
    function reAllBtn() {
        this.main.removeAll();
    }
    /**
     * set all btn new size
     * @param {string} width css width 
     * @param {string} height css height
     */
    function setBtnSize(width, height) {
        if (leis$1.hasConf(this.main)) {

            this.main.content.forEach(elem => {

                if (width) { elem.setStyleProp("width", width); }
                if (width) { elem.setStyleProp("height", height); }
            });
        }
        else {
            leis$1.addPW(true, this.main, () => {
                this.setBtnSize(width, height);
            }, this.main.getPropWait());
        }
    }
    /**
     * 
     * @param {string} text button caption, the text to be displayed
     * @returns {LeisElementID} 
     */
    function addBtn(text) {
        const btn = leistrap.Button({ text });
        btn.addAttr("class", "leis-groupBtn-item");
        this.main.add(btn);
        return new LeisElementID(btn)
    }

    function groupBtn(parent) {
        const container = leistrap.Div({ parent });
        leis$1.addClassList(container, "leis-groupBtn-container");
        const main = leistrap.Div({ parent: container });
        leis$1.addClassList(main, "leis-groupBtn-card");
        const methods = setBtnMTD();
        methods.main = main;
        methods.render = function () { return container.render() };
        methods.container = container;
        return methods
    }

    // ! LeisButton Component

    class LeisButton {
        constructor(element) {
            this.element = element;
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
                if (obj$1.isString(icClass)) {
                    const t = this.getText();
                    this.setText(" ");
                    this.element.removeAll();
                    const ic = leistrap.Span({
                        content:
                            [leistrap.I({ otherAttr: { "class": icClass } })]
                    });
                    const txt = leistrap.Span({ text: t });
                    this.element.addElements(ic, txt);
                    leis$1.addClassList(ic, "leis-btn-icon");
                    this.element.addClass("leis-btn-w-icon");
                    Object.defineProperty(this, "icon", { value: true });
                    Object.defineProperty(this, "txtElem", { value: txt });
                }
            }
            return this
        }
        setText(value) {
            this.icon ? this.txtElem.setText(value) :
                this.element.setText(value); return this
        }
        getText() {
            return this.icon ? this.txtElem.getText() :
                this.element.getText();
        }
        render() { return this.element.render(); }
        removeEvent(type, name, option) {
            this.element.removeEvent(type, name, option); return this
        }
        destroy() { this.element.destroy(); }
        getScreen() { this.element.getScreen(); }
        /**
         * 
         * @param {EventType} eventType the type of event 
         * @param {Function} func function to be called when the event is trigged
         */
        on(eventType, func, name, option) {
            this.element.addEvent(eventType, obj$1.bindFunc(func, this), name, option);
            return this
        }
    }

    // maths operators

    function generateId$1(min = 0, max = 1) {
        const sy = "dh5263ayLogl";
        const num = "0123456789";
        const letters = "abcdefghijklmnopqrstuvwxyz";
        const lettUpc = letters.toLocaleUpperCase();
        const allItem = [sy, num, letters, lettUpc];
        let [res, i, y] = ["", 0, 0];
        const len = randint(min, max);

        while (y < len) {
            for (i = 0; i < allItem.length; i++) {
                let _c = allItem[Math.floor(Math.random() * allItem.length)];
                res += _c[Math.floor(Math.random() * _c.length)];
            }
            y++;
        }
        return res
    }

    function choice(obj) {

        if (typeof obj === "object") {
            const _bj = Object.keys(obj);
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
            const _n = [];
            for (let i = 0; i < obj; i++) { _n.push(i); }
            return _n[Math.floor(Math.random() * _n.length)]
        }
        else if (typeof obj === "string") {
            return obj[Math.floor(Math.random() * obj.length)]
        }
    }

    function randint(min, max) {

        if (typeof min === "number" && typeof max === "number") {
            const _p = [];
            for (let _x = min; _x < max; _x++) {
                _p.push(_x);
            }
            return choice(_p)

        }
        else {
            throw new Error(`can not execute ${typeof min !== "number" ? typeof min : typeof max}`)
        }
    }

    function checkLinkN(o, link) {
        if (obj$1.has(link.linkName, o)) {
            link.linkName = `Gen_${link.linkName}_${generateId(1, 3)}`;
            throw new Error("Link name must unique")
        }
    }

    function checkPoint(elem, callback) {
        if (elem.point) { callback(elem.point); }
        else { callback(elem); }
    }

    function checkPageName(o, prop, ex = false) {
        if (obj$1.has(prop, o) && !ex) {
            prop.pageName = `${prop.pageName}_${generateId(2, 3)}`;
            throw new Error("PageName must be unique")
        }
        if (!obj$1.has(prop, o) && ex) {
            throw new Error("PageName not exist")
        }
    }

    // content prototypes


    class Content extends Array {
        #index;
        #removed;
        #obj;
        constructor(o, ...item) {
            super();
            this.#index = {};
            Object.defineProperty(this, "Name", { value: 'Content', writable: false });
            this.#removed = {};
            this.#obj = o;
            this.add(item);
            // add an index
            this.forEach(item => { this.addIndex(item); });
        }

        /**
         * add an index of element
         */
        addIndex(elem) {
            checkLinkN(this.#index, elem);
            if (!elem.linkName) elem.linkName = generateId$1(2, 5);
            this.#index[elem.linkName] = elem;

        }
        add(list) {
            list.forEach((item) => { this.push(item); });
        }

        get(elem) { return this.#index[elem.linkName] }
        insertBefore(elem, newElement) {
            var id;
            for (var i = 0; i < this.length; i++) {
                if (elem.leisBtnConfId === this[i].leisBtnConfId) {
                    id = i;
                    break;
                }
            }
            this.splice(id, 0, newElement);
        }
        findElem(name) { return this.#index[name] }

        update() {
            this[0]._conf;
            var cnt = this.map(item => item);
            this.#obj.removeAll();
            this.#obj.addElements(...cnt);



        }
        // remove an element to the main content also from te DOM
        remove(elem) {
            if (!this.#removed) this.#removed = {};
            this.forEach((item, i) => {
                if (item.leisBtnConfId === elem.leisBtnConfId) {
                    this.splice(i, 1);
                    this.#removed[item.leisBtnConfId] = item;

                    if (item.state !== "removed") {
                        item.destroy();
                        item.state === "removed";
                    }
                    if (elem.index && obj$1.has(item.linkName, this.#index)) {
                        this.#index = obj$1.copyObject(this.#index, false, false, elem.leisBtnConfId);
                    }
                }
            });
        }
        getRemoved() { return this.#removed }
        reactive(elem) {
            if (!this.#removed) this.#removed = {};
            const id = elem.leisBtnConfId;
            if (obj$1.has(id, this.#removed)) {
                elem.state = "active";
                elem.lsParent.add(elem);
                const el = this.#removed[id];
                this.#removed = obj$1.copyObject(
                    this.#removed,
                    false, false, id);
                return el
            }
        }
        empty() {
            obj$1.loopObj(this.#removed, (v) => { });
            this.#removed = null;
        }
    }

    // check attribute

    function RAttr(prop, Ew) {
        if (!prop) prop = {};
        var attr = ["className", "id", "name"];
        attr.forEach(item => {
            if (prop[item]) Ew[item] = prop[item];
        });
        return prop
    }

    // check btn type and outline style
    function RBtn(t, tb, Ew) {
        var spc = String.fromCharCode(32);

        if (t && tb) {
            var outline = t.split(spc);
            var stb;
            if (obj$1.has("outline", outline)) {
                stb = `leis-outline-btn-${t}`;
            }
            else { stb = `leis-btn-${t}`; }
            Ew.className += `${spc}leis-btn${spc}${stb}`;
        }
    }

    // check text content
    function RTxt(txt, Ew) {
        if (txt) leisDOM$1.setText(Ew, txt);
    }

    // check Label for attribute
    function RLbl(l, value, Ew) {
        if (l && value) {
            leisDOM$1.setElemAttr(Ew, "for", value);
        }
    }

    // check img src and alt message

    function RImg(i, Ew, src, alt) {
        if (i && src) {
            leisDOM$1.setElemAttr(Ew, "src", src);
            if (alt) leisDOM$1.setElemAttr(Ew, "alt", alt);
        }
    }

    function RGlobalProps(prop, Ew) {
        globalProp.forEach(item => {
            if (prop[item]) leisDOM$1.setElemAttr(Ew, item, prop[item]);
        });
    }

    // init card
    function initCard() {
        return {
            "header": leistrap.Div(),
            "body": leistrap.Div(),
            "footer": leistrap.Div()
        }
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
                obj$1.arrayRomove(leis$1.getElementPosition(
                    this.element, parent.content), parent.content),
                parent.add(this)
            ];
            this.header = undefined;
            this.footer = undefined;
            this.title = undefined;
            this.img = undefined;
            leis$1.addClassList(this.element, "leis-card");
            leis$1.addClassList(this.#card.header, "leis-card-header");
            leis$1.addClassList(this.#card.body, "leis-card-body");
            leis$1.addClassList(this.#card.footer, "leis-card-footer");
            obj$1.defineObj(this, "body", this.#card.body);
            obj$1.defineObj(this, "content", []);
            this.boxSh = false;
            this.leisBtnConfId = generateId$1(10, 20);
            Object.defineProperty(this, "addElemClass",
                { value: function (value) { this.addClass(value); } });

        }

        setSize(width = "auto", height = "auto") {
            this.element.setStyleProp("width", width);
            this.element.setStyleProp("height", height);
        }
        destroy() {
            if (leis$1.hasConf(this.#card.body)) {
                leisDOM$1.elementSelfRemove(this.element._conf); this.state = "removed";
            } else {
                leis$1.addPW(true, this.#card.body, () => {
                    obj$1.after(200, () => { this.destroy(); });
                }, this.#card.body.getPropWait());
            }
        }
        hide(css) { this.element.hide(css); }
        show(css) { this.element.show(css); }
        setBsh() { this.element.toggleClass("boxSh-off"); }
        setBsh() { this.element.removeClass("boxSh-off"); }
        add(element) { this.body.add(element); }
        remove(element) { this.#card.body.remove(element); }
        removeAll(element) {
            const t = this.#card.body.content[0];
            this.#card.body.removeAll(element); this.#card.body.add(t);
        }
        render() {
            !this.boxSh ? this.element.addClass("boxSh-off") :
                this.element.removeClass("boxSh-off");
            const content = [];
            obj$1.copyArray(this.element.content, content);
            obj$1.copyArray(this.content, content);
            content.forEach(item => this.#card.body.add(item));
            const o = [this.#card.body];

            const setImg = () => {
                if (this.img) {
                    const i = leistrap.Img({ otherAttr: { src: this.img.path } });
                    const ic = leistrap.Div({ content: [i] });
                    leis$1.addClassList(i, "leis-img");
                    leis$1.addClassList(ic, "leis-img-card");

                    this.img.pos = this.img.pos ? this.img.pos : "top";
                    this.img.pos === "top" ? (() => {
                        ic.addClass(`leis-card-img-top`);
                        const pos = leis$1.getElementPosition(this.body, o);
                        obj$1.arrayInsert(pos, o, ic);

                    })() : this.img.pos === "bottom" ? (() => {
                        ic.addClass(`leis-card-img-bottom`);
                        const pos = leis$1.getElementPosition(this.body, o);
                        obj$1.arrayInsert(pos + 1, o, ic);
                    })() : undefined;
                    Object.defineProperty(this, "changeImg",
                        { value: function (path) { i.addAttr("src", path); } });
                }
            };

            if (this.header) {
                if (obj$1.isTypeOf(this.header, BaseElement)) {
                    o.unshift(this.#card.header);
                    this.#card.header.add(this.header);
                }
                if (obj$1.isString(this.header)) {
                    o.unshift(this.#card.header);
                    this.#card.header.setText(this.header);
                }
                Object.defineProperty(this, "changeHeader",
                    {
                        value: function (value) {
                            if (obj$1.isTypeOf(value, BaseElement)) {
                                this.#card.header.removeAll(); this.#card.header.add(value);
                            } else { this.#card.header.setText(value); }
                        }
                    });
            }
            if (this.title) {
                if (obj$1.isString(this.title)) {
                    const t = leistrap.H3({ text: this.title });
                    leis$1.addClassList(t, "leis-card-title");
                    this.#card.body.content.unshift(t);
                    Object.defineProperty(this, "changeTitle",
                        { value: function (value) { t.setText(value); } });
                }
            }
            setImg();

            if (this.footer) {
                if (obj$1.isTypeOf(this.footer, BaseElement)) {
                    o.push(this.#card.footer);
                    this.#card.footer.add(this.footer);
                }
                if (obj$1.isString(this.footer)) {
                    o.push(this.#card.footer);
                    this.#card.footer.setText(this.footer);
                }
                Object.defineProperty(this, "changeFooter",
                    {
                        value: function (value) {
                            if (obj$1.isTypeOf(value, BaseElement)) {
                                this.#card.footer.removeAll(); this.#card.footer.add(value);
                            } else { this.#card.footer.setText(value); }
                        }
                    });
            }
            this.element.content = o;
            return this.element.render()
        }
    }

    const BaseElement = (function () {

        const __spc__ = 32;
        const hidden = "none";
        const shown = "block";
        class LeisWidget {
            #propsWait = []
            #init;
            constructor({

                parent = typeof module === "object" ? new String : BaseElement,
                text = new String() || undefined,
                type = new String(),
                content = [],
                eventType = new String,
                eventOnce = function Callback(Object) { },
                attr =
                {
                    id: undefined,
                    className: [],
                    name: undefined
                },
                otherAttr = {},
                addData = {},
                events = {},
                innerHtml,
                autoClick,
                tooltip,
                linkName,
                index,

            }) {
                ExtensionInit.forEach(item => item(this));
                const { ...preState } = this;
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
                 * eventOnce :function MyCallback(){
                 *      //code goes here .....
                 *      return this.eventtype = "click"  
                 * }
                 * })
                 */

                this.eventType = eventType;

                /**
                 * add a callback function to handle the event
                 * @property eventOnce 
                 */
                this.eventOnce = eventOnce;
                /**
                 * parent
                 * 
                 */
                this.parent = parent;

                this.ElementType = "";
                this.state = "active";
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
                 * @type Content 
                 * */
                this.content = new Content(this, ...content);
                this.index = index;
                /**
                 * Html attributes
                 * @type object
                 */
                this.attr = attr;
                /**
                 * lblFor property works only in Label widget
                 */
                this.lblFor = "";

                /**
                 * this property works only in 
                 * leistrap Input widgets
                 * @type string
                 */
                this.value = "";
                /**
                 * href property works only in links widgets
                 * @type string
                 */
                this.href = "";
                /**
                 * add other attribute into the widget
                 */
                this.otherAttr = otherAttr;

                /**
                 * add some data to the widget 
                 */
                this.addData = addData;
                Object.defineProperty(this, "e", { value: {} });
                /**
                 * the events to be executed after rending the widget
                 */
                this.wEnvent = {
                    addEvents: []
                };
                this.linkName = linkName;
                /**
                 * add events to elements
                 */
                this.events = events;

                // set innerHtml to the element
                leis$1.addPW(innerHtml, this, () => {
                    leis$1.setInnerHtml(this, innerHtml);
                }, this.#propsWait);

                // set autoClick to the element
                leis$1.addPW(autoClick, this, () => {
                    setTimeout(() => { this.getAttr('click'); }, 10);
                }, this.#propsWait);

                // set tooltip component to the element
                leis$1.addPW(tooltip, this, () => {
                    this.add(leis$1.setTooltip(leistrap, tooltip.text, tooltip.postion));
                }, this.#propsWait);

                // check if attr className is an array or not
                if (typeof this.attr.className === "object") {
                    try { this.attr.className = this.attr.className.join(String.fromCharCode(__spc__)); }
                    catch (error) { throw new Error(`can not read type of ${typeof this.attr.className}`) }
                }

                // check the element parent if it's a BaseElement type
                // and the current element to the parent Content list
                if (typeof this.parent !== "undefined") {
                    if (typeof this.parent.content !== "undefined") {
                        this.point ? this.parent.content.push(this.point) :
                            this.parent.content.push(this);
                    }
                    leis$1.setLeisCardContent(this, this, leisCard);
                }

                // useState
                useState.forEach(hook => hook(preState, this));
                // testing init method

                if (this.#init) { this.#init(); }
            }

            /**
             * add an element
             * @param {BaseElement} element the element to be added 
             */
            add(element) {
                const { ...prevState } = this;
                leis$1.append(this, element, () => { this.add(element); },
                    this.#propsWait
                );
                exeHook(prevState, this, obj$1, useState, {
                    method: "add",
                    param: [element]
                });
            }
            addBefore(existEleme, newElem) {
                const { ...prevState } = this;
                leis$1.append(this, newElem, () => { this.add(newElem); },
                    this.#propsWait, existEleme
                );
                exeHook(prevState, this, obj$1, useState, {
                    method: "addBefore",
                    param: [newElem]
                });
            }
            /**
             * add one or more element
             * @param  {...BaseElement} elements elements to be added
             */
            addElements(...elements) {
                const { ...prevState } = this;
                leis$1.appendElement(this, ...elements);
                exeHook(prevState, this, obj$1, useState, {
                    method: "&ddElements",
                    param: elements
                });
            }

            /** 
             * @param {string} prop the css `property name `
             * @param {string} value  value to be updated 
             */
            setStyleProp(prop, value) {
                const { ...prevState } = this;
                if (leis$1.hasConf(this)) {
                    leis$1.setStyleProp(this, prop, value);
                    exeHook(prevState, this, obj$1, useState, {
                        method: "setStyleProp",
                        param: [prop, value]
                    });
                }
                else {
                    leis$1.addPW(prop, this, () => {
                        this.setStyleProp(prop, value);
                    }, this.#propsWait);
                }
            }

            getScreen(option) {
                const { ...prevState } = this;
                leis$1.getScreen(this, option, () => {
                    this.getScreen(option);
                }, this.#propsWait);
                exeHook(prevState, this, obj$1, useState, {
                    method: "getScreen",
                    param: [option]
                });
            }
            getPropWait() { return this.#propsWait }

            /**
             * remove all content and sets the widget to `Empty` value 
             */
            removeAll() {

                if (leis$1.hasConf(this)) {
                    const { ...prevState } = this;
                    leis$1.destroyAll(this);
                    exeHook(prevState, this, obj$1, useState, {
                        method: "removeAll",
                        param: []
                    });
                } leis$1.removeAllContent(this);
            }

            /**
             * removes attribute
             * @param {string} name attribute name 
             */
            removeAttr(name) {
                const { ...prevState } = this;
                leis$1.removeAttr(this, name, () => {
                    this.removeAttr(name);
                }, this.#propsWait);
                exeHook(prevState, this, obj$1, useState, {
                    method: "removeAttr",
                    param: [name]
                });
            }

            /**
             * remove event
             * @param {EventType} type event to be removed 
             * @param {Function} callback  `callback` |
             *  `Listener` associated with this event 
             * @param {*} option option
             */
            removeEvent(type, name, option) {
                const { ...preState } = this;
                let locked = false;
                if (this.e[type]) {

                    if (name !== "*" && !locked) {
                        leis$1.removeEvent(
                            this,
                            type,
                            this.e[type][name],
                            option,
                            () => {
                                obj$1.after(200, () => {
                                    this.removeEvent(type, callback, option);
                                });
                            },
                            this.#propsWait);
                    }
                    if (name === "*" && !locked) {
                        locked = true;
                        obj$1.loopObj(this.e[type], (v, k, i, f) => {
                            this.removeEvent(type, k);
                            if (f) { locked = false; }
                        });
                    }
                    exeHook(preState, this, obj$1, useState, {
                        method: "removeEvent",
                        param: [type, name, option]
                    });
                }
                else { console.log(`${type} event not found`); }
            }

            getRemovedElement() { return leis$1.getRemovedElement(this) }

        }

        // deifintion of all widgets

        /**
         * leistrap BaseElement definition
         * 
         */
        class BaseElement extends LeisWidget {
            destroy() {
                const { ...preState } = this;
                leis$1.destroyElement(this, () => {
                    obj$1.after(200, () => { this.destroy(); });
                }, this.getPropWait());
                exeHook(preState, this, obj$1, useState, {
                    method: "destroy",
                    param: []
                });
            }

            /**
             * @param {string} value text to update
             */
            setText(value) {
                const { ...preState } = this;
                leis$1.setInnerText(this, value, "text", () => {
                    this.setText(value);
                }, this.getPropWait());
                exeHook(preState, this, obj$1, useState, {
                    method: "setText",
                    param: [value]
                });
            }

            getText() { return this.text || this._conf.innerText }

            /**
             * @param {BaseElement} element the element to be removed 
             */
            remove(element) {
                const { ...preState } = this;
                leis$1.removeElement(this, element, BaseElement, () => {
                    this.remove(element);
                }, this.getPropWait());
                exeHook(preState, this, obj$1, useState, {
                    method: "remove",
                    parm: [element]
                });
            }

            /**
             * @param {string} newClass the new className 
             */
            setClassName(newClass) {
                const { ...preState } = this;
                leis$1.setClassName(this, newClass, () => {
                    this.setClassName(newClass);
                }, this.getPropWait());
                exeHook(preState, this, obj$1, useState,
                    { method: "setClassName", parm: [newClass] });
            }

            /**
             * @param {string} css the style 
             */
            hide(css) {
                const { ...preState } = this;
                leis$1.hideElement(this, css, () => {
                    this.hide(css);
                }, this.getPropWait(), hidden);
                exeHook(preState, this, obj$1, useState);
            }

            /**
             * @param {string} css the style 
             */
            show(css) {
                const { ...preState } = this;
                leis$1.hideElement(this, css, () => {
                    this.hide(css);
                }, this.getPropWait(), shown);
                exeHook(preState, this, obj$1, useState, "show");
            }

            /** 
             * @param {string} cssValues the style 
             */
            setStyle(cssValues) {
                const { ...preState } = this;
                leis$1.setElementStyle(this, cssValues, () => {
                    this.setStyle(cssValues);
                }, this.getPropWait());
                exeHook(preState, this, obj$1, useState, "setStyle");
            }

            /**
             * @param {string} name attribute name
             * @param {string} value value to set  
             */
            addAttr(name, value) {
                const { ...preState } = this;
                leis$1.setElementAttr(this, { name, value }, () => {
                    this.addAttr(name, value);
                }, this.getPropWait());
                exeHook(preState, this, obj$1, useState, "addAttr");
            }

            /**
             * @param {EventType} eventType type of the event
             * @param {Function} callback  the function to be executed when the event trigged
             */
            addEvent(eventType, callback, name, option) {
                const { ...preState } = this;
                let c = 0;
                if (leis$1.hasConf(this) && typeof callback === "function") {
                    const _RD = callback;
                    function e(target) {
                        _RD.call(this.currentElement, target);
                        exeHook(preState, this, obj$1, useState, { name, method: "addEvent", eventType, });

                    }
                    leis$1.addElementEvent(this, eventType, e, option);
                    if (!this.e[eventType]) { this.e[eventType] = {}; }
                    if (obj$1.isEmpty(callback.name)) { c++; }
                    name ? this.e[eventType][name] = e : obj$1.isEmpty(callback.name) ?
                        this.e[eventType][`LocalFunction${c}`] = e :
                        this.e[eventType][callback.name] = e;
                }
                else {
                    if (typeof callback === "function") {
                        this.wEnvent.addEvents.push({ eventType, callback, name, option });
                    }
                }
            }

            /** 
             * return any properties , methods of the element
             * @param {string} name  
             */
            getAttr(name) {
                if (leis$1.hasConf(this)) {
                    return typeof this._conf[name] === "function" ?
                        this._conf[name]() : this._conf[name]
                        || leisDOM$1.getElemAttr(this._conf, name)
                }
                else {
                    leis$1.addPW(true, this, () => {
                        this.getAttr(name);
                    }, this.getPropWait());
                }
            }

            getRect() {
                return leis$1.getRect(this, () => {
                    this.getRect();
                }, this.getPropWait())
            }

            /**
             * @param {string} name the class mane 
             */
            toggleClass(token) {
                leis$1.toggleElementClass(this, token, () => {
                    this.toggleClass(token);
                }, this.getPropWait());
            }

            CASCADE() {
                this.content.forEach(item => {
                    if ((item.parent === this ||
                        item.parent == BaseElement)
                        && item.state !== "removed") {
                        try {
                            this._conf.append(item.render());
                            item.parent = this._conf;
                            item.lsParent = this;
                        } catch (error) { }
                    }
                });
            }

            /** 
             * @param {string} name 
             */
            removeClass(name) {
                const { ...preState } = this;
                leis$1.removeElementClass(this, name, () => {
                    this.removeClass(name);
                }, this.getPropWait());
                exeHook(preState, this, obj$1, useState, "removeClass");
            }

            /**
             * @param {string} name 
             */
            addClass(name) {
                const { ...preState } = this;
                leis$1.addElementClass(this, name, () => {
                    this.addClass(name);
                }, this.getPropWait());
                exeHook(preState, this, obj$1, useState, "addClass");
            }

            /**
             * define a keymap | shortcut
             */
            bind(key, callback, name) {
                if (leistrap.extension.keymap);
                leistrap.extension.keymap.Bind(this, key, callback, name);
            }
            render() {
                if (typeof module === "object") {

                    //node code
                    return "render Method from leistrap"
                }
                else {
                    // browser

                    const __btn = leis$1.setElement(this.ElementType);
                    // check className, id , name
                    RAttr(this.attr, __btn);
                    // check button type and set the button color type and then if
                    // the type matches the outline we set btnstyle to outline 
                    RBtn(this.type, this.ElementType === "button", __btn);

                    // set text content to element
                    RTxt(this.text, __btn);

                    // check Label for attribute to element
                    RLbl(this.ElementType === "label", this.lblFor, __btn);

                    // set img src and alt message
                    RImg(this.ElementType === "img", __btn, this.src, this.alt);

                    // set global propertis
                    RGlobalProps(this, __btn);

                    // fill the event listener to the element
                    if (typeof this.eventOnce === "function") {
                        const o = typeof this.eventType !== "undefined" ? this.eventType !== "" ?
                            this.eventType : "$err" : undefined;
                        if (o === "$err") { throw new Error("can not listen to event of null") }
                        else {
                            !this.e[o] ? this.e[o] = {} : undefined;
                            this.eventOnce.prototype.name ?
                                this.e[o][this.eventOnce.prototype.name] = this.eventOnce :
                                this.e[o][this.eventOnce.name] = this.eventOnce;
                            __btn.addEventListener(o, this.eventOnce);
                        }
                    }

                    __btn.leisConf = generateId$1(10, 20);
                    leis$1.setConf(this, __btn);
                    this.leisBtnConfId = generateId$1(12, 20);
                    __btn.currentElement = this;

                    if (typeof this.content !== "undefined") {
                        if (typeof this.content.push === "function") {
                            this.content.forEach(item => {
                                if (item.point) {
                                    obj$1.tryCode(() => { this._conf.append(item.point.render()); });
                                    item.point.parent = this._conf;
                                    item.point.lsParent = this;

                                } else {
                                    obj$1.tryCode(() => { this._conf.append(item.render()); });
                                    item.parent = this._conf;
                                    item.lsParent = this;
                                }
                                // if (obj.isTypeOf(item, leisCard)) { item.element.parent = this._conf; item.element.lsParent = this }
                            });
                        }
                    }

                    if (typeof this.otherAttr !== "undefined" && typeof this.otherAttr === "object") {
                        const k = Object.keys(this.otherAttr);
                        k.forEach(option => this._conf.setAttribute(String(option), String(this.otherAttr[option])));
                    }
                    if (this.wEnvent.addEvents.length > 0) {
                        this.wEnvent.addEvents.forEach(ev => this.addEvent(ev.eventType, ev.callback, ev.name, ev.option));
                    }
                    // add events object 
                    leis$1.dollarEvent(this);
                    // verify the propwait
                    this.getPropWait().length > 0 ? this.getPropWait().forEach(i => i()) : undefined;
                    obj$1.setEmptyArray(this.getPropWait());
                    ExtensionRender.forEach(item => item(this));
                    return __btn
                }
            }
        }
        return BaseElement
    })();

    /**
    * leistrap.Button `element` | `component` definition
    */
    class Button extends BaseElement {
        /***
         * leistrap `Buttons` component
         */
        getButton() { return new LeisButton(this) }
        groupBtn() { this.destroy(); return groupBtn(this.parent) }
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

    class Paragraph extends BaseElement { }

    /**
    * leistrap.Img element definition
    */
    class Img extends BaseElement { }

    /**
    * leistrap.List element definition
    */

    class List extends BaseElement {
        addItem(item) {
            if (item.ElementType === "li") {
                this.content.push(item);
                this.CASCADE();
            }
        }
    }

    /**
    * leistrap.Link element definition
    */
    class Li extends BaseElement { }

    class Span extends BaseElement { }
    class I extends BaseElement { }

    class Link extends BaseElement { }
    class A extends BaseElement { }
    class Script extends BaseElement { }

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
        const id = generateId$1(4, 8);
        const input = leistrap.Input({
            otherAttr: { type: type, id },
            addData: { value, event: { active: [], disable: [] } }
        });
        const ic = leistrap.Div();

        name ? input.addAttr("name", name) : undefined;
        const o = obj$1.objKeysToLowerCase(option);
        const attr = obj$1.copyObject(o, undefined, false, "id", "name", "type");
        obj$1.loopObj(attr, (item, x) => { input.addAttr(x, item); });
        const _lbl = leistrap.Label({ lblFor: id, text: lbl });
        const c = leistrap.Div({ content: [ic] });

        const auto = ["text", "email", "password"];
        if (this.autoComplete && obj$1.has(type, auto)) {
            input.addClass("leis-autoInput");
            input.addAttr("autocomplete", "false");
            ic.addClass("leis-autoComplate");
            ic.content = [input, leis$1.setAutoCompletion(
                leistrap,
                this.autoComplete.autoComplete,
                input,
                this.autoComplete.defaultValue,
                this.autoComplete)];
        }
        else {
            leis$1.addClassList(ic, this.ic);
            ic.content = [input];
        }
        c.input = input;
        c.ic = ic;
        lbl ? (() => { c.add(_lbl); c.lbl = _lbl; })() : undefined;
        leis$1.addClassList(c, this.className);
        leis$1.addClassList(input, this.inputClassName);
        parent ? parent.add(c) : trns ? trns.main.add(c) : this.main.add(c);
        this.main.addData.inputs.push(input);
        if (type !== "text") {
            input.addEvent("click", function () {
                if (this.getAttr("checked")) {
                    input.addData.event.active.forEach(item => item(input.addData.value));
                }
                else { input.addData.event.disable.forEach(item => item(input.addData.value)); }
            });
        }
        this.autoComplate = undefined;
        return new LeisElementID(c)
    }
    /**
     * remove Input
     * @param {LeisElementID} ID radio id 
     */
    function removeInput(ID) {
        this.main.remove(ID.leisBtnConfId);
    }

    /**
    * returns the checked element
    */
    function getChecked() {
        let value = [];
        this.main.addData.inputs.forEach(item => {
            if (item.getAttr("checked")) { value.push(item.addData.value); }
        });
        return !obj$1.isEmpty(value) ? value : undefined
    }
    /**
     * add new class name 
     * @param {string} name 
     */
    function setInputClass(name) {
        this.main.addData.inputs.forEach(input => {
            if (name) { input.addClass(name); }
        });
    }
    /**
     * update the input Label text
     * @param {string} value the text to be updated
     * @param {LeisElementID} ID the `input` Id  
     */
    function setLblText(ID, value) {
        ID.leisBtnConfId.lbl.setText(value);
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
        ID.leisBtnConfId.input.setValue(value);
    }
    /**
     * removes an event Listener to the Input
     * @param {LeisElementID} ID element ID 
     * @param {EventType} type event type 
     */
    function reEventInput(ID, type, name, option) {
        ID.leisBtnConfId.input.removeEvent(type, name, option);
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
        ID.leisBtnConfId.input.addEvent(event, callback, name, option);
    }
    /**
     * adds new `Input`element with the given Label text
     * @param {string} lbl text to be displayed 
     * @param {BaseElement} parent parent 
     * @returns {LeisElementID} 
     */
    function addNewInput(lbl, value, parent, option, trns) {
        if (!option) option = {};
        const l = obj$1.bindFunc(addInput, this);
        return l(lbl, value, this.type, this.radioName, parent, option.attr, trns)
    }

    /**
     * 
     * @param {"active"|"disable"} event the event  
     * @param {Function} callback callback
     * @param {LeisElementID} ID the `input` Id 
     */
    function inputOnce(ID, event, callback) {
        if (event === "active") { ID.leisBtnConfId.input.addData.event.active.push(callback); }
        if (event === "disable") { ID.leisBtnConfId.input.addData.event.disable.push(callback); }
    }
    /**
     * leistrap `Radio` componenet
     * @param {BaseElement} parent 
     * 
     */
    function BtnRadio(parent) {
        const main = leistrap.Div({ addData: { inputs: [] }, parent });
        const radioName = generateId$1(2, 9);
        leis$1.addClassList(main, "leis-card-radioBtns-container");
        const methods = setMTD();
        methods.type = "radio";
        methods.className = "leis-radioBtns-card";
        methods.inputClassName = "leis-radioBtn";
        methods.radioName = radioName;
        methods.main = main;
        methods.render = function () { return main.render() };
        return methods
    }

    // checkbox component

    /***
    * lestrap `CheckBox` component 
    */
    function checkBox(parent) {
        const main = leistrap.Div({ addData: { inputs: [] }, parent });
        leis$1.addClassList(main, "leis-card-checkboxBtns-container");
        const methods = setMTD();
        methods.type = "checkbox";
        methods.className = "leis-checkboxBtns-card";
        methods.inputClassName = "leis-checkboxtBtn";
        methods.main = main;
        methods.render = function () { return main.render() };
        return methods
    }

    // switch

    function switchBox(parent) {
        const main = leistrap.Div({ addData: { inputs: [] }, parent });
        leis$1.addClassList(main, "leis-card-switchboxBtns-container");
        const methods = setMTD();
        methods.type = "checkbox";
        methods.className = "leis-switchboxBtns-card";
        methods.inputClassName = "leis-switchboxtBtn";
        methods.main = main;
        methods.render = function () { return main.render() };
        return methods
    }
    // textbox

    function txtInputs(parent, m, type, ic, clN, ipCl) {
        const main = leistrap.Div({ addData: { inputs: [] }, parent });
        leis$1.addClassList(main, m);
        const methods = setTMINP();
        methods.type = type;
        methods.ic = ic;
        methods.className = clN;
        methods.inputClassName = ipCl;
        methods.main = main;
        methods.render = function () { return main.render() };
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
    function initTxtInput(type) {
        return [
            "leis-textboxinput-container",
            type,
            "leis-textbox-container",
            "leis-textbox-card",
            "leis-textinput"]
    }

    class Textarea extends BaseElement { }
    class Input extends BaseElement {
        #isComp = false
        /**
         * set the new value to the input
         * @param {string} val 
         */
        setValue(val) { this._conf.value = val; }
        /**
         * gets the input value
         */
        getValue() { return this._conf.value }
        /**
         * 
         * leistrap `Radio Buttons` component
         */
        getRadio() {
            if (!this.#isComp) {
                this.#isComp = true; this.destroy();
            } return BtnRadio(this.parent)
        }
        /**
         * 
         * leistrap `CheckBox Buttons` component
         */
        getCheckBox() {
            if (!this.#isComp) {
                this.#isComp = true; this.destroy();
            } return checkBox(this.parent)
        }
        /**
         * leistrap `TextBox` component
         */
        getTextBox() {
            if (!this.#isComp) {
                this.#isComp = true; this.destroy();
            } return textBox(this.parent)
        }
        /**
         * leistrap `Switch box` component
         */
        getSwitchBox() {
            if (!this.#isComp) {
                this.#isComp = true; this.destroy();
            } return switchBox(this.parent)
        }
        /**
         * leistrap password widget
         */
        getPassWordBox() {
            if (!this.#isComp) {
                this.#isComp = true;
                this.destroy();
            } return passWordBox(this.parent)
        }
        /**
         * leistrap password widget
         */
        getEmailBox() {
            if (!this.#isComp) {
                this.#isComp = true; this.destroy();
            } return emailBox(this.parent)
        }
    }

    // leisTable component
    /**
     * leistrap `TableCell` component definition
     */
    class TableCell {
        #props = { rowspan: 1, colspan: 1 }
        constructor(element, column) {
            this.cell = element;
            this.column = column;
        }
        /**
         * add content
         * @param {BaseElement} element 
         */
        add(element) { this.cell.add(element); }
        remove(element) { this.cell.remove(element); }
        removeAll() { this.cell.removeAll(); }
        addAttr(name, value) { this.cell.addAttr(name, value); }
        addClass(value) { this.cell.addClass(value); }
        addEvent(event, callback, option) { this.cell.addEvent(event, callback, option); }
        removeClass(token) { this.cell.removeClass(token); }
        toggleClass(value) { this.cell.toggleClass(value); }
        getText() { return this.cell.getText() }
        setText(value) { this.cell.setText(value); }
        destroy() { this.cell.destroy(); }

        spanCol(num) {
            this.cell.spanCol(num);
            tableOpera.adaptTableCol(this.cell, this.cell.lsParent, this, num);
            this.#props.colspan = num;
            return this
        }
        setStyle(cssValues) { this.cell.setStyle(cssValues); return this }

        spanRow(num) {
            const r = () => tableOpera.spanRow(this.cell, num);
            const _rem = w => { w.destroy(); };
            const pos = leis$1.getElementPosition(this.cell, this.column.column);
            let [items, _c] = [[], 1];

            this.column.column.forEach((item, i) => {
                if (i > pos) { _c++; obj$1.arrAddWhen(items, item, _c, num); }
            });

            items.forEach(data => {
                let posi = leis$1.getElementPosition(data, data.lsParent.content);
                data.lsParent.content.forEach((cell, i) => {
                    if (i >= posi) { obj$1.arrAddWhen(false, cell, i, this.#props.colspan, _rem); }
                });
            });
            obj$1.isEmpty(items) ? leis$1.addPW(true, this.cell, () => {
                obj$1.after(200, () => { this.spanRow(num); });
            }, this.cell.getPropWait()) : r();
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
            this.spanRow(row);
        }
    }

    /**
     * leistrp `ColumunTable` component definition
     */
    class ColumnTable {
        #heading
        #table
        constructor(column, heading, table) {
            this.column = column;
            this.#heading = heading;
            this.#table = table;
        }
        /**
         * update widget style
         * @param {string} cssValues css style 
         */
        setStyle(cssValues) { tableOpera.forEachCol(this.column, (item) => { item.setStyle(cssValues); }); }
        /**
         * adds className for Each column element
         * @param {string} name className 
         */
        addClass(name) { tableOpera.forEachCol(this.column, (item => { item.addClass(name); })); }
        /**
         * removes `token className` for Each column element
         * @param {string} token className 
         */
        removeClass(token) { tableOpera.forEachCol(this.column, (item => { item.removeClass(token); })); }
        toggleClass(name) { tableOpera.forEachCol(this.column, (item => { item.toggleClass(name); })); }
        getAttr(name) { tableOpera.forEachCol(this.column, (item => { item.getAttr(name); })); }
        setText(value) { tableOpera.forEachCol(this.column, (item => { item.setText(value); })); }
        /**
         * removes the current column
         */
        drop() {
            tableOpera.dropColumn(this.column, this.#heading);
            this.#table.columnCount -= 1; console.log(this.#table.columnCount);
        }
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
            this.parent = parent;
            this.MainT = leistrap.Card({ parent });
            this.point = this.MainT;
            this.#table = !NT ? leistrap.Table({ parent: this.MainT }) : leistrap.Div({ parent: this.MainT });
            this.#isInit = false;
            leis$1.addClassList(this.MainT, !NT ? "leis-table-container" : NT.cdCls);
            leis$1.addClassList(this.#table, !NT ? "leis-table" : NT.tablCls);

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

                };
            }
            if (this.#isInit) { throw new Error("tabel is already created") }
            if (!this.#isInit) {
                const dfv = [];
                this.rowCount = rows;
                this.columnCount = cols;
                const setCells = (num, i) => leistrap.inRange(num, 0, col => {
                    const df = leistrap.P({ text: `data ${col + 1} x ${i + 1}` });
                    dfv.push(df);
                    const d = option.cell.elem({ content: [df] });
                    leis$1.addClassList(d, option.cell.cls); leis$1.addClassList(df, "leis-table-defaultValue");
                    return d
                });
                const contHeader = leistrap.inRange(cols, 0, col => {
                    const df_ = leistrap.P({ text: `heading ${col + 1}` }); dfv.push(df_);
                    const t = option.heading.elem({ content: [df_] }); leis$1.addClassList(t, option.heading.cls);
                    leis$1.addClassList(df_, "leis-table-defaultValue"); return t
                });
                const rowsCount = leistrap.inRange(rows, 0, col => {
                    const tr = option.row.elem({ content: setCells(cols, col) });
                    leis$1.addClassList(tr, option.row.cls); return tr
                });

                const header = option.header.elem({ parent: this.#table, content: contHeader });
                const bodyTable = option.body.elem({ parent: this.#table, content: rowsCount });
                this.#Tcontent = bodyTable;
                this.#prop = { header, bodyTable, count: 0 };
                leis$1.addClassList(header, option.header.cls);
                leis$1.addClassList(bodyTable, option.body.cls);
                this.clear = function () { obj$1.tryCode(() => { dfv.forEach(itm => itm.destroy()); }); };

                this.addRow = function (num, data) {
                    if (leis$1.hasConf(this.#table)) {
                        const r = leistrap.inRange(num, 0, col => {
                            const tr = option.row.elem({ content: setCells(cols, col + this.rowCount) });
                            leis$1.addClassList(tr, option.row.cls); return tr
                        });
                        this.#Tcontent.addElements(...r);
                        if (data) { this.insertData(data, this.rowCount + 1); this.rowCount += num; }
                    } else { leis$1.addPW(true, this.#table, () => { this.addRow(num, data); }, this.#table.getPropWait()); }

                };
                this.#isInit = true;
            }
        }
        /**
         * inserts data 
         */
        insertData(data, rowCount) {
            tableOpera.insertData(data, this.#Tcontent, this.#prop, rowCount);
        }
        /**
         * get a table cell
         * @param {number} column column number
         * @param {number} row  row number
         * @returns {TableCell}
         */
        getCell(column, row) {
            return new TableCell(
                tableOpera.getCell(
                    this.#Tcontent,
                    column,
                    row),
                this.getColumn(column))
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
        setHeading(headingList) {
            tableOpera.setHeading(this.#prop.header, headingList);
            this.#prop.headingList = headingList;
        }
        update(row, data) {
            if (data) {
                data.forEach((d, i) => {
                    if (d.text) {
                        const l = this.getCell(i + 1, row);
                        l.setText(d.text);
                    }
                    if (d.widget) {
                        const l = this.getCell(i + 1, row);
                        l.removeAll();
                        l.add(d.widget);
                    }
                });
            }
        }
        setSize(width, height) {
            if (width) {
                this.MainT.setStyleProp("width", width);
            }
            if (height) {
                this.MainT.setStyleProp("height", height);
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
        addClass(name) { if (name) { this.#table.addClass(name); } }
    }

    /**
    * leistrap.Table `Element` | `Component` definition
    */
    class Table extends BaseElement {
        getTable() { return LeisTable }
    }
    class Thead extends BaseElement { }
    class Th extends BaseElement { }
    class Tr extends BaseElement { }
    class Tbody extends BaseElement { }
    /**
    * leistrap.Td element definition
    */
    class Td extends BaseElement {
        spanCol(num) { tableOpera.spanCol(this, num); }
        spanRow(num) { tableOpera.spanRow(this, num); }
    }
    class Tfoot extends BaseElement { }

    class Heading extends BaseElement { }

    class Style extends BaseElement { }

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

            this.parent = parent;
            this.link = link || [];
            this.content = content || [];
            this.attr = attr;
            this.contentClass = contentClass;
            this.useContentParent = useContentParent;
            this.concatLink = concatLink;
            this.#setTab();

        }
        #setTab() {
            let __spc__ = 32;
            const [...cpy] = this.link;
            if (typeof this.content === "object" && typeof this.content.push === "function") {
                this.concatLink ? this.link = this.link.concat(this.concatLink) : undefined;
                const _ei = generateId$1(1, 4);
                const __iConfig = generateId$1(1, 4);
                const __items = this.content;
                const __links = this.link;

                this.props = { _ei, __iConfig, widgtes: { __items, __links } };

                this.content.forEach((content, index) => {
                    let _id = generateId$1(1, 5);
                    if (typeof this.link[index] !== "undefined") {
                        checkLinkN(this.#prop, this.link[index]);
                        content.attr ? content.attr.className ? content.attr.className += `${String.fromCharCode(__spc__)}leis-tab-content${String.fromCharCode(__spc__)}${__iConfig}` : content.attr.className = `leis-tab-content${String.fromCharCode(__spc__)}${__iConfig}` : content.attr.className = `leis-tab-content${String.fromCharCode(__spc__)}${__iConfig}`;
                        content.attr ? content.attr.id ? content.attr.id = _id : content.attr.id = _id : content.attr.id = _id;
                        this.link[index].attr ? this.link[index].attr.className ? this.link[index].attr.className += `${String.fromCharCode(__spc__)}leis-tabs-btn${String.fromCharCode(__spc__)}${_ei}Btn ` : this.link[index].attr.className = `leis-tabs-btn${String.fromCharCode(__spc__)}${_ei}Btn ` : this.link[index].attr.className = `leis-tabs-btn${String.fromCharCode(__spc__)}${_ei}Btn `;
                        this.link[index].leisDataTab = { "name": "data-leis-tab", "value": `${_id} ${__iConfig} ${_ei}Btn` };

                        /*
                        get link name for getting  the id if we want to remove the link
                        and its content.
                        if there is no linkName we generate a Random LinkName.
                         */
                        if (!this.link[index].linkName) { this.link[index].linkName = generateId$1(2, 10); }
                        /*
                        save the link and its content to the pri pro
                         */
                        this.#prop[this.link[index].linkName] = { "link": this.link[index], "content": content };

                        /*
                        config the link to its content, if we want to get immediately the content link, just we
                        invoke link `assContent` property. vice versa to its content.  
                         */
                        this.link[index].assContent = content;
                        content.assLink = this.link[index];

                        /*
                            config the event of link  if a user clicks on a current link will show the current 
                            link content
                         */
                        this.link[index].eventType = "click";
                        this.link[index].eventOnce = function () {
                            __items.forEach(data => { checkPoint(data, it => { it.hide(); it.removeClass("active"); }); });
                            __links.forEach(data => data.removeClass("active"));
                            checkPoint(content, c => { c.addClass("active"); c.show(); });
                            __links[index].addClass("active");
                        };
                    }
                    /*
                      a link must have a content if there is no content  an error will be thrown 
                     */
                    else { throw new Error("miss a tabLink or tabContent, verify if you used array") }
                });
            }
            else { throw new Error("can only read a type of array") }

            const _parent_ = leistrap.Card({
                attr: { className: "leis-maintab" },
                parent: this.parent
            });

            const _tabBtn = leistrap.Card({
                attr: { className: `leis-tabs-card ${this.attr ? this.attr.className ? this.attr.className.join(' ') : "" : ""}` },
                parent: _parent_,
                content: cpy,
            });

            const _tabContent_ = leistrap.Card({
                attr: { className: `leis-mainContentTab ${this.contentClass ? this.contentClass.join(" ") : ""}` },
                parent: this.useContentParent ? this.useContentParent : _parent_,
                content: this.content
            });

            /**
             * the mainTab contains all children like `tabLinks`, `tabContents` and lot more
             */
            this.mainTab = _parent_;
            this.point = _parent_;
            this.__links__ = _tabBtn;
            this.__contents__ = _tabContent_;
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
            checkLinkN(this.#prop, link);
            tabContent.attr ? tabContent.attr.className ? tabContent.attr.className += `${String.fromCharCode(__spc__)}leis-tab-content${String.fromCharCode(__spc__)}${this.props.__iConfig}` : tabContent.attr.className = `leis-tab-content${String.fromCharCode(__spc__)}${this.props.__iConfig}` : tabContent.attr.className = `leis-tab-content${String.fromCharCode(__spc__)}${this.props.__iConfig}`;
            const _idf = generateId$1(1, 5);
            tabContent.attr ? tabContent.attr.id ? tabContent.attr.id = _idf : tabContent.attr.id = _idf : tabContent.attr.id = _idf;
            link.attr ? link.attr.className ? link.attr.className += `${String.fromCharCode(__spc__)}leis-tabs-btn${String.fromCharCode(__spc__)}${this.props._ei}Btn ` : link.attr.className = `leis-tabs-btn${String.fromCharCode(__spc__)}${this.props._ei}Btn ` : link.attr.className = `leis-tabs-btn${String.fromCharCode(__spc__)}${this.props._ei}Btn `;
            link.leisDataTab = { "name": "data-leis-tab", "value": `${_idf} ${this.props.__iConfig} ${this.props._ei}Btn` };

            /*
            get link name for getting  the id if we want to remove the link
            and its content.
            if there is no linkName we generate a Random LinkName.
            */

            if (!link.linkName) { link.linkName = generateId$1(2, 4); }
            /*
            save the link and its content to the pri pro
             */
            this.#prop[link.linkName] = { "link": link, "content": tabContent };

            /*
            config the link to its content, if we want to get immediately the content link, just we
            invoke link `assContent` property. vice versa to its content.  
            */

            link.assContent = tabContent;
            tabContent.assLink = link;

            /*
            config the event of link  if a user clicks on a current link will show the current 
            link content
             */


            const o = this.props.widgtes;
            link.addEvent("click", function (e) {
                if (stp) { e.stopPropagation(); }
                o.__items.forEach(data => { data.hide(); data.removeClass("active"); });
                o.__links.forEach(data => data.removeClass("active"));

                tabContent.addClass("active");
                tabContent.show();
                link.addClass("active");
            });
            /*
                verify if  exeternal link is used
            */
            if (!externalLink) { this.__links__.add(link); }
            this.__contents__.add(tabContent);
            this.content.push(tabContent);
            this.link.push(link);
        }
        /**
         * removes the link with its content
         * @param {string} linkName link name 
         */
        removeLink(linkName) {
            if (leis$1.hasConf(this.point)) {
                if (linkName && obj$1.has(linkName, this.#prop)) {
                    const l = this.#prop[linkName];
                    l.link.lsParent.remove(l.link);
                    l.content.lsParent.remove(l.content);
                    const n = {};
                    obj$1.copyObject(this.#prop, n, false, linkName);
                    this.#prop = n;
                }
            } else {
                leis$1.addPW(true, this.point, () => {
                    this.removeLink(linkName);
                }, this.point.getPropWait());
            }
        }

        /**
         * move the link to another element
         * @param {string} linkName link name 
         * @param {BaseElement} element element 
         */
        moveLinkTo(linkName, element) {
            if (leis$1.hasConf(this.point)) {
                if (obj$1.isTypeOf(element, BaseElement) && obj$1.has(linkName, this.#prop)) {
                    const l = this.#prop[linkName];
                    l.link.lsParent.remove(l.link);
                    element.add(l.link);
                }
                else { throw new Error("can only use the BaseElement or linkName not found") }
            }
            else {
                leis$1.addPW(true, this.point, () => {
                    this.moveLinkTo(linkName, element);
                }, this.point.getPropWait());
            }
        }
        /**
         * adds className to the all links
         * @param {string} value className to be added  
         */
        addBtnClass(value) {
            if (leis$1.hasConf(this.point) && value) {
                this.link.forEach(item => {
                    if (item.state !== "removed") { item.addClass(value); }
                });
            }
            else {
                leis$1.addPW(true, this.point, () => {
                    this.addBtnClass(value);
                }, this.point.getPropWait());
            }
        }
        destroy() {
            if (leis$1.hasConf(this.point)) {
                obj$1.loopObj(this.#prop, (v, k) => {
                    v.link.destroy(); v.content.destroy();
                });
                this.point.destroy();
            }
            else {
                leis$1.addPW(true, this.point, () => {
                    this.destroy();
                }, this.point.getPropWait());
            }
        }
        invoke(linkName, ckP = true) {
            if (leis$1.hasConf(this.point) || !ckP) {

                if (linkName && obj$1.has(linkName, this.#prop)) {
                    this.#prop[linkName].link.getAttr("click");
                }
            } else {
                leis$1.addPW(true, this.point, () => {
                    this.invoke(linkName);
                }, this.point.getPropWait());
            }

        }

    }

    class PageButton {
        #button
        #state = { active: false, disable: false }
        constructor(option) {
            this.#button = this.#setBtn(option);
            this.contentPage = option.contentPage;
            this.pageName = option.pageName ? option.pageName : `Rand_${generateId$1(2, 5)}`;
            Object.defineProperty(this, 'button', { value: this.#button });
        }
        /**
         * text if button has any content
         * @param {*} btn 
         */
        hasContent(option) {
            return !(!option.content)
                && (option.content ? !obj$1.isEmpty(option.content) :
                    !(!option.content))
        }

        #setBtn(option) {
            const o = obj$1.copyObject(option, false, false, "parent");
            const cnt = leistrap.Div(o);
            const elem = leistrap.Div({ content: [cnt], parent: option.parent });
            leis$1.addClassList(elem, "leis-page-legende");
            elem.btnPage = this;
            return elem
        }
        config(option) {
            this.#setConfig(option);
            this.active();
            return this.#button
        }
        active() { if (!this.#state.active) { this.#setActive(); } }
        disable() { if (this.#state.active) { this.#setDisable(); } }

        #setActive() {
            this.#button.addEvent("click", function (e) {
                if (!this.pageConfig.parentPage) {
                    this.pageConfig.parentPage = this.lsParent.accessPage.p;
                }
                if (this.pageConfig.parentPage.history) {
                    this.pageConfig.parentPage.history.push(this.pageConfig.contentPage);
                    this.pageConfig.parentPage.content.forEach(item => { item.hide(); });
                    this.pageConfig.contentPage.show();
                    this.pageConfig.parentPage.page.currentPage = this.pageConfig.contentPage;
                    if (!this.lsParent.accessPage) {
                        this.lsParent.accessPage = this.pageConfig.contentPage.accessPage;
                    }
                    this.lsParent.accessPage._controler.show();
                }
            }, "pageButtonActive");
            this.#state.active = true;
        }
        #setDisable() {
            this.#button.removeEvent("click", "pageButtonActive");
            this.#state.active = false;
        }

        #setConfig(option) {
            this.#button.pageConfig = option;
            option.parentPage.add(option.contentPage);
            option.contentPage.accessPage = option.parentPage.accessPage;

            if (obj$1.isArray(option.contentPage.attr.className)) {
                option.contentPage.attr.className.push("leis-page-content");
            }
            else { option.contentPage.attr.className += " leis-page-content "; }
            if (leis$1.hasConf(option.contentPage)) {
                option.contentPage.addClass("leis-page-content");
            }
        }
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
             * the legend or `icon`
             */
            legend,
            content,

        ) {

            this.parent = parent;
            this.legend = legend ? legend : [];
            this.content = content ? content : [];
            this.point = this.#setPage();
            this.currentPage = "main";

        }
        removePage(pageName) {
            if (leis$1.hasConf(this.point) && pageName) {
                checkPageName(this.#prop, pageName, true);
                const button = this.#prop[pageName].button;
                const content = this.#prop[pageName].content;
                button.lsParent.remove(button);
                content.lsParent.remove(content);
                this.#prop = obj$1.copyObject(this.#prop, false, false, pageName);
            }
            else {
                leis$1.addPW(true, this.point, () => {
                    this.removePage(pageName);
                }, this.point.getPropWait());
            }
        }

        invoke(pageName) {
            if (leis$1.hasConf(this.point) && pageName) {
                checkPageName(this.#prop, pageName, true);
                this.#prop[pageName].button.getAttr("click");

            }
            else {
                leis$1.addPW(true, this.point, () => {
                    this.removePage(pageName);
                }, this.point.getPropWait());
            }
        }
        #setPage() {
            const props = this.#prop;
            const page = this;
            const _mainPage_ = leistrap.Card({
                attr: { className: "leis-mainPage" },
                parent: this.parent
            });

            const _controler = leistrap.Button({
                attr: { className: `leis-btn-controler hide ` },
                eventType: "click",
                parent: _mainPage_,
                eventOnce: function () {
                    this.lsParent.content.forEach(itm => itm.hide());
                    let contentPage = {};
                    let contentHistory = [];
                    this.lsParent.history.forEach(item => {
                        if (item.leisBtnConfId in contentPage === false) {
                            contentHistory.push(item);
                            contentPage[item.leisBtnConfId] = item;
                        }
                    });

                    if (contentHistory.length <= 1) {
                        this.hide();
                        this.lsParent.history = [this.lsParent.history[0]];
                        contentPage = {};
                        page.currentPage = "main";
                    } else { this.show(); contentHistory.pop(); }

                    this.lsParent.history = contentHistory;

                    var currentContent = contentHistory[contentHistory.length - 1];
                    currentContent.show();
                    page.currentPage = currentContent;
                    if (contentHistory.length == 1) { this.hide(); page.currentPage = "main"; }
                }
            });

            leisData.PageControler = _controler;
            const _first = leistrap.Card({ content: this.content });

            const _cnt_ = leistrap.Card({
                attr: { className: ["contentP-Default", "noBP"] },
                content: [_first].concat(this.legend),
                parent: _mainPage_
            });

            _cnt_.accessPage = { p: _mainPage_, _controler };
            this.mainPage = _mainPage_;
            this.home = _first;
            _mainPage_.accessPage = { p: _mainPage_, _controler };
            _mainPage_.history = [_cnt_];
            _mainPage_.page = this;

            if (typeof this.legend === "object" && typeof this.legend.push === "function") {
                this.legend.forEach(item => { setBtn(item, this); });
            }
            else { throw new Error("the ledende property needs only the array, verify if you used an array object") }

            function setBtn(item, o, parent) {
                if (obj$1.isTypeOf(item, PageButton)) {

                    checkPageName(props, item);
                    const elem = item.config({
                        access: "true",
                        parentPage: _mainPage_,
                        contentPage: item.contentPage
                    });
                    props[item.pageName] = { "button": elem, "content": item.contentPage };
                    if (elem.parent === BaseElement && (!parent && !item.noP)) { o.home.add(elem); }
                    if (obj$1.isTypeOf(parent, BaseElement)) {
                        parent.add(elem);
                    }
                }

                else {
                    item.pageConfig.contentPage.accessPage = { p: _mainPage_, _controler };
                    _mainPage_.add(item.pageConfig.contentPage);

                    item.pageConfig.contentPage.attr.className += `${String.fromCharCode(__spc__)}leis-page-content${String.fromCharCode(__spc__)}`;
                }
            }
            this.addButton = (element, parent) => { setBtn(element, this, parent); };
            this.define = function (name, content) {
                if (name && content) {
                    checkPageName(this.#prop, name, false);
                    const elem = new PageButton({ otherAttr: { type: "hidden" } });
                    const e = elem.config({
                        access: "true",
                        parentPage: _mainPage_,
                        contentPage: content
                    });
                    this.home.add(e);
                    props[name] = {
                        "button": e,
                        "content": leistrap.Div({ content: [content] }),
                        hidden: true
                    };
                }
            };
            return _mainPage_
        }
    }

    /**
    * leistrap.Accordion component definition
    */

    class Accordion {

        /**
         * @param {BaseElement[]} AccBtn  the widget that will be displayed
         * @param {BaseElement[]} AccPanel this content to be be shown when 
         * the user clicks on the `AccBtn`
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
            this.parent = parent;
            this.accHeader = header;
            this.accFooter = footer;
            this.props = props;
            this.point = this.#setAcc();
        }

        #setAcc() {

            const MainAcc = leistrap.Card({
                attr: {
                    className: ["leis-accordion-card"].concat(this.props ?
                        this.props.className ? this.props.className : [] : [])
                },
                parent: this.parent,
                otherAttr: this.props ? this.props.otherAttr ?
                    this.props.otherAttr : undefined : undefined

            });

            if (typeof this.accHeader !== "undefined") {
                this.accHeader.attr ? this.accHeader.attr.className ?
                    this.accHeader.attr.className += " leis-accordion-head " :
                    this.accHeader.attr.className = ["leis-accordion-head"] :
                    this.accHeader.attr = { className: ["leis-accordion-head"] };
                MainAcc.content.push(this.accHeader);
            }
            if (typeof this.AccBtn === "object" && typeof this.AccBtn.push === "function") {

                this.AccBtn.forEach((item, i) => {
                    item.attr ? item.attr.className ? item.attr.className += ` leis-accordion-btn ` :
                        item.attr.className = " leis-accordion-btn " :
                        item.attr.className = " leis-accordion-btn ";

                    if (typeof this.AccPanel[i] !== "undefined") {
                        this.AccPanel[i].attr ? this.AccPanel[i].attr.className ?
                            this.AccPanel[i].attr.className += ` leis-accordion-panel ` :
                            this.AccPanel[i].attr.className = " leis-accordion-panel " :
                            this.AccPanel[i].attr.className = "leis-accordion-panel";
                        item.eventType = "click";
                        const _i = this.AccPanel[i];
                        item.eventOnce = function () {
                            _i.toggleClass("active");
                            item.toggleClass("active");
                        };
                        MainAcc.content.push(item);
                        MainAcc.content.push(this.AccPanel[i]);
                    }
                    else { throw new Error("missing a pannel widget") }
                });
            }
            else { throw new Error("the Accordion widget needs only the array, verify if you used an array object") }
            if (typeof this.accFooter !== "undefined") {
                this.accFooter.attr ? this.accFooter.attr.className ?
                    this.accFooter.attr.className += " leis-accordion-footer " :
                    this.accFooter.attr.className = ["leis-accordion-footer"] :
                    this.accFooter.attr = { className: ["leis-accordion-footer"] };
                MainAcc.content.push(this.accFooter);
            }
            this.MainAcc = MainAcc;
            return MainAcc
        }

        /**
         * appends the news elements in the widget
         * @param {BaseElement} accbtn thes button to be showen
         * @param {BaseElement} accpanel the content to be showen when 
         * the user clicks in the `accpanel`button  
         */
        addItem(accbtn, accpanel) {
            this.MainAcc.content.push(accbtn);
            accbtn.attr ? accbtn.attr.className ?
                accbtn.attr.className += ` leis-accordion-btn ` :
                accbtn.attr.className = " leis-accordion-btn " :
                accbtn.attr.className = " leis-accordion-btn ";
            this.MainAcc.content.push(accpanel);
            accpanel.attr ? accpanel.attr.className ?
                accpanel.attr.className += ` leis-accordion-panel `
                : accpanel.attr.className = " leis-accordion-panel " :
                accpanel.attr.className = "leis-accordion-panel";
            accbtn.eventType = "click";
            accbtn.eventOnce = function () {
                accpanel.toggleClass("active");
                accbtn.toggleClass("active");
            };
            this.MainAcc.CASCADE();
        }
        destroy() { this.point.destroy(); }
        addClass(name) { this.MainAcc.addClass(name); }
        remove(element) { this.MainAcc.remove(element); }
        removeAll() { this.MainAcc.removeAll(); }
        setStyle(cssValues) { this.MainAcc.setStyle(cssValues); }
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
            this.items = item;
            /**
             * the items to be grouped, this required only `Li` widget
             */
            this.parent = parent;
            /**
             * attributes
             */
            this.attr = attr;
            this.header = header;
            this.checked = null;
            this.#setG();
        }

        /**
         * add a new element
         * @param {Li} item `Li` element
         */
        addItem(item) {
            leis$1.addClassList(item, 'leis-child-group');
            this.MainG.addItem(item);
        }
        removeAll() { this.MainG.removeAll(); }
        #setG() {
            const _cd = leistrap.Card({
                parent: this.parent,
                attr: { className: ["leis-group"] }
            });

            const MainG = leistrap.List({
                attr: {
                    className: ["leis-list-group"].concat(
                        this.attr ? this.attr.className ? this.attr.className : [] : [])
                },
                parent: _cd
            });

            if (typeof this.header !== "undefined") {
                this.header.attr ? this.header.attr.className ?
                    this.header.attr.className += ` leis-child-group leis-group-head ` :
                    this.header.attr.className = " leis-child-group leis-group-head " :
                    this.header.attr.className = "leis-child-group leis-group-head";
                MainG.content.push(this.header);
            }

            if (typeof this.items !== "undefined"
                && typeof this.items.push === "function") {
                this.items.forEach(item => {
                    if (item.ElementType.toLowerCase() === "li") {
                        item.attr ? item.attr.className ?
                            item.attr.className += ` leis-child-group ` :
                            item.attr.className = " leis-child-group " :
                            item.attr.className = "leis-child-group";
                        MainG.content.push(item);
                    }
                });
            }
            this.point = _cd;
            this.MainG = MainG;
        }
    }

    /**
         * rule widget
         * @param {string} type
         * 
         */
    function setWidget(type, element = BaseElement, elem) {
        let __none__ = "";
        let __spc__ = 32;
        /**
         * @param {options} option options
         */
        return function (option) {
            option = option ? option : {};

            if (option.eventOnce != undefined) {

                const _RD = option.eventOnce;
                function defaultListener(target) {
                    _RD.call(this.currentElement, target);
                }
                option.eventOnce = defaultListener;
                if (option.listener) { defaultListener.prototype["name"] = option.listener; }
            }


            const _bx = new element(option);

            _bx.ElementType = type;

            const op = {
                label: () => _bx.lblFor = option.lblFor ? option.lblFor : __none__,
                button: () => {
                    _bx.className += `${String.fromCharCode(__spc__)}btn${String.fromCharCode(__spc__)}`;
                    _bx.otherAttr.type = "button";
                },
                img: () => {
                    _bx.src = option.src ? option.src : __none__;
                    _bx.alt = option.alt ? option.alt : __none__;
                }
            };

            let e = op[elem.toLowerCase()];
            globalProp.forEach(item => {
                _bx[item] = option[item] ? option[item] : __none__;
            });
            if (e) e();
            // check the option set via an extension
            OptionsInit.forEach(ext => ext(option, _bx));
            return _bx
        }
    }

    /**
    * leistrap `SlideDown` / `carousel` component
    */
    class SlideDown {
        #privPro = {}
        /**
         * @param {BaseElement} parent the widget parent
         * @param {[{src :string, caption:string}]} listImg   
         * the object list of image path and caption  
         */
        constructor(parent, listImg, width, height, maxHeight, minHeight) {
            this.parent = parent;
            this.listImg = listImg;
            this.width = width;
            this.height = height;
            this.maxHeight = maxHeight;
            this.minHeight = minHeight;
            this.point = this.#setS();
        }

        #setImg(listImg, MainS, dotCard, imgId, counter, stp = 0) {
            const ip = this;
            listImg.forEach((item, index) => {
                index += stp;
                let fade = leistrap.Card({ parent: MainS });
                let c0 = leistrap.Card({
                    content: [
                        leistrap.Img({
                            otherAttr: {
                                src: item.src ? item.src : "",
                                style: `${this.minHeight ? `min-height:${this.minHeight}px` : "auto"}`
                            }
                        }),
                        leistrap.Card({ attr: { className: ["leis-slideshowNumTxt"] } }),
                    ],
                    attr: { className: ["leis-img-card", imgId, "fade"] },
                    parent: fade
                });

                MainS.addData.push(leistrap.Card({
                    text: item.caption ? item.caption : "",
                    attr: { className: ["leis-slideshow-txt"] },
                    parent: MainS,
                    otherAttr: { style: "display:none" }
                }));

                leistrap.Span({
                    attr: { className: ["leis-slideshow-dot"] },
                    addData: { img: c0 },
                    parent: dotCard,
                    eventType: "click",
                    eventOnce: function () {
                        dotCard.content.forEach((item, index) => {
                            item.addData.img.hide(); item.removeClass("active");
                        });
                        this.addData.img.show();
                        this.addClass("active");
                        MainS.addData.forEach(i => i.hide());
                        MainS.addData[index].show();
                        this.addData.img.content[1].setText(`${index + 1}/${ip.listImg.length}`);
                    }
                });
            });
        }

        /**
         * add new imgs 
         * @param {[{src:BaseElement, caption:string}]} listImg 
         */

        addImg(listImg) {

            const len = this.listImg.length;
            this.listImg = this.listImg.concat(listImg);

            this.#setImg(
                listImg,
                this.#privPro.MainS,
                this.#privPro.dotCard,
                this.#privPro.imgId,
                this.#privPro.counter,
                len
            );
            this.#privPro.MainS.CASCADE();
            this.#privPro.dotCard.CASCADE();
        }
        #setS() {
            const imgId = generateId$1(3, 8);
            const __MainContent__ = leistrap.Card({ parent: this.parent });
            const MainS = leistrap.Card({
                attr: { className: ["leis-slideshow-container"] },
                parent: __MainContent__,
                otherAttr: {
                    style: `width:${this.width ? `${this.width}px` : "auto"};
                 height:${this.height ? `${this.height}px` : "auto"};
                 max-height:${this.maxHeight ? `${this.maxHeight}px` :
                            "auto"}`.replace(/\n/g, "")
                },
                addData: []
            });

            let counter = 0;
            leistrap.Span({
                autoClick: true,
                innerHtml: "&#10094",
                attr: { className: ["leis-slideshow-prev-btn"] },
                parent: MainS,
                eventType: "click",
                eventOnce: function () {
                    counter = counter == 0 ? dotCard.content.length - 1 : counter - 1;
                    dotCard.content[counter].getAttr("click");
                }
            });

            leistrap.Span({
                innerHtml: "&#10095",
                attr: { className: ["leis-slideshow-next-btn"] },
                parent: MainS,
                eventType: "click",
                eventOnce: function () {
                    counter = counter == dotCard.content.length - 1 ? 0 : counter + 1;
                    dotCard.content[counter].getAttr("click");
                }
            });

            const dotCard = leistrap.Card({
                otherAttr: { style: "text-align:center" },
                parent: __MainContent__
            });

            // inserting img to the main content and dotted buttons to  the dotted content

            this.listImg ? this.#setImg(this.listImg, MainS, dotCard, imgId, counter) : undefined;

            this.MainS = __MainContent__;
            this.#privPro.MainS = MainS;
            this.#privPro.imgId = imgId;
            this.#privPro.dotCard = dotCard;
            this.#privPro.imgId = imgId;
            this.#privPro.counter = counter;
            return __MainContent__
        }
    }

    /**
    * Leistrap `DropDown` component
    */

    class DropDown {

        /**
         * the caption widget that will contain the text 
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
        constructor(parent, caption,
            items, btnType,
            attr, useBtn,
            contentStopPropagation = false,
            btnClass) {
            this.parent = parent;
            this.caption = caption;
            this.items = items;
            this.btnType = btnType;
            this.attr = attr;
            this.useBtn = useBtn;
            this.contentStopPropagation = contentStopPropagation;
            this.btnClass = btnClass;
            this.point = this.#setD();
        }

        /**
         * 
         * @param {string} name caption name 
         */
        setCaption(name) { this.#CaptionDisplay.setText(name); }
        /**
         * 
         * @param {BaseElement} item the new Element 
         */
        addItem(item) {
            leistrap.Span({ content: [item], parent: this.#contentDC });
            this.#contentDC.CASCADE();
        }
        #setD() {
            this.#CaptionDisplay = leistrap.Span({ text: this.caption });

            const MainD = leistrap.Card({
                attr: {
                    className: ["leis-dropdown"].concat(this.attr ?
                        this.attr.className ? this.attr.className : [] : [])
                },
                parent: this.parent
            });
            let _useBtn;
            if (typeof this.useBtn !== "undefined") {
                _useBtn = leistrap.Card({
                    attr: {
                        className: ["leis-dropBtn"]
                            .concat(this.btnClass ? this.btnClass : [])
                    },
                    content: [this.useBtn],
                    eventType: "click",
                    eventOnce: function (e) {
                        e.stopPropagation();
                        leisData.lDropDown.forEach(dp => {
                            dp.Dcontent.removeClass("show");
                            dp.Btn.removeClass("activeD");
                        });
                        this.addClass("activeD");
                        Dcontent.addClass("show");
                    }
                });
            }
            const btnD = leistrap.Button({
                attr: {
                    className: ["leis-dropBtn leis-flex leis-row", "leis-dropBtn-"
                        + String(this.btnType ? this.btnType : "primary")]
                        .concat(this.btnClass ? this.btnClass : [])
                },
                eventType: "click",
                content: [
                    this.#CaptionDisplay,
                    leistrap.Span({ otherAttr: { "class": "leis-arrow-down as" } })],
                eventOnce: function (e) {
                    e.stopPropagation();
                    leisData.lDropDown.forEach(dp => {
                        dp.Dcontent.removeClass("show");
                        dp.Btn.removeClass("activeD");
                    });
                    this.addClass("activeD");
                    Dcontent.addClass("show");
                }
            });

            MainD.content.push(_useBtn ? _useBtn : btnD);
            const xD = leistrap.Card({
                attr: { className: ["leis-content"] },
                parent: MainD
            });

            const Dcontent = leistrap.Card({
                attr: {
                    className: [
                        "leis-dropdown-content",
                        "leis-padding-6", "leis-border-"
                        + String(this.btnType ? this.btnType : "primary")
                    ]
                },
                parent: xD,
            });
            const DC = leistrap.Card({
                attr: { className: ["leis-dropdwn-content-card"] },
                parent: Dcontent
            });

            this.#contentDC = DC;
            if (this.contentStopPropagation === true) {
                DC.addEvent("click", function (e) { e.stopPropagation(); });
            }
            if (typeof this.items !== "undefined" && typeof this.items.push === "function") {
                this.items.forEach(item => { DC.content.push(item); });
            }
            this.MainD = MainD;
            this.Dcontent = Dcontent;
            this.Btn = _useBtn ? _useBtn : btnD;
            this.setSize = function (w, h) {
                if (w) { Dcontent.setStyleProp("width", w); }
                if (h) { Dcontent.setStyleProp("height", h); }
            };
            this.addClass = function (name) { Dcontent.addClass(name); };
            this.setStyle = function (css) { Dcontent.setStyle(css); };

            return MainD
        }
        /**
         * hide the content
         */
        hideContent() { window.document.body.click(); }
        destroy() { this.point.destroy(); }
    }

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
         * @param {[{name:string, href:string}]} links the links to be displayed on the topNav 
         */
        constructor(parent, links, position, type, dropDowns) {
            this.parent = parent;
            this.links = links;
            this.type = type;
            this.#position = position;
            this.#dropDowns = dropDowns;
            this.point = this.#setTop();
        }

        #setTop() {
            const MainTop = leistrap.Card({
                parent: this.parent,
                attr: { className: ["leis-topnav", `${this.type ? this.type : ""}`] },
            });

            if (!obj$1.isUndifend(this.links)) {
                if (obj$1.isArray(this.links)) {
                    const o = this.links.map(item => leistrap.Li({
                        content: [leistrap.A({ otherAttr: { href: item.href }, text: item.name })]
                    }));
                    if (this.#dropDowns) { leis$1.topNaveDropDowns(leistrap, o, this.#dropDowns); }
                    MainTop.add(leistrap.GroupItem({ items: o }).MainG);
                }
            }
            return MainTop
        }
    }

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
            this.parent = parent;
            this.#header = header;
            this.#footer = footer;
            this.#items = items;
            this.collapsibles = collapsibles;
            this.point = this.#setSB();
        }

        #setSB() {
            const hd = leistrap.Card({ attr: { className: ["sideNavHeader"] } });
            const ft = leistrap.Card({ attr: { className: ["sideNavFooter"] } });
            const i = [];

            if (!obj$1.isUndifend(this.#items)) {
                let o = (_items) => {
                    var ot = [];
                    _items.forEach(item => {
                        let fl = leistrap.Li();
                        fl.addEvent("click", function () {
                            i.forEach(it => it.removeClass("sideItemActive"));
                            this.addClass("sideItemActive");
                            if (!obj$1.isUndifend(item.action)) { item.action.call(this, this); }
                        });

                        // let verify  if the icon is clicked
                        function ic(e) { if (item.onIcon) item.onIcon(e); }
                        // verifying if the icon is set 
                        item.icon ? fl.content.push(leistrap.I({ otherAttr: { "class": item.icon }, events: { click: ic } })) : undefined;
                        // put the textContent
                        item.caption ? fl.content.push(leistrap.Span({ text: item.caption })) : undefined;
                        // verifying if the widget is required
                        item.widget ? fl.content.push(item.widget) : undefined;
                        i.push(fl);
                        ot.push(fl);

                    });
                    return ot
                };
                obj$1.tryCode(() => { o(this.#items); });

                //create the method for adding news items into the sideBar
                this.addItems = function (_items) {
                    obj$1.tryCode(() => {
                        o(_items).forEach(item => GL.addItem(item));
                    });
                };

            }
            //insert all collapsible
            if (this.collapsibles) {
                leis$1.insertItemFlat(leistrap, i, this.collapsibles, "MainC", "colla-item");
            }

            const GL = leistrap.GroupItem({
                items: !obj$1.isEmpty(i) ? i : undefined,
                attr: { className: ["links"] }
            });

            const cont = [GL.MainG];
            if (!obj$1.isUndifend(this.#header)) { hd.add(this.#header); obj$1.arrayInsert(0, cont, hd); }
            if (!obj$1.isUndifend(this.#footer)) { ft.add(this.#footer); cont.push(ft); }
            const MainS = leistrap.Card({
                attr: { className: ["leis-sideNav"] },
                content: cont
            });
            this.setWidth = function (value) { if (value) { MainS.setStyleProp("width", value); } };
            this.addClass = function (name) { if (name) { MainS.addClass(name); } };
            this.MainS = MainS;
            Object.defineProperty(this, "allItems", { value: i });
            return MainS
        }
    }

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
            this.caption = caption;
            this.point = this.#setC();
        }
        #setC() {
            const MainC = leistrap.Card({
                attr: {
                    className: ["leis-collapsing-container"]
                },
                parent: this.parent
            });
            const collaBtn = leistrap.Button({
                text: this.caption,
                attr: { className: ["leis-collapse-btn"] },
                parent: MainC
            });
            collaBtn.addEvent("click", function () {
                colla.toggleClass("callo-show");
                this.toggleClass("colla-btn-show");
            });
            const colla = leistrap.Card({
                attr: { className: ["leis-collapsing"] },
                parent: MainC,
                content: this.content
            });
            this.MainC = MainC;
            return MainC
        }
    }

    function SearchBar(option) {
        option = option ? option : {};
        obj$1.isUndifend(option.option) ? option.option = {} : undefined;
        const s = leis$1.setSearchBar(leistrap, option);
        return option.option.autoComplate ? setSearch(s, option) : s
    }

    function setSearch(s, option) {
        const SB = {
            point: leistrap.Card({
                attr: { className: ["leis-autoComplate"] },
                content: [s, leis$1.setAutoComplation(
                    leistrap,
                    option.option.autoComplate,
                    s,
                    option.option.defaultValue,
                    option.option)]
            })
        };
        return SB
    }

    class Modal {
        #prop = initCard()
        constructor(parent) {
            this.parent = parent;
            this.point = this.#setModal();
            Object.defineProperty(this, "events", {
                writable: false, value: { close: [], active: [] }
            });
        }
        #setModal() {
            const _modal_ = leistrap.Div({ parent: this.parent });
            const dialog = leistrap.Div({ parent: _modal_ });

            const closeBtn = leistrap.CloseBtn({});
            closeBtn.addEvent("click", function () { closeModal(); });
            const content = leistrap.Div();
            const title = leistrap.H3({ text: "modal title" });

            //closebtn
            const c = leistrap.Button({ text: "Close" }).getButton();
            c.setType("secondary");
            this.closeBtn = c;
            // the saveBtn element
            const s = leistrap.Button({ text: "Save data" }).getButton();
            s.setType("primary");
            this.saveBtn = s;
            const card = leistrap.Div({ content: [c, s] });
            const p = leistrap.P({
                text: "Modal content goes here... add new content",
                tooltip: { postion: 'bottom', text: "text modal example" }
            });
            this.#prop.body.add(p);
            this.#prop.footer.add(card);
            this.#prop.header.add(title);
            this.#prop.header.add(closeBtn);
            content.add(this.#prop.header);
            content.add(this.#prop.body);
            content.add(this.#prop.footer);
            dialog.add(content);
            _modal_.addEvent("click", function (e) {
                if (e.target === this._conf) { closeModal(); }
            });

            leis$1.addClassList(_modal_, "leis-modal-container");
            leis$1.addClassList(dialog, "leis-modal-dialog modal-transform");
            leis$1.addClassList(content, "leis-modal-content");
            leis$1.addClassList(this.#prop.header, "leis-modal-header");
            leis$1.addClassList(this.#prop.body, "leis-modal-body");
            leis$1.addClassList(this.#prop.footer, "leis-modal-footer");
            leis$1.addClassList(title, "leis-modal-title");
            leis$1.addClassList(card, "leis-modal-footer-card");
            leis$1.addClassList(p, "leis-modal-dafault");

            this.#prop.content = content;
            this.#prop.title = title;
            this.#prop.container = _modal_;
            this.#prop.p = p;
            this._modal_ = _modal_;
            this.#prop.dialog = dialog;
            Object.defineProperty(this, "props", { value: this.#prop });
            //closing a modal
            var o = this;
            function closeModal() {
                var closed = { closable: true };
                o.events.close.forEach((item, index) => { item(closed); });
                if (closed.closable) _modal_.removeClass("show");
            }
            this.hide = closeModal;
            Object.defineProperty(this, "body", { writable: false, value: this.#prop.body });
            this.setEffect = function (name) { dialog.setStyleProp("animationName", `${name}`); };
            this.moveTo = function (x, y) {
                dialog.setStyleProp("top", `${(y * 100) / window.screen.availHeight}%`);
                dialog.setStyleProp("left", `${(x * 100) / window.screen.availWidth}%`);
                dialog.removeClass("modal-transform");
                _modal_.setStyleProp("background", "inherit");
                this.show();
            };
            return _modal_
        }

        setTitle(name) { this.#prop.title.setText(name); }
        show() {
            var active = { active: true };
            this.events.active.forEach((item, index) => { item(active); });
            if (active.active) this.#prop.container.addClass("show");
        }
        add(element) { this.#prop.body.add(element); }
        addElements(...element) { this.#prop.body.addElements(...element); }
        setSize(width, height) {
            if (width) { this.#prop.dialog.setStyleProp("width", width); } if (height) { this.#prop.dialog.setStyleProp("height", height); }
        }
        addClass(value) { if (value) { this.#prop.dialog.addClass(value); } }
        clearDefault() { this.#prop.p.destroy(); }
        clear() { this.#prop.p.destroy(); }
        destroy() { this.#prop.container.destroy(); }
        once(event, callback) {
            if (obj$1.has(event, this.events)) this.events[event].push(callback);
        }
        removeFooter() { this.#prop.footer.destroy(); }
        removeHeader() { this.#prop.header.destroy(); }

    }

    // todo 1 event : onPressMove 

    function PressMove(elem, option) {
        if (!option) option = {};
        if (!option.target) option.target = elem;
        var events = {
            "start": "mousemove",
            "end": "mouseup",
            "init": "mousedown"
        };
        // ini  the event 
        function _init_(o) {
            option.target.addEvent(events.init, function (e) {
                if (o.start) o.start(e);
                checkStarting(o);
                elem.addEvent(events.end, end, `end`);
            }, `init`);

        }

        // check  if the event is starting or not
        function checkStarting(o) {
            elem.addEvent(events.start,
                (e) => start(e, o), "start");
        }


        // start the event
        function start(e, o) {
            if (o.listener) o.listener(e);
        }

        // end the event
        function end(e) {
            if (option.end) option.end(e);
            elem.removeEvent(events.start, "start");
            elem.removeEvent(events.end, `end`);
        }
        // call the init function to init the PressMove event 
        // to the main object
        _init_(option);
    }

    // creation of the main object which will contain all
    // elements, component that we'll create and then displays
    // them in  the browser

    function __main__(ws, cf) {
        const _main = ws.Div();
        _main.otherAttr = { "class": "leis-main" };
        _main._conf = cf;
        // create a new _main object
        return new class Main {
            constructor() {
                const leisDOMBody = ws.Div();
                obj$1.after(200, () => {
                    leisDOMBody._conf = cf.document.body;
                    this.allScripts = cf.document.scripts;
                });
                leisDOMBody._conf = cf.document.body;
                this.body = leisDOMBody;
            }
            /**
             * leistrap PressMove Event
             */
            onPressMove(target, listener, start, end) {
                PressMove(_main, { listener, target, start, end });
            }
            /**
             *  add event to the main object 
             */
            addEvent(...args) { _main.addEvent(...args); }
            getScreen() { return cf.screen }
        }
    }

    function CloseBtn(eventType, eventOnce) {
        return this.Button({
            content: [this.Span({ innerHtml: "&times" })],
            otherAttr: { "class": "leis-btn-close" },
            eventOnce,
            eventType
        })
    }

    class Template {
        constructor(text) {
            this.text = text;

        }

        get(select = {}) {

            let list = this.text.split(" ");
            let temChange = "";
            for (var i = 0; i < list.length; i++) {
                if (list[i].length >= 2 && list[i][0] == "%") {

                    if (select[list[i].slice(1, list[i].length)] != undefined) {
                        list[i] = select[list[i].slice(1, list[i].length)];
                    }
                }
            }

            for (var j = 0; j < list.length; j++) {
                if (list[j].length >= 0 && list[j][0] != "%") {
                    temChange += " " + list[j];
                }
            }
            return temChange
        }

    }

    /**
    * leistrap `Alert` component definition
    */
    class Alert {
        #type
        #links
        /**
         * @param {BaseElement} parent  the alert parent widget
         * @param {string} text text to be displayed
         * @param {BtnType} type alert color type  
         */
        constructor(parent, text, type, links) {
            this.parent = parent;
            this.text = text;
            this.#type = type;
            this.#links = links;
            this.point = this.#setA();
        }

        #setA() {
            const links = new Template(this.text);
            let getLink;

            if (this.#links) {
                const { ...cpy } = this.#links;
                Object.keys(cpy).forEach(item => {
                    cpy[item] = `<a href="${cpy[item]}">${item.replace(/_/g, " ")}</a>`;
                });
                getLink = links.get(cpy);
            }
            const close = leistrap.CloseBtn("click", function () { MainA.destroy(); });
            const MainA = leistrap.Card({ parent: this.parent });
            leistrap.Card({
                parent: MainA,
                content: [
                    close,
                    leistrap.P({
                        innerHtml: getLink ? getLink :
                            this.text, attr: { className: ["leis-alert-text"] }
                    })],
                attr: {
                    className: ["leis-alert-card",
                        `${this.#type ? `leis-alert-${this.#type}` :
                            "leis-alert-primary"}`]
                }
            });
            this.MainA = MainA;
            return MainA
        }
    }

    /**
     * leistrap comboBox component  
     */
    class ComboBox {
        constructor(option) {
            if (!option) option = {};
            this.items = option.items;
            this.point = leistrap.Input().getTextBox();
            this.point.autoComplete = { autoComplete: this.items };
            Object.defineProperty(this, "combo",
                { writable: false, value: this.point.add() });
            let counter = obj$1.countArray(this.items, 0);
            this.combo.leisBtnConfId.input.bind("<arrow>", function (o) {
                o.up = () => { this.setValue(counter()); };
            }, "choice");

            this.combo.leisBtnConfId.input.bind("<return>", function () { console.log(this); });
        }

    }

    function selectElement({
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
                    : undefined;
        } catch (error) {

        }
        byId ? document.querySelector(`#${id ? id : null}`)
            .addEventListener(`${evt ? evt : ""}`, function (e) { event(e, kgv); }) :
            byElement ? htmlElement.addEventListener(`${evt ? evt : ""}`, function (e) { event(e, kgv); }) :
                byClassName ? document.querySelector(`.${className ? className : null}`)
                    .addEventListener(`${evt ? evt : ""}`, function (e) { event(e, kgv); }) : undefined;

        const cur = byId ? document.querySelector(`#${id ? id : null}`) : byElement ? htmlElement :
            byClassName ? document.querySelector(`.${className ? className : null}`) : undefined;
        pre({
            currentElement: cur,
            elemAss: kgv
        });

        content ? (
            content.forEach(item => {
                if (cur) {
                    item.parent = cur;
                    if (item.point) {
                        item.point.parent = cur;
                        cur.append(item.point.render());
                    }
                    else {
                        cur.append(item.render());
                        item.parent = cur;
                    }

                }
            })
        ) : content;
        return cur
    }


    function groupController({
        byClassName = false,
        classValue = new String,
        byChildren = false,
        parent = new Document
    }) {
        const cl = byClassName ? document.querySelectorAll(`.${classValue ? classValue : ""}`) : byChildren ? parent.children : undefined;
        const AllCl = [];
        if (cl !== undefined) {
            for (let i = 0; i < cl.length; i++) { AllCl.push(cl[i]); }
        }
        return AllCl
    }

    class Layout {
        constructor(parent, content, cls) {
            this.point = leistrap.Div({ parent, content });
            leis$1.addClassList(this.point, cls[0]);
            this.#setHB(content, cls[1]);
        }

        #setHB(list, cls) {
            list.forEach(item => {
                item.addClass(cls);
                item.setStyleProp("flex", `${list.length}`);
            });
        }
        #setItemFlex(index, prop, value) {
            if (this.point.content[index]) {
                this.point.content[index].setStyleProp(prop, value);
            }
        }
        setItemGrow(index, n) { this.#setItemFlex(index, "flexGrow", n); };
        setItemShrink(index, n) { this.#setItemFlex(index, "flexShrink", n); };
        setItemBasis(index, value) { this.#setItemFlex(index, "flexBasis", value); };
        setItemOrder(index, n) { this.#setItemFlex(index, "flexOrder", n); };
    }

    Layout.HBoxLayout = function (parent, content) {
        return new this(parent, content, [
            "leis-flex leis-row leis-layout",
            "leis-hbox-item"])
    };

    Layout.VBoxLayout = function (parent, content) {
        return new this(parent, content, [
            "leis-flex leis-coluùn leis-layout",
            "leis-vbox-item"])
    };

    var setting = {
        theme: "light",
        Core: leistrap
    };

    function Head(widget) {
        const h = widget();
        h._config = window.document.head;
        return h
    }

    function LeisFileAPI(glth, ls) {
        const EXIST = [];

        if (glth) {
            glth.imports = (path) => importsObject(path, ls);
            glth.exports = (object, channel) => exportsLeisObject(object, channel);
        }
        const event = _EventEmitter();
        function exportsLeisObject(object, channel) {
            event.handle(channel, function (event) {
                event.send(object);
            });
        }

        function importsObject(path, leistrap) {
            obj$1.after(300, function () {
                updateScriptsCollection();
                if (!ExistScript(path))
                    leistrap.main.body.add(leistrap.Script({
                        otherAttr: { src: path }
                    }));

            });
            return { on: event.invoke }
        }

        function updateScriptsCollection() {
            for (var script = 0; script < ls.main.allScripts.length; script++) {
                EXIST.push(ls.main.allScripts.item(script).src);
            }
        }

        function ExistScript(name) {
            var RESULT = false;
            for (var item = 0; item < EXIST.length; item++) {
                if (EXIST[item].endsWith(name.replace(/\.\//g, ""))) {
                    RESULT = true;
                    break;
                }
            }
            return RESULT
        }
        return { exportsLeisObject, importsObject }
    }

    /**
     * class definition
     */


    const Lesistap_pages = {};

    const extensionOption = {
        BaseElement, leis: leis$1, obj: obj$1, leisDOM: leisDOM$1,
        generateId: generateId$1, selectElement,
        groupController,
        ExtensionInit, ExtensionRender,
        OptionsInit, useState
    };
    function leistrap(conf) {
        if (!conf) conf = {};
        obj$1.copyObject(conf, setting, true);
        if (conf.plugin) conf.plugin.forEach(item => { obj$1.tryCode(() => item(setting)); });

    }

    leistrap.prototype.setting = setting;
    Object.defineProperty(leistrap, "extension", { writable: false, value: {} });
    Object.defineProperty(leistrap, "event", { writable: false, value: _EventEmitter() });

    /**
    * leistrap `Button` Element | Component
    * @param {options} option button options
    * @returns {Button}
    */
    leistrap.Button = option => {
        const button = setWidget("button", Button, "Button");
        return button(option)
    };
    /**
    * leistrap `Div` | `Card component`
    * @param {options}  option options
    * @returns { Card} 
    */
    leistrap.Card = option => {
        const card = setWidget("div", Card, "div");
        return card(option)
    };
    /**
    * leistrap `Label` Element | component 
    * @param {options} option Label options
    * @returns {Label}
    */
    leistrap.Label = option => {
        const label = setWidget("label", Label, "label");
        return label(option)
    };
    /**
    * leistrap  `P` | `paragraph` component
    * @param {options} option  options
    * @returns {Paragraph}
    */
    leistrap.Paragraph = option => {
        const p = setWidget("p", Paragraph, "paragraph");
        return p(option)
    };
    /**
    * leistrap `P` Element
    * @param {options} option  options
    * @returns {P} 
    */
    leistrap.P = option => {
        const p = setWidget("p", Paragraph, "paragraph");
        return p(option)
    };
    /**
    * leistrap `Img `Element
    * @param {options} option options
    * @returns {Img}
    */
    leistrap.Img = option => {
        const img = setWidget("img", Img, "img");
        return img(option)
    };
    /**
    * leistrap `Div` Element
    * @param {options} option options
    * @returns {Div}
    */
    leistrap.Div = option => {
        const div = setWidget("div", Div, "div");
        return div(option)
    };
    /**
    * List widget uses the ul or ol html elements
    * @param {options} option List options
    * @returns {List}
    */
    leistrap.List = option => {
        const ul = setWidget("ul", List, 'ul');
        return ul(option)
    };
    /**
     * Ol widget uses the Ol  html elements
     * @param {options} option Ol widget options
     * @returns {List}
     */
    leistrap.Ol = option => {
        const ol = setWidget("ol", List, "ol");
        return ol(option)
    };
    /**
    * Ul widget uses the Ul  html elements
    * @param {options} option Ul widget options
    * @returns {List}
    */
    leistrap.Ul = option => {
        const ul = setWidget("ul", List);
        return ul(option)
    };
    /**
    * List item Element
    * @param {options} option list item options
    * @returns {Li} 
    */
    leistrap.Li = option => {
        const li = setWidget("li", Li, "li");
        return li(option)
    };
    /**
    * the `Span` Element 
    * @param {options} option  span options
    * @returns {Span}
    */
    leistrap.Span = option => {
        const span = setWidget("span", Span, "span");
        return span(option)
    };
    /**
    * Italic element
    */
    leistrap.I = option => {
        const i = setWidget("i", I, "i");
        return i(option)
    };
    leistrap.Link = option => {
        const link = setWidget("link", Link, "link");
        return link(option)
    };
    /**
    * the html `a` Element
    * @param {options} option options
    * @returns {A}
    */
    leistrap.A = option => {
        const a = setWidget("a", A, "a");
        return a(option)
    };
    /**
    * `textarea` element
    * @param {options} option textarea options
    * @returns {Textarea} 
     */
    leistrap.Textarea = option => {
        const textarea = setWidget("textarea", Textarea, "textarea");
        return textarea(option)
    };
    /**
    * Table `Element` | `Component`
    * @param {options} option table options
    * @returns {Table}
    */
    leistrap.Table = option => {
        const table = setWidget("table", Table, "table");
        return table(option)
    };
    /**
    * `THead` element
    * @param {options} option options
    * @returns {THead}
    */
    leistrap.THead = option => {
        const thed = setWidget("thead", Thead, "thead");
        return thed(option)
    };
    /**
     * `Th` element
     * @param {options} option options
     * @returns {Th}
     */
    leistrap.Th = option => {
        const th = setWidget("th", Th, "th");
        return th(option)
    };
    /**
     * `Tbody` element
     * @param {options} option Tbody options
     * @returns {Tbody}
     */
    leistrap.Tbody = option => {
        const tbody = setWidget("tbody", Tbody, "tbody");
        return tbody(option)
    };
    /**
     * `Tr` element
     * @param {options} option options
     * @returns {Tr}
     */
    leistrap.Tr = option => {
        const tr = setWidget("tr", Tr, "tr");
        return tr(option)
    };
    /**
     * `Td` element
     * @param {options} option options
     * @returns {Td}
     */
    leistrap.Td = option => {
        const td = setWidget("td", Td, "td");
        return td(option)
    };
    /**
     * `Tfoot` element
     * @param {options} option Tfoot options
     * @returns {Tfoot}
     */
    leistrap.Tfoot = option => {
        const tfoot = setWidget("tfoot", Tfoot, "tfoot");
        return tfoot(option)
    };
    /**
    *leistrap `Script` element
    */
    leistrap.Script = setWidget("script", Script, "script");
    /**
    * input element, use `otherAttr` property to change the input type
    * @param {options} option Input options
    * @returns {Input} 
    */
    leistrap.Input = option => {
        const input = setWidget("input", Input, "input");
        return input(option)
    };
    /**
    * `Heading 1`  element 
    */
    leistrap.H1 = setWidget("h1", Heading, "h1");
    /**
     * `Heading 2`  element 
     */
    leistrap.H2 = setWidget("h2", Heading, "h2");
    /**
     * `Heading 3`  element 
     */
    leistrap.H3 = setWidget("h3", Heading, "h3");
    /**
     * `Heading 4`  element 
     */
    leistrap.H4 = setWidget("h4", Heading, "h4");
    /**
     * `Heading 5`  element 
     */
    leistrap.H5 = setWidget("h5", Heading, "h5");
    /**
     * `Heading 6`  element 
     */
    leistrap.H6 = setWidget("h6", Heading, "h6");

    leistrap.Style = setWidget("style", Style, "style");
    leistrap.Head = Head(leistrap.Div);
    leistrap.addStyle = function (css) { leis$1.addCssFile(document, this.Style({ text: css })); };
    leistrap.inRange = function (num, st = 0, callback) {
        let ox = [];
        for (let x = st; x < num; x++) { ox.push(x); }
        ox = ox.map(callback);
        return ox
    };
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
        if (!option) { option = {}; } return new TabPage(
            option.tabLink,
            option.tabContent,
            option.parent,
            option.attr,
            option.contentClass,
            option.useContentParent,
            option.concatLink
        )
    };
    /**
    * page button
    * @param {options} option 
    * @returns {PageButton}
    */
    leistrap.pageButton = (option = {}) => new PageButton(option);

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
    );

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
    );

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
    );

    /**
    * leistrap  GroupItem `left image` widget
    * @param {string} path the img `path`
    * @returns {BaseElement}
    */
    leistrap.GILeftImg = path => leistrap.Card({
        attr: { className: ["leis-img-group-left"] },
        content: [leistrap.Img({ otherAttr: { src: path } })]
    });
    /**
     * leistrap  GroupItem `Text` widget
     * @param {string} txt  the text to be displayed
     * @returns {BaseElement}
     */
    leistrap.GIText = txt => leistrap.Paragraph({
        attr: { className: ["leis-group-txt"] },
        text: txt
    });
    /**
    * add the page extence 
    * @param {string} name 
    * @param {Page} page 
    */
    leistrap.setPage = function (name, page) { Lesistap_pages[name] = page; };
    leistrap.getPage = (name) => Lesistap_pages[name];
    leistrap.lorem = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum distinctio molestias culpa dolores quibusdam doloribus iure quis. Facere consequatur rerum quidem totam optio est animi. Voluptatem temporibus blanditiis officia enim!";
    leistrap.MLorem = function (n = 1) {
        let i = "";
        for (let _i = 0; _i < n; _i++) { i += ` ${this.lorem} `; }
        return i
    };

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
        );
        leisData.lDropDown.push(d);
        return d
    };

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
    );

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
        option.links);


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
    );
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
        option.dropDowns);

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
    );

    /**
    * leistrap `SearBar` widget
    * @param {options} option
    * @returns {Input}
     */
    leistrap.SearchBar = (option) => SearchBar(option);
    /**
    * leistrap.CloseBtn widget
    * @param {EventType} eventType type of event 
    * @param {Function} eventOnce the callback
    */
    leistrap.CloseBtn = CloseBtn;
    /**
    * leistrap `Modal` component
    * @param {{parent:BaseElement}} option 
    * @returns {Modal}
    */
    leistrap.Modal = option => {
        if (!option) { option = {}; } return new Modal(option.parent)
    };
    /**
     * leistrap ComboBox Component
     */
    leistrap.ComboBox = option => new ComboBox(option);

    /**
     * leistrap Horizontal box Layout
     */
    leistrap.HBoxLayout = option => {
        if (!option) { option = {}; } return Layout.HBoxLayout(option.parent, option.content)
    };

    leistrap.VBoxLayout = option => {
        if (!option) { option = {}; } return Layout.VBoxLayout(option.parent, option.content)
    };
    /**
    * call the callback when the main window is clicked
    * @param {Function} callback 
    */
    leistrap.winClicked = (callback) => leisData.Callbacks.push(callback);
    leistrap.getPageControler = () => leisData.PageControler;
    // main window eventListener
    window.addEventListener("click", function (e) {
        leisData.lDropDown.forEach(dp => {
            dp.Dcontent.removeClass("show"); dp.Btn.removeClass("activeD");
        });
        leisData.Callbacks.forEach(cl => cl());
    });
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
        });
        leis$1.addCssFile(document, l);
        return l
    };

    /**
     * main element
     */

    leistrap.main = __main__(leistrap, window);
    Object.defineProperty(leistrap, "MPC", { writable: false, value: leistrap.Div() });


    // extensions 

    leistrap.defineExtension = function (name, extn, option) {
        this[name] = obj$1.after(200, () => { extn(setting, leistrap, extensionOption); });
        this.extension[name] = extn;
    };

    // MPC and render | when app ready
    leistrap.whenReady = function (listener, ...args) {
        !leis$1.hasConf(this.MPC) ? this.MPC.getPropWait().push(() => {
            obj$1.after(200, () => {
                obj$1.tryCode(() => { listener.call(this.MPC); },
                    (error) => {
                        console.error(error);
                        const m = this.Modal();
                        m.setTitle("Error occured");
                        m.show();
                        m.add(this.P({ text: error.message }));
                        m.setSize("50%", "50vh");
                        m.clear();
                        window.document.body.append(m.point.render());
                    });
            });
        }) :
            obj$1.after(200, listener, ...args);
    };
    // creations of elements

    leistrap.createContent = function (elem, n, clb) {
        if (obj$1.isFunction(clb)) {
            return this.inRange(n, 0, (item, index) => clb(this[elem](), index, this[elem]));
        }
        else {
            return this.inRange(n, 0, (item, index) => this[elem]())
        }
    };
    // files API
    const FileAPI = LeisFileAPI(globalThis, leistrap);
    leistrap.exports = (object, channel) => FileAPI.exportsLeisObject(object, channel);
    leistrap.imports = (path) => FileAPI.importsObject(path, leistrap);
    leistrap.dep = extensionOption;
    // render  our page
    Object.defineProperty(leistrap, "selectElement", { writable: false, value: selectElement });
    Object.defineProperty(leistrap, "render", {
        writable: false, value: function (id) {
            this.selectElement({
                byId: true,
                id: id,
                content: [this.MPC]
            });
        }
    });

    return leistrap;
})()
export { ls }