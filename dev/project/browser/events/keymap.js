import { obj } from "./../../../deps/PrimaryArray.js"


function Bind(widget, key, callback, name) {

    var k = keymap[key]
    const e = statusKeys[k.status]({
        func: callback,
        events: k.values,
        prefix: k.prefix,
    });
    widget.addEvent(k.event, e, name);
}

const statusKeys = {

    // check optional keyMap 
    optional(o) {
        return function (event) {
            // event.preventDefault();
            const e = {};
            o.events.forEach(ev => e[e] = undefined);
            o.func.call(this, e);

            var px = !o.prefix
            var pxC = obj.copyArray(o.events, false)
            if (!px) {
                pxC = o.events.map(p => {
                    return `${o.prefix.toLowerCase()}${p.toLowerCase()}`
                })
            }

            if (obj.has(event.key.toLowerCase(), pxC)) {
                var pf = event.key.slice(pxC.length + 1, event.key.length)
                if (e[event.key] && px) e[event.key]();
                if (e[pf.toLowerCase()] && !px) e[pf.toLowerCase()]();
            }

        }

    },

    // signal keyMap

    signal(o) {
        return function (event) {
            var option = {};
            if (obj.has(event.key.toLowerCase(), o.events)) o.func(option);
        }
    }
}

const keymap = {
    "<arrow>": { values: ["up", "down", "left", "right"], type: "keyboard", event: "keydown", status: "optional", prefix: "Arrow" },
    "<return>": { values: ["enter"], type: "keyboard", event: "keyup", status: "signal" },
}

export { Bind }
