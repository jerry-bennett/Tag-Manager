// Get the wrapper element
const wrapper = document.getElementById('wrapper');

// Create the select element
const select = document.createElement('select');

// Variable to store the current selected option
let currentOptionText = '';

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

  // Set the selected option based on the stored currentOptionText
  if (currentOptionText) {
    select.value = currentOptionText;
  }
}

// Function to handle storage changes
function handleStorageChange(changes) {
  if (changes.tagNames) {
    const { newValue } = changes.tagNames;
    populateDropdown(newValue);
  }
}

// Function to handle select change
function handleSelectChange(event) {
  const selectedOption = event.target.value;
  currentOptionText = selectedOption;
  // Store the currentOptionText in Chrome storage
  chrome.storage.sync.set({ currentOptionText });
}

// Retrieve tagNames and currentOptionText from Chrome storage
chrome.storage.sync.get({ tagNames: [], currentOptionText: '' }, (data) => {
  const tagNames = data.tagNames;
  currentOptionText = data.currentOptionText;

  // Populate the dropdown menu initially
  populateDropdown(tagNames);

  // Add the select element to the wrapper element
  wrapper.insertAdjacentElement('afterbegin', select);

  // Add event listener for select change
  select.addEventListener('change', handleSelectChange);
});

// Register the storage onChanged event listener
chrome.storage.onChanged.addListener(handleStorageChange);
