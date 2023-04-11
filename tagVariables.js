function getTriggerVariables() {
    const triggerVariables = document.getElementsByClassName('gtm-predicate-summary-row');
    const variablesToStore = {
      filter1: [],
      filter2: [],
      filter3: [],
      numOfTriggers: triggerVariables.length,
      triggerName: ''
    };
  
    let triggerNameString = ''; // initialize empty string for concatenation
  
    for (const triggerVariable of triggerVariables) {
      const triggerName = triggerVariable.closest('.gtm-tag-row').querySelector('.wd-open-trigger-button.fill-cell.md-gtm-theme').innerHTML;
      let filter1 = triggerVariable.children[0].innerHTML;
      let filter2 = triggerVariable.children[1].innerHTML;
      let filter3 = triggerVariable.children[2].innerHTML;
  
      variablesToStore.filter1.push(filter1);
      variablesToStore.filter2.push(filter2);
      variablesToStore.filter3.push(filter3);
    }
    
    storeVariables(variablesToStore);
  }

  
  function storeVariables(variables) {
    chrome.storage.sync.set(variables, () => {
      console.log(variables);
    });
  }
  
  function setupClickHandler() {
    const triggerVariables = document.getElementById("triggerVariables");
    console.log(triggerVariables);
    triggerVariables.addEventListener("click", async () => {
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: getTriggerVariables,
      });
    });
  }
  
  document.addEventListener('DOMContentLoaded', setupClickHandler);
  