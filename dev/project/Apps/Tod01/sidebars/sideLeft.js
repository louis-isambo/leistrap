import { leis } from "../../../static/JsFun/PrimaryArray.js"
import { leistrap } from "../../../static/js/htmRender/allElement.js"
import { setters } from "../setter.js"

function angles(contentCLeft, _content) {

    const tasksAdd = leistrap.TabPage({
        tabLink: [
            setters.setBtnTab("calendar2-range-fill", "Aujourd'hui"),
            setters.setBtnTab("sunrise-fill", "Demain"),
            setters.setBtnTab("calendar-day-fill", "Prochains jours"),
            setters.setBtnTab("envelope-paper-fill", "Boîte de récept..."),
            setters.setBtnTab("tags-fill", "Étiquettes"),
            setters.setBtnTab("check2-square", "Términées", "complatedTasks"),
            setters.setBtnTab("trash-fill", "Supprimées", "deletedTasks"),
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

    /* folder element input  */

    function getFolderName(e) {
        if (e.keyCode === 13) {
            if (typeof window.electronAPI !== "undefined") {
                getFolders.name = this.getAttr("value").replace(/'/, "''")
                window.electronAPI.saveFolder(getFolders)
                this.setValue("")
                addNewFolder.hideContent()
                getFolders = initFolders()
            }
            addNewFolder.hideContent()
        }
    }

    const NF = leistrap.Input().getTextBox()
    const fol = NF.add(false, "folderName", false, { attr: { placeholder: "Nom du dossier" } })
    const NBTN = leistrap.Button().getButton()
    NBTN.setIcon("bi bi-folder-plus")
    NF.on(fol, "keyup", getFolderName)
    leis.addClassList(NBTN, "addNewFolderBtn")


    const addNewFolder = leistrap.DropDown({
        useBtn: NBTN,
        attr: { className: ["addNewFolder"] },
        items: [NF],
        stopPropagation: true
    })

    /* angles */

    const angles = leistrap.TabPage({
        tabLink: [
            leistrap.Button({ autoClick: true, content: [leistrap.I({ otherAttr: { "class": "bi bi-card-checklist" } })], attr: { className: ["btnTabTodo"] } }),
            leistrap.Button({ content: [leistrap.I({ otherAttr: { "class": "bi bi-calendar3" } })], attr: { className: ["btnTabTodo"] } }),
            leistrap.Button({ content: [leistrap.I({ otherAttr: { "class": "bi bi-bar-chart-steps" } })], attr: { className: ["btnTabTodo"] } })
        ],
        tabContent: [
            leistrap.Div({ content: [tasksAdd] }),
            leistrap.Card({ text: "hello world", }),
            leistrap.Card({ text: "hello world", })
        ],

        attr: { className: ["todoTabs"] },
        contentClass: ["contentTabTodo"]
    })

    return { angles, addNewFolder }
}

export { angles }