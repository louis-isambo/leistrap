import os
import sys
import time

browser = """
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global = global || self, global.leistrap = factory());
}(this, (function () {
"""
browserEnd = """})))"""
path = os.getcwd().replace("\\", "/") + "/out/leistrap.main.js"

br = os.getcwd().replace("\\", "/") + "/out/broswer/dist/leistrap.js"
dev = os.getcwd().replace("\\", "/") + \
    "/out/serverDev/test/leistrap1.0/dist/leistrap.js"

print("bundling ...")
sys.stdout.write(os.popen("rollup -c").read())

time.sleep(5.0)
with open(path, "r") as file:
    out = file.read()
    with open(br, "w") as brow:
        brow.write(browser + out+browserEnd)

    with open(dev, "w") as devOut:
        devOut.write(
            "const ls =(function(){\n\"use strict\";\n" + out+"})()\n export {ls}")

file.close()
print("successfully bundled !")
