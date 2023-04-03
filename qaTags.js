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

  }