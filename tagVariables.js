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

async function getTagVariables() {
  //make sure the user is on the right page
  var url = window.location.href;
  if (!url.endsWith("tags")) {
    console.log("Navigating to tags");
    var triggerButton = document.querySelector('.gtm-container-menu-list-item.open-tag-list-button.md-gtm-theme');
    triggerButton.click();
    await sleep(1000);
  }

  var tag = document.getElementsByClassName('wd-tag-row');
  var tagsToTest = [];
  var tagNames = [];
  var tagTotal = 0;
  chrome.storage.sync.get('numOfTriggers', function(data) {
    const numOfTriggers = data.numOfTriggers;
    //get variables from storage to use
    chrome.storage.sync.get({triggerNames:[] },function(data) {
      triggerNames = data.triggerNames;

      //get number of tags present
      var numOfTags = document.getElementsByClassName('open-tag-button fill-cell md-gtm-theme').length;
      //loop to store tag names into an array
      for(var i = 0; i < numOfTags; i++){
        //get tag name and use regext to make it usable
        var text = tag[i].innerText;
        var readableText = text.replace(/\t/g, " ").replace(/\n+/g, "\n");
        var tagArray = readableText.split('\n');
        var tempName = tagArray[1];
        tagNames.push(tempName);
        for(var j = 0; j < numOfTriggers; j++){
          if(String(tagArray[3]).includes(triggerNames[j])){
            tagsToTest.push(tempName);
          }
        }

      }

      //display tags to test
      console.log("Tags to test: "+ tagsToTest);

      //store them
      chrome.storage.sync.set({tagsToTest:tagsToTest}, function(){
      });
    });
  });
}
