

(function () {
    "use strict";

    const mt = leistrap.Table().getTable()
    const myTable = new mt()
    myTable.insertTable(10, 10)


    const mt1 = leistrap.Table().getTable()
    const myTable1 = new mt()
    myTable1.insertTable(10, 50)
    myTable1.getColumn(1).setStyle("background: #000; color:#fff ")
    myTable1.getColumn(2).setStyle("background: green; color:#000 ")
    myTable1.getColumn(3).setStyle("background: gray; color:#000 ")
    myTable1.getColumn(10).setStyle("background: orange; color:#000 ")
    myTable1.getRow(10).setStyle("background: orange; color:#000 ")
    const main = leistrap.Div({
        content: [
            leistrap.API.txt.help,
            myTable,
            myTable1
        ]
    })
    leistrap.API.table_content.add(main)

})()