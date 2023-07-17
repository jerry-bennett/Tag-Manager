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
  
  async function fireTagsFunction() {
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
            clickElementsByClass(tagsArray[1][i]);
            break;

          case 'Click Element':
            clickElementsBySelector(tagsArray[1][i]);
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

    function clickElementsByClass(className) {
      const clickClasses = document.getElementsByClassName(className);
      const numClickClasses = clickClasses.length;
      for (let j = 0; j < numClickClasses; j++) {
        const element = clickClasses[j];
        //element.classList.add("highlighted");
        element.style.border = "5px solid red";
        console.log("Class list " + element.classList);
        //element.click();
        // Add a CSS class to the clicked element
      }
    }

    function clickElementsBySelector(selector) {
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