
import { leistrap } from "./dist/leisWidget.js"

leistrap.whenReady(function () {
    const main = leistrap.Div()


    // layout 

    const hbCnt = leistrap.createContent("Div", 2, function (item, index) {
        item.setStyle("background : rgb(220,220, 220); border:1px solid blue")

        if (index !== 1) {
            const cnt = leistrap.createContent("Div", 2, function (item, index) {
                item.text = index
                item.setStyle("background: rgb(220,220, 220); border: 1px solid red")
                return item
            })
            const VB = leistrap.VBoxLayout({ content: cnt })
            VB.setItemBasis(1, "80vh")
            item.add(VB)

        }
        else {
            item.add(leistrap.P({
                text: leistrap.MLorem(50), otherAttr: {
                    style: "height: 95vh; overflow-y :auto; padding: 20px"
                }
            }))
        }
        return item
    })

    const HB = leistrap.HBoxLayout({ content: hbCnt })
    const mainLayout = leistrap.Div({ otherAttr: { style: "width: 100%; height:100vh" } })

    mainLayout.add(HB)
    main.add(mainLayout)
    HB.setItemBasis(1, "60%")
    this.add(main)
})

leistrap.render("main")
