import { leis } from "../../static/JsFun/PrimaryArray.js"
import { leistrap } from "../../static/js/htmRender/allElement.js"
import { Customer } from "./custom.js"
import { LgAddTodo } from "./form.js"
import { angles } from "./sidebars/sideLeft.js"


/* Main content */
const __contentMain__ = leistrap.Card()
leis.addClassList(__contentMain__, "contentP-Default todoContainer-parent")

/*center content */
const todoContentCenter = leistrap.Card({ parent: __contentMain__ })
leis.addClassList(todoContentCenter, "todoContentCenter")

/*left content */
const contentCLeft = leistrap.Card({ parent: todoContentCenter })
leis.addClassList(contentCLeft, "contentC sideDisplayLeft")

/* Right content */
const contentCRight = leistrap.Card({ parent: todoContentCenter })
leis.addClassList(contentCRight, "contentC sideDisplayRight")

/* sidebar left */
const agls = angles(contentCLeft, leistrap.Div({ content: [LgAddTodo.button] }))

const color = Customer.IconsDropDown()
color.setSize('450px')
/*main center content */
const mainCenter = leistrap.Div({
    parent: contentCLeft,
    content: [color]
})
const sidebar = leistrap.Card({
    parent: __contentMain__,
    attr: { className: ["Todosidebar"] },
    content: [agls.angles, agls.addNewFolder]
})
export { __contentMain__, LgAddTodo }