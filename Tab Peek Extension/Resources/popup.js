// Tab Peek popup.
// Lists the current window's tabs; clicking a row switches to that tab,
// hovering a row shows its saved thumbnail.

const HOVER_DELAY_MS = 250;

const list = document.getElementById("tab-list");
const search = document.getElementById("search");
const previewImage = document.getElementById("preview-image");
const previewText = document.getElementById("preview-text");
let allTabs = [];
let hoverTimer = null;
let hoveredTabId = null;

search.addEventListener("input", showMatchingTabs);
list.addEventListener("mouseleave", clearPreview);
loadTabs();

// Same key format as background.js (its functions are private to it).
function storageKey(tabId) {
  return `thumb:${tabId}`;
}

async function loadTabs() {
  allTabs = await browser.tabs.query({ currentWindow: true });
  showMatchingTabs();
}

// Show only the tabs whose title or URL contains the search text.
function showMatchingTabs() {
  const text = search.value.trim().toLowerCase();
  const matches = allTabs.filter((tab) =>
    (tab.title || "").toLowerCase().includes(text) ||
    (tab.url || "").toLowerCase().includes(text)
  );
  list.replaceChildren(...matches.map(makeRow));
}

function makeRow(tab) {
  const row = document.createElement("li");
  //row.textContent = tab.title || tab.url;
  if (tab.active) {
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
    
  row.append(title, close);
  row.addEventListener("click", () => switchTo(tab));
  row.addEventListener("mouseenter", () => schedulePreview(tab));
  return row;
}

// Wait a moment before loading, so sweeping the mouse past rows does nothing.
function schedulePreview(tab) {
  clearTimeout(hoverTimer);
  hoveredTabId = tab.id;
  hoverTimer = setTimeout(() => showPreview(tab), HOVER_DELAY_MS);
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

// Mouse left the list: cancel any pending preview and reset the card.
function clearPreview() {
  clearTimeout(hoverTimer);
  hoveredTabId = null;
  previewImage.hidden = true;
  previewText.textContent = "Hover a tab to preview it";
  previewText.hidden = false;
}

// Bring the tab to the front and close the popup.
async function switchTo(tab) {
  await browser.tabs.update(tab.id, { active: true });
  window.close();
}

async function closeTab(event, tab){
    event.stopPropagation();
    event.currentTarget.disabled = true;
    await browser.tabs.remove(tab.id);
    clearPreview();
    await loadTabs();
}
