// Tab Peek background script.
// Screenshots each tab when it becomes active and stores a small
// thumbnail so the popup can show previews.


import { loadSettings } from "./settings.js";
// Chrome and Edge call the extension API `chrome`; Safari and Firefox call it `browser`.
const browser = globalThis.browser ?? globalThis.chrome;


const CAPTURE_DELAY_MS = 500;
//const THUMB_WIDTH = 480;
const CAPTURE_QUALITY = 50;   // captureVisibleTab uses 0–100
const THUMB_QUALITY = 0.7;    // OffscreenCanvas uses 0–1
//const MAX_THUMBNAILS = 100;   // Add under the other constants


function storageKey(tabId) {
    return `thumb:${tabId}`;
}

//Timeout and wait for page to load before capture
browser.tabs.onActivated.addListener(({ tabId, windowId }) => {
    scheduleCapture(tabId, windowId);
});

browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.active) {
        scheduleCapture(tabId, tab.windowId);
    }
});

// Delete a tab's thumbnail when the tab closes.
browser.tabs.onRemoved.addListener((tabId) => {
    browser.storage.local.remove(storageKey(tabId));
});

// Each time Safari starts this script, drop thumbnails for tabs
// that no longer exist (tab IDs change after Safari restarts).
removeStaleThumbnails();


function scheduleCapture(tabId, windowId) {
    setTimeout(() => {
        captureTab(tabId, windowId).catch(() => {
            // Some pages can't be captured: Safari settings, extension pages,
            // or sites the user hasn't granted access to. Skip them; the popup
            // shows a placeholder instead.
        });
    }, CAPTURE_DELAY_MS);
}


//Taking the Screen shot
async function captureTab(tabId, windowId) {
    // The user may have switched away during the delay.
    const tab = await browser.tabs.get(tabId);
    if (!tab.active) return;
    
    const fullSize = await browser.tabs.captureVisibleTab(windowId, {
        format: "jpeg",
        quality: CAPTURE_QUALITY,
    });
    const { thumbnailWidth, maxThumbnails } = await loadSettings();
    const thumbnail = await downscale(fullSize, thumbnailWidth);
    
    await browser.storage.local.set({
        [storageKey(tabId)]: {
            thumbnail,
            title: tab.title,
            url: tab.url,
            favIconUrl: tab.favIconUrl,
            capturedAt: Date.now(),
        },
    });
    
    await keepNewest(maxThumbnails);
}

// Shrinking of the image

async function downscale(dataUrl, targetWidth) {
    const blob = await (await fetch(dataUrl)).blob();
    const bitmap = await createImageBitmap(blob);
    
    const scale = Math.min(1, targetWidth / bitmap.width);
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);
    
    const canvas = new OffscreenCanvas(width, height);
    canvas.getContext("2d").drawImage(bitmap, 0, 0, width, height);
    bitmap.close();
    
    const small = await canvas.convertToBlob({ type: "image/jpeg", quality: THUMB_QUALITY });
    return blobToDataUrl(small);
}

function blobToDataUrl(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(reader.error);
        reader.readAsDataURL(blob);
    });
}


// Keep only the newest `limit` thumbnails; delete the rest.
async function keepNewest(limit) {
    const stored = await browser.storage.local.get(null);   // null = everything
    const oldest = Object.entries(stored)
    .filter((entry) => entry[0].startsWith("thumb:"))
    .sort((a, b) => b[1].capturedAt - a[1].capturedAt)
    .slice(limit)
    .map((entry) => entry[0]);
    await browser.storage.local.remove(oldest);
}

// Delete thumbnails whose tab is no longer open.
async function removeStaleThumbnails() {
    const tabs = await browser.tabs.query({});              // {} = all tabs, all windows
    const openKeys = new Set(tabs.map((tab) => storageKey(tab.id)));
    const stored = await browser.storage.local.get(null);
    const stale = Object.keys(stored).filter(
                                             (key) => key.startsWith("thumb:") && !openKeys.has(key)
                                             );
    await browser.storage.local.remove(stale);
}
