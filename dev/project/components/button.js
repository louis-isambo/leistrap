import { obj } from "../../deps/PrimaryArray.js"
import { leis, leisBtns } from "../browser/leis.js"
import { destroyInput } from "../dist/global.js"
import { leistrap } from "../dist/leisWidget.js";
import { LeisElementID } from "../dist/leisId.js";



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
                this.container.setStyleProp("width", width)
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
    ID.leisBtnConfId.setText(value)
}

/**
 * add Event Listener to the button
 * @param {EventType} event the event type
 * @param {Function} callback  function to be called  
 * when the event is trigged
 * @param {LeisElementID} ID the `Button` Id  
 */
function BtnOn(ID, event, callback, name, option) {
    ID.leisBtnConfId.addEvent(event, callback, name, option)
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
    else {
        leis.addPW(true, this.main, () => {
            this.setBtnSize(width, height)
        }, this.main.getPropWait())
    }
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

// ! LeisButton Component

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
                const ic = leistrap.Span({
                    content:
                        [leistrap.I({ otherAttr: { "class": icClass } })]
                })
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
    destroy() { this.element.destroy() }
    getScreen() { this.element.getScreen() }
    /**
     * 
     * @param {EventType} eventType the type of event 
     * @param {Function} func function to be called when the event is trigged
     */
    on(eventType, func, name, option) {
        this.element.addEvent(eventType, obj.bindFunc(func, this), name, option);
        return this
    }
}



export { groupBtn, LeisButton }