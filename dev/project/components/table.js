import { leistrap } from "../dist/leisWidget.js"
import { leis, tableOpera } from "../browser/leis.js"
import { obj } from "../../deps/PrimaryArray.js"
import { BaseElement } from "../dist/baseElement.js"
import { Tr } from "../elements/table.js"

// leisTable component
/**
 * leistrap `TableCell` component definition
 */
class TableCell {
    #props = { rowspan: 1, colspan: 1 }
    constructor(element, column) {
        this.cell = element
        this.column = column
    }
    /**
     * add content
     * @param {BaseElement} element 
     */
    add(element) { this.cell.add(element) }
    remove(element) { this.cell.remove(element) }
    removeAll() { this.cell.removeAll() }
    addAttr(name, value) { this.cell.addAttr(name, value) }
    addClass(value) { this.cell.addClass(value) }
    addEvent(event, callback, name, option) { this.cell.addEvent(event, callback, name, option) }
    removeClass(token) { this.cell.removeClass(token) }
    toggleClass(value) { this.cell.toggleClass(value) }
    getText() { return this.cell.getText() }
    setText(value) { this.cell.setText(value) }
    destroy() { this.cell.destroy() }

    spanCol(num) {
        this.cell.spanCol(num)
        tableOpera.adaptTableCol(this.cell, this.cell.lsParent, this, num)
        this.#props.colspan = num;
        return this
    }
    setStyle(cssValues) { this.cell.setStyle(cssValues); return this }

    spanRow(num) {
        const r = () => tableOpera.spanRow(this.cell, num)
        const _rem = w => { w.destroy() }
        const pos = leis.getElementPosition(this.cell, this.column.column)
        let [items, _c] = [[], 1]

        this.column.column.forEach((item, i) => {
            if (i > pos) { _c++; obj.arrAddWhen(items, item, _c, num) }
        })

        items.forEach(data => {
            let posi = leis.getElementPosition(data, data.lsParent.content)
            data.lsParent.content.forEach((cell, i) => {
                if (i >= posi) { obj.arrAddWhen(false, cell, i, this.#props.colspan, _rem) }
            })
        })
        obj.isEmpty(items) ? leis.addPW(true, this.cell, () => {
            obj.after(200, () => { this.spanRow(num) })
        }, this.cell.getPropWait()) : r()
    }
    /**
     * sapn cell
     * @param {number} column the number  of colspan  
     * @param {number} row  the number of rowspan 
     */
    span(column = 1, row = 1) {
        this.#props.colspan = column;
        this.#props.rowspan = row;
        this.spanCol(column);
        this.spanRow(row)
    }
}

/**
 * leistrp `ColumunTable` component definition
 */
class ColumnTable {
    #heading
    #table
    constructor(column, heading, table) {
        this.column = column
        this.#heading = heading
        this.#table = table
    }
    /**
     * update widget style
     * @param {string} cssValues css style 
     */
    setStyle(cssValues) { tableOpera.forEachCol(this.column, (item) => { item.setStyle(cssValues) }) }
    /**
     * adds className for Each column element
     * @param {string} name className 
     */
    addClass(name) { tableOpera.forEachCol(this.column, (item => { item.addClass(name) })) }
    /**
     * removes `token className` for Each column element
     * @param {string} token className 
     */
    removeClass(token) { tableOpera.forEachCol(this.column, (item => { item.removeClass(token) })) }
    toggleClass(name) { tableOpera.forEachCol(this.column, (item => { item.toggleClass(name) })) }
    getAttr(name) { tableOpera.forEachCol(this.column, (item => { item.getAttr(name) })) }
    setText(value) { tableOpera.forEachCol(this.column, (item => { item.setText(value) })) }
    /**
     * removes the current column
     */
    drop() {
        tableOpera.dropColumn(this.column, this.#heading);
        this.#table.columnCount -= 1; console.log(this.#table.columnCount);
    }
}
/**
 * leistrap quick `Table componenet` design helps you to create a table quickly
 */
class LeisTable {
    #table;
    #Tcontent
    #prop
    #isInit
    /**
     * leistrap `quick table `widget
     * @param {BaseElement} parent table parent 
     */
    constructor(parent, NT) {
        this.parent = parent
        this.MainT = leistrap.Card({ parent })
        this.point = this.MainT
        this.#table = !NT ? leistrap.Table({ parent: this.MainT }) : leistrap.Div({ parent: this.MainT })
        this.#isInit = false
        leis.addClassList(this.MainT, !NT ? "leis-table-container" : NT.cdCls)
        leis.addClassList(this.#table, !NT ? "leis-table" : NT.tablCls)

    }
    /**
     * create a quick table by enumerating the number of `columns` and `rows`
     * @param {number} cols columns number
     * @param {number} rows the number of rows to be inserted  
     */
    insertTable(cols, rows, option) {
        if (!option) {
            option = {
                "cell": { elem: leistrap.Td, cls: "leis-table-data" },
                "heading": { elem: leistrap.Th, cls: "leis-table-heading" },
                "row": { elem: leistrap.Tr, cls: "leis-table-row" },
                "header": { elem: leistrap.THead, cls: "leis-table-head" },
                "body": { elem: leistrap.Tbody, cls: "leis-table-body" }

            }
        }
        if (this.#isInit) { throw new Error("tabel is already created") }
        if (!this.#isInit) {
            const dfv = []
            this.rowCount = rows
            this.columnCount = cols
            const setCells = (num, i) => leistrap.inRange(num, 0, col => {
                const df = leistrap.P({ text: `data ${col + 1} x ${i + 1}` });
                dfv.push(df);
                const d = option.cell.elem({ content: [df] });
                leis.addClassList(d, option.cell.cls); leis.addClassList(df, "leis-table-defaultValue");
                return d
            })
            const contHeader = leistrap.inRange(cols, 0, col => {
                const df_ = leistrap.P({ text: `heading ${col + 1}` }); dfv.push(df_);
                const t = option.heading.elem({ content: [df_] }); leis.addClassList(t, option.heading.cls);
                leis.addClassList(df_, "leis-table-defaultValue"); return t
            })
            const rowsCount = leistrap.inRange(rows, 0, col => {
                const tr = option.row.elem({ content: setCells(cols, col) });
                leis.addClassList(tr, option.row.cls); return tr
            })

            const header = option.header.elem({ parent: this.#table, content: contHeader })
            const bodyTable = option.body.elem({ parent: this.#table, content: rowsCount })
            this.#Tcontent = bodyTable
            this.#prop = { header, bodyTable, count: 0 }
            leis.addClassList(header, option.header.cls)
            leis.addClassList(bodyTable, option.body.cls)
            this.clear = function () { obj.tryCode(() => { dfv.forEach(itm => itm.destroy()) }) }

            this.addRow = function (num, data) {
                if (leis.hasConf(this.#table)) {
                    const r = leistrap.inRange(num, 0, col => {
                        const tr = option.row.elem({ content: setCells(cols, col + this.rowCount) });
                        leis.addClassList(tr, option.row.cls); return tr
                    })
                    this.#Tcontent.addElements(...r)
                    if (data) { this.insertData(data, this.rowCount + 1); this.rowCount += num }
                } else { leis.addPW(true, this.#table, () => { this.addRow(num, data) }, this.#table.getPropWait()) }

            }
            this.#isInit = true
        }
    }
    /**
     * inserts data 
     */
    insertData(data, rowCount) {
        tableOpera.insertData(data, this.#Tcontent, this.#prop, rowCount);
    }
    /**
     * get a table cell
     * @param {number} column column number
     * @param {number} row  row number
     * @returns {TableCell}
     */
    getCell(column, row) {
        return new TableCell(
            tableOpera.getCell(
                this.#Tcontent,
                column,
                row),
            this.getColumn(column))
    }
    /**
     * gets a row
     * @returns {Tr}
     */
    getRow(num) { return tableOpera.getRow(this.#Tcontent, num) }
    getColumn(num) {
        return new ColumnTable(tableOpera.getColumn(
            this.#Tcontent,
            num,
            this.#prop.headingList),
            this.#prop.header.content[num - 1], this)
    }
    /**
     * config the heading
     * @param {string[]} headingList Heading list 
     */
    setHeading(headingList) {
        tableOpera.setHeading(this.#prop.header, headingList);
        this.#prop.headingList = headingList
    }
    update(row, data) {
        if (data) {
            data.forEach((d, i) => {
                if (d.text) {
                    const l = this.getCell(i + 1, row)
                    l.setText(d.text)
                }
                if (d.widget) {
                    const l = this.getCell(i + 1, row)
                    l.removeAll()
                    l.add(d.widget)
                }
            })
        }
    }
    setSize(width, height) {
        if (width) {
            this.MainT.setStyleProp("width", width)
        }
        if (height) {
            this.MainT.setStyleProp("height", height)
        }
    }
    /**
     * add row
     * @param {number} num 
     * @param {[]} data 
     */
    addRow(num, data) { throw new Error("table not created") }
    /**
     * romove the default value
     */
    clear() { throw new Error("table not created") }
    /**
     * adds a new class name to the table
     */
    addClass(name) { if (name) { this.#table.addClass(name) } }
}

export { LeisTable }