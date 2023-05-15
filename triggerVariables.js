//wait until click before firing script
document.addEventListener('DOMContentLoaded', () => {
  const triggerVariables = document.getElementById("triggerVariables");
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

//main function
async function getTriggerVariables() {
  //document.getElementById("tagsToTestField").innerHTML = "Hello World!";
  //make sure the user is on the right page
  var url = window.location.href;

  if (!url.endsWith("triggers")) {
    console.log("Navigating to triggers");
    var triggerButton = document.querySelector('.gtm-container-menu-list-item.wd-open-trigger-list-button.md-gtm-theme');
    triggerButton.click();
    await sleep(1000);
  }
  console.log("started");
  //wait until 1 second has passed
  //await sleep(1000);

  //define trigger variables
  const triggerRows = document.getElementsByClassName('gtm-predicate-summary-row');
  const triggers = document.getElementsByClassName('wd-open-trigger-button fill-cell md-gtm-theme');
  const numOfTriggers = triggers.length;
  var triggerNames = [];
  var filter1 = [];
  var filter2 = [];
  var filter3 = [];
  var triggerArray = [];

  //main loop
  for (let i = 0; i < numOfTriggers; i++) {
    console.log(numOfTriggers);
    //trigger variables for loop
    //const triggerNameElement = document.getElementsByClassName('wd-open-trigger-button fill-cell md-gtm-theme');
  
    //variables to store to chrome storage
    filter1.push(triggerRows[i].children[0].innerHTML);
    filter2.push(triggerRows[i].children[1].innerHTML);
    filter3.push(triggerRows[i].children[2].innerHTML);

    //assign variables to store to an array
    triggerNames.push(triggers[i].innerText);
    console.log(i);
  }
  console.log('swag');
  triggerArray.push(triggerNames, filter1, filter2, filter3);

  //see what is going to be stored
  console.log(triggerArray);
  //actually store them
  chrome.storage.sync.set({triggerArray:triggerArray}, function(){
  });
  //store numOfTriggers
  chrome.storage.sync.set({ 'numOfTriggers': numOfTriggers }, function() {
  });
}

