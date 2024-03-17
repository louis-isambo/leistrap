
import { leistrap } from "../../static/js/htmRender/allElement.js"
import { __contentMain__, LgAddTodo } from "./home.js"



const LgContent = leistrap.Card({
    content: [
        leistrap.Paragrah({
            content: [leistrap.I({ attr: { className: ["bi bi-list-check"] } })],
            attr: { className: ["DA-IconLegend"] }
        }),
        leistrap.Paragrah({
            text: "Liste de tâches",
            attr: { className: ["DA-LegendTitle"] },
            content: [leistrap.Button({ text: "Ajouter", otherAttr: { "class": "DA-title-btn" } })]
        }),

        leistrap.Paragrah({
            text: "Ajouter et supprimer des tâches, cette fonctionnalité\
                    vous permet de mieux organiser vos activités quotidiennes d'une manière\
                    simple et efficace",
            attr: { className: ["DA-LegendSubTitle"] },

        })
    ],
    attr: { className: ["DA-LegendCard"] }
})

const todoLegend = leistrap.pageButton({
    attr: { className: ["DA-card", "leis-padding-16", "w-2", "DA-pointer"] },
    content: [LgContent],
    pageName: "todo",
    contentPage: leistrap.Div({ content: [__contentMain__] })

})
export { todoLegend, LgAddTodo }