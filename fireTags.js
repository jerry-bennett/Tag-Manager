//wait until click before running any script
document.addEventListener('DOMContentLoaded', () => {
  const fireTags = document.getElementById("fireTags");
    fireTags.addEventListener("click", async () => {
      let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: async () => {
          await scrapeSite(() => {
            // Call the function once after all links have been processed
            fireTagsFunction();
          });
        },
      });
    });
  });

  const scrapeSite = async (callback) => {
    const internalLinks = Array.from(document.links).filter(link => link.hostname === window.location.hostname);
    const numPages = internalLinks.length;
    let promise = Promise.resolve();
  
    internalLinks.forEach((link, i) => {
      console.log(`Processing page ${i + 1} out of ${numPages}: ${link.href}`);
      promise = promise.then(() => fetch(link.href))
        .then(response => response.text())
        .then(html => {
          const dom = new DOMParser().parseFromString(html, 'text/html');
          // Call your custom script function with the DOM object
          fireTagsFunction(dom);
        })
        //.catch(error => console.error(error));
    });

    const fireTagsFunction = async () => {
      let tagsToTest = [];
      let filter1 = [];
      let filter2 = [];
      let filter3 = [];
      let numOfTriggers = 0;
      let elementToClick = '';
    
      chrome.storage.sync.get({ tagsToTest: [], filter1: [], filter2: [], filter3: [], numOfTriggers: 0 }, (data) => {
        tagsToTest = data.tagsToTest;
        filter1 = data.filter1;
        filter2 = data.filter2;
        filter3 = data.filter3;
        numOfTriggers = data.numOfTriggers;
    
        //ISSUE: only fires one tag at the moment. need to assign which tag is associated with which trigger.
        for (let i = 0; i < tagsToTest.length; i++) {
          switch (String(filter1[i])) {
            case ("Click Classes"):
              //look for the element on each page by class name
              var elementToClick = document.getElementsByClassName(String(filter3[i]));
              if (elementToClick != null) {
                console.log('not null');
                for(var j = 0; j < elementToClick.length; j++){
                  elementToClick[j].click();
                }
              }
              break;
          }
        }
      });
    };

  // Call the callback function when all links have been processed
  promise.then(callback);
};