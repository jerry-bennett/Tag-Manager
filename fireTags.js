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
    for (var i = 0; i < numOfTags; i++) {
      // See if the current option is what is listed in the dropdown
      if (String(tagsArray[0][i]).includes(currentOptionText)) {
        // Check for specific default variables using a case switch
        switch (triggerArray[1][i]) {
          case 'Click Classes':
            // Find how many elements on the page match the 'Click Classes' value
            var clickClasses = document.getElementsByClassName(tagsArray[1][i]);
            // Click each one of those elements
            for (var j = 0; j < clickClasses.length; j++) {
              clickClasses[j].click();
            }
            break;

          case 'Click Element':
            // Find how many elements on the page match the 'Click Element' value
            var clickElements = document.querySelectorAll(tagsArray[1][i]);
            // Click each one of those elements
            for (var j = 0; j < clickClasses.length; j++) {
              clickElements[j].click();
            }
            break;

            case 'Click ID':
              // Find how many elements on the page match the 'Click Element' value
              var clickIDs = document.getElementById(tagsArray[1][i]);
              for (var j = 0; j < clickClasses.length; j++) {
                clickIDs[j].click();
              }
              break;
              

          default:
            // Handle other cases if necessary
            break;
        }
      }
    }
  });
}


