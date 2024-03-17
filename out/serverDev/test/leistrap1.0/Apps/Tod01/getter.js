import { leistrap } from "../../static/js/htmRender/allElement.js"

const getters = (function (leistrap) {


    function pageName(name) {
        const btn = leistrap.Button({ text: "get page" }).getButton()
        btn.setType("primary")
        btn.on("click", function () { console.log(leistrap.getPage(name)) })
        return btn
    }
    class getters { }

    getters.pageName = pageName
    return getters

})(leistrap)

export { getters }