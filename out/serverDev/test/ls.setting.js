
import { KeyMap, DynCss } from "./leistrap1.0/Apps/plugin.js";

export function Setting(ls) {
    'use strict';

    ls({
        dir: "./",
        theme: "light",
        plugin: [
            DynCss
        ]
    })
}

