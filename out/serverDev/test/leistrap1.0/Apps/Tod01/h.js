import {
    IconsDropDown,
    ModalMiddle,
    ModalRight,
    TextInput,
    closeButton,
    colorDropDown,
    displayFolder,
    displayAllFolders,
    getTask,
    displayAllTaskList
} from "../custom.js";
import { leistrap } from "../htmRender/allElement.js";
import { Colorpalette } from "./color.js";
import { setCalendar } from "./customCalendar.js";


let _ID = 0
let COLOR_DEFAULT = "backgroundColor"
const __SUBTITLES__ = []
// main display all task
function initFolders() {
    return { name: "" }
}
function initTaskList() {
    return {
        name: "",
        icon: "",
        color: "",
        folders_id: null
    }
}
function initData() {
    return {
        title: "",
        comment: "",
        date: "UNKNOWN",
        time: "UNKNOWN",
        repeat_id: null,
        prority_id: null,
        color: { backgroundColor: "default", color: "default" },
        attachment_id: 1,
        subtitles: "",
        tasks_list_id: null
    }
}

let getDataTask = initData()
let getFolders = initFolders()
let getTaskList = initTaskList()

const tasksDisplay = leistrap.Card({
    attr: { className: ["taskAccordien-container"] },
    content: [leistrap.Paragrah({ text: "Toutes les tâches" })],
})

/*
main content page
 */
const __contentMain__ = leistrap.Card({
    attr: {
        className: ["contentP-Default", "todoContainer-parent"]
    },
})

// centered content
const todoContentCenter = leistrap.Card({
    attr: {
        className: ["todoContentCenter"]
    },
    parent: __contentMain__
})


const contentCLeft = leistrap.Card({
    parent: todoContentCenter,
    attr: {
        className: ["contentC", "sideDisplayLeft"]
    },
})
const contentCRight = leistrap.Card({
    attr: {
        className: ["contentC", "sideDisplayRight"]
    },
    parent: todoContentCenter
})
const _content = leistrap.Card({
    content: [
        leistrap.Paragrah({
            text: "Ajouter ou Supprimer une tâche",
            attr: { className: ["DA-wel"] }
        }),
    ]

})

// sidebar and Tabpage

function setBtnTab(ic, text, addCls) {
    return leistrap.Button({
        content: [
            leistrap.I({ otherAttr: { "class": `bi bi-${ic}` } }),
            leistrap.Span({ text: text })
        ],
        attr: { className: ["btnTabTodoIcs", addCls ? `${addCls}` : ""] }
    })
}


const tasksAdd = leistrap.TabPage({
    tabLink: [
        setBtnTab("calendar2-range-fill", "Aujourd'hui"),
        setBtnTab("sunrise-fill", "Demain"),
        setBtnTab("calendar-day-fill", "Prochains jours"),
        setBtnTab("envelope-paper-fill", "Boîte de récept..."),
        setBtnTab("tags-fill", "Étiquettes"),
        setBtnTab("check2-square", "Términées", "complatedTasks"),
        setBtnTab("trash-fill", "Supprimées", "deletedTasks"),
    ],

    tabContent: [
        _content,
        leistrap.Card({ text: "Demain" }),
        leistrap.Card({ text: "les Prochains Jours" }),
        leistrap.Card({ text: "La boite de récept..." }),
        leistrap.Card({ text: "Les Étiquettes" }),
        leistrap.Card({ text: "les taches terminées" }),
        leistrap.Card({ text: "Les tâches supprimées" }),
    ],
    attr: { className: ["todoTabsIcs"] },
    contentClass: ["tasksAddtabContent"],
    useContentParent: contentCLeft,
})

const addNewList = setBtnTab("plus-square-dotted", "Nouvelle liste", "addNewList")

// form add new list

const __NewList = ModalMiddle({
    className: "middleContentPop",
    title: "Ajouter une liste",
    header_className: 'addListPop'
})

const icsList = IconsDropDown(function (e) { getTaskList.icon = `${e}` })
const inputList = TextInput({ placeholder: "Titre de tâche" })

const InputListName = leistrap.Paragrah({
    attr: { className: ["InputListName"] },
    content: [icsList, inputList]
})


const ListFolders = leistrap.DropDown({
    caption: "Aucun",
    btnType: "light",
    attr: { className: ["folderDrop"] },
    btnClass: ["folderDropBtn"]
})

const OtherInputList = leistrap.GroupItem({
    items: [
        leistrap.Li({
            content: [leistrap.Paragrah({ text: "Couleur" }), colorDropDown((e) => { getTaskList.color = e })]
        }),
        leistrap.Li({
            content: [leistrap.Paragrah({ text: "Dossier" }),
            ListFolders.MainD
            ]
        })
    ],
    attr: { className: ["OtherInputList"] }
})

const saveListBtn = leistrap.Button({
    text: "Sauvegarder",
    attr: { className: ["btn-send"] },
    eventType: "click",
    eventOnce: function () {
        getTaskList.name = inputList.getAttr("value")
        if (typeof window.electronAPI != "undefined") {
            window.electronAPI.saveListTask(getTaskList)
        }


        if (typeof GITA === "undefined") {
            const t = displayAllTaskList([getTaskList])
            let GITA = leistrap.GroupItem({ parent: tasksListContainer, items: t.taskList });
            t.taskList.forEach((item, index) => tasksAdd.addTab(item, t.content[index], true))
            tasksListContainer.CASCADE()
        }
        else {
            const t = displayAllTaskList([getTaskList], GITA)
            GITA.CASCADE()
            t.taskList.forEach((item, index) => tasksAdd.addTab(item, t.content[index], true))
        }
        __NewList.pop.hide()
        getTaskList = initTaskList()
    }
})

const cancelListBtn = leistrap.Button({
    text: "Annuler",
    attr: { className: ["btn-cancel"] },
})

const SaveList = leistrap.Card({
    attr: { className: ["btn-cd"] },
    content: [saveListBtn, cancelListBtn]
})
const NewListForm = leistrap.Card({
    parent: __NewList.popContent,
    attr: { className: ["NewListFrom"] },
    content: [InputListName, OtherInputList.MainG, SaveList]
})
__NewList.popContent.CASCADE()

// end form add new list

addNewList.addEvent("click", function () {
    __NewList.pop.show()

})
const tasksListCard = leistrap.Card({
    parent: tasksAdd.__links__,
    attr: { className: ["tasksListCard"] },
    content: [addNewList]
})


const tasksListContainer = leistrap.Card({
    parent: tasksListCard,
    attr: { className: ["tasksListContainer"] },

})

// display all folder name

let __folders__, __tasksList__, sideFolderList;
if (typeof window.electronAPI !== "undefined") {
    window.electronAPI.getAllFolder("folders name !").then(fol => {
        __folders__ = fol
        const f = displayAllFolders(fol)
        sideFolderList = leistrap.GroupItem({ items: f.listFolder, parent: tasksListContainer })
        f.listFolder.forEach((item, index) => tasksAdd.addTab(item, f.content[index], true))
        tasksListContainer.CASCADE()
        ListFolders.addItem(displayFolder(fol, (e) => { ListFolders.setCaption(e.name); getTaskList.folders_id = e.id }))
    })
}

// display all tasks list

if (typeof window.electronAPI !== "undefined") {
    window.electronAPI.getAllTaskList().then(task => {

        const t = displayAllTaskList(task)
        leistrap.GroupItem({ items: t.taskList, parent: tasksListContainer })
        t.taskList.forEach((item, index) => tasksAdd.addTab(item, t.content[index], true))
        tasksListContainer.CASCADE()
    })
}
const angles = leistrap.TabPage({
    tabLink: [
        leistrap.Button({ content: [leistrap.I({ otherAttr: { "class": "bi bi-card-checklist" } })], attr: { className: ["btnTabTodo"] } }),
        leistrap.Button({ content: [leistrap.I({ otherAttr: { "class": "bi bi-calendar3" } })], attr: { className: ["btnTabTodo"] } }),
        leistrap.Button({ content: [leistrap.I({ otherAttr: { "class": "bi bi-bar-chart-steps" } })], attr: { className: ["btnTabTodo"] } })
    ],
    tabContent: [
        tasksAdd.mainTab,
        leistrap.Card({ text: "hello world", }),
        leistrap.Card({ text: "hello world", })
    ],

    attr: { className: ["todoTabs"] },
    contentClass: ["contentTabTodo"]
})

const addFI = TextInput({
    placeholder: "Nom du Dossier",
    eventType: "keyup",
    eventOnce: function (e) {
        if (e.keyCode === 13) {
            if (typeof window.electronAPI !== "undefined") {
                getFolders.name = this.getAttr("value").replace(/'/, "''")
                window.electronAPI.saveFolder(getFolders)
                this.setValue("")
                addNewFolder.hideContent()
                getFolders = initFolders()
            }
        }
    }
})
const addNewFolder = leistrap.DropDown({
    useBtn: leistrap.Button({
        content: [leistrap.I({ attr: { className: ["bi", "bi-folder-plus"] } })],
        attr: { className: ["addNewFolderBtn"] }
    }),
    attr: { className: ["addNewFolder"] },
    items: [
        leistrap.Paragrah({
            attr: { className: ["InputListName"] },
            content: [leistrap.Span({ text: "😄" }), addFI]
        })
    ],
    stopPropagation: true
})
const sidebar = leistrap.Card({
    parent: __contentMain__,
    attr: { className: ["Todosidebar"] },
    content: [angles.mainTab, addNewFolder.MainD]
})
// display titles list card and main Search Bar

const titlesDisplay = leistrap.Card({ parent: __contentMain__, attr: { className: ["TodoMainsearchbar"] } })
const displayTitleList = leistrap.Card({
    attr: { className: ["EI"] },
    parent: titlesDisplay,
    content: [leistrap.H2({ text: "Aujourd'hui" })]
})
const searchbar = TextInput({
    placeholder: "Rechercher une tâche, liste, éthiques, par couleur",
    parent: titlesDisplay,
    attr: { className: [""] }
})



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
    const formContainer = leistrap.Card({ attr: { className: ["contentP-Default"] } })

    const FormCd = leistrap.Card({
        attr: { className: ["DA-form-card"] },
        parent: formContainer
    })
    const cd0 = leistrap.Card({ parent: FormCd })

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

    const calendar = setCalendar({
        days: ['Lundi', "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
        onInput: function (dict) {
            dateT.setText("Date");
            dateC.setText(`${dict.date}/${dict.month}/${dict.year} (${dict.day})`)
            getDataTask.date = `${dict.date}/${dict.month}/${dict.year} (${dict.day})`
        },
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
        ],
        month: new Date().getMonth() + 1
    })


    function setTime() {

        const cd = leistrap.Card({
            attr: { className: [] }
        })

        const cdx = leistrap.Card({ parent: cd, attr: { className: ["DA-card"] } })
        const closeT = closeButton({
            parent: cdx,
            attr: { className: [] }
        })
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

    const accordienTime = leistrap.Accordien({
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
            leistrap.Card({ text: "Date", content: [calendar.Main] }),
            leistrap.Card({ text: "Temps", content: [setTime()] }),
            leistrap.Card({
                text: "Répéter",
                content: [repeat.MainG]
            })
        ],
        props: { className: ['DA-acc'] }
    })

    const timeCd = leistrap.Card({ content: [accordienTime.MainAcc], attr: { className: ["DA-tapCard"] } })
    const colorP = Colorpalette(function (v) {
        re._conf.style[COLOR_DEFAULT] = `${v}`
        getDataTask.color[COLOR_DEFAULT] = `${v}`

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
    const disTitle = leistrap.Paragrah()
    const sb = leistrap.Paragrah()
    const subTitleCd = leistrap.List({ attr: { id: "Result-subTitle" } })
    const commentCd = leistrap.Paragrah()
    const ct = leistrap.Paragrah()
    const pt = leistrap.Paragrah()
    const prioRe = leistrap.Paragrah()
    const repeatT = leistrap.Paragrah()
    const repeatC = leistrap.Paragrah()
    const dateT = leistrap.Paragrah()
    const dateC = leistrap.Paragrah()
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




function getTodo(page = leistrap.Page()) {
    leistrap.PageLegend({
        parent: _content,
        content: [btnAddTodo],
        parentPage: page.mainPage,
        contentPage: FormTodo()
    })

    // back end API 
    // get all tasks within the database
    _content.content.push(tasksDisplay)
    window.electronAPI ? window.electronAPI.sendAllTasks("receive succeful !")
        .then(data => { getTask(data, tasksDisplay) }) : undefined

}



export { todo, getTodo }