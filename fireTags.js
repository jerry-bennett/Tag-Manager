//wait until click before running any script
document.addEventListener('DOMContentLoaded', () => {
  const fireTags = document.getElementById("fireTags");
    fireTags.addEventListener("click", async () => {
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: fireTagsFunction
      });
    });
  });

  async function fireTagsFunction () {
    
    let tagsToTest = [];
    let filter1 = [];
    let filter2 = [];
    let filter3 = [];
    let numOfTriggers = 0;
    let tagsArray = [];
  
    chrome.storage.sync.get({ tagsToTest: [], filter1: [], filter2: [], filter3: [], numOfTriggers: 0 }, (data) => {
      tagsToTest = data.tagsToTest;
      filter1 = data.filter1;
      filter2 = data.filter2;
      filter3 = data.filter3;
      numOfTriggers = data.numOfTriggers;

      //ISSUE: only fires one tag at the moment. need to assign which tag is associated with which trigger.
      for (let i = 0; i < tagsToTest.length; i++) {
        console.log("🏷 i: " + i);
        console.log("🏷" + tagsToTest);
        //initialize timesFired as 0
        let timesFired = 0;
        console.log("🏷 Tags to test " + tagsToTest.length);
        //initialize the element
        let elementToClick = '';

        //determine what kind of element it is
        switch (String(filter1[i])) {
          case ("Click Classes"):
            //store element
            elementToClick = document.getElementsByClassName(String(filter3[i]));
            if(elementToClick.length > 0){
              console.log("🏷 Elements matching " + filter3[i] + ": " + elementToClick.length);
              for(var j = 0; j < elementToClick.length; j++){
                elementToClick[j].click();
                timesFired = timesFired + 1;
              }
              console.log("🏷 i: " + i);
              //push tag to test into array
              tagsArray.push(tagsToTest[[i]]);
              tagsArray.push(timesFired);
            }else{
              console.log("🏷 No elements matching " + filter3[i]);
            }
          }
        }
        console.log("🏷 Tags array: " + tagsArray);
      });

    }

