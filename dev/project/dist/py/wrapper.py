import scandir
import time
import os
import sys
import bundle

cwd = os.getcwd().replace("\\", "/")


def setFilePath(name):
    return cwd+f"/dev/project/{name}"


file = setFilePath("dist/py/leistrap1.js")

if os.path.exists(file):
    os.remove(file)
if (os.path.exists(setFilePath("dist/py/leistrap.js"))):
    os.remove(setFilePath("dist/py/leistrap.js"))

with open(file, "w") as outFile:
    outFile.write('//! leistrap module\n')
outFile.close()


header = [
    {
        '_dirN': f"{cwd}/dev",
        "list": [
            "domSelector",
            "PrimaryArray",
            "rand",
            "template",]
    },
    {
        "_dirN": setFilePath("browser"),
        'list': [
            "mouse",
            "leis",
            "leisDom"
        ]
    },
    {
        "_dirN": setFilePath("commands"),
        "list": [
            "cmcnt",
            "render",
        ]
    },

    {
        "_dirN":  setFilePath("dist"),
        'list': [
            "setting",
            "global",
            "checker",
            'leisId',
            "rule",
            "baseElement",
            "leisMain",
        ]
    },


]


h2 = [

    setFilePath("elements"),
    setFilePath("components")
]


def wrap(header: list, wrapFile):

    def openFile(reader, writer):
        with open(reader, "r") as readF:
            writer.write(readF.read())

    def ft(files, name):
        for file in files:
            f = file.split("//")
            fn = f[len(f)-1]
            if (fn == name):
                openFile(file, wrapFile)

    for hd in header:
        files = scandir.scan(hd["_dirN"])["files"]
        for file in hd["list"]:
            ft(files, file+".js")
        time.sleep(2.2)


def readFile(fileName):
    result = ""
    with open(fileName, "r")as r:
        result = r.read()
    r.close()
    return result


print("building....")

with open(file, 'a+') as out:
    wrap(header, out)

    for x in h2:
        files = scandir.scan(x)["files"]
        for file in files:
            out.write(readFile(file))
        time.sleep(1.02)
    out.write(readFile(setFilePath("dist/leisWidget.js")))

out.close()

print("bundling ...")
f1 = setFilePath("dist/py/leistrap1.js")
f2 = setFilePath("dist/py/leistrap.js")
o = os.popen(f'node {setFilePath("dist/py/wrap.js")} wrap {f1} {f2}').read()
sys.stdout.write(o)
bundle.bundle(f2)
w = os.popen(f'node {setFilePath("dist/py/wrap.js")} bundle {f2} {f1}').read()
sys.stdout.write(w)


print('successfully built !')
