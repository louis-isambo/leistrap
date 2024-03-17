
const Todo = (function (fnt, leistrap, ui5, leis) {
    "use strict"

    class TodoTask { }

    /*
    fill information to the small side of the UI5 componet
    this represent all functionalities of this application.
    these function are represented by icons in the first small sidebar on the 
    left side
    */
    const sm = { "items": leistrap.inRange(fnt.length, 0, i => fnt[i].funIcon) }

    /*
    todo app first interface, this is the main page of the todoList app 
    */
    const home = new ui5(undefined, sm)

    /*
    making the tabPage for each functionality.
     create a tab page to the sm side for displaying in detail the current clicked 
     item 
    */
    const sm_tab = leistrap.TabPage({
        useContentParent: home.bigSide,
        concatLink: home.smallSide.allItems,
        tabContent: leistrap.inRange(fnt.length, 0, i => {
            let side = setSideTabContent(fnt[i].sideData); fnt[i].side = side; return side
        })
    })
    /*
     creating tabPage for subfunctionalities 
     */

    const bg_tab = leistrap.TabPage({ useContentParent: home.body })
    leistrap.inRange(fnt.length, 0, i => { if (fnt[i].sbFunc) { fnt[i].sbFunc(fnt[i].side.content[0], home, bg_tab) } })

    /**
     * set sidenav for tabContent 
     */
    function setSideTabContent(option) {
        const side = leistrap.SideBar(option)
        const main = leistrap.Div({ content: [side] })
        leis.addClassList(main, "todo-side-container")
        side.addClass("todo-side-taskList")
        return main
    }

    TodoTask.home = home
    leistrap.insertCss("./Apps/todo/static/css/style.css")
    return TodoTask
})

export { Todo }