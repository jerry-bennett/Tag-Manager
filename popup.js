// Get the wrapper element
const wrapper = document.getElementById('wrapper');

// Create the select element
const select = document.createElement('select');

// Create the options
const option1 = document.createElement('option');
option1.value = 'option1';
option1.text = 'Bingus';
const option2 = document.createElement('option');
option2.value = 'option2';
option2.text = 'Option 2';
const option3 = document.createElement('option');
option3.value = 'option3';
option3.text = 'Option 3';
const option4 = document.createElement('option');
option4.value = 'option4';
option4.text = 'Option 4';

// Add the options to the select element
select.add(option1);
select.add(option2);
select.add(option3);
select.add(option4);

// Add the select element to the wrapper element
wrapper.insertAdjacentElement('afterbegin', select);
