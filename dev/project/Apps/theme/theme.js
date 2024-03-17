
import { obj } from "../../../deps/PrimaryArray.js";
const theme = (function (option, Core) {
    "use strict"
    if (!option) option = {};
    if (!option.theme) option.theme = "light";
    if (!option.dir) option.dir = "./"


    const themes = ["light", "dark"]
    let TN = obj.has(option.theme, themes) ? option.theme : "light"
    const _theme_ = Core.insertCss(`${option.dir}Apps/theme/themes/${TN}.css`)
    function Theme(name) {
        if (obj.has(name, themes)) {
            _theme_.addAttr("href",
                `${option.theme.dir}Apps/theme/themes/${name}.css`)
        }
    }
    return Theme
})

export { theme }