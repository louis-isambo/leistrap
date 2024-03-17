import os
import sys


def bundle(f2):
    result = ""

    pattern = [
        {"name": "  ", "value": ""},
        {"name": "\n", "value": ";"},
        {"name": "}", "value": "};"},
        {"name": "{;", "value": "{"},
        {"name": ";{", "value": "{"},
        {"name": ";;", "value": ";"},
        {"name": ";}", "value": "}"},
        {"name": "(;", "value": "("},
        {"name": ";)", "value": ")"},
        {"name": ",;", "value": ","},
        {"name": ";,", "value": ","},
        {"name": ";:", "value": ":"},
        {"name": ":;", "value": ":"},
        {"name": ";.", "value": "."},
        {"name": ".;", "value": "."},
        {"name": ";catch", "value": "catch"},
        {"name": "; catch", "value": "catch"},
        {"name": "else", "value": "else"},
        {"name": "; else", "value": "else"},
        {"name": ")else", "value": ");else"},
        {"name": "};else", "value": "}else"},
        {"name": "}; else", "value": "}else"},
        {"name": ";;", "value": ";"},
    ]

    op = [
        "||",
        "&&",
        "=",
        "==",
        "===",
        "=>",
        ">=",
        "<=",
        "+=",
        "-=",
        "!",
        "!=",
        "!==",
        "?",
        ":"

    ]
    with open(f2, "r") as file:
        for line in file:
            result += line.replace("\n", "").replace("  ", "")+";"

    file.close()
    for part in pattern:
        result = result.replace(part["name"], part["value"])

    for o in op:
        result = result.replace(o+";", o)
        result = result.replace(";"+o, o)

    with open(f2, "w") as out:
        out.write(result)
    out.close()


cwd = os.getcwd().replace("\\", "/")


def setFilePath(name):
    return cwd+f"/dev/project/{name}"


f1 = setFilePath("dist/py/leistrap1.js")
f2 = setFilePath("dist/py/leistrap.js")
o = os.popen(f'node {setFilePath("dist/py/wrap.js")} wrap {f1} {f2}').read()
sys.stdout.write(o)
bundle(f2)
b = os.popen(f'node {setFilePath("dist/py/wrap.js")} jsyntax {f2} {f1}').read()
sys.stdout.write(b)
print("finish !")
