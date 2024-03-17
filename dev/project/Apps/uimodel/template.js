import { Ui5 } from "./ui5.js";
import { leis } from "../../browser/leis.js";

const template = function (option, Core) {
    if (!option) option = {}
    return {
        ui5: Ui5(Core, leis, option.dir)
    }
}

export { template }