function getTriggerVariables() {
  const triggerVariables = document.getElementsByClassName('gtm-predicate-summary-row');
  const numOfTriggers = triggerVariables.length;

  const variablesToStore = {
    filter1: [],
    filter2: [],
    filter3: [],
    numOfTriggers,
    triggerName: ''
  };

  for (const triggerVariable of triggerVariables) {
      //sleep(1000);

    const triggerName = triggerVariable.closest('.gtm-tag-row').querySelector('.wd-open-trigger-button.fill-cell.md-gtm-theme').innerHTML;
    const filter1 = triggerVariable.children[0].innerHTML;
    const filter2 = triggerVariable.children[1].innerHTML;
    const filter3 = triggerVariable.children[2].innerHTML;

    variablesToStore.filter1.push(filter1);
    variablesToStore.filter2.push(filter2);
    variablesToStore.filter3.push(filter3);

    variablesToStore.triggerName = triggerName;
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
