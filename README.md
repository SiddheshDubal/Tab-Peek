
# Tab Peek

A Safari extension for macOS that lets you preview your open tabs without
switching to them.

## What it does

- Click the Tab Peek button in Safari's toolbar to see a list of the tabs in
  the current window. The active tab is highlighted.
- Hover a tab in the list to see a thumbnail of that page.
- Type in the search box to filter tabs by title or address.
- Click a tab to switch to it.

## How it works

- **Background script** (`background.js`): when a tab becomes active, or
  finishes loading while active, Tab Peek waits half a second, takes a
  screenshot of it, shrinks it, and saves it on your Mac.
- **Toolbar popup** (`popup.html`, `popup.css`, `popup.js`): lists the tabs
  and shows the saved thumbnail when you hover one.
- Thumbnails are deleted when a tab closes. Tab Peek keeps at most the 100
  newest, and cleans up leftovers after Safari restarts.

## Privacy

- Thumbnails are stored only on your Mac, in the extension's own storage.
- Tab Peek makes no network requests. Nothing is uploaded anywhere.
- Permissions: `tabs` (read tab titles and addresses), `storage` (save
  thumbnails), and access to all websites (required to screenshot a page).

## Limitations

- Safari can only screenshot what is on screen, so a tab needs to have been
  shown at least once to have a thumbnail. Until then, the popup shows
  "No preview for this tab yet".
- Thumbnails are still images from the last time the tab was visible, not
  live previews.

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
  background script, popup)

## Version

1.0
