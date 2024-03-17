(function () {
    "use strict";


    const links = {
        hello: "https://www.google.com",
        "en_savoir_plus": "https://www.facebook"
    }


    const alers = leistrap.Card({
        content: [
            leistrap.Alert({
                text: "click ici %hello  pour voir toutes les information %en_savoir_plus veuillez utliser cette adresss pour voir beaucoup plus d'informations %hello",
                type: "primary", links
            }).MainA,
            leistrap.Alert({ text: `${leistrap.lorem} %en_savoir_plus`, type: "secondary", links }),
            leistrap.Alert({ text: leistrap.lorem, type: "danger" }),
            leistrap.Alert({ text: leistrap.lorem, type: "warning" }),
            leistrap.Alert({ text: leistrap.lorem, type: "info" }),
            leistrap.Alert({ text: leistrap.lorem, type: "success" }),
            leistrap.Alert({ text: leistrap.lorem, type: "dark" }),
            leistrap.Alert({ text: leistrap.lorem, type: "light" }),
        ],
        attr: { className: ["leis-padding-33"] }
    })

    const main = leistrap.Div({
        content: [
            leistrap.API.txt.help,
            alers
        ]
    })

    leistrap.API.alerts_content.add(main)

})()