# Version History - LinkedIn Messaging Recreation

This document tracks all versions of the LinkedIn Messaging UI recreation project.

---

## Version 2.1.0 (Current) - November 29, 2025
**Status:** ✨ Enhanced - Editing & Polish
*(Formerly v4.1.0)*

### ✨ New Features
- **Active Toolbar States:** Formatting buttons (Bold, Italic, etc.) now visually light up when active, syncing with the cursor position.
- **Message Editing:** Users can now edit their sent messages.
    - **UI:** A "✎ Edit" button appears on hover for sent messages.
    - **Inline Editing:** Clicking edit converts the message into an inline editor.
    - **Edited Label:** Modified messages are automatically tagged with an `(Edited)` label.

### 🛠 Technical Improvements
- **State Sync:** Implemented `document.queryCommandState` to ensure the toolbar always reflects the true formatting state.

---

## Version 2.0.0 - Rich Text Editor Prototype
**Status:** 🚧 Prototype - Rich Text Editor
*(Formerly v4.0.0)*

### ✨ New Features
- **Rich Text Formatting Toolbar:** Added a toolbar above the message input with Bold, Italic, Underline, and Strikethrough options.
- **Rich Text Input:** Replaced the standard text area with a `contenteditable` editor.
- **Formatting Logic:** Implemented browser-native `execCommand` to handle text formatting operations.

### 🎨 Visual Updates
- **Toolbar Styling:** Designed a clean, light gray toolbar with rounded buttons and hover effects.
- **Editor Styling:** Ensured the new rich text input visually matches the previous text area.

---

## Version 1.4.0 - Interactive Polish
**Status:** ✅ Stable - Content & Polish
*(Formerly v3.3.0)*

### 🎨 Visual & Interactive Improvements
- **Active Conversation Styling:** Implemented pixel-perfect active state (green border, grey background).
- **Hover Effects:** Added "Star" and "Options" buttons on hover; hidden timestamp to prevent overlap.
- **Notification Cleanup:** Removed the red notification badge.

### 📝 Content Updates
- **Realistic Data:** Replaced placeholder names with realistic profiles (e.g., "Sarah Jenkins", "David Chen").

---

## Version 1.3.0 - Visual Polish
**Status:** ✅ Stable - Visual Refinements
*(Formerly v3.2.0)*

### 🎨 Visual Refinements
- **Top Navigation:** Synced profile picture, updated icons, added vertical divider.
- **Right Sidebar:** Complete redesign of the Premium Ad component.
- **Layout:** Added header divider, compacted message input box.

---

## Version 1.2.0 - Layout Architecture Refactor
*(Formerly v3.1.0)*

### 🏗 Major Architectural Changes
- **Global Stacked Row:** Refactored layout to a 3-row stack (Header, Pills, Content).
- **CSS Grid:** Implemented precise column sizing (`410px 1fr 300px`).

---

## Version 1.1.0 - Interactive Features
*(Formerly v2.0.0)*

- **Interactive Messaging:** Click to view, send messages.
- **Dynamic Previews:** Auto-updating conversation snippets.

---

## Version 1.0.0 - Initial Release
*(Formerly v1.0.0)*

- **Core Layout:** Three-column responsive layout.
- **Basic Components:** Conversation list, message view, right sidebar.
