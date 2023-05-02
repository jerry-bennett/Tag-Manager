//wait until click before running any script
document.addEventListener('DOMContentLoaded', () => {
  const fireTags = document.getElementById("fireTags");
    fireTags.addEventListener("click", async () => {
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: scrapeSite
      });
    });
  });

  async function fireTagsFunction () {
    let tagsToTest = [];
    let filter1 = [];
    let filter2 = [];
    let filter3 = [];
    let numOfTriggers = 0;
  
    chrome.storage.sync.get({ tagsToTest: [], filter1: [], filter2: [], filter3: [], numOfTriggers: 0 }, (data) => {
      tagsToTest = data.tagsToTest;
      filter1 = data.filter1;
      filter2 = data.filter2;
      filter3 = data.filter3;
      numOfTriggers = data.numOfTriggers;
  
      //ISSUE: only fires one tag at the moment. need to assign which tag is associated with which trigger.
      for (let i = 0; i < tagsToTest.length; i++) {
        let elementToClick = '';
        switch (String(filter1[i])) {
          case ("Click Classes"):
            elementToClick = document.getElementsByClassName(String(filter3[i]));
            console.log(String(filter3[i]));
            if(elementToClick.length > 0){
              for(var j = 0; j < elementToClick.length; j++){
                elementToClick[j].click();
              }
            }
            break;
        }
      }
    });
  };

  async function scrapeSite() {
    // Initialize a variable to store the number of pages on the website
    let numPages = 0;
    
    // Get all the links on the page
    const links = document.getElementsByTagName("a");
  
    // Loop through each link and check if it's on the same domain as the current page
    for (let i = 0; i < links.length; i++) {
      const link = links[i];
  
      if (link.href.indexOf(window.location.hostname) !== -1) {
        // If the link is on the same domain, load it in the background and run the fireTagsFunction on it
        const xhr = new XMLHttpRequest();
        xhr.open("GET", link.href, true);
        xhr.onreadystatechange = function() {
          if (xhr.readyState === 4 && xhr.status === 200) {
            const div = document.createElement("div");
            div.innerHTML = xhr.responseText;
            fireTagsFunction();
          }
        };
        xhr.send();
      }
    }
  }

