
import sys
from typing import List
from PyQt5.QtCore import Qt
from PyQt5.QtWidgets import *


class Root(QMainWindow):
    def __init__(self):
        super().__init__()

        layout = QHBoxLayout()

        frame1 = QFrame()
        frame1.setStyleSheet("background: red")
        frame2 = QFrame()
        frame2.setStyleSheet("background: green")
        frame3 = QFrame()
        frame3.setStyleSheet("background-color: blue;")

        layout.addWidget(frame1)
        layout.addWidget(frame2)
        layout.addWidget(frame3)

        widget = QWidget()
        widget.setLayout(layout)
        self.setCentralWidget(widget)


app = QApplication(sys.argv)
root = Root()
root.show()
app.exec_()
