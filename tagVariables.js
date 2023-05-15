//wait until click before firing script
document.addEventListener('DOMContentLoaded', () => {
  const tagVariables = document.getElementById("tagVariables");
  tagVariables.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: getTagVariables,
    });
  });
});

//defining sleep
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function getTagVariables() {

  chrome.storage.sync.get(['triggerArray'], async function(result) {
    triggerArray = result.triggerArray;
    console.log('Retrieved triggerArray:', result.triggerArray);
    console.log("Length: " + triggerArray.length);

    //make sure the user is on the right page
    var url = window.location.href;
    if (!url.endsWith("tags")) {
      console.log("Navigating to tags");
      var triggerButton = document.querySelector('.gtm-container-menu-list-item.open-tag-list-button.md-gtm-theme');
      triggerButton.click();
      await sleep(1000);
      }

      //get number of tags
      var tags = document.getElementsByClassName('open-tag-button fill-cell md-gtm-theme');
      var numOfTags = tags.length;
      var tagsArray = [];
      var tagNames = [];
      var tagTriggers = [];

      //display length of array
      console.log("Filter 3 length: " + triggerArray[3].length);
      for(var i = 0; i < numOfTags; i++){
        //trigger name inside of tag
        var triggerName = document.getElementsByClassName('small-trigger-chip md-gtm-theme');
        //loop through and see if the trigger name matches
        for(var j = 0; j < triggerArray[3].length; j++){
          if(triggerName[i].innerText.includes(triggerArray[0][j])){
            console.log("yep");
            tagNames.push(document.getElementsByClassName('open-tag-button fill-cell md-gtm-theme')[i].innerText);
            tagTriggers.push(triggerArray[3][j]);

          }else{
            console.log('nope');
          }
        }
      }
      tagsArray.push(tagNames, tagTriggers);
      console.log(tagsArray);
      console.log(tagNames);
      chrome.storage.sync.set({tagsArray:tagsArray}, function(){
      });
    
      chrome.storage.sync.set({tagNames:tagNames}, function(){
      });

  });
  
}
