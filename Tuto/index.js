

leistrap.importObject("utility", "./components/txt.js")
leistrap.importObject("highlight", "./components/highlight.js")
leistrap.importObject("intro", "./components/intro.js")
leistrap.importObject("utility", "./components/utility.js")
leistrap.importObject("utility", "./components/elements.js")
leistrap.importObject("component", "./components/components.js")

leistrap.whenReady(function () {
    const itemsSide = [
        leistrap.API.intro.item,
        leistrap.API.utility.item
    ]

    const collas = [
        [leistrap.API.leistrap_element.colla],
        [leistrap.API.components.colla]
    ]

    const preFun = [
        leistrap.API.leistrap_element,
        leistrap.API.components
    ]
    const contentTab = [
        leistrap.API.intro.content,
        leistrap.API.utility.content,
        leistrap.API.leistrap_element.content,
        leistrap.API.components.content
    ]
    // sideBar
    const side = leistrap.SideBar({
        items: itemsSide,
        collapsibles: collas,
        header: leistrap.P({ text: "Leistrap Tuto" })
    })
    /* main content */
    const content = leistrap.Div()
    leistrap.leis.addClassList(content, "tuto-main-content")
    // tab
    const tab = leistrap.TabPage({
        useContentParent: content,
        concatLink: side.allItems,
        tabContent: contentTab
    })

    // execute preloda functions

    preFun.forEach(item => {
        if (item.preload) {
            item.preload(tab, content)
        }
    })
    // main content
    const version = leistrap.P({ text: "Version : 1.0" })
    leistrap.leis.addClassList(version, "version")
    const main = leistrap.Div({ content: [side, content, version] })
    leistrap.leis.addClassList(main, "tuto-main")
    leistrap.MPC.add(main)
})

leistrap.render("main")




