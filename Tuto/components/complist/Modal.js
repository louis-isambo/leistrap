
(function () {
    "use strict";


    const sm = leistrap.Modal()
    sm.add(leistrap.P({ text: leistrap.lorem.slice(70) }))

    const mdd = leistrap.Modal()
    mdd.add(leistrap.P({ text: leistrap.MLorem(10) }))

    const full = leistrap.Modal()
    full.add(leistrap.P({ text: leistrap.MLorem(30) }))

    const btns = leistrap.Div()
    leistrap.leis.addClassList(btns, "leis-flex leis-row l-g-n")
    const types = [sm, mdd, full]

    mdd.setSize("70%", "75vh")
    full.setSize("100%", "100%")
    types.forEach((item, i) => {
        const b = leistrap.Button({ text: ["petit", "moyen", "plein écran"][i] }).getButton()
        b.on("click", function () { item.show(); console.log(item); }).setType("primary")
        btns.add(b)
    })
    const main = leistrap.Div({
        content: [
            leistrap.API.txt.help,
            sm,
            mdd,
            full,
            btns
        ]
    })

    leistrap.API.modal_content.add(main)

})()