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
});

//defining sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getTriggerVariables() {
  await sleep(1000);

  const triggerVariables = document.getElementsByClassName('gtm-predicate-summary-row');
  const numOfTriggers = triggerVariables.length;

  const variablesToStore = {
    filter1: [],
    filter2: [],
    filter3: [],
    numOfTriggers,
    triggerName: ''
  };

  for (let i = 0; i < numOfTriggers; i++) {
    await sleep(1000);
  
    if(document.getElementsByClassName('wd-open-trigger-button fill-cell md-gtm-theme')[i] != null){
      const triggerNameElement = document.getElementsByClassName('wd-open-trigger-button fill-cell md-gtm-theme')[i];
      const triggerName = triggerNameElement.textContent;
  
      const filter1 = triggerVariables[i].children[0].innerHTML;
      const filter2 = triggerVariables[i].children[1].innerHTML;
      const filter3 = triggerVariables[i].children[2].innerHTML;
    
      variablesToStore.filter1.push(filter1);
      variablesToStore.filter2.push(filter2);
      variablesToStore.filter3.push(filter3);
    
      variablesToStore.triggerName = triggerName;
    
      storeVariables(variablesToStore);
    }
  }
  variablesToStore.push(numOfTriggers);
  console.log(numOfTriggers);
}

function storeVariables(variables) {
  chrome.storage.sync.set(variables, () => {
    console.log(variables);
  });
}