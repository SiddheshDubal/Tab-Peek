// Tab Peek settings page.
import { applyTheme } from "./theme.js";
import { DEFAULTS, loadSettings } from "./settings.js";


const themeChoices = document.querySelectorAll('input[name="theme"]');
const maxThumbnailsBox = document.getElementById("max-thumbnails");
const thumbCount = document.getElementById("thumb-count");
const deleteButton = document.getElementById("delete-thumbnails");
const resetThemeButton = document.getElementById("reset-theme");
const resetMaxButton = document.getElementById("reset-max-thumbnails");
const resetAllButton = document.getElementById("reset-all");

const resetPopupButton = document.getElementById("reset-popup");
const hoverDelaySlider = document.getElementById("hover-delay");
const hoverDelayBox = document.getElementById("hover-delay-number");
const showHintBox = document.getElementById("show-hint");
const confirmTabBox = document.getElementById("confirm-close-tab");
const confirmWindowBox = document.getElementById("confirm-close-window");
const listHeightChoice = document.getElementById("list-height");
const showPreviewBox = document.getElementById("show-preview");
const helpButtons = document.querySelectorAll(".help-button");

// The settings the Popup section's reset button puts back.
const POPUP_KEYS = ["hoverDelayMs", "showHint", "confirmCloseTab", "confirmCloseWindow", "listHeight", "showPreview"];

start();

// Connect the controls once, then fill them in.
function start() {
  for (const choice of themeChoices) {
    choice.addEventListener("change", changeTheme);
  }
  maxThumbnailsBox.addEventListener("change", changeMaxThumbnails);
  deleteButton.addEventListener("click", deleteThumbnails);
  resetThemeButton.addEventListener("click", () => resetSettings(["theme"]));
  resetMaxButton.addEventListener("click", () => resetSettings(["maxThumbnails"]));
  resetAllButton.addEventListener("click", () => resetSettings(Object.keys(DEFAULTS)));
    
    resetPopupButton.addEventListener("click", () => resetSettings(POPUP_KEYS));
    hoverDelaySlider.addEventListener("input", () => { hoverDelayBox.value = hoverDelaySlider.value; });
    hoverDelaySlider.addEventListener("change", () => saveSetting("hoverDelayMs", Number(hoverDelaySlider.value)));
    hoverDelayBox.addEventListener("change", changeHoverDelayBox);
    showHintBox.addEventListener("change", () => saveSetting("showHint", showHintBox.checked));
    confirmTabBox.addEventListener("change", () => saveSetting("confirmCloseTab", confirmTabBox.checked));
    confirmWindowBox.addEventListener("change", () => saveSetting("confirmCloseWindow", confirmWindowBox.checked));
    listHeightChoice.addEventListener("change", () => saveSetting("listHeight", Number(listHeightChoice.value)));
    showPreviewBox.addEventListener("change", () => saveSetting("showPreview", showPreviewBox.checked));
    for (const button of helpButtons) {
      button.addEventListener("click", toggleHelp);
    }
    document.addEventListener("click", closeHelpOutside);
    
  showSettings();
  showThumbnailCount();
}

// Show every setting's value, with a reset button only where the
// value differs from its default.
async function showSettings() {
  const settings = await loadSettings();
  for (const choice of themeChoices) {
    choice.checked = choice.value === settings.theme;
  }
  maxThumbnailsBox.value = settings.maxThumbnails;
    
    hoverDelaySlider.value = settings.hoverDelayMs;
    hoverDelayBox.value = settings.hoverDelayMs;
    showHintBox.checked = settings.showHint;
    confirmTabBox.checked = settings.confirmCloseTab;
    confirmWindowBox.checked = settings.confirmCloseWindow;
    listHeightChoice.value = settings.listHeight;
    showPreviewBox.checked = settings.showPreview;

  resetThemeButton.hidden = settings.theme === DEFAULTS.theme;
  resetMaxButton.hidden = settings.maxThumbnails === DEFAULTS.maxThumbnails;
    resetPopupButton.hidden = POPUP_KEYS.every((key) => settings[key] === DEFAULTS[key]);
    resetAllButton.hidden = resetThemeButton.hidden && resetMaxButton.hidden && resetPopupButton.hidden;
  applyTheme();
}

// A choice was clicked: save it and switch right away.
async function changeTheme(event) {
    await browser.storage.local.set({ theme: event.target.value });
    showSettings();
}


// Save a new limit. The arrows stay within 10–500, but typing doesn't,
// so pull any typed number back into range.
async function changeMaxThumbnails() {
  const typed = Math.round(Number(maxThumbnailsBox.value)) || DEFAULTS.maxThumbnails;
  const limit = Math.min(500, Math.max(10, typed));
  maxThumbnailsBox.value = limit;
  await browser.storage.local.set({ maxThumbnails: limit });
    showSettings();
}

// Every saved thumbnail's storage key (same filter as background.js).
async function thumbnailKeys() {
  const stored = await browser.storage.local.get(null);
  return Object.keys(stored).filter((key) => key.startsWith("thumb:"));
}

async function showThumbnailCount() {
  thumbCount.textContent = (await thumbnailKeys()).length;
}

// No "are you sure?": thumbnails come back as you visit tabs again.
async function deleteThumbnails() {
  await browser.storage.local.remove(await thumbnailKeys());
  showThumbnailCount();
}


// Forget the saved values, so the defaults apply again.
async function resetSettings(keys) {
  await browser.storage.local.remove(keys);
  showSettings();
}

// Save one setting, then refresh the page (values and reset buttons).
async function saveSetting(key, value) {
  await browser.storage.local.set({ [key]: value });
  showSettings();
}

// A delay was typed. Keep it within 0–1000. If the box is empty or
// not a number, put the saved value back instead.
function changeHoverDelayBox() {
  const typed = Number(hoverDelayBox.value);
  if (hoverDelayBox.value === "" || Number.isNaN(typed)) {
    showSettings();
    return;
  }
  saveSetting("hoverDelayMs", Math.min(1000, Math.max(0, Math.round(typed))));
}

// Click a "?": pin its explanation open, or close it if it was pinned.
// Only one stays pinned at a time.
function toggleHelp(event) {
  const help = event.currentTarget.parentElement;
  const wasOpen = help.classList.contains("open");
  closeAllHelp();
  if (!wasOpen) {
    help.classList.add("open");
  }
}

function closeAllHelp() {
  for (const help of document.querySelectorAll(".help.open")) {
    help.classList.remove("open");
  }
}

// A click anywhere outside a "?" and its bubble closes a pinned one.
function closeHelpOutside(event) {
  if (!event.target.closest(".help")) {
    closeAllHelp();
  }
}
