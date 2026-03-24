# 📘 Personal Notes Site — GitHub + Docusaurus Setup Guide

## Overview

**What you'll get:**
- A docs site with a sidebar and Markdown content
- Every time you push a `.md` file to GitHub, it automatically publishes live
- Free hosting on GitHub Pages at: `https://YOUR-USERNAME.github.io/YOUR-REPO/`

---

## Step 1 — Prerequisites

Install the following on your machine:

### 1.1 Install Node.js
- Download from: https://nodejs.org (choose the **LTS** version)
- Verify the installation:
```bash
node -v    # should show v18 or higher
npm -v     # should show 9 or higher
```

### 1.2 Install Git
- Download from: https://git-scm.com
- Verify:
```bash
git --version
```

### 1.3 Create a GitHub Account
- Sign up at: https://github.com

---

## Step 2 — Create a GitHub Repository

1. Go to https://github.com/new
2. Fill in the following:
   - **Repository name:** `my-notes` (or any name you prefer)
   - **Visibility:** Public ✅ (required for free GitHub Pages)
   - **Initialize with README:** ✅ Yes
3. Click **Create repository**
4. Copy your repo URL, e.g.: `https://github.com/YOUR-USERNAME/my-notes`

---

## Step 3 — Create a Docusaurus Project Locally

Open your terminal (or VS Code terminal):

```bash
# Create the Docusaurus site
npx create-docusaurus@latest my-notes classic --typescript

# Navigate into the project folder
cd my-notes

# Test it locally (opens at http://localhost:3000)
npm run start
```

You should see a starter site in your browser. Press `Ctrl+C` to stop it.

---

## Step 4 — Configure Docusaurus for GitHub Pages

Open `docusaurus.config.ts` (or `.js`) in VS Code and update these fields:

```typescript
const config: Config = {
  title: 'My Notes',
  tagline: 'My personal knowledge base',
  favicon: 'img/favicon.ico',

  // ✅ Replace with your actual values
  url: 'https://deeptiyadavsd1111.github.io',
  baseUrl: '/my-notes/',          // must match your repo name

  organizationName: 'deeptiyadavsd1111',   // your GitHub username
  projectName: 'my-notes',             // your repo name

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // rest of config...
};
```

---

## Step 5 — Set Up GitHub Actions (Auto-Deploy)

Create the following file at: `.github/workflows/deploy.yml`

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main   # triggers on every push to main

  workflow_dispatch:

permissions:
  contents: write

jobs:
  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build website
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

---

## Step 6 — Connect to GitHub and Push

> **Note:** `npx create-docusaurus@latest` automatically initializes a git repo, so you can skip `git init` if the `.git` folder already exists in your project directory.

```bash
# Inside your my-notes folder:

# Connect to your GitHub repo (skip git init if .git folder already exists)
git init  # skip this if Docusaurus already created a .git folder
git remote add origin https://github.com/YOUR-USERNAME/my-notes.git

# Stage all files
git add .

# First commit
git commit -m "Initial Docusaurus setup"

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 7 — Enable GitHub Pages

> **Important:** The `gh-pages` branch is created automatically by the GitHub Action after your first push. Complete Step 6 first and wait for the Action to finish (check the **Actions** tab in your repo) before continuing here.

1. Go to your repo on GitHub
2. Click the **Settings** tab
3. Click **Pages** in the left sidebar
4. Under **Source**, select: `Deploy from a branch`
5. Set Branch to `gh-pages` and folder to `/ (root)`
6. Click **Save**

Wait 2–3 minutes, then visit:
```
https://YOUR-USERNAME.github.io/my-notes/
```

🎉 **Your site is live!**

---

## Step 8 — Writing Notes (Daily Workflow)

### Where to put your notes
All notes go in the `docs/` folder as `.md` files.

### Create a new note
```bash
# Example: create a note about AWS
touch docs/aws-notes.md
```

### Example note format
```markdown
---
sidebar_position: 1
title: AWS Notes
---

# AWS Notes

## EC2

Some notes about EC2...

## S3

Notes about S3 buckets...
```

### Publish your note (3 commands)
```bash
git add .
git commit -m "Add AWS notes"
git push
```

That's it! GitHub Actions will automatically build and deploy your site within ~2 minutes.

---

## Step 9 — Organize with Folders (Sidebar Sections)

Create subfolders inside `docs/` to get sidebar sections:

```
docs/
├── aws/
│   ├── _category_.json    ← controls the sidebar section label
│   ├── ec2.md
│   └── s3.md
├── commvault/
│   ├── _category_.json
│   └── backup-faq.md
└── general/
    └── intro.md
```

### `_category_.json` format
```json
{
  "label": "AWS",
  "position": 1,
  "collapsible": true,
  "collapsed": false
}
```

---

## Quick Reference

| Action | Command |
|--------|---------|
| Run locally | `npm run start` |
| Build for production | `npm run build` |
| Publish a note | `git add . && git commit -m "msg" && git push` |
| Check deploy status | GitHub repo → Actions tab |

---

## Folder Structure Reference

```
my-notes/
├── .github/
│   └── workflows/
│       └── deploy.yml        ← auto-deploy config
├── docs/                     ← YOUR NOTES GO HERE
│   ├── intro.md
│   └── your-note.md
├── blog/                     ← optional (can be deleted)
├── src/                      ← site source (do not modify)
├── static/                   ← images, favicon
├── docusaurus.config.ts      ← main config (edit in Step 4)
├── sidebars.ts               ← sidebar config (auto or manual)
└── package.json
```

---

## Troubleshooting

**Site shows 404:**
- Verify that `baseUrl` in `docusaurus.config.ts` matches `/YOUR-REPO-NAME/`
- Confirm that GitHub Pages source is set to the `gh-pages` branch

**Deploy not triggering:**
- Check the Actions tab in your GitHub repo for error logs
- Ensure the workflow file is located at `.github/workflows/deploy.yml`

**Local dev not starting:**
- Run `npm install` again
- Confirm that your Node.js version is 18 or higher

---

*Built with Docusaurus · Hosted on GitHub Pages · Free forever*
