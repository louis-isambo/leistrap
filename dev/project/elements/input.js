import { BaseElement } from "../dist/baseElement.js";
import {
    BtnRadio, checkBox,
    textBox, switchBox,
    passWordBox, emailBox
} from "../components/inputs.js"

class Textarea extends BaseElement { }
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
    getRadio() {
        if (!this.#isComp) {
            this.#isComp = true; this.destroy()
        };
        return BtnRadio(this.parent)
    }
    /**
     * 
     * leistrap `CheckBox Buttons` component
     */
    getCheckBox() {
        if (!this.#isComp) {
            this.#isComp = true; this.destroy()
        };
        return checkBox(this.parent)
    }
    /**
     * leistrap `TextBox` component
     */
    getTextBox() {
        if (!this.#isComp) {
            this.#isComp = true; this.destroy()
        };
        return textBox(this.parent)
    }
    /**
     * leistrap `Switch box` component
     */
    getSwitchBox() {
        if (!this.#isComp) {
            this.#isComp = true; this.destroy()
        };
        return switchBox(this.parent)
    }
    /**
     * leistrap password widget
     */
    getPassWordBox() {
        if (!this.#isComp) {
            this.#isComp = true;
            this.destroy()
        };
        return passWordBox(this.parent)
    }
    /**
     * leistrap password widget
     */
    getEmailBox() {
        if (!this.#isComp) {
            this.#isComp = true; this.destroy()
        };
        return emailBox(this.parent)
    }
}
export { Textarea, Input }