const fireTagsFunction = async () => {
  var element;
  var elementLength;
  chrome.storage.sync.get(["filter1", "filter2", "filter3", "triggerName"], (result) => {
    const triggerElements = [
      result.filter1,
      result.filter2,
      result.filter3
    ];
    const internalLinks = Array.from(document.links).filter(link => link.hostname === window.location.hostname);
    const numPages = internalLinks.length;
    console.log(`This website has ${numPages} pages.`);

    var previewClick1 = "";
    for (let i = 0; i < numOfTriggers; i++) {
      // Use the clickElements array instead of multiple chrome.storage.sync.get calls
      const triggerElement1 = triggerElements[0];
      const triggerElement2 = triggerElements[1];
      const triggerElement3 = triggerElements[2];

      switch (triggerElement1) {
        case "Click Classes":
          previewClick1 = document.getElementsByClassName(String(triggerElement3[i]));
          break;
        case "Click Element":
          previewClick1 = document.getElementsByName(String(triggerElement3[i]));
          break;
        case "Click Text":
          previewClick1 = "Click Text";
          break;
        default:
          break;
      }

      switch (triggerElement2) {
        case "equals":
          console.log("Swag");
          element = document.getElementsByClassName(String(triggerElement3));
          elementLength = document.getElementsByClassName(String(triggerElement3)).length;

          if (elementLength > 0) {
            for (let i = 0; i < elementLength; i++) {
              element.click();
              console.log("Swag2");
            }
          }
          break;
        case "contains":
          console.log("Swag");
          element = document.getElementsByClassName(triggerElement3);
          elementLength = document.getElementsByClassName(triggerElement3).length;
          if (elementLength > 0) {
            for (let i = 0; i < elementLength; i++) {
              element.click();
              console.log("Swag2");
            }
          }
          break;
        default:
          break;
      }
    }
  });
};

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

  // Call the callback function when all links have been processed
  promise.then(callback);
};


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