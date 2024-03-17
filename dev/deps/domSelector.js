function selectElement({
    byId = false,
    id = new String,
    byClassName = false,
    className = new String,
    allClassName = false,
    byElement = false,
    htmlElement = new Document,
    event = function eventMethed(
        target = undefined,
        elem = document.getElementById("gggfgfgkhfk@!jdhhks22222252674€dkfhjhggffsdlohvgfdk=hggd")) { },
    evt = new String,
    getElm = {

        byId: false,
        IdValue: new String,
        byClassName: false,
        classValue: new String

    },
    pre = function Prototype({
        currentElement = new Document,
        elemAss = new Document
    }) { },
    content = new Array,
}
) {
    let kgv;
    try {
        kgv = getElm.byId ? document.querySelector(`#${getElm.IdValue ? getElm.IdValue : "ffff5256gshs"}`)
            : getElm.byClassName ? document.querySelector(`.${getElm.classValue ? getElm.classValue : ""}`)
                : undefined
    } catch (error) {

    }
    byId ? document.querySelector(`#${id ? id : null}`)
        .addEventListener(`${evt ? evt : ""}`, function (e) { event(e, kgv) }) :
        byElement ? htmlElement.addEventListener(`${evt ? evt : ""}`, function (e) { event(e, kgv) }) :
            byClassName ? document.querySelector(`.${className ? className : null}`)
                .addEventListener(`${evt ? evt : ""}`, function (e) { event(e, kgv) }) : undefined;

    const cur = byId ? document.querySelector(`#${id ? id : null}`) : byElement ? htmlElement :
        byClassName ? document.querySelector(`.${className ? className : null}`) : undefined
    pre({
        currentElement: cur,
        elemAss: kgv
    })

    content ? (
        content.forEach(item => {
            if (cur) {
                item.parent = cur
                if (item.point) {
                    item.point.parent = cur
                    cur.append(item.point.render())
                }
                else {
                    cur.append(item.render())
                    item.parent = cur
                }

            }
        })
    ) : content
    return cur
}


function groupController({
    byClassName = false,
    classValue = new String,
    byChildren = false,
    parent = new Document
}) {
    const cl = byClassName ? document.querySelectorAll(`.${classValue ? classValue : ""}`) : byChildren ? parent.children : undefined
    const AllCl = []
    if (cl !== undefined) {
        for (let i = 0; i < cl.length; i++) { AllCl.push(cl[i]) }
    }
    return AllCl
}
export {
    selectElement,
    groupController
}