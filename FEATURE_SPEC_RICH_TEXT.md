# Product Feature Document: Rich Text Messaging

**Version:** 1.1
**Status:** Implemented (v2.1.0)
**Date:** November 29, 2025
**Author:** Pranav Deo (Simulated)

---

## 1. Executive Summary
This feature introduces rich text formatting capabilities to the LinkedIn Messaging experience. By allowing users to emphasize text (Bold, Italic, Underline, Strikethrough), we aim to enhance the clarity, expressiveness, and professionalism of direct communication.

## 2. Problem Statement
Current plain-text messaging limits a user's ability to:
*   Emphasize critical points in professional discussions (e.g., dates, key terms).
*   Structure longer messages effectively.
*   Convey nuance that requires visual distinction.

## 3. Goals & Objectives
*   **Expressiveness:** Enable users to format text for better readability and emphasis.
*   **Professionalism:** Provide tools that allow for more structured and polished communication.
*   **Seamless Integration:** Implement these features within the existing LinkedIn design language without cluttering the UI.

## 4. Functional Requirements

### 4.1. Rich Text Toolbar
A formatting toolbar must appear immediately above the message input area.

*   **Buttons:**
    *   **Bold (B):** Toggles bold weight.
    *   **Italic (I):** Toggles italic style.
    *   **Underline (U):** Toggles text underlining.
    *   **Strikethrough (S):** Toggles strikethrough style.
*   **Behavior:**
    *   **Single Click:** Toggles the formatting style on/off for the current selection or cursor position.
    *   **Active State:** Buttons must visually indicate (via darker background/text) when the style is active at the current cursor position.
    *   **"Sticky" Mode (Double-Click):** Double-clicking a button forces the style to stay **ON**, even if the second click would normally toggle it off. This ensures users can deliberately lock a style.
    *   **State Sync:** The toolbar must update in real-time as the user moves the cursor through text with different formatting.

### 4.2. Message Input Area
*   **Component:** Replaces the standard `<textarea>` with a `contenteditable` container.
*   **Placeholder:** Displays "Write a message..." when empty.
*   **Sanitization:** Must ensure no unwanted whitespace exists on initialization.
*   **Shortcuts:** Supports standard keyboard shortcuts (Cmd/Ctrl+B, Cmd/Ctrl+I, etc.).

## 5. User Experience (UX) & Design

### 5.1. Visual Style
*   **Toolbar:**
    *   Background: Transparent / Light Grey on hover.
    *   Icons: Simple serif/sans-serif letter representations (B, I, U, S).
    *   Active Color: Dark Grey background (`#d0d0d0`) with Black text.
    *   Dimensions: Compact row, 32px height buttons.
*   **Input Box:**
    *   Retains the "pill" or rounded rectangle look of the original input.
    *   Auto-expands vertically as user types.

### 5.2. Interaction Flow
1.  **Formatting:** User clicks 'B', button turns dark. User types "Hello". Text appears **Hello**. User clicks 'B' again, button turns light. User types " World". Text appears normal.

## 6. Technical Considerations
*   **Implementation:** Use `document.execCommand` for broad compatibility with `contenteditable`.
*   **State Management:** Use `document.queryCommandState` on `keyup`, `mouseup`, and `click` events to keep the toolbar synced with the editor.
*   **Focus Management:** Formatting buttons must use `mousedown` (with `preventDefault`) instead of `click` to ensure the editor does not lose focus when buttons are pressed.

## 7. Future Scope (v3.0+)
*   Hyperlink insertion.
*   Bulleted and Numbered lists.
*   Code block formatting.
