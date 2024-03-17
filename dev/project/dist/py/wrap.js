

const fs = require("fs")
const JSyntax = require("./jsyntax.js").JSyntax

function Wrap(txt) {
    "use strict"
    var str = /"[^"]*(?=")"+(\s|\b)*/gi
    var hasStr = str.test(txt)

    var cmnt = /\/\*[^/]*(?=\*\/)\*\/+(\s|\b)*/gi;
    var cmnt2 = /\#&2\*[^/]*(?=\*\#&2)\*\#&2+(\s|\b)*/gi
    var sCmnt = /\/\/+[^\n]*/gi;
    var modImport = /import+[^"]*(?=from)from+[^\n"]*(?=")"+[^"]*"/gi;
    var modExport = /export+[^}]*(?=})}(;|)/gi;
    var hasSCmnt = sCmnt.test(txt)
    var hascomnt = cmnt.test(txt)


    let test = [
        { name: hascomnt, value: cmnt },
        { name: hasSCmnt, value: sCmnt },
        { name: modExport.test(txt), value: modExport },
        { name: modImport.test(txt), value: modImport },
    ]
    function rpc(list, txt) {
        let text = txt

        test.forEach(item => {
            if (item.name) {
                txt.match(item.value).forEach(s => {
                    text = text.replace(s, item.rpc ? item.rpc : "")
                })
            };
        })

        list.forEach(item => { text = text.replace(item.trpc, item.rpc) })
        return text
    }
    return rpc([], txt)
}

function exe_(cbk, sms) {

    const read = fs.createReadStream(process.argv[3])
    const out2 = fs.createWriteStream(process.argv[4])

    var outContent = ""
    read.on("data", function (chunk) {
        outContent += chunk.toString()
    })

    read.on("end", function () {
        out2.write(cbk(outContent))
    })
    console.log(sms);

}

if (process.argv[2] == "wrap") {
    exe_(Wrap, "wrapped !")
}

if (process.argv[2] === "jsyntax") {
    exe_(JSyntax, "successfully checked Jsyntax !")
}
