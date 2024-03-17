import { leistrap } from "../dist/leisWidget.js";
import { leis } from "../browser/leis.js";
import { obj } from "../../deps/PrimaryArray.js";

function SearchBar(option) {
    option = option ? option : {};
    obj.isUndifend(option.option) ? option.option = {} : undefined
    const s = leis.setSearchBar(leistrap, option)
    return option.option.autoComplate ? setSearch(s, option) : s
}

function setSearch(s, option) {
    const SB = {
        point: leistrap.Card({
            attr: { className: ["leis-autoComplate"] },
            content: [s, leis.setAutoComplation(
                leistrap,
                option.option.autoComplate,
                s,
                option.option.defaultValue,
                option.option)]
        })
    }
    return SB
}

export { SearchBar }