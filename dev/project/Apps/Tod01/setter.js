import { leistrap } from "../../static/js/htmRender/allElement.js"

const setters = (function (leistrap) {

    /**  set tabpage button*/
    function setBtnTab(ic, text, addCls) {
        const i = leistrap.I({ otherAttr: { "class": `bi bi-${ic}` } })
        const t = leistrap.Span({ text: text })
        return leistrap.Button({
            content: [i, t],
            attr: { className: ["btnTabTodoIcs", addCls ? `${addCls}` : ""] }
        })
    }

    class setters { }
    setters.setBtnTab = setBtnTab
    return setters

})(leistrap)

export { setters }