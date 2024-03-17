import { obj } from "../../deps/PrimaryArray.js";
import { leistrap } from "../dist/leisWidget.js"


/**
 * leistrap comboBox component  
 */
class ComboBox {
    constructor(option) {
        if (!option) option = {};
        this.items = option.items
        this.point = leistrap.Input().getTextBox()
        this.point.autoComplete = { autoComplete: this.items }
        Object.defineProperty(this, "combo",
            { writable: false, value: this.point.add() });

        const rep = this
        let counter = obj.countArray(this.items, 0)
        this.combo.leisBtnConfId.input.bind("<arrow>", function (o) {
            o.up = () => { this.setValue(counter()) }
        }, "choice");

        this.combo.leisBtnConfId.input.bind("<return>", function () { console.log(this); })
    }

}


export { ComboBox }