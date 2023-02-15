let qaTags = document.getElementById("qaTags");

//defining sleep
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

qaTags.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: qaTagsFunction,
  });
});

async function qaTagsFunction() {
  chrome.storage.sync.get(["numOfTriggers"]).then((result) => {
    var numOfTriggers = result.numOfTriggers;
    console.log(numOfTriggers);
    var previewClick1 = "";
    for (let i = 0; i < numOfTriggers; i++) {
      //get variables from other script and set them here.
      chrome.storage.sync.get(["filter1"]).then((result) => {
        var clickElement1 = result.filter1;
        //console.log(clickElement1[i]);

        chrome.storage.sync.get(["filter2"]).then((result) => {
          var clickElement2 = result.filter2;
          //console.log(clickElement2[i]);

          chrome.storage.sync.get(["filter3"]).then((result) => {
            var clickElement3 = result.filter3;
            console.log(clickElement3[i]);

            //if statements for each option
            if (String(clickElement1[i]).includes("Click")) {
              //CLICK
              if (clickElement1.includes("Classes")) {
                previewClick1 = document.getElementsByClassName(String(clickElement3[i]));
              } else if (String(clickElement1[i]).includes("Element")) {
                previewClick1 = "Click Element";
              }
              //REST OF CLICK OPTIONS HERE
              else if (String(clickElement1[i]).includes("Text")) {
              }
            }
            if (String(clickElement2).includes("equals")) {
              console.log("bingus");
              var element = document.getElementsByClassName(clickElement3[i]);
              var elementLength = document.getElementsByClassName(clickElement3[i]).length;
              console.log(element);
              console.log(elementLength);

              if (elementLength > 0) {
                for (let i = 0; i < elementLength; i++) {
                  sleep(1000);
                  console.log("bingus2");
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