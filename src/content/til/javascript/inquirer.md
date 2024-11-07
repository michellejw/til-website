---
title: "Inquirer.js for Interactive CLIs"
summary: "Create user-friendly command line prompts without the hassle"
tags: ["javascript", "cli", "npm", "tools"]
date: "2024-11-07"
category: "javascript"
---

Building command line tools that need user input can be tedious - handling different input types, validation, and making things look nice in the terminal is a lot of work. Inquirer.js makes this super easy by providing a simple way to create interactive prompts.

You can do things like:

- Simple text input
- Password fields (masked input)
- List selection (arrow keys to choose)
- Checkboxes for multiple choices
- Confirmation prompts (y/n)

And these are some extra features that are kind of neat:

- Arrow key navigation (no need to type numbers for selections)
- Built-in input validation
- Supports async/await for clean prompt chaining
- Colored output and nice spacing without extra work

I'm using this in my TIL website's CLI tool to handle all the interactive prompts when creating new posts. It's a handy way to do it while ensuring that posts are correctly formatted, header info is as needed, and that the files get dropped into the correct category folder.

![inquirer example](/images/inquirer-snip.png)
