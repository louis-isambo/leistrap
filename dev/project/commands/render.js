import { obj } from "../../deps/PrimaryArray.js";
import { leisDOM } from "../browser/leisDom.js";
import { globalProp } from "../dist/global.js";

// check attribute

function RAttr(prop, Ew) {
    if (!prop) prop = {};
    var attr = ["className", "id", "name"]
    attr.forEach(item => {
        if (prop[item]) Ew[item] = prop[item]
    })
    return prop
}

// check btn type and outline style
function RBtn(t, tb, Ew) {
    var spc = String.fromCharCode(32)

    if (t && tb) {
        var outline = t.split(spc);
        var stb;
        if (obj.has("outline", outline)) {
            stb = `leis-outline-btn-${t}`
        }
        else { stb = `leis-btn-${t}` }
        Ew.className += `${spc}leis-btn${spc}${stb}`
    }
}

// check text content
function RTxt(txt, Ew) {
    if (txt) leisDOM.setText(Ew, txt)
}

// check Label for attribute
function RLbl(l, value, Ew) {
    if (l && value) {
        leisDOM.setElemAttr(Ew, "for", value)
    }
}

// check img src and alt message

function RImg(i, Ew, src, alt) {
    if (i && src) {
        leisDOM.setElemAttr(Ew, "src", src)
        if (alt) leisDOM.setElemAttr(Ew, "alt", alt)
    }
}

function RGlobalProps(prop, Ew) {
    globalProp.forEach(item => {
        if (prop[item]) leisDOM.setElemAttr(Ew, item, prop[item]);
    })
}
export { RAttr, RBtn, RTxt, RLbl, RImg, RGlobalProps }