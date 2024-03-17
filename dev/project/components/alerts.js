import { leistrap } from "../dist/leisWidget.js"
import { Template } from "../../deps/template.js"
import { BaseElement } from "../dist/baseElement.js"
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
        this.parent = parent
        this.text = text
        this.#type = type
        this.#links = links
        this.point = this.#setA()
    }

    #setA() {
        const links = new Template(this.text)
        let getLink;

        if (this.#links) {
            const { ...cpy } = this.#links
            Object.keys(cpy).forEach(item => {
                cpy[item] = `<a href="${cpy[item]}">${item.replace(/_/g, " ")}</a>`
            })
            getLink = links.get(cpy)
        }
        const close = leistrap.CloseBtn("click", function () { MainA.destroy() })
        const MainA = leistrap.Card({ parent: this.parent })
        const content = leistrap.Card({
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
        })
        this.MainA = MainA
        return MainA
    }
}

export { Alert }