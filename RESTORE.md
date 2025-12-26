# Quick Version Restoration Guide

This guide explains how to restore the project to specific milestones.

## Version Overview

*   **v1.x Series (Classic UI):** The core LinkedIn Messaging recreation without rich text features.
*   **v2.x Series (Rich Text):** The enhanced version with formatting toolbar and message editing.

## How to Restore

### Restore to v1.4.0 (Stable Classic UI)
Use this to revert to the polished UI *before* the Rich Text Editor was added.

```bash
# Navigate to project
cd "/Users/pranavdeo/Desktop/LinkedIn Messaging"

# Restore files from v1.4.0 backup
cp versions/v1.4.0/index.html index.html
cp versions/v1.4.0/src/styles.css src/styles.css
cp versions/v1.4.0/src/app.js src/app.js

# Restart dev server
npm run dev
```

### Restore to v2.1.0 (Current Enhanced)
Use this to restore the latest version with Rich Text and Editing.

```bash
cp versions/v2.1.0/index.html index.html
cp versions/v2.1.0/src/styles.css src/styles.css
cp versions/v2.1.0/src/app.js src/app.js
npm run dev
```

### Restore to v2.2.0 (List Support)
Use this to restore the version with Bullet and Numbered Lists.

```bash
cp versions/v2.2.0/index.html index.html
cp versions/v2.2.0/src/styles.css src/styles.css
cp versions/v2.2.0/src/app.js src/app.js
npm run dev
```

## Creating Backups

To save your current state as a new version:

```bash
# Example: creating v2.3.0
mkdir -p versions/v2.3.0/src
cp index.html versions/v2.3.0/
cp src/styles.css versions/v2.3.0/src/
cp src/app.js versions/v2.3.0/src/
cp README.md versions/v2.3.0/
```

## Directory Structure

```
versions/
├── v1.0.0/ (Initial Release)
├── v1.4.0/ (Polished Classic UI)
├── v2.0.0/ (Rich Text Prototype)
├── v2.1.0/ (Rich Text + Editing)
└── v2.2.0/ (List Support)
```
