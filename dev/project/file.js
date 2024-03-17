
function helloWorld(a, b) {
    return b * a
}

console.log('file imported');


imports("index.js").on("indexData", function (fnc) {
    fnc(2, 2)
})
exports(helloWorld, "data")