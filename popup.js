// Get the wrapper element
const wrapper = document.getElementById('wrapper');

// Create the select element
const select = document.createElement('select');

chrome.storage.sync.get({ tagsToTest: [] }, (data) => {
    tagsToTest = data.tagsToTest;

    // Loop over the options array and create a new option element for each item
    tagsToTest.forEach((tag, index) => {
        const option = document.createElement('option');
        option.value = `option${index + 1}`;
        option.text = tag;
        select.add(option);
    });

    // Add the select element to the wrapper element
    wrapper.insertAdjacentElement('afterbegin', select);
});
