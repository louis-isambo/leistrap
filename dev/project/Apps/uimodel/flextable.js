/**
     * FlexTable Ui uses the Div as table to create more useble
     * table
     */
const Nt = { cdCls: "flexTable-container", tablCls: "flexTable-table" }
const FT_option = {
    "cell": { elem: leistrap.Div, cls: "flexttable-data cell" },
    "heading": { elem: leistrap.Div, cls: "flexttable-heading cell" },
    "row": { elem: leistrap.Div, cls: "flexttable-row leis-flex leis-row" },
    "header": { elem: leistrap.Div, cls: "flexttable-head leis-flex leis-row" },
    "body": { elem: leistrap.Div, cls: "flexttable-body leis-flex leis-column" }

}
class FlexTable {
    #table;
    constructor(parent) {
        this.#table = new leistrap.widgets.LeisTable(undefined, Nt)
        this.point = leistrap.Div({ content: [this.#table], parent })
    }
    setTable(cols, rows) { this.#table.insertTable(cols, rows, FT_option) }
    getCell(col, row) { return this.#table.getCell(col, row) }
    getRow(row) { return this.#table.getRow(row) }
    insertData(data, rowCount) { this.#table.insertData(data, rowCount) }
    getColumn(num) { return this.#table.getColumn(num) }
    setHeading(data) { this.#table.setHeading(data) }
}