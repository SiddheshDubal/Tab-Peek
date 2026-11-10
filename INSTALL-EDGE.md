# Install Tab Peek on Edge (Mac and Windows)

Tab Peek is waiting for review on Edge Add-ons. Until it's live there,
you load it yourself. It
takes about 2 minutes. No coding needed.

The steps are the same on **Mac and Windows**, apart from unzipping
(step 1). Edge comes with Windows, so on a PC there's nothing else to
install.

## 1. Download Tab Peek

1. Go to [github.com/SiddheshDubal/Tab-Peek](https://github.com/SiddheshDubal/Tab-Peek).
2. Click the green **Code** button, then **Download ZIP**.
3. Unzip it:
   - **Mac:** double-click the zip in Downloads. A **Tab-Peek-main**
     folder appears.
   - **Windows:** right-click the zip in Downloads → **Extract All…** →
     **Extract**. (Just double-clicking only *shows* what's inside the
     zip; Edge can't load from there.)
4. Move the **Tab-Peek-main** folder somewhere it can stay, such as
   **Documents**. **Don't delete it later:** Edge runs Tab Peek from
   this folder.

> **Windows:** "Extract All" sometimes makes a folder inside a folder
> (`Tab-Peek-main\Tab-Peek-main\…`). That's fine; just keep opening
> folders until you see **Tab Peek Extension**.

## 2. Load it in Edge

1. In Edge's address bar, type `edge://extensions` and press Enter.
2. Turn on **Developer mode**. In Edge this switch is in the **left
   sidebar**, near the bottom. (If the window is narrow and there's no
   sidebar, click the ☰ menu at the top left to show it.)
3. Click **Load unpacked** (it appears at the top once Developer mode is
   on).
4. Open **Tab-Peek-main** → **Tab Peek Extension**, then select the
   **Resources** folder (the one with `manifest.json` inside) and click
   **Select** (Mac) or **Select Folder** (Windows).

Tab Peek appears in the list of installed extensions.

## 3. Show the button

1. Click the **Extensions** button (puzzle piece) in Edge's toolbar.
2. Next to **Tab Peek**, click the eye icon (**Show in toolbar**).

## 4. Try it

1. Switch between a few tabs. Tab Peek saves a preview when a tab has
   been in front for half a second.
2. Click the Tab Peek button and hover a tab in the list.
3. Click ⚙ for settings. In Edge they open in a small box over the
   extensions page.

Edge's own pages (`edge://` pages) and the Edge Add-ons site can't be
captured; they show "No preview for this tab yet". That's Edge's rule,
not a bug.

**Nothing leaves your computer.** Tab Peek makes no network requests;
thumbnails are stored inside Edge on your machine.

---

## Things you might see

| What you see | What it means |
|---|---|
| A warning on Tab Peek's entry: `'background.scripts' requires manifest version of 2 or lower` | Harmless. One file serves Safari, Firefox and Edge; Edge skips the line meant for the others |
| ⚠ `Unrecognized manifest key 'browser_specific_settings'` | Harmless, same reason (that part is for Firefox) |
| Edge asking you to **turn off extensions in developer mode** (more common on Windows, sometimes at every start) | Normal for anything not from Edge Add-ons. Close it or choose to keep them; don't click **Turn off**. Tab Peek keeps working |
| Can't find **Developer mode** | It's in the left sidebar of `edge://extensions`, not at the top like in Chrome. Widen the window or open the ☰ menu |
| "Could not load manifest" | You picked the wrong folder: choose **Resources**, the one containing `manifest.json` |
| **Windows:** Load unpacked can't see any files | You're still inside the zip. Go back to step 1.3 and use **Extract All** |
| Tab Peek gone after deleting or moving the folder | Edge needs the folder. Put it back and click **Load unpacked** again |
| **Work or school PC:** Developer mode is greyed out | Your organisation blocks it. Use a personal computer, or wait for the Edge Add-ons version |

## Updating to a new version

1. Download the new zip and unzip it (step 1).
2. Replace the old **Tab-Peek-main** folder with the new one (same place,
   same name).
3. On `edge://extensions`, click **Reload** (↻) under Tab Peek.

Your settings and thumbnails stay.

## Removing Tab Peek

On `edge://extensions`, click **Remove** under Tab Peek, then delete the
folder.

## Which browsers and computers

| Browser | Mac | Windows |
|---|---|---|
| Edge | Tested | Should work, not tested yet |
| Chrome, Brave, Vivaldi, Opera, Arc | [Chrome guide](INSTALL-CHROME.md) | [Chrome guide](INSTALL-CHROME.md) |
| Firefox, Zen | [Firefox and Zen guide](INSTALL-FIREFOX.md) | [Firefox and Zen guide](INSTALL-FIREFOX.md) |
| Safari | [Safari guide](INSTALL-SAFARI.md) | Not available |
