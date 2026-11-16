---
title: "dsh-sidebar-notes"
summary: "Theme-adaptive Todo list and Sticky-Note board plugin for the DeepSeek Harness Web UI with three read/write AI agent tools and atomic host storage."
role: "Creator & Open-Source Maintainer"
period: "2026"
featured: true
order: 1
metrics:
  - "Published on npm (v0.1.1)"
  - "3 AI agent tools · 0 runtime deps"
  - "9 WCAG AA theme-adaptive skins"
stack:
  - "JavaScript"
  - "Node.js"
  - "React"
  - "Cordis"
  - "DeepSeek Harness SDK"
  - "CSS Tokens"
repoUrl: "https://github.com/ImNotDerk/dsh-sidebar-notes"
liveUrl: "https://www.npmjs.com/package/dsh-sidebar-notes"
architectureSummary: "Two-half Cordis bundle: a Node.js Host store that serializes bounded JSON mutations via atomic temp-file renames, and a zero-dependency React client that derives 9 sticky-note skins from active host semantic tokens via CSS color-mix()."
coverImage: "/images/projects/dsh-notes-dark.png"
coverAlt: "dsh-sidebar-notes sticky notes board running inside the DeepSeek Harness Web UI"
---

## Overview

`dsh-sidebar-notes` is an MIT-licensed bundle for the **DeepSeek Harness (DSH)** Web UI that adds two sidebar pages—a task tracker (**Todos**) and a draggable 24 px-grid board (**Sticky notes**)—alongside three agent tools so sessions can inspect and update user notes directly instead of asking them to retype context.

## Architecture & Guarantees

The plugin splits cleanly into two halves with zero external runtime dependencies:

- **Host Store (`index.js`)**: Runs in Node built-ins only, registering `/plugin/sidebar-notes` routes and serializing every mutation onto `~/.dsh/plugin-data/sidebar-notes.json` using atomic temp-file writes and renames.
- **Scoped Web Client (`client.js`)**: Uses the Host's React runtime to render the Todos progress view and grid-snapped sticky notes, scoping styles under `data-dswp-scope` so host global form overrides never break paper surfaces.

```text
DSH Web Client (React) ──HTTP JSON──▶ Host Store (index.js) ──atomic rename──▶ sidebar-notes.json
                                               ▲
Agent Session ── user_notes_{read,add,update} ─┘
```

### Bounded Storage & Non-Destructive Agent Tools

Three registered agent tools (`user_notes_read`, `user_notes_add`, and `user_notes_update`) allow AI sessions to assist without destructive side effects:

1. **No delete surface**: Agents can read, add, or update items, never delete them.
2. **Author stamping**: Every agent write carries `by: "agent"`, session ID, and timestamp so the UI renders an `AI` indicator on agent-modified items.
3. **Strict validation bounds**: Enforces limits on item counts (`500` todos, `80` notes), character lengths, and inline image payloads (`4 MiB` cap), rejecting malformed payloads with `4xx` responses before touching disk.

### Palette-Less Theme Adaptation

Instead of hardcoding colors or detecting theme names in JavaScript, all 9 sticky-note skins (`sunshine`, `mint`, `sakura`, `sky`, `twilight`, `sunset`, `graphite`, `neon`, `paper`) are `color-mix()` recipes over DSH semantic tokens (`--dsw-alias-*`). Every paper/ink and title-bar pair is contrast-verified across Frieren, Fern, Cyberzone, and base light/dark themes.
