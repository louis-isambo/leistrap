
const tasklist = (function (leistrap) {


    /*
    taskList functionality

    create a sideBar for taskLisk tab Button.
    the first functionality of the application, it about Todtasks,
    create, modification etc.. of the task. this first functionality contains others 
    subfunctionalities.

        1. Aujourd'hui:
        2. Demain
        3. Prochains jours
        4. Boîte de réception
        5. Étiquettes*
    we will create a tabPage for each subfunctionlity, these will be in the "ui5.body" part as content
     */

    const dataTaskList = {
        "header": leistrap.P({ text: "Be focus" }),
        "items":
            [
                { "caption": "Aujourd'hui", "icon": "bi bi-calendar2-range-fill" },
                { "caption": "Demain", "icon": "bi bi-sunrise-fill" },
                { "caption": "Prochains jours", "icon": "bi bi-calendar-day-fill" },
                { "caption": "Boîte de réception", "icon": "bi bi-envelope-paper-fill" },
                { "caption": "Étiquettes", "icon": "bi bi-tags-fill" }
            ],
    }

    /*
    the default Tab Button , has a default content
     */
    const defaultBtn = leistrap.Input({ otherAttr: { type: "hidden" }, linkName: "default" })
    const defaultContent = leistrap.Div({ text: "Welcome to task list" })

    /*
      funtionality controller  function   
    */

    function sbFunc(side, home, tab) {

        side.allItems.forEach(i => { tab.addTab(i, leistrap.Div({ text: leistrap.lorem }), true) })
        tab.addTab(defaultBtn, defaultContent, true)
        home.body.add(defaultBtn)

    }

    /*
    expose the functionality to the entire application
     */

    const TaskList = {
        "funIcon": {
            "icon": "bi bi-card-checklist",
            "action": function () { if (!defaultBtn.dp) { defaultBtn.getAttr("click"); defaultBtn.dp = true } }
        },
        "sideData": dataTaskList,
        "sbFunc": sbFunc,


    }
    return TaskList
})

export { tasklist }