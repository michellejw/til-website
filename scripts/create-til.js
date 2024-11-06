#!/usr/bin/env node

import inquirer from "inquirer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { exec } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper to get existing categories
function getExistingCategories() {
  const tilPath = path.join(process.cwd(), "src", "content", "til");
  try {
    return fs
      .readdirSync(tilPath)
      .filter((item) => fs.statSync(path.join(tilPath, item)).isDirectory());
  } catch (error) {
    return [];
  }
}

// Helper to get existing tags from all markdown files
async function getExistingTags() {
  const tilPath = path.join(process.cwd(), "src", "content", "til");
  const tagSet = new Set();

  try {
    const categories = getExistingCategories();
    categories.forEach((category) => {
      const categoryPath = path.join(tilPath, category);
      const files = fs
        .readdirSync(categoryPath)
        .filter((f) => f.endsWith(".md"));

      files.forEach((file) => {
        const content = fs.readFileSync(path.join(categoryPath, file), "utf8");
        const match = content.match(/tags:\s*\[(.*?)\]/);
        if (match) {
          const tags = match[1]
            .split(",")
            .map((tag) => tag.trim().replace(/"/g, "").replace(/'/g, ""));
          tags.forEach((tag) => tagSet.add(tag));
        }
      });
    });
  } catch (error) {
    console.log("Error reading existing tags:", error);
  }

  return Array.from(tagSet);
}

async function createTil(title) {
  try {
    // Get existing categories and tags for suggestions
    const existingCategories = getExistingCategories();
    const existingTags = await getExistingTags();

    const questions = [
      {
        type: "input",
        name: "summary",
        message: "Enter a brief summary (or press Enter to skip):",
      },
      {
        type: "list",
        name: "categoryChoice",
        message: "Choose a category:",
        choices: [
          ...existingCategories,
          new inquirer.Separator(),
          { name: "Create new category", value: "NEW" },
        ],
      },
      {
        type: "input",
        name: "newCategory",
        message: "Enter new category name:",
        when: (answers) => answers.categoryChoice === "NEW",
        validate: (input) => {
          if (/^[a-z0-9-]+$/.test(input)) return true;
          return "Please use only lowercase letters, numbers, and hyphens";
        },
      },
      // First ask if they want to select from existing tags
      {
        type: "confirm",
        name: "wantExistingTags",
        message: "Would you like to select from existing tags?",
        default: true,
        when: () => existingTags.length > 0, // Only ask if there are existing tags
      },
      // Then show tag selection if they said yes
      {
        type: "checkbox",
        name: "tags",
        message: "Select existing tags (space to select, enter when done):",
        choices: existingTags,
        when: (answers) => answers.wantExistingTags,
      },
      // Then ask about custom tags
      {
        type: "confirm",
        name: "wantCustomTags",
        message: "Would you like to add custom tags?",
        default: true,
        when: (answers) =>
          !answers.wantExistingTags || answers.tags?.length === 0,
      },
      {
        type: "input",
        name: "customTags",
        message: "Enter tags (comma-separated):",
        when: (answers) => answers.wantCustomTags,
        filter: (input) =>
          input
            .split(",")
            .map((tag) => tag.trim().toLowerCase())
            .filter((tag) => tag.length > 0),
      },
    ];

    const answers = await inquirer.prompt(questions);

    // Process the category
    const category =
      answers.categoryChoice === "NEW"
        ? answers.newCategory
        : answers.categoryChoice;

    // Process tags (combine selected and custom tags)
    let finalTags = [...answers.tags];
    if (answers.customTags) {
      finalTags = [...finalTags, ...answers.customTags];
    }

    // // Process tags (combine selected and custom tags)
    // let finalTags = answers.tags.filter((tag) => tag !== "CUSTOM");
    // if (answers.customTags) {
    //   finalTags = [...finalTags, ...answers.customTags];
    // }

    // Create slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    // Create content
    const content = `---
title: "${title}"
summary: "${answers.summary}"
tags: [${finalTags.map((tag) => `"${tag}"`).join(", ")}]
date: "${new Date().toISOString().split("T")[0]}"
category: "${category}"

---

# ${title}

`;

    // Ensure category directory exists
    const directory = path.join(
      process.cwd(),
      "src",
      "content",
      "til",
      category
    );
    fs.mkdirSync(directory, { recursive: true });

    // Create the file
    const filepath = path.join(directory, `${slug}.md`);
    fs.writeFileSync(filepath, content);

    console.log(`\nCreated new TIL at: ${filepath}`);

    // Try to open the file in the default editor
    try {
      const { platform } = process;
      if (platform === "win32") {
        exec(`start ${filepath}`);
      } else if (platform === "darwin") {
        exec(`open ${filepath}`);
      } else {
        exec(`xdg-open ${filepath}`);
      }
    } catch (error) {
      console.log("Could not open file automatically");
    }
  } catch (error) {
    console.error("Error creating TIL:", error);
  }
}

// Check if title was provided as argument
const title = process.argv[2];
if (!title) {
  console.error("Please provide a title as an argument.");
  console.log('Usage: npm run til "Your TIL Title"');
  process.exit(1);
}

createTil(title);
