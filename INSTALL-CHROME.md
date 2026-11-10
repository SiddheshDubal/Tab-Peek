# Install Tab Peek on Chrome (Mac and Windows)

Tab Peek isn't on the Chrome Web Store, so you load it yourself. It takes about 2 minutes. No coding needed.

The steps are the same on **Mac and Windows**, apart from unzipping
(step 1). They also work in **Edge, Brave, Vivaldi, Opera and Arc**,
which are built on Chrome's engine; only the extensions page address
changes (see the table at the end).

## 1. Download Tab Peek

1. Go to [github.com/SiddheshDubal/Tab-Peek](https://github.com/SiddheshDubal/Tab-Peek).
2. Click the green **Code** button, then **Download ZIP**.
3. Unzip it:
   - **Mac:** double-click the zip in Downloads. A **Tab-Peek-main**
     folder appears.
   - **Windows:** right-click the zip in Downloads → **Extract All…** →
     **Extract**. (Just double-clicking only *shows* what's inside the
     zip; Chrome can't load from there.)
4. Move the **Tab-Peek-main** folder somewhere it can stay, such as
   **Documents**. **Don't delete it later:** Chrome runs Tab Peek from
   this folder.

> **Windows:** "Extract All" sometimes makes a folder inside a folder
> (`Tab-Peek-main\Tab-Peek-main\…`). That's fine; just keep opening
> folders until you see **Tab Peek Extension**.

## 2. Load it in Chrome

1. In Chrome's address bar, type `chrome://extensions` and press Enter.
2. Turn on **Developer mode** (switch at the top right).
3. Click **Load unpacked**.
4. Open **Tab-Peek-main** → **Tab Peek Extension**, then select the
   **Resources** folder (the one with `manifest.json` inside) and click
   **Select** (Mac) or **Select Folder** (Windows).

Tab Peek appears as a card on the page.

## 3. Pin the button

1. Click the puzzle piece (🧩) at the right of Chrome's toolbar.
2. Click the pin next to **Tab Peek**.

## 4. Try it

1. Switch between a few tabs. Tab Peek saves a preview when a tab has
   been in front for half a second.
2. Click the Tab Peek button and hover a tab in the list.
3. Click ⚙ for settings. In Chrome they open in a small box over the
   extensions page.

Pages like `chrome://` settings and the Web Store can't be captured; they
show "No preview for this tab yet". That's Chrome's rule, not a bug.

**Nothing leaves your computer.** Tab Peek makes no network requests;
thumbnails are stored inside Chrome on your machine.

---

## Things you might see

| What you see | What it means |
|---|---|
| An **Errors** button on the card with ⚠ `'background.scripts' requires manifest version of 2 or lower` | Harmless. One file serves Safari, Firefox and Chrome; Chrome skips the line meant for the others |
| ⚠ `Unrecognized manifest key 'browser_specific_settings'` | Harmless, same reason (that part is for Firefox) |
| Chrome reminding you about extensions in developer mode (more common on Windows, sometimes at every start) | Normal for anything not from the Web Store. Close it or click **Keep**; don't click **Turn off** / **Remove**. Tab Peek keeps working |
| "Could not load manifest" | You picked the wrong folder: choose **Resources**, the one containing `manifest.json` |
| **Windows:** Load unpacked can't see any files | You're still inside the zip. Go back to step 1.3 and use **Extract All** |
| Tab Peek gone after deleting or moving the folder | Chrome needs the folder. Put it back and click **Load unpacked** again |

## Updating to a new version

1. Download the new zip and unzip it (step 1).
2. Replace the old **Tab-Peek-main** folder with the new one (same place,
   same name).
3. On `chrome://extensions`, click **↻** on the Tab Peek card.

Your settings and thumbnails stay.

## Removing Tab Peek

On `chrome://extensions`, click **Remove** on the Tab Peek card, then
delete the folder.

## Which browsers and computers

| Browser | Extensions page | Mac | Windows |
|---|---|---|---|
| Chrome | `chrome://extensions` | Tested | Should work, not tested yet |
| Edge | `edge://extensions` (Developer mode is in the **left sidebar**; see the [Edge guide](INSTALL-EDGE.md)) | Tested | Should work, not tested yet |
| Brave | `brave://extensions` | Should work, not tested | Should work, not tested |
| Vivaldi, Opera, Arc | their own extensions page | Should work, not tested | Should work, not tested |
| Firefox, Zen | | [Firefox and Zen guide](INSTALL-FIREFOX.md) | Same |
| Safari | | [Safari guide](INSTALL-SAFARI.md) | Not available |
| DuckDuckGo | | **Not supported**: no extension support | **Not supported** |
