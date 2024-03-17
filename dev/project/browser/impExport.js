import { _EventEmitter } from "../commands/eventEmitter.js";
import { obj } from "../../deps/PrimaryArray.js";

function LeisFileAPI(glth, ls) {
    const EXIST = []

    if (glth) {
        glth.imports = (path) => importsObject(path, ls);
        glth.exports = (object, channel) => exportsLeisObject(object, channel)
    }
    "use strict";
    const event = _EventEmitter()
    function exportsLeisObject(object, channel) {
        event.handle(channel, function (event) {
            event.send(object)
        })
    }

    function importsObject(path, leistrap) {
        obj.after(300, function () {
            updateScriptsCollection()
            if (!ExistScript(path))
                leistrap.main.body.add(leistrap.Script({
                    otherAttr: { src: path }
                }));

        });
        return { on: event.invoke }
    }

    function updateScriptsCollection() {
        for (var script = 0; script < ls.main.allScripts.length; script++) {
            EXIST.push(ls.main.allScripts.item(script).src)
        }
    }

    function ExistScript(name) {
        var RESULT = false
        for (var item = 0; item < EXIST.length; item++) {
            if (EXIST[item].endsWith(name.replace(/\.\//g, ""))) {
                RESULT = true;
                break;
            }
        }
        return RESULT
    }
    return { exportsLeisObject, importsObject }
}
export { LeisFileAPI } 