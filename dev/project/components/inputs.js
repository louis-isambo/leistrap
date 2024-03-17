import { leistrap } from "../dist/leisWidget.js"
import { leis } from "../browser/leis.js"
import { LeisElementID } from "../dist/leisId.js"
import { obj, } from "../../deps/PrimaryArray.js"
import { destroyInput } from "../dist/global.js"
import { generateId } from "../../deps/rand.js"



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
    const input = leistrap.Input({
        otherAttr: { type: type, id },
        addData: { value, event: { active: [], disable: [] } }
    })
    const ic = leistrap.Div()

    name ? input.addAttr("name", name) : undefined
    const o = obj.objKeysToLowerCase(option)
    const attr = obj.copyObject(o, undefined, false, "id", "name", "type")
    obj.loopObj(attr, (item, x) => { input.addAttr(x, item) })
    const _lbl = leistrap.Label({ lblFor: id, text: lbl })
    const c = leistrap.Div({ content: [ic] })

    const auto = ["text", "email", "password"]
    if (this.autoComplete && obj.has(type, auto)) {
        input.addClass("leis-autoInput")
        input.addAttr("autocomplete", "false")
        ic.addClass("leis-autoComplate")
        ic.content = [input, leis.setAutoCompletion(
            leistrap,
            this.autoComplete.autoComplete,
            input,
            this.autoComplete.defaultValue,
            this.autoComplete)]
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
            if (this.getAttr("checked")) {
                input.addData.event.active.forEach(item => item(input.addData.value))
            }
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
    this.main.addData.inputs.forEach(input => {
        if (name) { input.addClass(name) }
    })
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
function initTxtInput(type) {
    return [
        "leis-textboxinput-container",
        type,
        "leis-textbox-container",
        "leis-textbox-card",
        "leis-textinput"]
}
export {
    BtnRadio, checkBox,
    textBox, switchBox,
    passWordBox, emailBox
}