var express = require("express")
var fs = require("fs")
var html = require("./rest")
var use = require("./index.js")
var port = 3000
var app = express()


app.get("/", function (req, res) {
    res.status(200)
    res.set("Content-type", "text/html")
    res.send(html.html)
})

app.get('/use/:setting', function (req, res) {
    console.log(req.params.setting);
})
app.listen(port, function () {
    console.log("leistrap start at http://localhost:%s", port)
})