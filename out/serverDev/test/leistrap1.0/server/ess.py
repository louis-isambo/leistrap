import tkinter.messagebox
import sys, os

def info ():
    tkinter.messagebox.showinfo("display iifon", 'python execution through exprssJs')

def run():
    sys.stdout.write(os.popen("node main.js").read())


run()