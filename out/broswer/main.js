


leistrap.whenReady(function () {

    leistrap.event.invoke("calc", null, 50, 30)
    imports("file.js").on("data", function (c) {
        c(modal)
    })
    const modal = leistrap.Modal()
    modal.add(leistrap.P({ text: "element" }))

    modal.show()
    modal.setSize("50%", "70vh")

    this.addElements(modal, leistrap.Script())
    leistrap.event.handle("hey", function () {
        console.log("how are you doing ?");
    })

    console.log(this.content);
})

leistrap.render("main")
exports(function () {
    console.log("executed ", arguments.length);
}, "mainData")