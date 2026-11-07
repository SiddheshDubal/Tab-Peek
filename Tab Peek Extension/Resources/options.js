// Tab Peek settings page.
import { applyTheme } from "./theme.js";

const themeChoices = document.querySelectorAll('input[name="theme"]');

start();

// Tick the saved choice, and use the theme on this page too.
async function start() {
  const theme = await applyTheme();
  for (const choice of themeChoices) {
    choice.checked = choice.value === theme;
    choice.addEventListener("change", changeTheme);
  }
}

// A choice was clicked: save it and switch right away.
async function changeTheme(event) {
  await browser.storage.local.set({ theme: event.target.value });
  applyTheme();
}
