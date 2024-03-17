
leistrap.exportObject("components", (function () {
    const components = [
        "Button", "Card", "Table", "Input", "CloseBtn", "TabPage",
        "PageLegend", "Accordion", "GroupItem", "Page", "Calendar",
        "DropDown", "SlideDown", "Alerts", "TopNav", "SideBar",
        "Collapsible", "SearchBar", "ToolTip", "Modal", "GroupButton",
        "PageButton"
    ].sort()
    const dataTb = []
    components.forEach((v, i) => {
        dataTb.push([
            { text: `${i + 1}` },
            { text: `${v}` },
            { widget: leistrap.API.highlight.highKeys(leistrap.API.txt.components[v].DS, "keyHigh") }
        ])
    })
    const card = leistrap.Div()

    const Tb = leistrap.Table().getTable()
    const table = new Tb()

    table.insertTable(3, components.length)
    table.setHeading(["N°", "Elément", "Déscription"])
    table.clear()
    table.getColumn(3).setStyle("width: 60%")
    table.getColumn(2).setStyle("width: 30%")
    table.getColumn(1).setStyle("width: 2%; background:#ddd")
    table.insertData(dataTb)
    const colla = leistrap.Collapsible({
        "caption": "composants",
        content: [leistrap.GroupItem({ items: leistrap.inRange(components.length, 0, i => leistrap.Li({ text: components[i] })) })]

    })
    card.addElements(
        leistrap.H1({ text: "Liste des composants Leistrap" }),
        table
    )
    leistrap.leis.addClassList(card, "compenents-list")

    function preload(tab, content) {
        const Compcontent = []
        colla.content[0].items.forEach(item => {
            const cnt = leistrap.Div({
                content: [leistrap.H3({ text: `Leistrap Component > ${item.text}` })]
            })
            Compcontent.push(cnt)
            tab.addTab(item, cnt, true, true)
        })
        //loading componeents
        let clen = -1
        leistrap.obj.after(1000, function () {
            const cl = setInterval(function () {
                clen += 1
                if (clen === components.length - 1) { clearInterval(cl) }
                leistrap.sendObject(
                    `${components[clen].toLowerCase()}_content`,
                    Compcontent[clen],
                    `./components/complist/${components[clen].toLowerCase()}.js`
                )

            }, 500)
        })

    }
    return {
        "colla": colla,
        "content": card,
        preload,

    }
})())