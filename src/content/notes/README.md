# Field Notes

Add an article as a Markdown file named with a lowercase slug, for example `engineering-for-clarity.md`.

```markdown
---
title: "Your article title"
description: "A short, factual summary."
date: "2026-10-16"
tags:
  - Engineering
draft: true
---

Write the article here.
```

Set `draft: false` when the article is ready. Draft and future-dated articles are excluded from the generated pages, browser bundle, list, and sitemap. Dates use the Asia/Shanghai publication calendar. Images can live in `public/images/notes/` and use root-relative paths.

The filename becomes `/notes/<slug>/`. Build-time validation checks fields and dates, and rendered Markdown is sanitized before inclusion.
