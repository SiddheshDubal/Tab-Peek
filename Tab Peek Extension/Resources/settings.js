// Tab Peek's settings and their defaults, shared by every part of the
// extension. A setting nobody has changed yet uses its default.
export const DEFAULTS = {
    maxThumbnails: 100,
    hoverDelayMs: 250,
    theme: "auto",
    
    showHint: true,
    confirmCloseTab: false,
    confirmCloseWindow: true,
    
    listHeight: 300,
    showPreview: true,
};

export async function loadSettings() {
  return browser.storage.local.get(DEFAULTS);
}
