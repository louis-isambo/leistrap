// const leistrap = require("../../../dict/leistrap");

(function () {
    "use strict";

    const days = [
        "Lundi", "Mardi", "Mercredi", "jeudi",
        "Vendredi", "Samedi", "Dimanche"
    ]
    const accordion = leistrap.Accordion({
        accHeader: leistrap.P({ text: "les jours de la semaine" }),
        accFooter: leistrap.P({ text: "En savoir plus" }),
        accBtn: leistrap.inRange(days.length, 0, i => leistrap.Button({ text: days[i] })),
        accPanel: leistrap.inRange(days.length, 0, i => leistrap.Div({ text: leistrap.lorem }))
    })
    const main = leistrap.Div({

        content: [
            leistrap.API.txt.help,
            accordion
        ]
    })

    leistrap.API.accordion_content.add(main)

})()