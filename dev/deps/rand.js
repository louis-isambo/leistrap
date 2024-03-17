
// maths operators

function generateId(min = 0, max = 1) {
    const sy = "dh5263ayLogl";
    const num = "0123456789";
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const lettUpc = letters.toLocaleUpperCase()
    const allItem = [sy, num, letters, lettUpc]
    let [res, i, y] = ["", 0, 0]
    const len = randint(min, max)

    while (y < len) {
        for (i = 0; i < allItem.length; i++) {
            let _c = allItem[Math.floor(Math.random() * allItem.length)]
            res += _c[Math.floor(Math.random() * _c.length)]
        }
        y++
    }
    return res
}

function choice(obj) {

    if (typeof obj === "object") {
        const _bj = Object.keys(obj)
        return (obj[_bj[Math.floor(Math.random() * _bj.length)]]);
    }
    else if (
        typeof obj === "function"
        || typeof obj === "boolean"
        || typeof obj === "undefined"
        || typeof obj === "symbol"
    ) {
        throw new Error(`can not execute a ${typeof obj}`)
    }
    else if (typeof obj === "number") {
        const _n = []
        for (let i = 0; i < obj; i++) { _n.push(i) }
        return _n[Math.floor(Math.random() * _n.length)]
    }
    else if (typeof obj === "string") {
        return obj[Math.floor(Math.random() * obj.length)]
    }
}

function randint(min, max) {

    if (typeof min === "number" && typeof max === "number") {
        const _p = []
        for (let _x = min; _x < max; _x++) {
            _p.push(_x)
        }
        return choice(_p)

    }
    else {
        throw new Error(`can not execute ${typeof min !== "number" ? typeof min : typeof max}`)
    }
}

function maxArray(array = []) {
    if (typeof array === "object") {
        if (typeof array.push !== "function")
            throw new Error(`can not execute a (an) ${typeof array}`)
        else {
            let _x = array[0]
            array.forEach(item => {
                _x = item > _x ? item : _x
            })
            return _x
        }
    }
}
function minArray(array = []) {
    if (typeof array === "object") {
        if (typeof array.push !== "function")
            throw new Error(`can not execute a (an) ${typeof array}`)
        else {
            let _x = array[0]
            array.forEach(item => {
                _x = item < _x ? item : _x
            })
            return _x
        }
    }
}
function reverse(obj) {
    if (typeof obj === "object") {

        let _type = typeof obj.push === "function" ? "a" : "o"
        if (_type === "a") {
            const _p = []
            for (let x = 0; x < obj.length; x++) {
                _p.push(obj[(obj.length - 1) - x])
            }
            return _p
        }
        else if (_type === "o") {
            const _o = {}
            const _xp = Object.keys(obj)
            _xp.forEach((item, i) => {
                _o[_xp[(_xp.length - 1) - i]] = obj[_xp[(_xp.length - 1) - i]]
            })
            return _o
        }

    }
    else if (
        typeof obj === "function"
        || typeof obj === "boolean"
        || typeof obj === "undefined"
        || typeof obj === "symbol"
        || typeof obj === "number"
    ) {
        throw new Error(`can not execute a ${typeof obj}`)
    }
    else if (typeof obj === "string") {
        let [_r, i] = ["", 0]
        for (let x of obj) {
            i++
            _r += obj[obj.length - i]
        }
        return _r
    }

}
export {
    randint,
    choice,
    generateId,
    reverse,
    maxArray,
    minArray
}
