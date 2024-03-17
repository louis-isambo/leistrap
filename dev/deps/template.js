class Template {
    constructor(text) {
        this.text = text;

    }

    get(select = {}) {

        let list = this.text.split(" ")
        let temChange = ""
        for (var i = 0; i < list.length; i++) {
            if (list[i].length >= 2 && list[i][0] == "%") {

                if (select[list[i].slice(1, list[i].length)] != undefined) {
                    list[i] = select[list[i].slice(1, list[i].length)]
                }
            }
        }

        for (var j = 0; j < list.length; j++) {
            if (list[j].length >= 0 && list[j][0] != "%") {
                temChange += " " + list[j]
            }
        }
        return temChange
    }

}

export { Template }