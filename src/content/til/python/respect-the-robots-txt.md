---
title: "Respect the Robots(.txt)"
summary: "Being a good internet citizen... with bots!"
tags: ["python", "web-scraping", "automation", "best-practices"]
date: "2024-11-11"
category: "web"
---


When scraping websites, it's important to check and respect the site's `robots.txt` file. This file contains a set of rules that tell web crawlers which parts of the site they can and can't access. 

Here's what a typical robots.txt might look like:

```text
User-agent: *
Disallow: /private/
Allow: /public/
Crawl-delay: 2
```

To handle these rules in Python, we can use the `robotparser` module from the standard library:

```python
from urllib import robotparser
import time

def setup_crawler(website_url):
    """
    Set up a robot parser for a website
    """
    parser = robotparser.RobotFileParser()
    parser.set_url(f"{website_url}/robots.txt")
    parser.read()
    return parser

def can_fetch(parser, url, user_agent="PythonBot"):
    """
    Check if we're allowed to fetch a URL
    """
    return parser.can_fetch(user_agent, url)

# Example usage
if __name__ == "__main__":
    base_url = "https://example.com"
    parser = setup_crawler(base_url)
    
    urls_to_check = [
        "/public/page1",
        "/private/secret",
        "/about"
    ]
    
    for url in urls_to_check:
        full_url = f"{base_url}{url}"
        if can_fetch(parser, full_url):
            print(f"✅ Allowed to crawl: {url}")
            # Respect crawl delay
            time.sleep(parser.crawl_delay(user_agent="PythonBot") or 1)
        else:
            print(f"❌ Not allowed to crawl: {url}")
```

### Tips for being a *nice* bot

1. Identify your bot with a user agent
2. Respect rate limits and crawl delays
3. Have a way for site owners to contact you
4. Don't hammer servers with too many requests