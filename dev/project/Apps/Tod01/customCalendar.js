import { leis } from "../../JsFun/PrimaryArray.js"
import { leistrap } from "../htmRender/allElement.js"
import { Calendar } from "../htmRender/calendar.js"

function setCalendar({ days, onInput, month, months }) {
    const xCalendar = leistrap.Card({ attr: { className: ["custom-calendar"] } })

    const init = leistrap.Calendar({ days, month, onInput, months })

    const xcl = leistrap.Card({
        content: [init.MainTb],
        parent: xCalendar
    })
    xcl.dt = init
    let [year, mth] = [init._cal.getFullYear(), init._cal.LM]

    const prev = leistrap.Button({
        parent: xCalendar,
        attr: { className: ["prev-month"] },
        eventType: "click",
        content: [
            leistrap.I({ attr: { className: ["bi bi-chevron-compact-left"] } }),
            leistrap.Span({ text: "Précedant" })
        ],
        eventOnce: function () {
            if (xcl.content.length > 0) {
                xcl.content[0].destroy()
                mth -= 1
                if (mth == -1) { mth = 11; year -= 1 }
                const xc = leistrap.Calendar({
                    days, fullYear: new Date(String(year)),
                    month: mth + 1, parent: xcl, onInput, months
                })
                xc.MainTb.content[1].attr.className += " leis-calendar-right "
                xcl.dt = xc
                xcl.CASCADE()
            }

        }
    })
    const next = leistrap.Button({
        parent: xCalendar,
        text: "Suivant",
        attr: { className: ["next-month"] },
        eventType: "click",
        content: [leistrap.I({ attr: { className: ["bi bi-chevron-compact-right"] } })],
        eventOnce: function () {
            if (xcl.content.length > 0) {
                xcl.content[0].destroy()
                mth += 1
                if (mth == 12) { mth = 0; year += 1 }
                const xc = leistrap.Calendar({
                    days, fullYear: new Date(String(year)),
                    month: mth + 1, parent: xcl, onInput, months
                })
                xc.MainTb.content[1].attr.className += " leis-calendar-left "
                xcl.dt = xc
                xcl.CASCADE()
            }

        }
    })

    return { Main: xCalendar, calendar: xcl }
}


class CustomTable {
    constructor(parent, fullYear, month) {
        this.point = leistrap.Div({ parent })
        leis.addClassList(this.point, "custom-calendar-container")
        this.fullYear = fullYear
        this.month = month
        this.#setCalendar()
    }

    #setCalendar() {
        const days = [1, 2, 3, 4, 5, 6, 0]
        this.fullYear = this.fullYear ? this.fullYear : new Date().getFullYear()
        this.month = this.month ? this.month : new Calendar().getMonth() + 1
        const cal = new Calendar(`${this.fullYear}`)
        const fullCal = cal.getFullCalendar(this.month)


        function clBtn(element) {
            body.content.forEach(item => { item.content.forEach(i => i.removeClass("active-date")) })
            day.setText(element.text)
            element.addClass("active-date")
        }
        const card = leistrap.Div({ parent: this.point })
        const yearInfo = leistrap.Div({ parent: card })
        leis.addClassList(yearInfo, "custom-yearinfo leis-flex leis-row lg-n")
        const day = leistrap.P({ parent: yearInfo })
        const month = leistrap.P({ parent: yearInfo, text: cal.Lmonths()[this.month - 1] })
        const year = leistrap.P({ text: this.fullYear, parent: yearInfo })

        leis.addClassList(card, "custom-calendar-card")
        const heading = leistrap.inRange(7, 0, i => { const h = leistrap.Div({ text: cal.Ldays()[days[i]].slice(0, 3) }); leis.addClassList(h, "custom-hg"); return h })
        const header = leistrap.Div({ content: heading, parent: card })

        const setDate = (col) => leistrap.inRange(7, 0, i => {

            const txt = fullCal[days[i]][col]
            if (/(prev_|next_)/gi.test(txt)) {
                const btn = leistrap.Button({ text: txt.replace(/(prev_|next_)/gi, "") })
                btn.otherAttr = { "class": "daysOff" }
                btn.addEvent("click", function () { clBtn(this) })
                return btn
            }
            else {
                const b = leistrap.Button({ text: txt, otherAttr: { "class": "custom-Date" } })
                b.addEvent("click", function () { clBtn(this) })
                return b
            }
        })

        const rows = leistrap.inRange(Object.keys(fullCal[0]).length, 0, i => { const r = leistrap.Div({ content: setDate(i) }); leis.addClassList(r, "custom-row leis-flex leis-row"); return r })

        const body = leistrap.Div({ parent: card, content: rows })
        leis.addClassList(header, "custom-header leis-flex leis-row")
        leis.addClassList(body, "custom-body leis-flex leis-column")
    }
}
export { setCalendar, CustomTable }