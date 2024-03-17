import { leistrap } from "../../static/js/htmRender/allElement.js"
import { Colorpalette } from "../Color/color.js"

const __SUBTITLES__ = []
let COLOR_DEFAULT = "color"

function setGItems(list, callback) {
    const [o, i] = [list, []]
    o.forEach(pr => {
        i.push(leistrap.Li({
            content: [leistrap.Span({ attr: { className: ["radio"] } }),
            leistrap.Span({ text: pr }),],
            attr: { className: ["GI"] },
            eventType: "click",
            eventOnce: function () {
                this.lsParent.content.forEach(i => i.removeClass("checked"));
                this.addClass("checked")
                GIM.checked = pr
                if (typeof callback === "function") {
                    callback.call(this, pr)
                }
            }
        }))
    })
    const GIM = leistrap.GroupItem({ items: i, attr: { className: ["Gp"] } })
    return GIM
}

function FormTodo(_parent) {
    let i = 0
    //main container
    const formContainer = leistrap.Card({ attr: { className: ["contentP-Default"] } })
    // form card
    const FormCd = leistrap.Card({
        attr: { className: ["DA-form-card"] },
        parent: formContainer
    })
    const cd0 = leistrap.Card({ parent: FormCd })

    // task title input
    const title = leistrap.Input({
        otherAttr: {
            type: "text",
            placeholder: "Titre de la tâche",
            "class": "DA-todoInput"
        },
        eventType: "focus",
        eventOnce: function () {
            FormCd.setStyle("margin:0")
            cd.setStyle("margin:0")
            result.show()
        },
        parent: cd0,
    })

    title.addEvent("keyup", function (target) {
        disTitle.setText(`Titre : ${this.getAttr("value")}`)
        getDataTask.title = this.getAttr("value")
        target.keyCode === 13 ? addComment.getAttr("focus") : undefined
    })

    const btnSubTodo = leistrap.Card({
        attr: { className: ["DA-add", "sub-addCard"] },
        content: [
            leistrap.Paragrah({
                content: [iconPlus],
                attr: { className: ["DA-addIcon"] }
            }),
            leistrap.Paragrah({
                text: "Ajouter une nouvelle sous tâche",
                attr: { className: ["DA-addText", "subTodo"] }
            })
        ],
        parent: FormCd,
        eventType: "click",
        eventOnce: function () {
            const NewSubT = leistrap.Li()
            subTitleCd.addItem(NewSubT)

            const newInput = leistrap.Input({
                otherAttr: {
                    type: "text",
                    placeholder: `Titre du sous tâche ${i > 0 ? `N° ${i}` : ''}`,
                    "class": "DA-todoInput"
                },
                parent: cd0,
                eventType: 'keyup',
                eventOnce: function (e) {
                    NewSubT.setText(this.getAttr("value"))
                    sb.setText("Sous titres")
                    e.keyCode === 13 ? addComment.getAttr("focus") : undefined
                }
            })
            __SUBTITLES__.push(newInput)
            i += 1
            cd0.CASCADE()
        }
    })

    const cd = leistrap.Card({
        attr: { className: ["DA-form-card"] },
        parent: formContainer
    })

    const addComment = leistrap.Textarea({
        otherAttr: {
            placeholder: "Ajouter un commentaire....",
            "class": "DA-todoInput DA-20vh"
        },
        parent: cd,
        eventType: "input",
        eventOnce: function () {
            ct.setText("Commentaire")
            commentCd.setText(this.getAttr("value"))
            getDataTask.comment = this.getAttr("value")
        }
    })


    const time = leistrap.Button({
        attr: { className: ["DA-tapBtn"] },
        content: [
            leistrap.I({ otherAttr: { "class": "bi bi-alarm" } }),
            leistrap.Span({ text: "Temps" }),
        ]
    })
    const prio = leistrap.Button({
        attr: { className: ["DA-tapBtn"] },
        content: [
            leistrap.I({ otherAttr: { "class": "bi bi-award" } }),
            leistrap.Span({ text: "Priorité" }),
        ]
    })

    const color = leistrap.Button({
        attr: { className: ["DA-tapBtn"] },
        content: [
            leistrap.I({ otherAttr: { "class": "bi bi-palette" } }),
            leistrap.Span({ text: "Colours" }),
        ]
    })

    const priece = leistrap.Button({
        attr: { className: ["DA-tapBtn"] },
        content: [
            leistrap.I({ otherAttr: { "class": "bi bi-paperclip" } }),
            leistrap.Span({ text: "Pièces-jointes" }),
        ]
    })
    const calendar = leistrap.Calendar({
        days: ['Lundi', "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
        months: [
            "Janvier",
            "Février",
            "Mars",
            "Avril",
            "Mai",
            "Juin",
            "Juillet",
            "Août",
            "Septembre",
            "Octobre",
            "Novembre",
            "Décembre"
        ]
    })


    function setTime() {

        const cd = leistrap.Card({
            attr: { className: [] }
        })

        const cdx = leistrap.Card({ parent: cd, attr: { className: ["DA-card"] } })
        const closeT = leistrap.CloseBtn()
        const timeList = leistrap.GroupItem({
            parent: cdx,
            items: leistrap.inRange(13, 1, i => leistrap.Li({ text: `${i} ${leistrap.lorem.slice(0, 25)}` }))
        })

        const getTimeDrop = leistrap.DropDown({
            attr: { className: [""] },
            parent: cd,
            caption: `${new Date().getHours()}:${new Date().getMinutes()}`,
            btnType: "light",
            items: [
                leistrap.Span({
                    text: "Ajouter"
                })
            ]
        })

        return cd
    }

    // repeat 
    const repeatList = [
        "Tous le jours",
        "Toutes les semaine",
        "Tous les mois",
        "Certains jours de la semaine"]

    const repeat = setGItems(repeatList,
        function (value) {
            repeatT.setText("Répétér");
            repeatC.setText(value)
            getDataTask.repeat_id = repeatList.indexOf(value) + 1
        }
    )

    const accordienTime = leistrap.Accordion({
        accHeader: leistrap.Paragrah({ text: "Le temps" }),
        accBtn:
            [
                leistrap.Button({
                    content: [
                        leistrap.I({ otherAttr: { "class": "bi bi-calendar" } }),
                        leistrap.Span({ text: "Date" }),
                    ]
                }),
                leistrap.Button({
                    content: [
                        leistrap.I({ otherAttr: { "class": "bi bi-alarm" } }),
                        leistrap.Span({ text: "Temps" }),
                    ]
                }),
                leistrap.Button({
                    content: [
                        leistrap.I({ otherAttr: { "class": "bi bi-repeat" } }),
                        leistrap.Span({ text: "Répéter" }),
                    ]
                })
            ]
        ,
        accPanel: [
            leistrap.Card({ text: "Date", content: [calendar] }),
            leistrap.Card({ text: "Temps", content: [setTime()] }),
            leistrap.Card({
                text: "Répéter",
                content: [repeat]
            })
        ],
        props: { className: ['DA-acc'] }
    })

    const timeCd = leistrap.Card({ content: [accordienTime], attr: { className: ["DA-tapCard"] } })
    const colorP = Colorpalette(function (v) {
        re._conf.style[COLOR_DEFAULT] = `${v}`
        // getDataTask.color[COLOR_DEFAULT] = `${v}`

    },
        function (v) {
            if (typeof window.electronAPI !== "undefined") {
                window.electronAPI.addUserColor(v)
            }
        }
    )
    const prioList = ["Très élévée", "Elévée", "Moyenne", "Basse prioriité", "Sans priorité"]

    const prioGI = setGItems(prioList, function (value) {
        pt.setText("Priorité")
        prioRe.setText(value)
        getDataTask.prority_id = prioList.indexOf(value) + 1
    })

    const prioCd = leistrap.Card({ text: "Priorité", content: [prioGI.MainG], attr: { className: ["DA-tapCard"] } })

    const colorCd = leistrap.Card({
        text: "Coleurs",
        attr: { className: ["DA-tapCard"] },
        content: [
            leistrap.Button({
                text: "Arrière-plan",
                attr: { className: ["leis-btn", 'leis-btn-secondary '] },
                eventType: "click",
                eventOnce: function () { COLOR_DEFAULT = "backgroundColor" }
            }),
            leistrap.Button({
                text: "Coluer de texte",
                attr: { className: ["leis-btn", 'leis-btn-secondary '] },
                eventType: "click",
                eventOnce: function () { COLOR_DEFAULT = "color" }
            }),
            colorP
        ]
    })
    const prieceCd = leistrap.Card({ text: "Pièces-jointes", attr: { className: ["DA-tapCard"] } })

    const menuTab = leistrap.TabPage({
        tabLink: [time, prio, color, priece],
        tabContent: [timeCd, prioCd, colorCd, prieceCd],
        attr: { className: ["DA-menuForm"] },
        parent: cd
    })

    // result 


    const saveTaskBtn = leistrap.Button({
        attr: { className: ["leis-btn", 'leis-btn-primary'] },
        text: "Enregister",
        parent: formContainer,
        eventType: "click",
        eventOnce: function () {
            // back end function send data 
            const { ...colors } = getDataTask.color
            getDataTask.color = `${colors.backgroundColor}; ${colors.color}`

            __SUBTITLES__.forEach(item => getDataTask.subtitles += `${item.getAttr("value")}&#||`)
            window.electronAPI ? window.electronAPI.saveTask(getDataTask) : undefined
            getTask([getDataTask], tasksDisplay)
            getDataTask = initData()
            leistrap.getPageControler().getAttr("click")
        }
    })
    const disTitle = leistrap.P()
    const sb = leistrap.P()
    const subTitleCd = leistrap.List({ attr: { id: "Result-subTitle" } })
    const commentCd = leistrap.P()
    const ct = leistrap.P()
    const pt = leistrap.P()
    const prioRe = leistrap.P()
    const repeatT = leistrap.P()
    const repeatC = leistrap.P()
    const dateT = leistrap.P()
    const dateC = leistrap.P()
    const re = leistrap.Card({
        content: [
            disTitle,
            sb,
            subTitleCd,
            pt,
            prioRe,
            repeatT,
            repeatC,
            ct,
            commentCd,
            dateT,
            dateC,
        ]
    })
    const result = leistrap.Card({
        attr: { className: ["DA-form-card", "DA-result-form"] },
        parent: formContainer,
        content: [re]
    })
    return formContainer
}

const iconPlus = leistrap.Paragrah({
    content: [leistrap.I({ otherAttr: { "class": "bi bi-plus-lg" } })],
    attr: { className: ["ic"] }
})

const btnAddTodo = leistrap.Card({
    attr: { className: ["DA-add"] },
    content: [
        leistrap.Paragrah({
            content: [iconPlus],
            attr: { className: ["DA-addIcon"] }
        }),
        leistrap.Paragrah({ text: "Ajouter une nouvelle tâche", attr: { className: ["DA-addText"] } })
    ],
})

const LgAddTodo = leistrap.pageButton({
    contentPage: leistrap.Div({ content: [FormTodo()] }),
    content: [btnAddTodo],
    pageName: "formAddTodo",
})
LgAddTodo.noP = true

export { LgAddTodo }