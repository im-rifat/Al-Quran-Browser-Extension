const PAGE = "index.html";

// when extension insalled on brower, open PAGE on new a tab by default
chrome.runtime.onInstalled.addListener(({reason}) => {
    if (reason === 'install') {
      chrome.tabs.create({
        url: PAGE
      });
    }
});

// when extension icon clicked, open PAGE if not present in tabs otherwise goto desired tab
chrome.action.onClicked.addListener(async (tab) => {
    let extUrl = getExtensionPageUrl();

    let extTab = await getTabFor(extUrl, chrome.windows.WINDOW_ID_CURRENT);

    if(extTab == undefined) {
        chrome.tabs.create({
            "url": PAGE
        });
    } else {
        chrome.tabs.highlight({
            "tabs": extTab.index
        });
    }
});

async function getTabFor(url, windowId) {
    let queryOptions = {"url": url, "windowId": windowId};
    // `tab` will either be a `tabs.Tab` instance or `undefined`.
    let [tab] = await chrome.tabs.query(queryOptions);
    return tab;
}

function getExtensionPageUrl() {
    return chrome.runtime.getURL(PAGE);
}