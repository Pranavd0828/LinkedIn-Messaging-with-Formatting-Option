# LinkedIn Messaging UI Recreation

[![Version](https://img.shields.io/badge/version-4.0.0-blue.svg)](VERSION_HISTORY.md)
[![Dev Server](https://img.shields.io/badge/dev%20server-running-success.svg)]()

A pixel-perfect recreation of the LinkedIn Messaging interface built with modern HTML, CSS, and Vite.

> **Current ![Version](https://img.shields.io/badge/version-2.1.1-blue.svg)](VERSION_HISTORY.md)

**Current Version:** v2.1.1 (Final Polish)

## Recent Updates
- **v2.1.1:** Fixed profile images, dynamic list rendering, and message whitespace issues.
- **v2.1.0:** Added active state for formatting buttons and message editing functionality with '(Edited)' label.
- **v2.0.0:** Implemented Rich Text Editor prototype with formatting toolbar.
- **v1.4.0:** Interactive polish with realistic data, active states, and hover effects.
- **v1.3.0:** Visual polish for top nav, right sidebar ad, and message input box.
- **v1.2.0:** Major layout refactor to 3-row stack (Header, Pills, Content).

## 📸 Overview

This project replicates the complex 3-pane layout of LinkedIn's desktop messaging interface.

## 🏗 Layout Architecture (v3.1.0)

The application uses a **Stacked Row Layout** strategy to achieve the correct visual hierarchy. It is NOT a simple 2-column grid.

### The "3-Row" Structure

The main interface is divided into three distinct vertical sections (Rows) that stack on top of each other:

1.  **Row 1: Global Header** (`.header-top`)
    *   **Scope:** Spans the full width of the messaging container.
    *   **Content:** "Messaging" title (Left), Search Bar (Center), Action Icons (Right).
    *   **Behavior:** Fixed height, flex alignment.

2.  **Row 2: Global Filter Bar** (`.filter-pills`)
    *   **Scope:** Spans the full width, directly under the header.
    *   **Content:** Filter pills (Focused, Jobs, Unread, etc.).
    *   **Behavior:** Single horizontal line, no wrapping, full width.

3.  **Row 3: Messaging Columns** (`.messaging-columns`)
    *   **Scope:** Occupies all remaining vertical space below the pills.
    *   **Layout:** CSS Grid (`410px 1fr 300px`).
    *   **Columns:**
        *   **Left (410px):** Conversation List (Scrollable).
        *   **Center (1fr):** Chat Window (Header + Message History + Input).
        *   **Right (300px):** Sidebar (Profile details/Ads).

### DOM Hierarchy

```html
<main class="main-content"> (Flex Column)
  ├── .messaging-header (Flex Auto)
  │     ├── .header-top (Row 1)
  │     └── .filter-pills (Row 2)
  │
  └── .messaging-columns (Flex 1, CSS Grid)
        ├── .conversation-list (Col 1: 410px)
        ├── .message-view      (Col 2: 1fr)
        └── .right-sidebar     (Col 3: 300px)
```

This structure ensures that the Header and Pills are never constrained by the width of the Conversation List, allowing them to span the full interface width as seen in the real LinkedIn UI. with high visual fidelity, including:
- Three-column responsive layout
- LinkedIn's design system (colors, typography, spacing)
- Interactive filter pills with authentic styling
- Conversation list with profile avatars
- Message view with composition area
- Premium sidebar

## ✨ Features

### Core Components

- ✅ **Top Navigation Bar**
  - LinkedIn logo and branding
  - Global search
  - Navigation icons (Home, My Network, Jobs, Messaging, Notifications, Me, For Business)
  - Premium upsell banner
  - Active state indicators

- ✅ **Left Column - Conversation List** (340px)
  - Messaging header with action buttons
  - Search messages input
  - Filter pill row with 6 options:
    - **Focused** (active, green pill with dropdown arrow)
    - Jobs, Unread, Connections, InMail, Starred
  - Scrollable conversation list with:
    - 56px circular profile avatars
    - Contact names and timestamps
    - Message previews
    - Active conversation highlighting
    - Online status indicators

- ✅ **Center Column - Message View** (flexible width)
  - Contact header with profile info
  - Message thread display
  - Message composition area with toolbar
  - Send button and formatting options

- ✅ **Right Column - Premium Sidebar** (300px)
  - Profile avatar with Premium badge
  - Promotional content
  - CTA button
  - Footer links

### Design System

**Colors:**
- LinkedIn Blue: `#0a66c2`
- Messaging Green (active pill): `#057642`
- Background: `#f3f2ef`
- Card Background: `#ffffff`
- Borders: `#e0e0e0`, `#d6d6d6`
- Text Primary: `#434649`, `rgba(0, 0, 0, 0.9)`
- Text Secondary: `rgba(0, 0, 0, 0.6)`

**Typography:**
- Font Family: `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- Base Size: `14px`
- Font Weights: 400 (regular), 500 (medium), 600 (semibold)

**Filter Pills Specifications:**
- Capsule shape: `border-radius: 999px`
- Height: ~24px (3px vertical padding + 18px line-height)
- Horizontal padding: `14px`
- Default: White background, `#d6d6d6` border
- Active (Focused): Green background `#057642`, white text
- Hover: `#f0f2f5` background, `#c2c8d0` border
- No wrapping on desktop (horizontal scroll on narrow screens)
- All pills aligned on single horizontal baseline

**Avatars:**
- Conversation list: `56px` circular
- Message view: `48px` (header), `32px` (message bubbles)
- Circular with `object-fit: cover`

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone or navigate to the project:**
   ```bash
   cd "/Users/pranavdeo/Desktop/LinkedIn Messaging"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

### Development

Start the development server with hot reload:

```bash
npm run dev
```

The app will be available at **http://localhost:5173/**

### Build for Production

Create an optimized production build:

```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## 📁 Project Structure

```
linkedin-messaging/
├── index.html              # Main HTML file (355 lines)
├── linkedinm.html          # Reference HTML (read-only)
├── src/
│   ├── styles.css         # Complete stylesheet (751 lines)
│   └── app.js             # Interactive messaging (240 lines)
├── assets/
│   └── images/            # Image assets
├── versions/
│   ├── v1.0.0/           # Version 1.0.0 backup
│   └── v2.0.0/           # Version 2.0.0 backup (current)
├── package.json           # Project dependencies
├── vite.config.js         # Build configuration
├── .gitignore            # Git ignore rules
├── README.md             # This file
├── VERSION_HISTORY.md    # Version changelog
└── RESTORE.md            # Version restoration guide
```

## 🎨 Key Implementation Details

### Filter Pills Row

The filter pill row sits directly below the search bar in the left column:

**HTML Structure:**
```html
<div class="msg-filter-row">
  <div class="msg-filter-pills" role="radiogroup">
    <button class="msg-pill msg-pill--active">
      Focused
      <span class="msg-pill-arrow">▾</span>
    </button>
    <button class="msg-pill">Jobs</button>
    <!-- ... other pills ... -->
  </div>
</div>
```

**CSS Highlights:**
- Container background: `#f3f2ef`
- Compact padding: `4px 16px 6px 16px`
- Pills use `flex: 0 0 auto` to prevent shrinking
- `flex-wrap: nowrap` ensures single horizontal line
- `overflow-x: auto` for horizontal scroll on narrow screens
- Perfect baseline alignment with `line-height: 18px`

### Responsive Design

**Desktop (> 992px):**
- Full three-column layout
- All features visible

**Tablet (768px - 992px):**
- Premium sidebar hidden
- Two-column layout (conversations + messages)

**Mobile (< 768px):**
- Single column layout
- Message view takes full width

## 🛠 Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling with Flexbox and Grid
- **Vite** - Lightning-fast development server and build tool
  - Hot Module Replacement (HMR)
  - Optimized production builds
  - Fast cold start (~160ms)

## 🎯 Development Workflow

### Making Changes

1. Edit `index.html` or `src/styles.css`
2. Browser auto-reloads via Vite HMR
3. No manual refresh needed!

### Testing

- Visual comparison with LinkedIn's actual UI
- Responsive testing at different breakpoints
- Hover and interactive state verification

### Deployment

```bash
npm run build    # Creates dist/ folder
npm run preview  # Test locally
# Deploy dist/ to your hosting service (Netlify, Vercel, etc.)
```

## 📝 Recent Updates

### Version 3.2.0 (November 2025)

1. **Visual Polish & Refinements** ✅
   - **Top Nav:** Synced avatars, corrected icons, added vertical divider.
   - **Right Sidebar:** Fully styled Premium Ad with profile header and footer links.
   - **Layout:** Added full-width header divider line.
   - **Message Input:** Compact single-line input (48px height) with fixed footer visibility.

### Version 3.1.0 (November 2025)

1. **Perfect Filter Pills Alignment** ✅
   - All pills sit on single horizontal baseline
   - Fixed vertical drift from v1.0.0
   - Standardized padding (4px 16px) and line-height (1)
   - Active state only changes colors (green #0b6e4f)
   - vertical-align: middle prevents baseline shift

2. **Interactive Messaging System** ✅
   - Click any conversation to view message history
   - Send new messages in real-time
   - Dummy conversation data for all 7 contacts
   - Auto-updating conversation previews in left panel
   - Enter key to send messages
   - Auto-scroll to latest message

3. **LinkedIn-Style Message Input** ✅
   - Large textarea with light gray background (#f5f5f5)
   - Collapse button (up arrow) in top-right
   - Proper SVG toolbar icons:
     - Photo/Gallery icon
     - Attachment/Paperclip icon
     - Emoji/Smiley icon
     - Three dots menu
   - Send button with intelligent states:
     - Gray/disabled when empty
     - Blue/enabled when text entered
   - Focus state changes background to #ebebeb

4. **JavaScript Functionality** ✅
   - Created `src/app.js` (240 lines) for interactivity
   - Conversation switching with click handlers
   - Message sending with input validation
   - Dynamic message rendering
   - Time stamping for new messages
   - Send button enable/disable logic

## 🔍 Important Notes

- **`linkedinm.html`** is the original LinkedIn HTML file used as a visual reference. **Do not modify this file.**
- **`index.html`** is our working file where all changes are made.
- The project uses **no external CSS frameworks** - everything is custom-built.
- All colors and spacing are carefully matched to LinkedIn's production UI.

## 🤝 Development Guidelines

When making updates:

1. Always reference `linkedinm.html` for visual accuracy
2. Maintain the existing class naming conventions
3. Keep CSS organized by component sections
4. Test responsive behavior at multiple breakpoints
5. Ensure accessibility (focus states, contrast, semantic HTML)
6. Use system font stack for cross-platform consistency

## 🌐 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## 📊 Project Stats

- **Dependencies**: 13 packages
- **Build Tool**: Vite v7.2.4
- **Dev Server Startup**: ~160ms
- **Vulnerabilities**: 0 ✅
- **Lines of CSS**: ~750 lines
- **Components**: 4 major sections (nav, conversations, messages, sidebar)

## 🎓 Learning Resources

This project demonstrates:
- Modern CSS layout techniques (Flexbox, Grid)
- Component-based styling approach
- Responsive design patterns
- Design system implementation
- Production build optimization with Vite

## 📄 License

MIT

## 🙏 Acknowledgments

Design and UI inspired by LinkedIn's Messaging interface.

---

**Made with ❤️ using modern web technologies**

**Current Status:** Development server active at http://localhost:5173/
