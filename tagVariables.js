document.addEventListener('DOMContentLoaded', () => {
  const tagVariables = document.getElementById("tagVariables");
  console.log(tagVariables);
  tagVariables.addEventListener("click", async () => {
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: getTagVariables,
      });
    });
})
  //defining sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

  async function getTagVariables() {
    //var  numTags = document.getElementsByClassName('wd-tag-row').length;
    // var triggers = document.getElementsByClassName('wd-open-trigger-button fill-cell md-gtm-theme');
    // triggers[0].click();
    // await sleep(1000);
    // var triggerConfiguration = document.getElementsByClassName('gtm-veditor-section-overlay');
    // triggerConfiguration[0].click();

    var filter1 = [];
    var filter2 = [];
    var filter3 = [];
    await sleep(1000);
    //trigger name
    var triggerName = document.getElementsByClassName('wd-open-trigger-button fill-cell md-gtm-theme')[0].innerHTML;
    //trigger filters
    var triggerVariables = document.getElementsByClassName('gtm-predicate-summary-row');
    var numOfTriggers = triggerVariables.length;
    for(let i = 0; i < numOfTriggers; i++){
      await sleep(1000);
      filter1[i] = triggerVariables[i].children[0].innerHTML;
      filter2[i] = triggerVariables[i].children[1].innerHTML;
      filter3[i] = triggerVariables[i].children[2].innerHTML;

      //set varaibles to send to qaTags.js
      chrome.storage.sync.set({ filter1: filter1 }).then(() => {
      });

      chrome.storage.sync.set({ filter2: filter2 }).then(() => {
      });

      chrome.storage.sync.set({ filter3: filter3 }).then(() => {
        console.log("Value is set to " + filter3[i]);
      });

      chrome.storage.sync.set({ numOfTriggers: numOfTriggers }).then(() => {
        console.log("Value is set to " + numOfTriggers);
      });

      chrome.storage.sync.set({ triggerName: triggerName }).then(() => {
        console.log("Trigger name: " + triggerName);
      });
      
  }

}

