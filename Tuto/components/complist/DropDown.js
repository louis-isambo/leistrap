(function () {
    "use strict";


    function setD(type) {
        console.log(type);
        return leistrap.DropDown({
            caption: "Pays africains",
            btnType: type,
            items: [
                leistrap.Span({ text: "Congo RD" }),
                leistrap.Span({ text: "Cameroun" }),
                leistrap.Span({ text: "tanzanie" }),
                leistrap.Span({ text: "Gahna" }),
                leistrap.Span({ text: "Congo RD" }),
                leistrap.Span({ text: "Cameroun" }),
                leistrap.Span({ text: "tanzanie" }),
                leistrap.Span({ text: "Gahna" })
            ]
        })
    }
    const main = leistrap.Div({
        content: [leistrap.API.txt.help,]
    })
    main.addElements(...leistrap.inRange(
        Object.keys(leistrap.colorType).length,
        0,
        i => setD(leistrap.colorType[i])))
    main.addClass("df")
    leistrap.API.dropdown_content.add(main)

})()