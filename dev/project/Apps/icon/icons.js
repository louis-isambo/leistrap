import { Customer } from "../../Apps/Todo/custom.js";
import { leistrap } from "../../static/js/htmRender/leistrap.js";
import { ICS } from "./ics.js";

/**
 * @param {(name:string)=> void} callback
 * 
 */
function Icons(callback, useCl = false) {
    const boot = Object.keys(ICS.boostrap)
    const boostrap = leistrap.Card({ attr: { className: ["ics-card"] } })

    const head = leistrap.Card({ attr: { className: ["ics-head"] } })
    head.addEvent("click", (e) => { e.stopPropagation() })
    const EI = leistrap.Card({ parent: head, attr: { className: ["EI"] } })


    const search = Customer.TextInput({
        placeholder: "Rechercher l'icône, emoji...",
        parent: head,
        eventType: "keyup",
        eventOnce: function () {
            boostrap.content.forEach(item => {
                if (String(item.addData.name)
                    .toLowerCase().replace(/-/gi, " ").indexOf(String(this.getAttr("value")).toLowerCase()) != -1) {
                    item.show("display: inline-block !important;")
                } else { item.hide() }
            })
        }
    })

    const recentused = leistrap.Card({
        content: [leistrap.Paragrah({ text: "Récement utilisé" })],
        attr: { className: ["ics-recentUsed"] }

    })
    const icsFrenq = leistrap.Card({
        parent: recentused
    })
    function setIco() {
        let counter = 0
        const idInter = setInterval(() => {
            counter += 1
            leistrap.Button({
                content: [leistrap.I({ attr: { className: ["bi", `bi-${boot[counter]}`] } })],
                attr: { className: ["icsBtn"] },
                parent: boostrap,
                eventType: "click",
                addData: { name: boot[counter], value: `bi bi-${boot[counter]}` },
                eventOnce: callback ? function () { callback(this.addData.name) } : undefined
            })

            if (counter == 1000) { clearInterval(idInter); boostrap.CASCADE() }
        }, 5)

    }
    const mainW = leistrap.Card({
        content: [head, recentused, boostrap],
        attr: useCl === true ? {} : { className: ["leis-card", "ics-container"] }
    })
    setTimeout(setIco, 500)

    return mainW
}

export { Icons }