---
title: "Mermaid Flow Diagrams"
summary: "Create flow diagrams using markdown"
tags: ["markdown", "flow diagrams", "documentation"]
date: "2024-11-04"
category: "tools"
---

# Mermaid Flow Diagrams

Flow diagrams are a super helpful part of documenting code processes and workflows, but they can be a pain to create. Mermaid lets you create diagrams using markdown-like syntax, which is great for version control and documentation.

Here's a simple example of a flow diagram showing a debugging process:

![Debug Flow Diagram](/images/mermaid-demo.png)

<!-- <img src="/images/mermaid-demo.svg" alt="Debug Flow Diagram" className="w-96" /> -->

The code to generate this diagram is straightforward:

```mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> B
```
