// Tab Peek popup.
// Lists the current window's tabs (or every window's); clicking a row switches to that tab,
// hovering a row shows its saved thumbnail.

import { applyTheme } from "./theme.js";
import { loadSettings } from "./settings.js";


const list = document.getElementById("tab-list");
const search = document.getElementById("search");
const previewImage = document.getElementById("preview-image");
const previewText = document.getElementById("preview-text");
const allWindowsBox = document.getElementById("all-windows");
const settingsButton = document.getElementById("open-settings");
const hint = document.getElementById("hint");
const previewCard = document.getElementById("preview");

let allTabs = [];
let currentWindowId = null;
let hoverTimer = null;
let hoveredTabId = null;
let settings = null;

search.addEventListener("input", showMatchingTabs);
list.addEventListener("mouseleave", showCurrentPreview);
allWindowsBox.addEventListener("change", changeWindowsMode);
settingsButton.addEventListener("click", openSettings);

start();
//loadTabs();

// Same key format as background.js (its functions are private to it).
function storageKey(tabId) {
  return `thumb:${tabId}`;
}

// The tab you're looking at right now: active, and in this window.
function isCurrentTab(tab) {
  return tab.active && tab.windowId === currentWindowId;
}


async function start() {
    const saved = await browser.storage.local.get("allWindows");
    allWindowsBox.checked = saved.allWindows === true;
    currentWindowId = (await browser.windows.getCurrent()).id;
    settings = await loadSettings();
    hint.hidden = !settings.showHint || !settings.showPreview;
    previewCard.hidden = !settings.showPreview;
    list.style.maxHeight = `${settings.listHeight}px`;
    await loadTabs();
    showCurrentPreview();
}
applyTheme();

// The checkbox was clicked: save the choice and rebuild the list.
async function changeWindowsMode() {
  await browser.storage.local.set({ allWindows: allWindowsBox.checked });
  //clearPreview();
    await loadTabs();
    showCurrentPreview();
}


async function loadTabs() {
    const which = allWindowsBox.checked ? {} : { currentWindow: true };
    allTabs = await browser.tabs.query(which);
    showMatchingTabs();
}

// Show only the tabs whose title or URL contains the search text.
function showMatchingTabs() {
  const text = search.value.trim().toLowerCase();
  const matches = allTabs.filter((tab) =>
    (tab.title || "").toLowerCase().includes(text) ||
    (tab.url || "").toLowerCase().includes(text)
  );
  //list.replaceChildren(...matches.map(makeRow));
    if (!allWindowsBox.checked) {
      list.replaceChildren(...matches.map(makeRow));
      return;
    }
    list.replaceChildren(...rowsByWindow(matches));
}

// Every window's ID: this window first, then the others in Safari's order.
function windowOrder() {
  const others = allTabs
    .map((tab) => tab.windowId)
    .filter((id) => id !== currentWindowId);
  return [currentWindowId, ...new Set(others)];
}

// A header for each window, followed by that window's rows.
// Windows with no matching tabs are left out.
function rowsByWindow(matches) {
  const rows = [];
  windowOrder().forEach((windowId, index) => {
    const tabs = matches.filter((tab) => tab.windowId === windowId);
    if (tabs.length === 0) return;
    rows.push(makeHeader(index === 0 ? "This window" : `Window ${index + 1}`, windowId));
    rows.push(...tabs.map(makeRow));
  });
  return rows;
}

// A window's label row. Other windows' rows can be clicked (bring to front) or closed (×).
function makeHeader(text, windowId) {
  const header = document.createElement("li");
  header.className = "window-header";
  //header.textContent = text;
    
    const label = document.createElement("span");
    label.className = "title";
    label.textContent = text;
    header.append(label);

    // Only other windows: closing this one would close the popup too.
    if (windowId !== currentWindowId) {
        header.classList.add("clickable");
        header.title = "Bring this window to the front";
        header.addEventListener("click", () => focusWindow(windowId));
        
      const close = document.createElement("button");
      close.className = "close";
      close.textContent = "×";
      close.title = "Close Window";
      close.setAttribute("aria-label", `Close ${text}`);
      close.addEventListener("click", (event) => closeWindow(event, windowId));
      close.addEventListener("mouseleave", () => resetCloseButton(close));
      header.append(close);
    }
    
  return header;
}

function makeRow(tab) {
  const row = document.createElement("li");
  //row.textContent = tab.title || tab.url;
    if (isCurrentTab(tab)) {
    row.classList.add("active");
  }
    
    const title = document.createElement("span");
    title.className = "title";
    title.textContent = tab.title || tab.url;
    
    const close = document.createElement("button");
    close.className = "close";
    close.textContent = "×";
    close.title = "Close Tab";
    close.setAttribute("aria-label", `Close ${title.textContent}`);
    close.addEventListener("click", (event) => closeTab(event, tab));
    close.addEventListener("mouseleave", () => resetCloseButton(close));
    
  row.append(title, close);
  row.addEventListener("click", () => switchTo(tab));
  row.addEventListener("mouseenter", () => schedulePreview(tab));
  return row;
}

// Wait a moment before loading, so sweeping the mouse past rows does nothing.
function schedulePreview(tab) {
  clearTimeout(hoverTimer);
  hoveredTabId = tab.id;
  hoverTimer = setTimeout(() => showPreview(tab), settings.hoverDelayMs);
}

async function showPreview(tab) {
  const key = storageKey(tab.id);
  const stored = await browser.storage.local.get(key);

  // The mouse may have moved to another row while storage answered.
  if (hoveredTabId !== tab.id) return;

  const saved = stored[key];
  if (saved) {
    previewImage.src = saved.thumbnail;
    previewImage.hidden = false;
    previewText.hidden = true;
  } else {
    previewImage.hidden = true;
    previewText.textContent = "No preview for this tab yet";
    previewText.hidden = false;
  }
}

/*/ Mouse left the list: cancel any pending preview and reset the card.
function clearPreview() {
  clearTimeout(hoverTimer);
  hoveredTabId = null;
  previewImage.hidden = true;
  previewText.textContent = "Hover a tab to preview it";
  previewText.hidden = false;
}*/
// Show the tab you're on now: when the popup opens, and when the
// mouse leaves the list.
function showCurrentPreview() {
  clearTimeout(hoverTimer);
  const current = allTabs.find(isCurrentTab);
  if (current) {
    hoveredTabId = current.id;
    showPreview(current);
  }
}


// Bring the tab to the front and close the popup.
async function switchTo(tab) {
    await browser.tabs.update(tab.id, { active: true });
    await browser.windows.update(tab.windowId, { focused: true });
    window.close();
}

// Bring a whole window to the front and close the popup.
async function focusWindow(windowId) {
  await browser.windows.update(windowId, { focused: true });
  window.close();
}

// Open Tab Peek's settings page in a tab and close the popup.
async function openSettings() {
  await browser.runtime.openOptionsPage();
  window.close();
}

async function closeTab(event, tab){
    event.stopPropagation();
    const button = event.currentTarget;
    if (settings.confirmCloseTab && !button.classList.contains("confirm")) {
      button.classList.add("confirm");
      button.textContent = "Close?";
      return;
    }
    button.disabled = true;
    await browser.tabs.remove(tab.id);
    //clearPreview();
    await loadTabs();
    showCurrentPreview();
}

// First click asks, second click closes the window and all its tabs.
async function closeWindow(event, windowId) {
    event.stopPropagation();
  const button = event.currentTarget;
    if (settings.confirmCloseWindow && !button.classList.contains("confirm")) {
    const count = allTabs.filter((tab) => tab.windowId === windowId).length;
    button.classList.add("confirm");
    button.textContent = `Close ${count} ${count === 1 ? "tab" : "tabs"}?`;
    return;
  }
  button.disabled = true;
  await browser.windows.remove(windowId);
  await loadTabs();
  showCurrentPreview();
}

// The mouse left before the second click: back to a plain ×.
function resetCloseButton(button) {
  button.classList.remove("confirm");
  button.textContent = "×";
}
