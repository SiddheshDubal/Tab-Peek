// Tab Peek popup.
// Lists the current window's tabs; clicking a row switches to that tab.

const list = document.getElementById("tab-list");
const search = document.getElementById("search");
let allTabs = [];

search.addEventListener("input", showMatchingTabs);
loadTabs();

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
  row.textContent = tab.title || tab.url;
  if (tab.active) {
    row.classList.add("active");
  }
  row.addEventListener("click", () => switchTo(tab));
  return row;
}

// Bring the tab to the front and close the popup.
async function switchTo(tab) {
  await browser.tabs.update(tab.id, { active: true });
  window.close();
}
