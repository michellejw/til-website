---
title: "The Nullish Coalescing Operator (??)"
summary: "...excuse me, what?"
tags: ["neat-stuff", "basics"]
date: "2024-11-14"
category: "javascript"
---

The nullish coalescing operator (literally, `??`). I saw this come up while working on a project, and I just thought it 
sounded like nonsense words. Turns out it is a real thing! And it's even a thing I've seen before but sort of didn't pay 
a lot of attention to. The nullish coalescing operator lets you handle `null` or `undefined` values by specifying a 
fallback value. It's a bit like the OR operator (||), except that OR will not only go to the fallback on null and 
undefined, but also for any "falsy" value. (That means literally `False` or 0 or an empty string.)

## The Difference from Logical OR

```javascript
// Nullish coalescing (??) only replaces null/undefined
null ?? "default"       // "default"
undefined ?? "default"  // "default"
0 ?? "default"         // 0
"" ?? "default"        // ""
false ?? "default"     // false

// Logical OR (||) replaces all falsy values
null || "default"      // "default"
undefined || "default" // "default"
0 || "default"        // "default"  ← different!
"" || "default"       // "default"  ← different!
false || "default"    // "default"  ← different!
```

## Practical Example: Form Validation

```javascript
function validateUserInput(input) {
    // Age of 0 is valid, name can be empty string
    const age = parseInt(input.age) ?? 0;    // Only defaults on null/undefined
    const name = input.name ?? 'Anonymous';   // Only defaults on null/undefined
    const bio = input.bio ?? '';             // Only defaults on null/undefined
    
    return { age, name, bio };
}
```
