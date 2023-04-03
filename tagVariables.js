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
        var tags = document.getElementsByClassName('open-tag-button fill-cell md-gtm-theme');
        //CURRENTLY ONLY WORKS FOR 1 TRIGGER/TAG
        for (let i = 0; i < numOfTriggers; i++) {
            var tagName = tags[i].innerText;
            //might cause problems when there's more than 1 tag
            if (triggerName.includes((String(triggers[i].innerText)))){
                chrome.storage.sync.set({ tagName: tagName }).then(() => {
                    console.log("Tags to test: " + tagName);
                  });
                
            }
        }
    })
}

