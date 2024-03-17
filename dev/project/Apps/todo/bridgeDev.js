import { Ui5 } from "../uimodel/index.js"
import { Todo } from "./home.js"
import { leistrap } from "../../static/js/htmRender/leistrap.js"
import { leis } from "../../static/JsFun/PrimaryArray.js"
import { tasklist } from "./fnt/tasklist.js"
import { calendarView } from "./fnt/calendarView.js"
import { trdacking } from "./fnt/tracking.js"

const todoTask = Todo(
    [
        tasklist(leistrap),
        calendarView(leistrap),
        trdacking(leistrap)
    ],
    leistrap,
    Ui5,
    leis
)
export { todoTask }