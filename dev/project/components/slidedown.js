import { leistrap } from "../dist/leisWidget.js"
import { BaseElement } from "../dist/baseElement.js"
import { generateId } from "../../deps/rand.js"
/**
* leistrap `SlideDown` / `carousel` component
*/
class SlideDown {
    #privPro = {}
    /**
     * @param {BaseElement} parent the widget parent
     * @param {[{src :string, caption:string}]} listImg   
     * the object list of image path and caption  
     */
    constructor(parent, listImg, width, height, maxHeight, minHeight) {
        this.parent = parent
        this.listImg = listImg
        this.width = width
        this.height = height
        this.maxHeight = maxHeight
        this.minHeight = minHeight
        this.point = this.#setS()
    }

    #setImg(listImg, MainS, dotCard, imgId, counter, stp = 0) {
        const ip = this
        listImg.forEach((item, index) => {
            index += stp
            let fade = leistrap.Card({ parent: MainS })
            let c0 = leistrap.Card({
                content: [
                    leistrap.Img({
                        otherAttr: {
                            src: item.src ? item.src : "",
                            style: `${this.minHeight ? `min-height:${this.minHeight}px` : "auto"}`
                        }
                    }),
                    leistrap.Card({ attr: { className: ["leis-slideshowNumTxt"] } }),
                ],
                attr: { className: ["leis-img-card", imgId, "fade"] },
                parent: fade
            })

            MainS.addData.push(leistrap.Card({
                text: item.caption ? item.caption : "",
                attr: { className: ["leis-slideshow-txt"] },
                parent: MainS,
                otherAttr: { style: "display:none" }
            }))

            leistrap.Span({
                attr: { className: ["leis-slideshow-dot"] },
                addData: { img: c0 },
                parent: dotCard,
                eventType: "click",
                eventOnce: function () {
                    dotCard.content.forEach((item, index) => {
                        item.addData.img.hide(); item.removeClass("active")
                    })
                    this.addData.img.show()
                    this.addClass("active")
                    counter = index
                    MainS.addData.forEach(i => i.hide())
                    MainS.addData[index].show()
                    this.addData.img.content[1].setText(`${index + 1}/${ip.listImg.length}`)
                }
            })
        })
    }

    /**
     * add new imgs 
     * @param {[{src:BaseElement, caption:string}]} listImg 
     */

    addImg(listImg) {

        const len = this.listImg.length
        this.listImg = this.listImg.concat(listImg)

        this.#setImg(
            listImg,
            this.#privPro.MainS,
            this.#privPro.dotCard,
            this.#privPro.imgId,
            this.#privPro.counter,
            len
        )
        this.#privPro.MainS.CASCADE();
        this.#privPro.dotCard.CASCADE()
    }
    #setS() {
        const imgId = generateId(3, 8)
        const __MainContent__ = leistrap.Card({ parent: this.parent })
        const MainS = leistrap.Card({
            attr: { className: ["leis-slideshow-container"] },
            parent: __MainContent__,
            otherAttr: {
                style: `width:${this.width ? `${this.width}px` : "auto"};
                 height:${this.height ? `${this.height}px` : "auto"};
                 max-height:${this.maxHeight ? `${this.maxHeight}px` :
                        "auto"}`.replace(/\n/g, "")
            },
            addData: []
        })

        let counter = 0
        const prevBtn = leistrap.Span({
            autoClick: true,
            innerHtml: "&#10094",
            attr: { className: ["leis-slideshow-prev-btn"] },
            parent: MainS,
            eventType: "click",
            eventOnce: function () {
                counter = counter == 0 ? dotCard.content.length - 1 : counter - 1
                dotCard.content[counter].getAttr("click")
            }
        })

        const nextBtn = leistrap.Span({
            innerHtml: "&#10095",
            attr: { className: ["leis-slideshow-next-btn"] },
            parent: MainS,
            eventType: "click",
            eventOnce: function () {
                counter = counter == dotCard.content.length - 1 ? 0 : counter + 1
                dotCard.content[counter].getAttr("click")
            }
        })

        const dotCard = leistrap.Card({
            otherAttr: { style: "text-align:center" },
            parent: __MainContent__
        })

        // inserting img to the main content and dotted buttons to  the dotted content

        this.listImg ? this.#setImg(this.listImg, MainS, dotCard, imgId, counter) : undefined

        this.MainS = __MainContent__
        this.#privPro.MainS = MainS
        this.#privPro.imgId = imgId;
        this.#privPro.dotCard = dotCard;
        this.#privPro.imgId = imgId;
        this.#privPro.counter = counter
        return __MainContent__
    }
}

export { SlideDown }