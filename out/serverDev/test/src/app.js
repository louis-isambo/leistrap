import { leistrap } from "../leistrap1.0/leistrap.js";

function App() {

    var style = leistrap.defineDynCss({
        DyCss: function (o) {
            o.background = "red"
            console.log(this.background);
        }
    })

    const button = leistrap.Button({
        text: "click me",
        type: "secondary",
        events: {
            click: function () { }
        }
    })

    const main = leistrap.Div({
        text: leistrap.lorem,
        style: style
    })
    main.add(button)



    return main
}

export { App }