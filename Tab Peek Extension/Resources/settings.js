// Tab Peek's settings and their defaults, shared by every part of the
// extension. A setting nobody has changed yet uses its default.

// Chrome and Edge call the extension API `chrome`; Safari and Firefox call it `browser`.
const browser = globalThis.browser ?? globalThis.chrome;


export const DEFAULTS = {
    maxThumbnails: 100,
    thumbnailWidth: 480,
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
