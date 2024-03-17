/**
     * remove `Input` Node to the DOM
     */
function destroyInput() {
    if (leis.hasConf(this.main)) {
        leisDOM.elementSelfRemove(this.main._conf)
        this.main.state = "removed"
    }
    else {
        leis.addPW(true,
            this.main,
            () => { obj.after(200, () => { this.destroy() }) },
            this.main.getPropWait())
    }
}

const leisData = {
    lDropDown: [],
    PageControler: undefined,
    Callbacks: []
}

var globalProp = [
    "title"
]
//hooks
var ExtensionInit = [];
var ExtensionRender = [];
var OptionsInit = [];
var useState = [];

function exeHook(prevState, currentState, obj, hk, o) {
    obj.after(200, () => {
        hk.forEach(hook => hook(prevState, currentState, o))
    })

}
export {
    destroyInput,
    leisData, globalProp,
    ExtensionInit, ExtensionRender, OptionsInit,
    useState, exeHook
}