import { LeisButton } from "../components/button.js";
import { groupBtn } from "../components/button.js";
import { BaseElement } from "../dist/baseElement.js";

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

export { Button }