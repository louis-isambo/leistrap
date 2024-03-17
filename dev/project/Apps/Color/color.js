import { leistrap } from "../../static/js/htmRender/leistrap.js"



const color = leistrap.colorName

function Cl(value, callback, parent) {
    const c = leistrap.Button({
        parent,
        otherAttr: { "style": `background:${value}; border-radius:5px`, "class": 'colorBtn' },
        attr: { className: ["Da-cl"] },
        eventType: "click",
        eventOnce: function () { callback ? callback(value) : undefined }
    })
    return c
}

function Colorpalette(callback, OnceAdd) {

    const ColorPalette = leistrap.Card({ attr: { className: ["DA-ColorPalette"] } })
    const _color = leistrap.Card({ parent: ColorPalette })
    const addedColors = leistrap.Card({ parent: ColorPalette, content: [leistrap.Paragrah({ text: "Mes coleurs" })] })

    //back end get SQLITE API
    if (typeof window.electronAPI !== "undefined") {
        window.electronAPI.initUserColor("works !").then(v => {
            v.forEach(col => Cl(col.name, callback, addedColors))
            addedColors.CASCADE()
        })
    }
    const colorPicker = leistrap.Input({
        otherAttr: { type: 'color', "class": "colorPicker" },
        eventType: "mouseenter",
        eventOnce: function () { setTimeout(() => { this.getAttr("click") }, 500); }
    })

    colorPicker.addEvent("input", function () { callback ? callback(this.getAttr("value")) : undefined })
    const choose = leistrap.Card({
        parent: ColorPalette,
        content: [
            leistrap.Span({ text: "Autres couleurs" }),
            colorPicker,
            leistrap.Button({
                attr: { className: ["choice", "leis-btn-primary "] },
                text: "Choisir",
            }),
            leistrap.Button({
                attr: { className: ["Add-color", 'leis-btn-secondary '] },
                text: "Ajouter",
                eventType: "click",
                eventOnce: function () {
                    addedColors.content.push(Cl(colorPicker.getAttr("value"), callback));
                    addedColors.CASCADE()
                    OnceAdd ? OnceAdd(colorPicker.getAttr("value")) : undefined
                }
            })
        ],
        attr: { className: ["choiceColor"] }
    })
    choose.addEvent("click", (e) => { e.stopPropagation() })
    Object.keys(color).forEach(item => _color.content.push(Cl(`rgb(${color[item].toString()})`, callback)))
    return ColorPalette
}

export { Colorpalette }