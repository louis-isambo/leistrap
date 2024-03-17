(function () {
    "use strict";

    const search = leistrap.SearchBar({
        otherAttr: { placeholder: "search bar" },
        attr: { className: ["louis"] },

        option: {
            autoComplate: [
                "louis", "isambo", "elika",
                "je suis louis isambo et toi comment tu vas",
                "comment peut-on trouvez les données",
                "je vais crear un site internet"
            ],
            defaultValue: ["i am well an and you", "how to create a script", "how to create a web site ?"],
            whenSelect: function (data) { console.log(data); }
        }
    })
    search.setStyleProp("width", "50%")
    search.setStyleProp("margin", "1rem auto")
    const main = leistrap.Div()
    main.addElements(leistrap.API.txt.help, search)

    leistrap.API.searchbar_content.add(main)

})()