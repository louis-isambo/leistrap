const myLog = leistrap.Div({ text: leistrap.MLorem(10) })


leistrap.event.handle("calc", function (event, a, b) {
    console.log(a * b, "that is the result !");
})
imports("file.js")
leistrap.event.invoke("index.html")
exports(myLog, "myLog")