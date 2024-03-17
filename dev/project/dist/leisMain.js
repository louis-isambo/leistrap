import { PressMove } from "../browser/events/mouse.js";
import { obj } from "../../deps/PrimaryArray.js"
// creation of the main object which will contain all
// elements, component that we'll create and then displays
// them in  the browser

function __main__(ws, cf) {
    const _main = ws.Div();
    _main.otherAttr = { "class": "leis-main" }
    _main._conf = cf
    // create a new _main object
    return new class Main {
        constructor() {
            const leisDOMBody = ws.Div()
            obj.after(200, () => {
                leisDOMBody._conf = cf.document.body;
                this.allScripts = cf.document.scripts
            })
            leisDOMBody._conf = cf.document.body
            this.body = leisDOMBody
        }
        /**
         * leistrap PressMove Event
         */
        onPressMove(target, listener, start, end) {
            PressMove(_main, { listener, target, start, end })
        }
        /**
         *  add event to the main object 
         */
        addEvent(...args) { _main.addEvent(...args) }
        getScreen() { return cf.screen }
    }
}

export { __main__ }



