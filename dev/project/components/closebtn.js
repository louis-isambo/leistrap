
function CloseBtn(eventType, eventOnce) {
    return this.Button({
        content: [this.Span({ innerHtml: "&times" })],
        otherAttr: { "class": "leis-btn-close" },
        eventOnce,
        eventType
    })
}

export { CloseBtn }