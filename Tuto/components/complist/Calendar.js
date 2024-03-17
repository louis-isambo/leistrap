

(function () {
    "use strict";

    const m = ["Janvier", "Février", "March", "Avril",
        "Mai", "Juin", "Juillet", "Août",
        "Septembre", "Octobre", "Novembre", "Décembre"]

    const cl = leistrap.Calendar({
        month: new Date().getMonth() + 1,
        months: m
    })

    const main = leistrap.Div({
        content: [leistrap.API.txt.help, cl],
    })
    main.addClass("df")

    leistrap.API.calendar_content.add(main)

})()