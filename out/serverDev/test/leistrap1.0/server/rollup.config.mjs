import fs from "fs"

var v = ""

function ise(p, v) {
    var read = fs.createReadStream(p)
    read.on("data", function (chunk) {
        v += chunk.toString("base64url")
    })
}

// var w = fs.createWriteStream("./rest.js")

// var img = fs.createReadStream("./leis.jpg")

// img.on("data", function (chunk) {
//     w.write(`\n var leis = "data:image/jpg;base64,${chunk.toString("base64url")}"`)
// // })
// var read = fs.createReadStream('./index.html')
// read.on("data", function (chunk) {

//     w.write(`module.exports.html = \`${chunk.toString().replace(/`/gi, '\\`')}\``)
// })

// function i(p){
//     var img = fs.createReadStream("./leis.jpg")

//     img.on("data", function (chunk) {
//     w.write(`\n var leis = "data:image/jpg;base64,${chunk.toString("base64url")}"`)
// })
// }
function img() {
    return {
        name: "plugin-css",
        transform: async function (code, id) {
            if (id.endsWith(".jpg")) {

                return {
                    code: `
                    import {imgF} from "./rest.js"
                    imgF["luis"] = \`${id} \`
                    
                    `,
                    map: { mapping: "" }
                }


            }
            else {
                return null
            }
        }
    }
}

export default {
    input: "./index.js",
    output: {
        file: "./bundle.js",
        format: "cjs"
    },
    plugins: [
        img()
    ]
}