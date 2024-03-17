var fs = require("fs")

var readable = fs.createReadStream("./index.html")
var writable = fs.createWriteStream("./rest.js")

readable.on("data", (chunk) => {
    writable.write(`module.exports.html = \`${chunk.toString().replace(/`/gi, '\\`')}\``)
})
