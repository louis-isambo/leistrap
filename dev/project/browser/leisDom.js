const leisDOM = {
    getElementRect: elem => elem.getBoundingClientRect(),
    getElementTextContent: elem => elem.textContent,
    getElemAttr: (elem, attr) => elem.getAttribute(attr),
    getGivenAttr: (elem) => elem.getAttributeNames(),
    getPreviousElem: elem => elem.previousElementSibling,
    getNextElem: elem => elem.nextElementSibling,
    setElemAttr: (elem, attr, value) => elem.setAttribute(attr, value),

    animateElement: (elem, keyFrame, option) => elem.animate(keyFrame, option),
    setAllAttr: (elem) => elem.attributes,
    setText: (elem, txt) => elem.textContent = txt,

    elementHasAttr: (elem, token) => elem.hasAttribute(token),
    elementHasNode: (elem, node) => elem.contains(node),
    elementHasClass: (elem, token) => elem.matches(token),
    elementSelfRemove: elem => elem.remove(),
    elementRemoveAttr: (elem, attr) => elem.removeAttribute(attr),
    elementSelfReplace: (elem, newElem) => elem.replaceWith(newElem),
    elementGetScreen: (elem, option) => elem.scrollIntoView(option),
    elementAfter: (elem, content) => elem.after(content),
    elementBefore: (elem, content) => elem.before(content),
    elementRemoveEvent: (elem, type, callback, option) => elem.removeEventListener(type, callback, option)
}


export { leisDOM }