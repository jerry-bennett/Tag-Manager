// Get the wrapper element
const wrapper = document.getElementById('wrapper');

// Create the select element
const select = document.createElement('select');

// Function to populate the dropdown menu
function populateDropdown(tagNames) {
  // Clear the options in the select element
  select.innerHTML = '';

  // Loop over the options array and create a new option element for each item
  if (tagNames && tagNames.length > 0) {
    tagNames.forEach((tag, index) => {
      const option = document.createElement('option');
      option.value = tag;
      option.text = tag;
      select.add(option);
    });
  }
}

// Function to handle storage changes
function handleStorageChange(changes) {
  if (changes.tagNames) {
    const { newValue } = changes.tagNames;
    populateDropdown(newValue);
  }
}

// Retrieve tagNames from Chrome storage
chrome.storage.sync.get({ tagNames: [] }, (data) => {
  const tagNames = data.tagNames;
  console.log(tagNames);

  // Populate the dropdown menu initially
  populateDropdown(tagNames);

  // Add the select element to the wrapper element
  wrapper.insertAdjacentElement('afterbegin', select);
});

// Register the storage onChanged event listener
chrome.storage.onChanged.addListener(handleStorageChange);
