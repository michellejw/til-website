---
title: "eza"
summary: "`ls` but more so"
tags: ["neat-stuff", "basics", "node", "terminal"]
date: "2024-11-21"
category: "tools"
---

eza is like the `ls` command (which is of course a staple of any unix-like system) but with a bunch of great features - and colors! It's got hyperlinks, sorting, icons, git statuses, and (my current fave) the ability to show the directory tree.

## Install
- macOS: `brew install eza`
- Other OSs: see [installation instructions](https://github.com/eza-community/eza/blob/main/INSTALL.md)

## Usage
```bash
eza              # Basic usage (all platforms)
eza -l           # Long format listing
eza --icons      # Show icons next to files
eza --sort=size  # Sort by file size
eza --tree      # Show directory tree
eza --tree --git-ignore  # Show directory tree, ignoring git
```

## Example
Having the ability to use the .gitignore file to exclude files from the tree so cool - I definitely don't want to list the entire contents of a virtual environment or node_modules folder or a bunch of .pyc files (etc)! So handy. 

```bash
$ eza --tree --git-ignore
📁 docs
   └── 📄 api.md
📁 src
   └── 🐍 main.py
📄 README.md
```

