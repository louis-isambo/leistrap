import { leistrap } from "../../static/js/htmRender/leistrap.js"
import { Colorpalette } from "../Color/color.js"
import { Icons } from "../icon/icons.js"


const mainPops = leistrap.Card({ attr: { className: 'popsMain' } })

leistrap.select.seclectElemt({
    byId: true,
    id: "pops",
    content: [mainPops]
})

function setBtnTab(ic, text, addCls, cont) {
    return leistrap.Button({
        content: [
            leistrap.I({ otherAttr: { "class": `bi bi-${ic}` } }),
            leistrap.Span({ text: text })

        ].concat(cont ? [cont] : []),
        attr: { className: ["btnTabTodoIcs", addCls ? `${addCls}` : ""] }
    })
}

function ModalRight() {
    const MATC = leistrap.Card({ attr: { className: ["pop-up-cd"] }, parent: mainPops })
    const MAT = leistrap.Card({
        attr: { className: ["pop-up-content"] },
        parent: MATC
    })

    const closeModal = leistrap.Button({
        otherAttr: { "class": `DA-close-modal ${leistrap.BoostrapClass.btnclose}` },
        parent: MAT,
        eventType: "click",
        eventOnce: function () { MATC.hide() }
    })
    return {
        pop: MATC,
        popContent: MAT
    }
}

function ModalMiddle({ title, className, header_className }) {
    const pop = leistrap.Card({ parent: mainPops, attr: { className: ["pop-up-cd"] } })
    const header = leistrap.Card({
        content: [leistrap.H3({ text: `${title ? title : ""}` })],
        attr: { className: header_className }
    })
    const cardC = leistrap.Card()

    const popContent = leistrap.Card({
        parent: pop,
        attr: { className: ["pop-up-content", "DA-card", `${className ? className : ""}`] },
        content: [header, cardC]
    })
    const closePop = leistrap.Button({
        otherAttr: { "class": `DA-close-modalRight` },
        parent: header,
        eventType: "click",
        content: [leistrap.I({ attr: { className: ["bi bi-x-lg"] } })],
        eventOnce: function () { pop.hide(); leistrap.body.classList.remove("blur") }
    })
    mainPops.CASCADE()
    return {
        pop,
        popContent: cardC
    }
}

function closeButton(option) {
    return leistrap.Span({
        attr: { className: ['DA-icon'].concat(option.className ? option.className : []) },
        content: [
            leistrap.I({ otherAttr: { "class": "bi bi-x-lg DA-close" } }),
        ],
        parent: option.parent,
        eventType: "click",
        eventOnce: option.eventOnce
    })
}

function TextInput({ placeholder, eventType, eventOnce, attr, parent }) {
    const i = leistrap.Input({
        otherAttr: {
            type: "text",
            placeholder,
            "class": `DA-todoInput ${attr ? attr.className ? attr.className.join(" ") : "" : ""}`
        },

        eventType,
        eventOnce,
        attr,
        parent
    })
    return i
}


/**
 * add an icons container
 * @param {Function} on  add a function to be called when the color was choosen
 * 
 */
function colorDropDown(on) {
    const drop = leistrap.DropDown({
        useBtn: leistrap.Span({ content: [leistrap.Card({ attr: { className: ["colorPickerList"] } })] }),
        items: [Colorpalette(function (e) {
            drop.useBtn.content[0].setStyle(`background-color:${e}`)
            on ? on(e) : undefined
        })],
        attr: { className: ["colorDropDown"] },
        btnClass: ["colorDropDownBtn"]
    })
    return drop
}

/**
 * add an icons container
 * @param {Function} on  add a function to be called when the icon was choosen
 * 
 */
function IconsDropDown(on) {
    const di = leistrap.Span({
        content: [
            leistrap.Span({ text: "😊" }),
            leistrap.I({}),

        ]
    })
    const ic = leistrap.Span({ content: [di] })
    const drop = leistrap.DropDown({
        useBtn: ic,
        items: [
            Icons((i) => {
                di.content[0].setText("")
                di.content[1].setClassName(`bi bi-${i}`)
                on ? on(i) : on

            }, true)],

        attr: { className: ["colorDropDown"] },
        btnClass: ["colorDropDownBtn"]
    })
    return drop
}

function displayFolder(listObject, on) {
    const i = [leistrap.Li({
        text: "Aucun",
        eventType: "click",
        eventOnce: function () { on ? on({ name: "Aucun" }) : undefined },
        otherAttr: { style: "color:red" }
    })]
    listObject.forEach((item, index) => {
        i.push(leistrap.Li({
            text: item.name,
            eventType: "click",
            eventOnce: function () { on ? on(item) : undefined }
        }))
    })

    const inputNewFolder = leistrap.Input({
        otherAttr: {
            type: "text",
            placeholder: "Nom du dossier",
            style: "display:none",
            "class": "inputNewFolder"
        }
    })
    const addNewFolder = setBtnTab("plus-square-dotted", "Nouveau dossier", "addFo", inputNewFolder)
    addNewFolder.addEvent("click", function (e) {
        e.stopPropagation()
        this.content[1].getText() != "" ? inputNewFolder.setValue(this.content[1].getText()) : null
        this.content[1].setText("")
        inputNewFolder.show()
        inputNewFolder.getAttr("focus")
        inputNewFolder.getAttr("select")
    })

    leistrap.winClicked(() => {
        addNewFolder.content[1].setText("Nouveau Dossier");
        inputNewFolder.hide()
        inputNewFolder.setValue("")
    })

    const GI = leistrap.GroupItem({
        items: i.concat([leistrap.Li({ content: [addNewFolder] })]),
        attr: { className: ["allFolders"] }
    })
    return GI.MainG
}

function displayAllFolders(list) {
    const listFolder = []
    const content = []
    list.forEach(fol => {
        listFolder.push(leistrap.Li({ text: fol.name }))
        content.push(leistrap.Card({ text: `dossier : name:${fol.name}, id ${fol.id}` }))
    })
    return { listFolder, content }
}

function displayAllTaskList(list, parent = undefined) {
    const taskList = []
    const content = []
    list.forEach(tl => {
        let ic = leistrap.Span({ content: [leistrap.I({ otherAttr: { "class": `bi bi-${tl.icon}` } })] })
        let name = leistrap.Span({ text: tl.name })
        let color = leistrap.Span({ otherAttr: { style: `background-color:${tl.color} !important;`, "class": "outListCl" } })
        taskList.push(leistrap.Li({ content: [ic, name, color], attr: { className: ["taskListD"] } }))
        content.push(leistrap.Card({ text: `liste de tâche : ${tl.name}, id:${tl.id}`, parent }))
    })
    return { taskList, content }
}
function getTask(list, parent) {
    list.forEach(item => {
        let cl = item.color.split(";")
        let stl = item.subtitles.split("&#||")
        const listItems = leistrap.List({ attr: { className: ["subtitlesList"] } })

        stl.forEach(sub => { listItems.content.push(leistrap.Li({ content: [leistrap.Paragrah({ text: sub })] })) })
        leistrap.Accordien({
            parent: parent,
            accBtn: [
                leistrap.Button({
                    otherAttr: { style: `border:1.5px solid ${cl[0]}; border-radius:6px; background-color:#fff` },
                    content: [
                        leistrap.I({ otherAttr: { "class": "bi bi-square", } }),
                        leistrap.Span({ text: `${item.title} ${item.date}`, }),
                    ]
                })],
            accPanel: [leistrap.Card({
                otherAttr: { style: `background-color:${cl[0]}; color:${cl[1]}` },
                content: [
                    leistrap.Paragrah({ text: item.comment }),
                    leistrap.Paragrah({ text: item.date }),
                    listItems
                ]
            })],
            props: { otherAttr: { style: `background-color:${cl[0]}; color:${cl[1]}` }, className: ["resultTodo"] }
        })
        parent.CASCADE()
    })

}
export const Customer = {
    closeButton,
    TextInput,
    ModalMiddle,
    ModalRight,
    colorDropDown,
    IconsDropDown,
    displayFolder,
    displayAllFolders,
    getTask,
    displayAllTaskList
}
