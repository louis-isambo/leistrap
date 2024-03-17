
// const leistrap = require("../../../dict/leistrap");



(function () {
    "use strict";

    //type color
    var colorType = leistrap.colorType
    const MGP = [
        "add", "destroy", "remove", "setText", "on", "removeEvent",
        "removeAll", "setBtnSize", "setType", "setSize"
    ].sort()
    const MGM = [
        "setSize", "setType", "setBtnStyle", "setIcon",
        "setText", "getText", "removeEvent", "destroy",
        "on"

    ]
    const CLT = leistrap.Div({ content: setBtn() })
    leistrap.leis.addClassList(CLT, "leis-flex leis-row l-g-n")

    // btns outline
    const outL = setBtn()
    const OUTLINE = leistrap.inRange(outL.length, 0, i => {
        const bo = outL[i].getButton()
        bo.setBtnStyle("outline")
        return bo
    })
    const CardBO = leistrap.Div({ content: OUTLINE })
    leistrap.leis.addClassList(CardBO, "leis-flex leis-row l-g-n")

    // btn size
    const ls = Object.keys(leistrap._Btns_.size)
    const btnSize = leistrap.inRange(
        ls.length,
        0,
        i => leistrap.P({
            content: [leistrap.Button({ text: ls[i], type: "primary" })
                .getButton().setSize(ls[i])]
        })
    )
    const BTNSZ = leistrap.Div({ content: btnSize })
    leistrap.leis.addClassList(BTNSZ, "children-m-l")

    //group btn 
    const groupBtn = leistrap.Button().groupBtn()
    leistrap.inRange(10, 0, i => groupBtn.add(`Button ${i + 1}`))

    //GBM
    const dataTb = []
    MGM.forEach((v, i) => {
        dataTb.push([
            { text: `${i + 1}` },
            { text: `${v}` },
            { text: "...." },
            { text: "...." }
        ])
    })
    const Tb = leistrap.Table().getTable()
    const table = new Tb()

    table.insertTable(4, MGM.length)
    table.setHeading(["N°", "Elément", "Déscription", "Paramettre"])
    table.clear()
    table.getColumn(3).setStyle("width: 20%")
    table.getColumn(3).setStyle("width: 40%")
    table.getColumn(2).setStyle("width: 30%")
    table.getColumn(1).setStyle("width: 2%; background:#ddd")
    table.insertData(dataTb)
    const main = leistrap.Div({
        content: [
            //color type or  button type color
            leistrap.H5({ text: "Models et Coleurs des boutons en Leistrap." }),
            CLT,
            // btn ouline
            leistrap.H5({ text: "Boutons avec contours." }),

            CardBO,
            //btn size
            leistrap.H5({ text: "Les tailles d'un bouton." }),
            BTNSZ,
            leistrap.H5({ text: "Groupe des boutons." }),
            // groupBtn
            groupBtn,
            // explaining
            leistrap.H4({ text: "1. Models des boutons" }),
            leistrap.P({ text: leistrap.API.txt.components.Button.exe1 }),
            leistrap.H4({ text: "Liste des couleurs par défaut pour un boutton Leistrap" }),
            leistrap.Ul({ content: leistrap.inRange(colorType.length, 0, i => leistrap.Li({ text: colorType[i] })) }),
            leistrap.H4({ text: "Differentes tailles par défaut pour un boutton Leistrap" }),
            leistrap.Ul({ content: leistrap.inRange(ls.length, 0, i => leistrap.Li({ text: ls[i] })) }),
            leistrap.H4({ text: "Style d'un bouton Leistrap" }),
            leistrap.Ul({ content: leistrap.inRange(["normal", "outline"].length, 0, i => leistrap.Li({ text: ["normal", "outline"][i] })) }),
            leistrap.H2({ text: "Comment utiliser un Composant des boutons ?" }),
            leistrap.P({ content: [leistrap.API.highlight.highKeys(leistrap.API.txt.components.Button.exe2, "keyHigh")] }),
            leistrap.H4({ text: "La méthode getBuuton" }),
            leistrap.P({ content: [leistrap.API.highlight.highKeys(leistrap.API.txt.components.Button.mt1, "keyHigh")] }),
            table,
        ]
    })
    leistrap.leis.addClassList(main, "btn-component")
    function setBtn() {
        return leistrap.inRange(
            colorType.length,
            0,
            i => leistrap.Button({ type: colorType[i], text: colorType[i] }))
    }
    leistrap.API.button_content.add(main)

})()