

const calendarView = (function (leistrap) {


    const dataViewCalendar = {
        "header": leistrap.P({ text: "Calendar View" }),
        "items": [
            { "caption": "Menseul" }
        ]
    }

    function sbFunc(side, home, tab) {
        tab.addTab(side.allItems[0], leistrap.Div({ text: "leistrap.lorem for calendar view " }), true)
    }
    /*
    expose the functionality to the entire application
     */
    const viewCalendar = {
        "funIcon": { "icon": "bi bi-calendar3" },
        "sideData": dataViewCalendar,
        "sbFunc": sbFunc,

    }
    return viewCalendar
})

export { calendarView }