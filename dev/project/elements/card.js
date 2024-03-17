import { BaseElement } from "../dist/baseElement.js";
import { leisCard } from "../components/card.js";
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
export { Card, Div }