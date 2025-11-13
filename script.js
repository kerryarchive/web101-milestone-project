/*** Dark Mode ***
  
  Purpose:
  - Use this starter code to add a dark mode feature to your website.

  When To Modify:
  - [ ] Project 5 (REQUIRED FEATURE) 
  - [ ] Any time after
***/

// Step 1: Select the theme button
const themeButton = document.getElementById('theme-button');


function toggleTheme() {
  // toggle returns true when the class is present after the toggle
  const isLight = document.body.classList.toggle('light-mode');
  if (isLight) {
    localStorage.setItem('site-theme', 'light');
    if (themeButton) themeButton.textContent = 'Toggle Dark Mode';
  } else {
    localStorage.setItem('site-theme', 'dark');
    if (themeButton) themeButton.textContent = 'Toggle Light Mode';
  }
}

// Initialize from localStorage
const savedTheme = localStorage.getItem('site-theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-mode');
  if (themeButton) themeButton.textContent = 'Toggle Dark Mode';
} else {
  document.body.classList.remove('light-mode');
  if (themeButton) themeButton.textContent = 'Toggle Light Mode';
}

// Attach listener
if (themeButton) themeButton.addEventListener('click', toggleTheme);
/*** Form Handling [PLACEHOLDER] [ADDED IN UNIT 6] ***/
const rsvpForm = document.getElementById('rsvp-form');
const rsvpButton = document.getElementById('rsvp-button');


let rsvpCount = document.querySelectorAll('.rsvp-participants p').length;

function updateRsvpCount() {
  const participants = document.querySelector('.rsvp-participants');
  if (!participants) return;
  // Remove existing counter if present
  const existing = document.getElementById('rsvp-count');
  if (existing) existing.remove();
  const counter = document.createElement('p');
  counter.id = 'rsvp-count';
  counter.textContent = `⭐ ${rsvpCount} people have RSVP'd to this event!`;
  participants.appendChild(counter);
}

const addParticipant = (event) => {
  event.preventDefault();
  // Basic validation (validateForm returns true if inputs absent during build)
  if (!validateForm()) return;

  const rsvpList = document.querySelector('.rsvp-participants');
  const nameInput = document.getElementById('full-name');
  const stateInput = document.getElementById('location');
  const emailInput = document.getElementById('email');
  if (!rsvpList || !nameInput || !stateInput || !emailInput) return;

  const name = nameInput.value.trim();
  const state = stateInput.value.trim();

  const listitem = document.createElement('p');
  listitem.textContent = `🎟️ ${name} from ${state} has RSVP'd.`;
  rsvpList.prepend(listitem);

  // Clear the form fields 
  nameInput.value = '';
  stateInput.value = '';
  emailInput.value = '';

  // update count
  rsvpCount = rsvpCount + 1;
  updateRsvpCount();
}

if (rsvpForm) rsvpForm.addEventListener('submit', addParticipant);
if (rsvpButton) rsvpButton.addEventListener('click', addParticipant);

// initialize counter on load
updateRsvpCount();


/*** Form Validation [PLACEHOLDER] [ADDED IN UNIT 7] ***/
const validateForm = () => {
    const nameInput = document.getElementById('full-name');
    const emailInput = document.getElementById('email');
    document.getElementById('validation-message').textContent = '';

    if (nameInput.value.trim() === '') {
        document.getElementById('validation-message').textContent = 'Please enter your full name.';
        nameInput.focus();
        return false;
    }
    if (emailInput.value.trim() === '' || !emailInput.value.includes('@')) {
        document.getElementById('validation-message').textContent = 'Please enter a valid email address.';
        emailInput.focus();
        return false; // Validation failed
    }
    
    // If all checks pass, return true!
    return true;
};

/*** Animations [PLACEHOLDER] [ADDED IN UNIT 8] ***/

/*** Success Modal [PLACEHOLDER] [ADDED IN UNIT 9] ***/