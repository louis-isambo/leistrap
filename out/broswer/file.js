imports("file2.js").on("myLog", (o) => otherElemnt.add(o))
const mainData = imports("main.js")

const otherElemnt = leistrap.Div()
otherElemnt.text = "je suis bien "
function hello(modal) {

    const tables = leistrap.Table().getTable()
    const myTable = new tables()
    myTable.insertTable(10, 50)
    modal.add(myTable)
    modal.add(otherElemnt)
    modal.setSize("90%", "80vh")

}

mainData.on("mainData", function (f) {
    f(1, 2, 3, 4)
})

exports(hello, "data")