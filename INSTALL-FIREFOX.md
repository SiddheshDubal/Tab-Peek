# Install Tab Peek on Firefox and Zen (Mac and Windows)

Tab Peek is waiting for review on Firefox Add-ons. Until it's live
there, you load it yourself.
It takes about 2 minutes. No coding needed. Zen is built on Firefox, so
**these steps work in Firefox too.**

> **Heads-up: it's temporary for now.** Zen (like Firefox) only keeps a
> self-loaded add-on until you quit the browser. After a restart, repeat
> step 2 (30 seconds). This goes away once Tab Peek is on Firefox Add-ons,
> where Mozilla signs it and it installs for good.

## 1. Download Tab Peek

1. Go to [github.com/SiddheshDubal/Tab-Peek](https://github.com/SiddheshDubal/Tab-Peek).
2. Click the green **Code** button, then **Download ZIP**.
3. Unzip it:
   - **Mac:** double-click the zip in Downloads. A **Tab-Peek-main**
     folder appears.
   - **Windows:** right-click the zip → **Extract All…** → **Extract**.
     (Double-clicking only *shows* what's inside; Zen can't load from
     there.)
4. Move the **Tab-Peek-main** folder somewhere it can stay, such as
   **Documents**. You'll load it from here after every restart.

## 2. Load it in Zen

1. In Zen's address bar, type `about:debugging` and press Enter.
2. Click **This Firefox** on the left (Zen keeps Firefox's name here).
3. Click **Load Temporary Add-on…**
4. Open **Tab-Peek-main** → **Tab Peek Extension** → **Resources** and
   pick the file **manifest.json**, then click **Open**.

Tab Peek appears under "Temporary Extensions".

## 3. Show the button

New add-ons may be tucked away in the **Extensions** menu (the puzzle
piece). Open it and pin **Tab Peek** to the toolbar so its button is
always visible.

## 4. Try it

1. Switch between a few tabs. Tab Peek saves a preview when a tab has
   been in front for half a second.
2. Click the Tab Peek button and hover a tab in the list.
3. Click ⚙ for settings. They open on Tab Peek's **Preferences** tab in
   Zen's add-ons page (`about:addons`).

Zen's own pages (`about:` pages) and Mozilla's add-on site can't be
captured; they show "No preview for this tab yet". That's the browser's
rule, not a bug.

**Nothing leaves your computer.** Tab Peek makes no network requests;
thumbnails are stored inside Zen on your machine.

---

## Things you might see

| What you see | What it means |
|---|---|
| Tab Peek is gone after restarting Zen | Expected for now (temporary add-on). Repeat step 2 |
| No previews at all, only "No preview for this tab yet" | Open `about:addons` → Tab Peek → **Permissions**, and make sure access to **all websites** is on |
| "There was an error during the temporary add-on installation" | You picked the wrong file: choose **manifest.json** inside **Resources** |
| **Windows:** the file picker can't see manifest.json | You're still inside the zip. Go back to step 1.3 and use **Extract All** |
| An error that mentions the browser version | Tab Peek needs Zen/Firefox based on Firefox **140 or newer**. Update Zen |

## Updating to a new version

Download and unzip the new version, replace the old **Tab-Peek-main**
folder, then do step 2 again. (Settings may reset while it's a temporary
add-on.)

## Removing Tab Peek

Quit Zen (temporary add-ons disappear on their own), or click **Remove**
next to Tab Peek on `about:debugging`. Then delete the folder.

## Which browsers and computers

| Browser | Mac | Windows |
|---|---|---|
| Zen | Tested | Should work, not tested yet |
| Firefox | Tested | Should work, not tested yet |
| Chrome, Brave, Vivaldi | [Chrome guide](INSTALL-CHROME.md) | [Chrome guide](INSTALL-CHROME.md) |
| Edge | [Edge guide](INSTALL-EDGE.md) | [Edge guide](INSTALL-EDGE.md) |
| Safari | [Safari guide](INSTALL-SAFARI.md) | Not available |
