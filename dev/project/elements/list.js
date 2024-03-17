import { BaseElement } from "../dist/baseElement.js"
/**
* leistrap.List element definition
*/

class List extends BaseElement {
    addItem(item) {
        if (item.ElementType === "li") {
            this.content.push(item)
            this.CASCADE()
        }
    }
}

export {List}