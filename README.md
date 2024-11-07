# TIL Website

<img src="public/images/til-site.png" alt="TIL-site" style="border: 1px solid #ddd; border-radius: 4px; padding: 5px;">

A minimal "Today I Learned" website built with Next.js and Tailwind CSS. This is mostly an experiment and a way for me to play around with javascript and react. But also a fun way to collect some of the things I learn along the way.

If you want to replicate this for your own TIL site, follow along with these instructions:

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Git

### Installation

1. Clone the repository:

```bash
git clone https://github.com/michellejw/til-website.git
cd til-website
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

The site should run at `http://localhost:3000`

## Adding Content

### Using the CLI Tool

The project includes a CLI tool for creating new TIL entries:

```bash
node scripts/create-til.js "Your TIL Title"
```

This will launch a command line interface that will walk you through the basic creation of a new TIL markdown file. It incorporates some validation

create a new markdown file in `src/content/til/[category]` with the correct frontmatter.

### Manual Creation

1. Create a new markdown file in `src/content/til/[category]/[slug].md`
2. Add the required frontmatter:

```markdown
---
title: "Your TIL Title"
summary: "A brief summary of what you learned"
tags: ["tag1", "tag2"]
date: "2024-11-05"
---

# Your Content Here
```

## Customization

### Site Information

To customize the site title, description, and links:

1. Update metadata in `src/app/layout.tsx`
2. Modify header/footer links in `src/components/site_header.tsx`
3. Optional: Adjust styling in `tailwind.config.ts`

### Styling

The project uses Tailwind CSS with a custom configuration. Modify the theme in `tailwind.config.ts` to match your preferred styling.

## Project Structure

```
├── public/                  # Static assets
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── api/            # API routes
│   │   ├── fonts/          # Font files
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Home page
│   ├── components/         # React components
│   │   ├── ui/            # shadcn/ui components
│   │   └── site_header.tsx # Site header/footer
│   ├── content/           # Content directory
│   │   └── til/          # TIL markdown files
│   ├── lib/              # Utility functions
│   └── types/            # TypeScript types
└── package.json
```

## License

This project is released under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Uses [shadcn/ui](https://ui.shadcn.com/) components
- Markdown parsing by [react-markdown](https://github.com/remarkjs/react-markdown)
- Syntax highlighting by [react-syntax-highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
