import os


class ScanDir:
    def __init__(self, dirName: str):
        self.__dirName__ = dirName
        self.dirs = []
        self.files = []
        self.__search__(self.__dirName__)

    def __fetchFiles__(self, name):
        self.files.append(name)

    def __fetchDirs(self, name):
        self.dirs.append(name)

    def __scan__(self, name):
        try:
            name = self.__dirName__+"//" + name
            fs = os.listdir(name)
            self.__fetchDirs(name)

        except NotADirectoryError:
            self.__fetchFiles__(name)

    def __search__(self, name):
        try:
            ls = os.listdir(name)
            for x in ls:
                self.__scan__(x)

        except Exception as e:
            print(e)


def scan(path):
    files = []
    dirs = []
    path = path
    controller = ScanDir(path)

    def add():
        files.extend(controller.files)
        dirs.extend(controller.dirs)

    add()
    while len(controller.dirs) > 0:
        for x in controller.dirs:
            path = x
            controller = ScanDir(path)
            add()

    return {"dirs": dirs, "files": files}


def search(name, path):
    re = []
    x = scan(path)
    n = x["files"] + x["dirs"]
    for i in n:
        if (name in i):
            re.append(i)
    return re
