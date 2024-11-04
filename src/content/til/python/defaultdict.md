---
title: "Python defaultdict"
summary: "A cleaner way to handle dictionary initialization in Python"
tags: ["python", "datastructures", "nlp"]
date: "2024-11-04"
category: "python"
---

# Python defaultdict

Let's say you're creating a dictionary on the fly, but you don't know all the keys ahead of time. With defaultdict, if you want to update the dict with a key that doesn't yet exist, it will just handle it in the background.

```python
from collections import defaultdict

# Common NLP use case: word counting
word_counts = defaultdict(int)
text = "apple orange apple banana apple"

for word in text.split():
    word_counts[word] += 1  # Just works!
```