
(function () {
    "use strict";
    leistrap.defineExtension("ui5", function ({ dir }, leistrap, { leis }) {

        if (!dir) dir = "./"
        /**
         * User interface with 5 main parts
         */
        class ui5 {
            constructor(parent, smlSide) {
                this.point = this.#setUi(parent, smlSide)
            }
            #setUi(parent, smlSide) {
                this.body = leistrap.Div()
                this.head = leistrap.Div()
                this.smallSide = leistrap.SideBar(smlSide)
                this.bigSide = leistrap.Div()
                this.toolbar = leistrap.Div()
                this.controlBar = leistrap.Div({ parent: this.head })
                const cardCtr = leistrap.Div({ parent: this.controlBar })
                this.notification = leistrap.Button({ text: "Notification" }).getButton()
                this.notification.setIcon("bi bi-bell")

                this.minimize = leistrap.Button().getButton()
                this.minimize.setIcon("bi bi-dash")


                this.maximize = leistrap.Button().getButton()
                this.maximize.setIcon("bi bi-clipboard")

                this.close = leistrap.CloseBtn()

                // resize the big side
                const resize = leistrap.Div({ otherAttr: { "class": "resize right-resize" } })
                this.bigSide.add(resize);

                const rex = () => leistrap.MPC.toggleClass("resizing-right")
                leistrap.main.onPressMove(resize, (o) => {
                    if (o.clientX <= leistrap.MPC.getRect().width - 250) {
                        var sw = this.smallSide.point.getRect().width
                        var w = o.clientX - sw
                        var bdw = `calc(100% - (${w}px + ${sw}px + 40px))`
                        var marginLeft = sw + w + 10
                        this.body.setStyleProp("width", bdw)
                        this.body.setStyleProp("marginLeft", `${marginLeft}px`)
                        this.bigSide.setStyleProp("width", `${w}px`)
                    }
                }, rex, rex)

                cardCtr.add(this.notification)
                cardCtr.add(this.minimize)
                cardCtr.add(this.maximize)
                cardCtr.add(this.close)
                const main = leistrap.Div({
                    content: [this.smallSide, this.bigSide, this.head, this.body, this.toolbar]
                })
                this.smallSide.addClass("ui5-small-side")
                this.controlBar.addClass("ui5-controlBar")
                leis.addClassList(this.head, "ui5-head")
                leis.addClassList(cardCtr, "ui5-cardCtrl leis-flex leis-row")
                leis.addClassList(this.body, "ui5-body")
                leis.addClassList(this.bigSide, "ui5-big-side")
                leis.addClassList(this.toolbar, "ui5-toolbar")
                leis.addClassList(main, "ui5-container")
                return main
            }
        }
        leistrap.insertCss(`${dir}Apps/uimodel/static/css/style.css`)
        return ui5
    })
})()