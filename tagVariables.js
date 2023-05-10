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
  });

  chrome.storage.sync.set({tagsArray:tagsArray}, function(){
  });
  

  //   var myVariable = [];
  //   var tag = document.getElementsByClassName('wd-tag-row');
  //   var tagsToTest = [];
  //   var tagNames = [];
  //   var tagTotal = 0;
  //   var tagTriggers = [];
  //   chrome.storage.sync.get('numOfTriggers', function(data) {
  //   const numOfTriggers = data.numOfTriggers;
  //   //get variables from storage to use
  //   chrome.storage.sync.get({triggerNames:[], filter3: [] },async function(data) {
  //     triggerNames = data.triggerNames;
  //     filter3 = data.filter3;

  //     //get number of tags present
  //     var numOfTags = document.getElementsByClassName('open-tag-button fill-cell md-gtm-theme').length;
  //     //loop to store tag names into an array
  //     for(var i = 0; i < numOfTags; i++){
  //       //get tag name and use regext to make it usable
  //       var text = tag[i].innerText;
  //       var readableText = text.replace(/\t/g, " ").replace(/\n+/g, "\n");
  //       var tagArray = readableText.split('\n');
  //       var tempName = tagArray[1];
  //       tagNames.push(tempName);
  //       //make sure it's a trigger that can be used
  //       if((document.getElementsByClassName('small-trigger-chip md-gtm-theme')[i].innerText).includes("All Pages")){
  //         console.log('yeah baby')
  //       }else{
  //         //loop through and see if the trigger aligns with filter 3
  //         for(var k = 0; k < filter3.length; k++){
  //           //click on the trigger inside the tag
  //           document.getElementsByClassName('small-trigger-chip md-gtm-theme')[i].click();
  //           //await sleep(1000);
  //           if(document.getElementsByClassName('gtm-predicate-summary-row blg-body blg-spacer1')[0].innerText.includes(filter3[k])){
  //             console.log("FILTER 3!!!: " + filter3[k])
  //             document.getElementsByClassName('gtm-sheet-header__close')[0].click()
  //           }
  //         }
  //         //document.getElementsByClassName('gtm-predicate-summary-row blg-body blg-spacer1')
  //       }
  //       for(var j = 0; j < numOfTriggers; j++){
  //         if(String(tagArray[3]).includes(triggerNames[j])){
  //           tagsToTest.push(tempName);
  //           tagTriggers.push(tagArray[3]);
  //         }
  //       }
  //     }
  //     //display tags to test
  //     console.log("🏷 Tags to test: "+ tagsToTest);
  //     console.log("🏷 Triggers to test: "+ tagTriggers);

  //     //store them
  //     chrome.storage.sync.set({tagsToTest:tagsToTest}, function(){
  //     });
  //   });
  // });
}
