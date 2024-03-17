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


function countArray(arr, offset) {
    var counter = offset
    return function () {
        if (counter === arr.length - 1) counter = 0;
        var v = arr[counter];
        counter++;
        return v;
    }
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
    arrayRemove: (index, arr) => arr.splice(index, 1),
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
    defineObj: (obj, proName, value, writable = false) => Object.defineProperty(obj, proName, { value, writable }),
    countArray,
}
export { obj }






