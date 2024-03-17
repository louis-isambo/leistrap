(function () {
    "use strict";
    leistrap.defineExtension("ess", function (setting, ls, { ExtensionRender }) {
        ExtensionRender.push(function (elem) {
            console.log(" render functionality !", elem.ElementType)
        })

    })
})()
