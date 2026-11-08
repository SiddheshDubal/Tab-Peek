// Shared by the popup and the settings page.
// Reads the saved theme and labels <html> with it, so the CSS can react.

// Chrome and Edge call the extension API `chrome`; Safari and Firefox call it `browser`.
const browser = globalThis.browser ?? globalThis.chrome;


export async function applyTheme() {
  const saved = await browser.storage.local.get("theme");
  const theme = saved.theme ?? "auto";
  if (theme === "auto") {
    delete document.documentElement.dataset.theme;
  } else {
    document.documentElement.dataset.theme = theme;
  }
  return theme;
}
