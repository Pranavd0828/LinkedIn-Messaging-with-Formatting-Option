# Product Feature Document: Rich Text Messaging

## 1. Feature Summary

This feature introduces a rich text formatting toolbar to the LinkedIn Messaging interface, allowing users to apply Bold, Italic, Underline, and Strikethrough styles to their messages. The core user action involves selecting text or toggling a style button before typing to apply formatting. This feature lives directly above the message input field within the chat window.

## 2. Problem and Context

Professional communication often requires emphasis and structure that plain text cannot provide. Users currently lack the ability to highlight critical details like meeting times or deadlines, which can lead to misinterpretation or overlooked information. Anecdotal evidence suggests that users resort to capitalizing words or using asterisks to create emphasis, which looks unprofessional.

## 3. Target Users and Use Cases

This feature targets professionals who rely on high-stakes, asynchronous communication to do their jobs. We have identified three primary personas where clarity is non-negotiable.

**Primary Persona: The Technical Recruiter**
Recruiters send dozens of InMails daily containing critical logistical information.
*   **Scenario:** A recruiter invites a candidate to a final round interview.
*   **Action:** They use **Bold** to highlight the date (Thursday, Oct 12th) and time (2:00 PM EST) to prevent scheduling errors. They use *Italics* to emphasize that the interview will be a technical coding session, ensuring the candidate prepares correctly.
*   **Value:** Reduces "no-show" rates and back-and-forth clarification emails.

**Secondary Persona: The Sales Professional**
Sales Development Reps (SDRs) need their outreach to stand out in a crowded inbox.
*   **Scenario:** An SDR sends a cold outreach message to a prospect.
*   **Action:** They use **Bold** to highlight the unique value proposition (e.g., **"Reduce closing time by 20%"**) and Strikethrough to show a limited-time discount (e.g., ~~$100/mo~~ $50/mo).
*   **Value:** Increases open-to-reply conversion rates by drawing the eye to the Benefit statement.

**Tertiary Persona: The Engineering Leader**
Engineering Managers often coordinate incident responses or critical updates via messaging groups.
*   **Scenario:** An EM posts an update about a production outage in the team channel.
*   **Action:** They use **Bold** for the Incident Severity (**SEV1**) and *Italics* for the current status (*Investigating*) to distinguish it from casual chatter.
*   **Value:** clear, actionable communication that cuts through noise during emergencies.

## 4. User Flow and Interaction

The flow begins when a user clicks into the message input area.
1.  **Activation:** The user clicks the input field, and the formatting toolbar becomes active.
2.  **Selection:** The user types a message and selects a specific word.
3.  **Application:** The user clicks the "B" (Bold) icon in the toolbar. The selected text immediately becomes bold.
4.  **Toggling:** Alternatively, the user clicks "I" (Italic) before typing. The button visually depresses to show it is active. Any subsequent text typed is italicized until the user clicks the button again to toggle it off.
5.  **Sending:** The user presses Send, and the message appears in the chat history with all formatting preserved.

## 5. Scope and Assumptions

This experiment includes the implementation of six basic formatting styles: Bold, Italic, Underline, Strikethrough, Bulleted Lists, and Numbered Lists. It also includes the UI for the toolbar and keyboard shortcut support (e.g. Cmd+B).

We have explicitly excluded more complex formatting like hyperlinks and code blocks for this initial version. We are assuming that `document.execCommand` or a similar lightweight approach will provide sufficient cross browser compatibility for this prototype.

## 6. Prototype Details

The prototype is built using standard HTML5, CSS3, and Vanilla JavaScript.

**Key Components:**
*   **RichTextToolbar:** A container with five `<button>` elements, represented by simple text icons or SVGs.
*   **MessageInput:** A `<div>` element with `contenteditable="true"` that replaces the standard textarea.

We are using temporary logic to handle the state synchronization between the cursor position and the toolbar buttons (e.g. highlighting the "B" button when the cursor is inside bold text). No backend storage is mocked; the formatted HTML is simply appended to the local DOM message list.

## 7. Expected Value and Impact

We hope to learn if users value expressiveness enough to use the toolbar during quick messaging interactions. Our hypothesis is that engagement time in the composition area will increase slightly, but message clarity and receiver response rates will improve.

**Success Signals:**
*   Percentage of messages sent containing at least one formatting tag.
*   User retention of the feature (do they use it more than once).

## 8. Limitations and Open Questions

A known gap in this prototype is the lack of robust sanitization for pasted content. If a user pastes complex HTML from another site, it may break the visual style of the chat bubble.

**Risks:**
*   Inconsistent behavior of `contenteditable` across different browsers (Safari vs Chrome).
*   Mobile web keyboards may not play nicely with the custom toolbar.

**Open Questions:**
*   Should we allow markdown shortcuts (e.g. typing `**text**`) to auto format?
*   How do we handle dark mode for the toolbar active states?

## 9. Next Steps

A production version would need a robust rich text library (like Slate.js or Draft.js) to handle cross browser inconsistencies and sanitization securely.

**Possible Evolutions:**
*   Adding support for lists (bullet and numbered).
*   Adding inline code blocks for technical recruiting use cases.

**Decisions Needed:**
*   Approval on the specific shade of grey for the "active" button state.
*   Confirmation on whether to support "Underline," as it can be confused with hyperlinks.
