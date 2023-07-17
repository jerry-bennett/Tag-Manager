//wait until click before running any script
document.addEventListener('DOMContentLoaded', () => {
  const qaTags = document.getElementById("qaTags");
    qaTags.addEventListener("click", async () => {
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: qaTagsFunction
      });
    });
  });
  
  async function qaTagsFunction() {
  chrome.storage.sync.get({ currentOptionText: '', tagsArray: [], triggerArray: []}, function (data) {
    var currentOptionText = data.currentOptionText;
    var tagsArray = data.tagsArray;
    var triggerArray = data.triggerArray
    var numOfTags = tagsArray[0].length;

    // Loop through each tag name and see if it matches the one in the dropdown
    for (let i = 0; i < numOfTags; i++) {
      // See if the current option is what is listed in the dropdown
      if (String(tagsArray[0][i]).includes(currentOptionText)) {
        // Check for specific default variables using a case switch
        switch (triggerArray[1][i]) {
          case 'Click Classes':
            highlightElementsByClass(tagsArray[1][i]);
            break;

          case 'Click Element':
            highlightElementsBySelector(tagsArray[1][i]);
            break;

          case 'Click ID':
            clickElementById(tagsArray[1][i]);
            break;

          default:
            //temporary error handling
            console.log("No elements matching that tag.")
            break;
        }
      }
    }

    function highlightElementsByClass(className) {
      const clickClasses = document.getElementsByClassName(className);
      const numClickClasses = clickClasses.length;
      for (let j = 0; j < numClickClasses; j++) {
        const element = clickClasses[j];
    
        // Toggle the red rectangle by checking if the border style is already applied
        if (element.style.border === "5px solid red") {
          element.style.border = ""; // If border is present, remove it
        } else {
          element.style.border = "5px solid red"; // If border is not present, add it
        }
      }
    }

    function highlightElementsBySelector(selector) {
      const clickElements = document.querySelectorAll(selector);
      const numClickElements = clickElements.length;
      for (let j = 0; j < numClickElements; j++) {
        const element = clickElements[j];
        element.click();
      }
    }

    function clickElementById(id) {
      const clickElement = document.getElementById(id);
      clickElement.click();
    }
  });
}