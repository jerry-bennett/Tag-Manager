//when the user has the GTM window open after firing the tags
document.addEventListener('DOMContentLoaded', () => {
    const qaTags = document.getElementById("qaTags");
  
    qaTags.addEventListener("click", async () => {
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: qaTagsFunction,
      });
    });
  })
  
  //defining sleep
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  async function qaTagsFunction() {
    chrome.storage.sync.get(["tagName"]).then((result) => {
        var tagName = result.tagName;
        var events = document.getElementsByClassName('message-list__title');
        var firedTags = document.getElementsByClassName('tags-tab__fired-tags');
        console.log(tagName);
    })
}