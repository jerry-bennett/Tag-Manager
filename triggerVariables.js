document.addEventListener('DOMContentLoaded', () => {
  const triggerVariables = document.getElementById("triggerVariables");
  console.log(triggerVariables);
  triggerVariables.addEventListener("click", async () => {
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: getTriggerVariables,
      });
    });
})
  //defining sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

  async function getTriggerVariables() {
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
    //trigger filters
    var triggerVariables = document.getElementsByClassName('gtm-predicate-summary-row');
    var numOfTriggers = triggerVariables.length;
    for(let i = 0; i < numOfTriggers; i++){
      await sleep(1000);
      var triggerName = document.getElementsByClassName('wd-open-trigger-button fill-cell md-gtm-theme')[i].innerHTML;
      filter1[i] = triggerVariables[i].children[0].innerHTML;
      filter2[i] = triggerVariables[i].children[1].innerHTML;
      filter3[i] = triggerVariables[i].children[2].innerHTML;

      //set varaibles to send to fireTags.js
      chrome.storage.sync.set({ filter1: filter1 }).then(() => {
        console.log("Filter1: " + filter1);
      });

      chrome.storage.sync.set({ filter2: filter2 }).then(() => {
        console.log("Filter2: " + filter2);
      });

      chrome.storage.sync.set({ filter3: filter3 }).then(() => {
        console.log("Filter3: " + filter3);
      });

      chrome.storage.sync.set({ numOfTriggers: numOfTriggers }).then(() => {
      });

      chrome.storage.sync.set({ triggerName: triggerName }).then(() => {
        console.log("Trigger name: " + triggerName);
      });
      
  }

}

