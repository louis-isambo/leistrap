import { leistrap } from '../../leistrap.js'

export function Bind() {
    "use strict";
    leistrap.defineExtension("ess", function (setting, ls, { ExtensionRender, leis }) {
        ExtensionRender.push(function (elem) {
            elem.setStyle("color: red")

        })

    })

}
