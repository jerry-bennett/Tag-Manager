const fireTagsFunction = async () => {
  var element;
  var elementLength
  chrome.storage.sync.get(["numOfTriggers"]).then((result) => {
    var numOfTriggers = result.numOfTriggers;
    var previewClick1 = "";
    const internalLinks = Array.from(document.links).filter(link => link.hostname === window.location.hostname);
    const numPages = internalLinks.length;
    console.log(`This website has ${numPages} pages.`);
    for (let i = 0; i < numOfTriggers; i++) {
      //get variables from other script and set them here.
      chrome.storage.sync.get(["filter1"]).then((result) => {
        var clickElement1 = result.filter1;

        chrome.storage.sync.get(["filter2"]).then((result) => {
          var clickElement2 = result.filter2;

          chrome.storage.sync.get(["filter3"]).then((result) => {
            var clickElement3 = result.filter3;

            //if statements for each option
            if (String(clickElement1[i]).includes("Click")) {
              //CLICK
              if (clickElement1.includes("Classes")) {
                previewClick1 = document.getElementsByClassName(String(clickElement3[i]));
              } else if (String(clickElement1[i]).includes("Element")) {
                previewClick1 = document.getElementsByName(String(clickElement3[i]));
              }
              //REST OF CLICK OPTIONS HERE
              else if (String(clickElement1[i]).includes("Text")) {
                previewClick1 = "Click Text"
              }
            }
            if (String(clickElement2).includes("equals")) {
              element = document.getElementsByClassName(clickElement3[i]);
              elementLength = document.getElementsByClassName(clickElement3[i]).length;

              if (elementLength > 0) {
                for (let i = 0; i < elementLength; i++) {
                  element[i].click();
                }
              }
            }
            if (String(clickElement2).includes("contains")) {
              element = document.getElementsByClassName(clickElement3[i]);
              elementLength = document.getElementsByClassName(clickElement3[i]).length;
              if (elementLength > 0) {
                for (let i = 0; i < elementLength; i++) {
                  element[i].click();
                }
              }
            }
          });
        });
      });
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
