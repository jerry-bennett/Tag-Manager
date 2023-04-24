const fireTagsFunction = async () => {
  var element;
  var elementLength;
  chrome.storage.sync.get(["numOfTriggers", "filter1", "filter2", "filter3"], (result) => {
    const numOfTriggers = result.numOfTriggers;
    const clickElements = [
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
      const clickElement1 = clickElements[0];
      const clickElement2 = clickElements[1];
      const clickElement3 = clickElements[2];

      switch (clickElement1[i]) {
        case "Click Classes":
          previewClick1 = document.getElementsByClassName(String(clickElement3[i]));
          break;
        case "Click Element":
          previewClick1 = document.getElementsByName(String(clickElement3[i]));
          break;
        case "Click Text":
          previewClick1 = "Click Text";
          break;
        default:
          console.log("default");
      }

      switch (clickElement2[i]) {
        case "equals":
          element = document.getElementsByClassName(clickElement3[i]);
          elementLength = document.getElementsByClassName(clickElement3[i]).length;

          if (elementLength > 0) {
            for (let i = 0; i < elementLength; i++) {
              element[i].click();
              console.log("Swag");
            }
          }
          break;
        case "contains":
          element = document.getElementsByClassName(clickElement3[i]);
          elementLength = document.getElementsByClassName(clickElement3[i]).length;
          if (elementLength > 0) {
            for (let i = 0; i < elementLength; i++) {
              element[i].click();
              console.log("Swag");
            }
          }
          break;
        default:
          console.log("default");
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