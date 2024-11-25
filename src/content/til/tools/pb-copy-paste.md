---
title: "pb-copy-paste"
summary: "Mac terminal copy-pasta"
tags: ["cli", "neat-stuff", "terminal"]
date: "2024-11-25"
category: "tools"
---

`pbcopy` and `pbpaste` are two simple commands on Macs that allow you to copy and paste text to and from the clipboard from the command line. 

### Copying text

You can copy the output of any command to the clipboard with `pbcopy`:
```bash
$ echo "Hello World!" | pbcopy
```

### Pasting text

You can paste text from the clipboard with `pbpaste`:
```bash
$ pbpaste
Hello World!
```

This isn't just a terminal-specific clipboard, if you copy somethign in the terminal, it actually goes to your system clipboard - so you can paste anywhere, not just in the terminal. 
