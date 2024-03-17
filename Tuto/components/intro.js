(function () {
    "use strict"

    const intro = leistrap.Div()
    leistrap.leis.addClassList(intro, "intro")
    intro.add(leistrap.H1({ text: "Qu'est-ce que Leistrap ?" }))
    intro.add(leistrap.P({ text: leistrap.API.txt.ItI }))

    const o = {
        "item": { caption: "Introduction" },
        "content": intro
    }
    leistrap.exportObject("intro", o)

})()