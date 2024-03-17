leistrap.exportObject("highlight", (function () {
    var STP = (cl, txt) => `<span style="color:${cl}">${txt}</span>`
    var STPC = (n, txt) => `<span class="${n}">${txt ? txt : ''}</span>`

    function Hlight(txt) {
        "use strict"
        var str = /"[^"]*(?=")"+(\s|\b)*/gi
        var hasStr = str.test(txt)
        var cmnt = /\/\*[^/]*(?=\*\/)\*\/+(\s|\b)*/gi
        var hascomnt = cmnt.test(txt)
        var varia = "red"
        function rpc(list, txt) {
            let text = txt
            if (hasStr) { txt.match(str).forEach(s => { text = text.replace(s, STP("#ce8455", `${s}`)) }) }
            if (hascomnt) { txt.match(cmnt).forEach(s => { text = text.replace(s, STP("#31dc31", `${s}`)) }) }
            list.forEach(item => { text = text.replace(item.trpc, STP(item.rpc, item.i)) })
            return text
        }
        const trpc = [
            { "trpc": /leistrap/g, "rpc": "#3bc9b0", "i": "leistrap" },
        ]

        const keys = {
            "const": varia, "let": varia, "var": varia,
            "nl": () => "<br/>",
            "tb": () => STPC("tab"),
            ":": () => STPC("coli", ":"),
            "=": () => STPC("coli", "="),
            "function": () => STPC("fun", "function"),
            "20": () => String.fromCharCode(32),
            "return": "red"
        }
        let getKeys = rpc(trpc, txt)
        Object.keys(keys).forEach(item => {
            if (typeof keys[item] === "function") {
                getKeys = getKeys.replace(new RegExp(`%${item}`, "gi"), keys[item]())
            }
            else { getKeys = getKeys.replace(new RegExp(`%${item}`, "gi"), STP(keys[item], item.replace(/_/g, " "))) }
        })

        const c = leistrap.Div({ content: [leistrap.Div({ innerHtml: getKeys })] })
        leistrap.leis.addClassList(c, "code-example")
        return c
    }
    Hlight.convert = function (text) {
        var tab = [32, 32, 32, 32].map(i => String.fromCharCode(i)).join("")
        var spc = [32].map(i => String.fromCharCode(i)).join("")
        var nl = /\n/g
        var keywords = ["var", "const", "let", "function", "return"]
        function getKeysWords(txt, kys) {
            txt = txt.replace(new RegExp(nl, "g"), "%nl")
            txt = txt.replace(new RegExp(tab, 'g'), "%tb")
            txt = txt.replace(new RegExp(spc, "g"), "%20")
            kys.forEach(item => { txt = txt.replace(new RegExp(`${item}+(%20|\\s)`, "g"), `%${item}%20`) })

            return txt
        }
        return getKeysWords(text, keywords)
    }
    Hlight.highKeys = function (txts, cls) {
        var keysHigh = /(?<=##)\w*/gi
        let TH = txts
        if (keysHigh.test(txts)) {
            TH.match(keysHigh).forEach(item => TH = TH.replace(new RegExp(`##${item}`, "gi"), STPC(cls, item)))
            return leistrap.Div({ innerHtml: TH })
        }
        else { return leistrap.Div({ text: txts }) }
    }
    return Hlight
})())