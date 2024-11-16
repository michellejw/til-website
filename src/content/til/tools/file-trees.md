---
title: "File trees"
summary: "The most boring of the trees"
tags: ["cli"]
date: "2024-11-16"
category: "tools"
---


I was happy to find this really simple tool for printing file trees in the terminal. I use Mac and Windows, and there are versions available for both.

## Install
- macOS: `brew install tree`
- Windows: Comes pre-installed! Huzzah!Use `tree` command

## Usage
```bash
tree              # Basic usage (all platforms)
tree -L 2         # Limit depth to 2 levels (macOS)
tree -I "node_*"  # Ignore pattern (macOS)
tree --dirsfirst  # List directories first (macOS)
```
## Example output

```bash
.
├── docs
│   └── api.md
├── src
│   └── main.py
└── README.md
```
