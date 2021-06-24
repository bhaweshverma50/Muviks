from tkinter import *
import tkinter as tk
from tkinter import filedialog, Text, messagebox
# import os
window = Tk()
# add widgets here
window.title('ENCRYPTION & DECRYPTION')
# window.iconbitmap('IconED.ico')
window.geometry("600x450")
window.configure(background="#254117")
frame = Frame(window, bg='#556B2F')
frame.place(relheight='1', relwidth='0.94', relx='0.03', rely='0.03')
our_label = Label(text='Welcome to Our Interface!',
                  bg='#617C58', fg='white', height='2', width='30')
our_label.pack()


def openE():
    window1 = tk.Toplevel()
    # window1.iconbitmap('IconED.ico')
    window1.title('ENCRYPTION')
    window1.geometry("600x450")
    window1.configure(background="#254117")
    frame = Frame(window1, bg='#556B2F')
    frame.place(relheight='1', relwidth='0.94', relx='0.03', rely='0.03')
    tk.Label(window1, text="Enter Your Text Here -->").place(x=80, y=240)

    e1 = tk.Entry(window1).place(x=240, y=240)

    def Encrypt():
        tk.messagebox.showinfo("Text Encrypted Successfully!")
    tk.Button(window1, text='Encrypt TEXT', fg='black',
              bg='#BDEDFF', command=Encrypt).place(x=340, y=270)
    tk.Label(window1, text="Select Your Text File").place(x=80, y=340)

    def file_opener():
        input = filedialog.askopenfile(initialdir="/")
    print(input)

    tk.Button(window1, text='BROWSE', fg='black', bg='#BDEDFF',
              command=lambda: file_opener()).place(x=240, y=340)

    def EncryptF():
        tk.messagebox.showinfo("Text File Encrypted Successfully!")

    tk.Button(window1, text='Encrypt FILE', fg='black',
              bg='#BDEDFF', command=EncryptF).place(x=300, y=370)


def openD():
    window2 = Toplevel()
    # window2.iconbitmap('IconED.ico')
    window2.title('DECYPTION')
    window2.configure(background="#254117")
    window2.geometry("300x175+250+400")
    frame = Frame(window2, bg='#556B2F')
    frame.place(relheight='1', relwidth='0.94', relx='0.03', rely='0.03')
    tk.Label(window2, text="Enter Your Text Here -->").place(x=80, y=240)

    e1 = tk.Entry(window2).place(x=240, y=240)

    def Decrypt():
        tk.messagebox.showinfo("Text Decrypted Successfully!")
    tk.Button(window2, text='Decrypt TEXT', fg='black',
              bg='#BDEDFF', command=Decrypt).place(x=340, y=270)
    tk.Label(window2, text="Select Your Text File").place(x=80, y=340)

    def file_opener():
        input = filedialog.askopenfile(initialdir="/")
    print(input)

    tk.Button(window2, text='BROWSE', fg='black', bg='#BDEDFF',
              command=lambda: file_opener()).place(x=240, y=340)

    def DecryptF():
        tk.messagebox.showinfo("Text File Decrypted Successfully!")

    tk.Button(window2, text='Decrypt FILE', fg='black',
              bg='#BDEDFF', command=DecryptF).place(x=300, y=370)


btn = Button(window, text="ENCRYPTION", fg='black',
             bg='#BDEDFF', padx=20, pady=7, command=openE)
btn.place(x=80, y=100)
btn1 = Button(window, text="DECRYPTION", fg='black',
              bg='#BDEDFF', padx=30, pady=7, command=openD)
btn1.place(x=80, y=170)
btn2 = Button(window, text="EXIT PAGE", fg='black', bg='#BDEDFF',
              padx=50, pady=7, command=window.destroy)
btn2.place(x=80, y=240)
#background_image = PhotoImage(file="Background.gif")
#background = Label(window, image=background_image, bd=0).pack()
window.mainloop()
