import { BaseElement } from "../dist/baseElement.js";
import { LeisTable } from "../components/table.js";
import { tableOpera } from "../browser/leis.js";
/**
* leistrap.Table `Element` | `Component` definition
*/
class Table extends BaseElement {
    getTable() { return LeisTable }
}
class Thead extends BaseElement { }
class Th extends BaseElement { }
class Tr extends BaseElement { }
class Tbody extends BaseElement { }
/**
* leistrap.Td element definition
*/
class Td extends BaseElement {
    spanCol(num) { tableOpera.spanCol(this, num) }
    spanRow(num) { tableOpera.spanRow(this, num) }
}
class Tfoot extends BaseElement { }
export { Table, Thead, Th, Tr, Tbody, Td, Tfoot }