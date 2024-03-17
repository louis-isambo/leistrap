(function () {
    "use strict";

    const cardCom = leistrap.Card({
        content: [leistrap.P({ text: leistrap.lorem.slice(0, 100) })],

    }).getCard()

    cardCom.setSize("30%")
    cardCom.title = "Card Title"
    cardCom.header = "Card Header"
    cardCom.footer = "Card footer"
    cardCom.img = { path: "../static/css/img/IMG_3558.JPG", pos: "top" }

    const main = leistrap.Div({
        content: [leistrap.API.txt.help, cardCom]
    })
    main.addClass("df")
    leistrap.API.card_content.add(main)

})()