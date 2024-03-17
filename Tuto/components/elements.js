

(function () {
    "use strict";
    const elements = [
        "Div", "P", "Span", "Script", "Link",
        "Button", "Input", "Label", "Img", "Ol",
        "Ul", "Li", "I", "A", "Textarea",
        "Table", "THead", "Th", "Tbody", "Tr",
        "Td", "Tfoot", "H1 - H6"].sort()

    const exCard = leistrap.Div()
    const links = {
        "propriétés_par_option": "#initOption"
    }

    const exElements = leistrap.inRange(elements.length, 0, i => {
        const e = leistrap.Div({
            content: [
                leistrap.H4({ text: elements[i] }),
                leistrap.P({ text: leistrap.API.txt.usableElem[elements[i]].ex }),
                leistrap.API.highlight(leistrap.API.txt.usableElem[elements[i]].exa),
            ]
        })
        exCard.add(e)
        const l = leistrap.Li({ text: `${elements[i]}` })
        l.addEvent("click", function () { e.getScreen() })
        return l
    })

    const dataTb = []

    elements.forEach((v, i) => {
        dataTb.push([
            { text: `${i + 1}` },
            { text: `${v}` },
            { widget: leistrap.API.highlight.highKeys(leistrap.API.txt[v], "keyHigh") }
        ])
    })
    const Tb = leistrap.Table().getTable()
    const table = new Tb()

    table.insertTable(3, elements.length)
    table.setHeading(["N°", "Elément", "Déscription"])
    table.clear()
    table.getColumn(3).setStyle("width: 60%")
    table.getColumn(2).setStyle("width: 30%")
    table.getColumn(1).setStyle("width: 2%; background:#ddd")
    table.insertData(dataTb)

    // elements methods
    const MTDSLIST = [
        "add", "addElements", "setStyleProp", "getScreen",
        "removeAll", "removeAttr", "removeEvent", "getRemovedElement",
        "destroy", "setText", "getText", "hide", "show", "CASCADE", "addAttr",
        "removeClass", "addClass", "toggleClass", "setStyle", "addEvent", "remove",
        "setClassName"
    ].sort()

    const dataMTDS = MTDSLIST.map((v, i) => [
        { text: `${i + 1}` }, { text: `${v}` },
        { widget: leistrap.API.highlight.highKeys(leistrap.API.txt.methods[v].DS, "keyHigh") },
        { text: leistrap.API.txt.methods[v].Param }
    ])
    const _MTD_ = leistrap.Table().getTable()
    const MTDS = new _MTD_()
    MTDS.insertTable(4, MTDSLIST.length)
    MTDS.setHeading(["N°", "Méthode", "Déscription", "Paramettre"])
    MTDS.clear()
    MTDS.getColumn(4).setStyle("width: 30%")
    MTDS.getColumn(3).setStyle("width: 40%")
    MTDS.getColumn(2).setStyle("width: 20%")
    MTDS.getColumn(1).setStyle("width: 2%; background:#ddd")
    MTDS.insertData(dataMTDS)
    // props list
    const propsList = [
        "text", "parent", "type", "content", "eventType", "eventOnce",
        "attr", "otherAttr", "addData", "innerHtml", "autoClick", "tooltip",
        "linkName", "leisBtnConfId"
    ].sort()

    const initObj = leistrap.Div({
        attr: { id: 'initOption', className: ["sub-title"] },
        content:
            [
                leistrap.H3({ text: leistrap.API.txt.props.initObject.title }),
                leistrap.P({ text: leistrap.API.txt.props.initObject.ex }),
                leistrap.API.highlight(leistrap.API.txt.props.initObject.exa),
            ]
    })
    const initOpt = leistrap.Div({
        attr: { id: 'initOption', className: ["sub-title"] },
        content:
            [
                leistrap.H3({ text: leistrap.API.txt.props.initOption.title }),
                leistrap.P({ text: leistrap.API.txt.props.initOption.ex }),
                leistrap.API.highlight(leistrap.API.txt.props.initOption.exa),
            ]
    })
    const initProps = leistrap.Div({ content: [initObj, initOpt] })

    const dataProps = propsList.map((v, i) => [
        { text: `${i + 1}` }, { text: `${v}` },
        { widget: leistrap.API.highlight.highKeys(leistrap.API.txt.props[v].DS, "keyHigh") },
        { text: leistrap.API.txt.props[v].tp }
    ])

    const _PL_ = leistrap.Table().getTable()
    const PSL = new _PL_()
    PSL.insertTable(4, propsList.length)
    PSL.setHeading(["N°", "Méthode", "Déscription", "Type"])
    PSL.clear()
    PSL.getColumn(4).setStyle("width: 10%")
    PSL.getColumn(3).setStyle("width: 60%")
    PSL.getColumn(2).setStyle("width: 20%")
    PSL.getColumn(1).setStyle("width: 2%; background:#ddd")
    PSL.insertData(dataProps)
    const card = leistrap.Div()
    card.addElements(
        leistrap.H1({ text: "Leistrap Elémenents" }),
        leistrap.P({ text: leistrap.API.txt.lsE }),
        table,
        //methods
        leistrap.H2({ text: leistrap.API.txt.mtds.title }),
        leistrap.P({ content: [leistrap.API.highlight.highKeys(leistrap.API.txt.mtds.ex, "keyHigh")] }),
        MTDS,
        //props
        leistrap.H2({ text: leistrap.API.txt.props.title }),
        leistrap.P({ content: [leistrap.API.highlight.highKeys(leistrap.API.txt.props.ex, "keyHight")] }),
        leistrap.Alert({ text: leistrap.API.txt.props.note1, type: "success", links }),
        PSL,
        leistrap.Alert({ text: leistrap.API.txt.props.note, type: "warning", links }),
        //usable of element
        leistrap.H2({ text: leistrap.API.txt.elemUsable.title }),
        leistrap.P({ text: leistrap.API.txt.elemUsable.ex }),
        initProps,
        exCard,
    )


    const colla = leistrap.Collapsible({
        caption: "Elements Leistrap",
        content: [leistrap.GroupItem({ items: exElements })]

    })

    const o = {
        "colla": colla,
        "content": card
    }
    leistrap.leis.addClassList(card, "leistrap-element")
    leistrap.exportObject("leistrap_element", o)
})()