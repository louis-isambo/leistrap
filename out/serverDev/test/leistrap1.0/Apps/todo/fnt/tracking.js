

const trdacking = (function (leistrap) {

    const dataTracking = {
        "header": leistrap.P({ text: "Tracking" }),

    }


    /*
    expose the functionality to the entire application
     */
    const track = {
        "funIcon": { "icon": "bi bi-bar-chart-steps" },
        "sideData": dataTracking,
    }
    return track
})

export { trdacking }