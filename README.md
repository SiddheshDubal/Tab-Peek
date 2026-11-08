# Tab Peek

A Safari extension for macOS that lets you preview your open tabs without
switching to them.

## What it does

- Click the Tab Peek button in Safari's toolbar to see a list of the tabs in
  the current window. The tab you're on is highlighted, and its preview is
  shown when the popup opens.
- Hover a tab in the list to see a thumbnail of that page.
- Type in the search box to filter tabs by title or address.
- Click a tab to switch to it. Click its × to close it.
- Tick **All windows** to list the tabs of every Safari window, grouped under
  a header per window. Click another window's header to bring that window to
  the front, or its × to close the whole window (it asks first).
- Click the ⚙ next to the search box to open Tab Peek's settings.

## Settings

Changes are saved as soon as you make them. Each setting has a "?" that
explains it (hover to peek, click to keep it open).

- **Thumbnails**: how many to keep (10–500, default 100), how sharp they are
  (Low / Medium / High), and a button to delete them all.
- **Theme**: Auto (follows macOS), Light or Dark, for the popup and the
  settings page.
- **Popup**: tab list height, show or hide the preview card, how long to
  hover before a preview appears (0–1000 ms), show or hide the hover hint,
  and whether closing a tab or a window asks first.

Each section has a "Reset to default" button that appears once something in
it has changed, and "Reset all settings to defaults" puts everything back.

## How it works

- **Background script** (`background.js`): when a tab becomes active, or
  finishes loading while active, Tab Peek waits half a second, takes a
  screenshot of it, shrinks it, and saves it on your Mac.
- **Toolbar popup** (`popup.html`, `popup.css`, `popup.js`): lists the tabs
  and shows the saved thumbnail when you hover one.
- **Settings page** (`options.html`, `options.css`, `options.js`): opens in
  a Safari tab.
- **Shared code**: `settings.js` holds every setting's default and loads the
  saved values; `theme.js` applies the chosen theme.
- Thumbnails are deleted when a tab or window closes. Tab Peek keeps only the
  newest ones (100 unless you change it), and cleans up leftovers after
  Safari restarts.

## Privacy

- Thumbnails and settings are stored only on your Mac, in the extension's own
  storage.
- Tab Peek makes no network requests. Nothing is uploaded anywhere.
- Permissions: `tabs` (read tab titles and addresses), `storage` (save
  thumbnails and settings), and access to all websites (required to
  screenshot a page).

## Limitations

- Safari can only screenshot what is on screen, so a tab needs to have been
  shown at least once to have a thumbnail. Until then, the popup shows
  "No preview for this tab yet".
- Thumbnails are still images from the last time the tab was visible, not
  live previews.
- Safari's tab groups aren't shown; Safari doesn't give extensions access to
  them.

## Build and install

1. Open `Tab Peek.xcodeproj` in Xcode.
2. Under Signing & Capabilities, choose your team for both the `Tab Peek`
   and `Tab Peek Extension` targets (a free Personal Team works).
3. Product → Archive, then Distribute App → Custom → Copy App, and drag
   Tab Peek into `/Applications`.
4. Open Tab Peek once, then turn it on in Safari → Settings → Extensions.

Tested on macOS 27 with Safari 27.

## Project layout

- `Tab Peek/`: the macOS app that installs the extension
- `Tab Peek Extension/Resources/`: the extension itself (manifest,
  background script, popup, settings page)

## License

Copyright (C) 2026 SiddheshDubal

Tab Peek is free software, licensed under the GNU General Public License
v3.0. See `LICENSE` for the full text.

**Additional terms (GPL-3.0 section 7(b)):** the settings page shows the
author line "Tab Peek by SiddheshDubal". Any copy or modified version you
share must keep that line in the program's legal notices.

## Version

2.1
