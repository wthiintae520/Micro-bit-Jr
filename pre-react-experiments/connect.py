# Imports go at the top
from microbit import *

# Code in a 'while True:' loop repeats forever
while True:
    display.show(Image.HEART)
    sleep(1000)
    display.scroll('Hello')

def show_number(number):
    display.scroll(number)

def show_string(string):
    display.scroll(string)

def wait_for(second):
    sleep(second)