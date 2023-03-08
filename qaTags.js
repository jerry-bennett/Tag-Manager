
document.addEventListener('DOMContentLoaded', () => {
  const qaTags = document.getElementById("qaTags");

  qaTags.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: qaTagsFunction,
    });
  });
})

//defining sleep
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function qaTagsFunction() {
    var element;
    var elementLength
    chrome.storage.sync.get(["numOfTriggers"]).then((result) => {
    var numOfTriggers = result.numOfTriggers;
    var previewClick1 = "";
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
                  sleep(1000);
                  element[i].click();
                  history.go(-1);
                }
              }
            }
          });
        });
      });
    }
  });
  
}