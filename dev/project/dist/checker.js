import { obj } from "../../deps/PrimaryArray.js";

function checkLinkN(o, link) {
    if (obj.has(link.linkName, o)) {
        link.linkName = `Gen_${link.linkName}_${generateId(1, 3)}`;
        throw new Error("Link name must unique")
    }
}

function checkPoint(elem, callback) {
    if (elem.point) { callback(elem.point) }
    else { callback(elem) }
}

function checkPageName(o, prop, ex = false) {
    if (obj.has(prop, o) && !ex) {
        prop.pageName = `${prop.pageName}_${generateId(2, 3)}`;
        throw new Error("PageName must be unique")
    }
    if (!obj.has(prop, o) && ex) {
        throw new Error("PageName not exist")
    }
}

export { checkLinkN, checkPoint, checkPageName }