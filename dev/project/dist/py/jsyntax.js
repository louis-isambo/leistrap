;
function JSyntax(txt) {
    var text = txt
    var cmnt = /\/\*[^\n]*(?=\*\/)\*\/+(\s|\b)*/gi;
    var eq = /};[ ]*(?=\=)\=/gi
    var eq2 = /\];[ ]*(?=\=)\=/gi
    var twoPoint = /;[ \s]*(?=\:)\:/gi;
    var twoPoint2 = /:[ \s]*(?=\;)\;/gi
    var br = /;[ \s]*(?=\})\}/gi
    var br2 = /;[ \s]*(?=\])\]/gi
    var br3 = /;[ \s]*(?=\))\)/gi
    // todo import
    var impCapture = /import+[^"]*(?=from)from+[^\n"]*(?=")"+[^"]*"/gi;
    // err1 import ; {} from 'module'
    var impErr1 = /import+[ \s](?=;+);+/gi;

    //todo ; sign

    var semi = /;+[ \s\n]*(?=;+)/gi
    var semi2 = /,+[ \s\n]*(?=;+);+/gi

    // todo [ 
    var brace = /\[[ \s\n]*(?=;+);+[ \s\n]*;*/
    const pattern = [
        { name: cmnt.test(txt), value: cmnt },
        { name: eq.test(txt), value: eq, rpc: "}=" },
        { name: eq2.test(txt), value: eq2, rpc: "]=" },
        { name: twoPoint.test(txt), value: twoPoint, rpc: ":" },
        { name: twoPoint2.test(txt), value: twoPoint2, rpc: ":" },
        { name: br.test(txt), value: br, rpc: "}" },
        { name: br2.test(txt), value: br2, rpc: "]" },
        { name: br3.test(txt), value: br3, rpc: ")" },
        // import
        { name: impErr1.test(txt), value: impErr1, rpc: "import" },
        // semi
        { name: semi.test(txt), value: semi, rpc: "" },
        { name: semi2.test(txt), value: semi2, rpc: "" },
        //brace
        { name: brace.test(txt), value: brace, rpc: "[" },

    ]

    pattern.forEach(item => {
        if (item.name) {
            txt.match(item.value).forEach(s => {
                text = text.replace(s, item.rpc ? item.rpc : "")
            })
        };
    })
    return text
}

module.exports = { JSyntax }

