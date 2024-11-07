// validator.js
import matter from "gray-matter";
import fs from "fs";
import chalk from "chalk";
import inquirer from "inquirer";

class ValidationError {
  constructor(message, level = "error", suggestion = null) {
    this.message = message;
    this.level = level; // 'error', 'warning', 'info'
    this.suggestion = suggestion;
  }
}

class MarkdownValidator {
  constructor() {
    this.requiredFields = ["title", "summary", "tags", "date", "category"];
  }

  async validateFrontMatter(content, interactive = false) {
    const errors = [];

    try {
      const { data } = matter(content);

      // Required fields check
      for (const field of this.requiredFields) {
        if (!data[field]) {
          errors.push(
            new ValidationError(
              `Missing required field: ${field}`,
              "error",
              `Add '${field}: ' to your frontmatter`
            )
          );
        }
      }

      // Date format validation
      if (data.date && !/^\d{4}-\d{2}-\d{2}$/.test(data.date)) {
        errors.push(
          new ValidationError(
            "Invalid date format",
            "error",
            "Date must be in YYYY-MM-DD format (e.g., 2024-11-06)"
          )
        );
      }

      // Tags validation
      if (data.tags) {
        if (!Array.isArray(data.tags)) {
          errors.push(
            new ValidationError(
              "Tags must be an array",
              "error",
              'Format tags as: tags: ["tag1", "tag2"]'
            )
          );
        } else {
          // Check for duplicate tags
          const uniqueTags = new Set(data.tags);
          if (uniqueTags.size !== data.tags.length) {
            const duplicates = data.tags.filter(
              (tag, index) => data.tags.indexOf(tag) !== index
            );
            errors.push(
              new ValidationError(
                `Duplicate tags found: ${duplicates.join(", ")}`,
                "warning",
                "Remove duplicate tags"
              )
            );
          }

          // Tag format validation
          const invalidTags = data.tags.filter(
            (tag) => !/^[a-z0-9-]+$/.test(tag)
          );
          if (invalidTags.length > 0) {
            errors.push(
              new ValidationError(
                `Invalid tag format: ${invalidTags.join(", ")}`,
                "error",
                "Tags should only contain lowercase letters, numbers, and hyphens"
              )
            );
          }
        }
      }

      // Length validations
      if (data.title?.length > 100) {
        errors.push(
          new ValidationError(
            "Title exceeds maximum length",
            "warning",
            "Consider shortening the title to under 100 characters"
          )
        );
      }

      if (data.summary?.length > 200) {
        errors.push(
          new ValidationError(
            "Summary exceeds maximum length",
            "warning",
            "Consider shortening the summary to under 200 characters"
          )
        );
      }

      // Handle interactive validation
      if (interactive && errors.length > 0) {
        return await this.handleInteractiveValidation(errors, content);
      }
    } catch (error) {
      errors.push(
        new ValidationError(
          `Invalid frontmatter: ${error.message}`,
          "error",
          "Check your YAML syntax in the frontmatter"
        )
      );
    }

    return errors;
  }

  async handleInteractiveValidation(errors, content) {
    console.log("\nValidation Results:");

    // Group errors by severity
    const errorsByLevel = {
      error: errors.filter((e) => e.level === "error"),
      warning: errors.filter((e) => e.level === "warning"),
      info: errors.filter((e) => e.level === "info"),
    };

    // Display errors with colors and suggestions
    Object.entries(errorsByLevel).forEach(([level, levelErrors]) => {
      if (levelErrors.length > 0) {
        const color =
          level === "error" ? "red" : level === "warning" ? "yellow" : "blue";
        levelErrors.forEach((error) => {
          console.log(chalk[color](`${level.toUpperCase()}: ${error.message}`));
          if (error.suggestion) {
            console.log(chalk.gray(`  Suggestion: ${error.suggestion}`));
          }
        });
      }
    });

    // If there are only warnings, ask if they want to proceed
    if (errorsByLevel.error.length === 0 && errorsByLevel.warning.length > 0) {
      const { proceed } = await inquirer.prompt([
        {
          type: "confirm",
          name: "proceed",
          message: "There are warnings. Do you want to proceed anyway?",
          default: false,
        },
      ]);

      if (proceed) {
        return []; // Clear errors if user wants to proceed
      }
    }

    return errors;
  }

  async validateFile(filePath, interactive = false) {
    try {
      const content = fs.readFileSync(filePath, "utf8");
      return await this.validateFrontMatter(content, interactive);
    } catch (error) {
      return [new ValidationError(`Failed to read file: ${error.message}`)];
    }
  }
}

export { MarkdownValidator, ValidationError };
