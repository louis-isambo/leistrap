import { leistrap } from "../dist/leisWidget.js"
import { leis } from "../browser/leis.js"



function resizeElem(elem, option) {
    var pos = setPos()
    if (!option) option = {};
    const resize = leistrap.Div()
    leis.addClassList(resize, "resize")
    elem.add(resize)
    elem.addClass("card-resizable")
    if (!option.side) option.side = "right";
    if (pos[option.side]) option.side = pos[option.side](resize);
    leistrap.main.onPressMove(elem, function (e) {
        option.side(e, elem)
    })
}



// position 
function setPos() { return { top, right, left, bottom } }
function top(elem) {
    elem.addClass("top-resize");
    return function (e, el) {
        el.setStyle(`width:${e.clientY}px`)
    }
}

function left(elem) {
    elem.addClass("left-resize");
    return function (e, el) {
        el.setStyleProp("width", `${e.clientX}px`)

    }
}
function right(elem) {
    elem.addClass("right-resize");
    return function (e, el) {
        el.setStyleProp("width", `${e.clientX}px`)
    }
}

function bottom(elem) {
    elem.addClass("bottom-resize");
    return function (e, el) {
        el.setStyleProp("height", `${e.clientY}px`)
    }
}

export { resizeElem }