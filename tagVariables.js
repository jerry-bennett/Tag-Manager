document.addEventListener('DOMContentLoaded', () => {
    const tagVariables = document.getElementById("tagVariables");
    tagVariables.addEventListener("click", async () => {
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: getTagVariables,
        });
      });
  })

async function getTagVariables() {

    document.addEventListener('DOMContentLoaded', () => {
        const myText = document.getElementById("myText");
        console.log(myText);
        myText.innerHTML = "works";
    })
    chrome.storage.sync.get(["triggerName"]).then((result) => {
        var triggerName = String(result.triggerName);
        var triggers = document.getElementsByClassName('small-trigger-chip md-gtm-theme');
        var numOfTriggers = document.getElementsByClassName('small-trigger-chip md-gtm-theme').length;
        var tagName = document.getElementsByClassName('open-tag-button fill-cell md-gtm-theme');
        for (let i = 0; i < numOfTriggers; i++) {
            if (triggerName.includes((String(triggers[i].innerText)))){
                console.log("Tags to test: " + tagName[i].innerText);
            }
        }
    })
}

