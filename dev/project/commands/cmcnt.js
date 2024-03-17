
import { obj } from "../../deps/PrimaryArray.js";
import { generateId } from "../../deps/rand.js";
import { checkLinkN } from "../dist/checker.js";


// content prototypes


class Content extends Array {
    #index;
    #removed;
    #obj;
    constructor(o, ...item) {
        super()
        this.#index = {}
        Object.defineProperty(this, "Name", { value: 'Content', writable: false })
        this.#removed = {}
        this.#obj = o;
        this.add(item)
        // add an index
        this.forEach(item => { this.addIndex(item) })
    }

    /**
     * add an index of element
     */
    addIndex(elem) {
        checkLinkN(this.#index, elem)
        if (!elem.linkName) elem.linkName = generateId(2, 5)
        this.#index[elem.linkName] = elem;

    }
    add(list) {
        list.forEach((item) => { this.push(item) });
    }

    get(elem) { return this.#index[elem.linkName] }
    insertBefore(elem, newElement) {
        var id;
        for (var i = 0; i < this.length; i++) {
            if (elem.leisBtnConfId === this[i].leisBtnConfId) {
                id = i;
                break;
            }
        }
        this.splice(id, 0, newElement)
    }
    findElem(name) { return this.#index[name] }

    update() {
        var i = this[0]._conf
        var cnt = this.map(item => item)
        this.#obj.removeAll()
        this.#obj.addElements(...cnt)



    }
    // remove an element to the main content also from te DOM
    remove(elem) {
        if (!this.#removed) this.#removed = {};
        this.forEach((item, i) => {
            if (item.leisBtnConfId === elem.leisBtnConfId) {
                this.splice(i, 1)
                this.#removed[item.leisBtnConfId] = item

                if (item.state !== "removed") {
                    item.destroy();
                    item.state === "removed"
                }
                if (elem.index && obj.has(item.linkName, this.#index)) {
                    this.#index = obj.copyObject(this.#index, false, false, elem.leisBtnConfId)
                }
            }
        })
    }
    getRemoved() { return this.#removed }
    reactive(elem) {
        if (!this.#removed) this.#removed = {};
        const id = elem.leisBtnConfId
        if (obj.has(id, this.#removed)) {
            elem.state = "active";
            elem.lsParent.add(elem);
            const el = this.#removed[id];
            this.#removed = obj.copyObject(
                this.#removed,
                false, false, id)
            return el
        }
    }
    empty() {
        obj.loopObj(this.#removed, (v) => { v = null });
        this.#removed = null;
    }
}

export { Content }

