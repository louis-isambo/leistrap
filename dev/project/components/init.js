import { leistrap } from "../dist/leisWidget.js"

// init card
function initCard() {
    return {
        "header": leistrap.Div(),
        "body": leistrap.Div(),
        "footer": leistrap.Div()
    }
}

export { initCard }