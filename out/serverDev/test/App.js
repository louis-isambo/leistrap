import { leistrap } from "./leistrap1.0/leistrap.js"
import { Setting } from "./ls.setting.js"
import { App } from "./src/app.js"

Setting(leistrap)
leistrap.whenReady(function () {
    this.add(App())
    console.log(leistrap.extension);
})

leistrap.render("main")