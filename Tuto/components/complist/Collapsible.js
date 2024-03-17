(function () {
    "use strict";
    
    const main = leistrap.Div({
        content: [leistrap.API.txt.help]
    })

    leistrap.API.collapsible_content.add(main)
    
})()