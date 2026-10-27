---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".
metadata:
  author: vercel
  version: "1.0.0"
  argument-hint: <file-or-pattern>
---

# Web Interface Guidelines

Review files for compliance with Web Interface Guidelines.

## How It Works

1. Read the guidelines from `guidelines.md` in this skill's folder
2. Read the specified files (or prompt user for files/pattern)
3. Check against all rules in the guidelines
4. Output findings in the terse `file:line` format

## Guidelines Source

Local, reviewed copy (do not fetch from the network): `guidelines.md` next to this file.
It is vercel-labs/web-interface-guidelines `command.md` at commit 434b7f9 (2026-10-05).
Upstream URL, for a deliberate manual update only:
https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md

Project override: this project writes headings and buttons in sentence case (see CLAUDE.md),
so ignore the guideline's "Title Case for headings/buttons" rule.

## Usage

When a user provides a file or pattern argument:
1. Read `guidelines.md`
2. Read the specified files
3. Apply all rules from the fetched guidelines
4. Output findings using the format specified in the guidelines

If no files specified, ask the user which files to review.
