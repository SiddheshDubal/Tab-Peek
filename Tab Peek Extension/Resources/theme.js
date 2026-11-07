// Shared by the popup and the settings page.
// Reads the saved theme and labels <html> with it, so the CSS can react.
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
