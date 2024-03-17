
export function Head(widget) {
    const h = widget()
    h._config = window.document.head
    return h
}