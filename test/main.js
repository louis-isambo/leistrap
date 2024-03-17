// import { leistrap } from "../dev/project/dist/leisWidget.js"
// leistrap({
//     dir: "../dev/project/",
//     theme: "light",

// })


// leistrap.whenReady(function () {
//     const main = leistrap.Div()

//     const sm = { "items": leistrap.inRange(5, 0, i => { return { caption: "louis" } }) }

//     const ui5 = leistrap.template.ui5
//     const win = new ui5(undefined)
//     main.add(win)

//     // card

//     const table = leistrap.Table().getTable()
//     const mytable = new table()
//     mytable.insertTable(10, 10)

//     const cards = leistrap.inRange(10, 0, i => {
//         var card = leistrap.Card().getCard()
//         card.title = "Creation of the world"
//         card.img = { path: "../dev/project/static/css/img/IMG_3558.JPG" }
//         card.add(leistrap.P({ text: leistrap.lorem }))

//         var btn = leistrap.Button({ text: "Send message " }).getButton()
//         btn.setType("primary");
//         card.setSize("400px")
//         card.add(btn)
//         return card
//     })
//     cards.unshift(mytable)
//     const pageContent = leistrap.Div({ content: cards })
//     const btnLink = leistrap.Button({ text: "go forward" }).getButton()
//     btnLink.setType("secondary").on("click", function () { page.invoke("forward") })
//     pageContent.add(btnLink)
//     // page

//     const linkbtn = leistrap.pageButton({
//         text: "cliquez sur ce lien",
//         contentPage: pageContent,

//     })
//     const page = leistrap.Page({
//         legend: [linkbtn],

//     })
//     const img = leistrap.Img({ src: "../dev/project/static/css/img/IMG_3558.JPG", otherAttr: { "class": "leis-img" } })
//     img.alt = "this is an image !"
//     img.title = "<h1> je suis bine</h1> "
//     // layout 

//     const hbCnt = leistrap.createContent("Div", 3, function (item, index) {
//         item.setStyle("background : rgb(220,220, 220); border:1px solid blue")

//         if (index !== 1) {
//             const cnt = leistrap.createContent("Div", 2, function (item, index) {
//                 item.text = index
//                 item.setStyle("background: rgb(220,220, 220); border: 1px solid red")
//                 return item
//             })
//             const VB = leistrap.VBoxLayout({ content: cnt })
//             item.add(VB)
//         }
//         return item
//     })

//     const HB = leistrap.HBoxLayout({ content: hbCnt })
//     const mainLayout = leistrap.Div({ otherAttr: { style: "width: 100%; height:100vh" } })

//     mainLayout.add(HB)
//     page.define("forward", leistrap.P({ content: [img, mainLayout] }))
//     win.body.add(page)


//     this.add(main)
// })


// leistrap.whenReady(function () {

//     const hbCnt = leistrap.createContent("Div", 3, function (item, index) {
//         item.setStyle("background : var(--leis-container-cl); border:1px solid #ddd")

//         if (index === 0) {
//             const cnt = leistrap.createContent("Div", 2, function (item, index) {
//                 item.text = index
//                 item.setStyle("background:black; border: 1px solid red")
//                 return item
//             })
//             const VB = leistrap.VBoxLayout({ content: cnt })
//             VB.setItemGrow(1, 14)
//             item.add(VB)
//         }

//         if (index == 1) {
//             const p = leistrap.P({ text: leistrap.MLorem(50) })
//             p.otherAttr = {
//                 style: "background: red; width: 100%; height:98vh; overflow-y :auto"
//             }
//             item.add(p)
//         }
//         return item
//     })

//     const HB = leistrap.HBoxLayout({ content: hbCnt })
//     HB.setItemGrow(1, 20)


//     const main = leistrap.Div({ otherAttr: { style: "width: 100%; height:100vh" } })
//     main.add(HB)
//     this.add(main)
// })


leistrap.whenReady(function () {

    const elems = leistrap.createContent("P", 3, item => {
        item.text = leistrap.lorem;
        item.index = true;
        return item;
    })
    const main = leistrap.Div({ content: elems })
    this.add(main)
    const button = leistrap.Button({
        text: "click me",
        type: "primary",
        events: {
            click: function (e) {
                main.remove(elems[0]);
                console.log(main.content);
                console.log(main.getRemovedElement());
            }
        }
    })

    this.add(button)
    const empty = leistrap.Button({
        text: "empty content",
        type: "danger",
        events: {
            click: function () {
                main.content.empty();
                console.log(main.content);
                console.log(elems[0])
            }
        }
    })
    const modal = leistrap.Modal()
    modal.add(leistrap.P({ text: leistrap.lorem }))
    modal.show()
    this.add(empty)
    this.add(modal)
})

leistrap.render("main")