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
  // Basic validation
  if (!validateForm()) return;

  const rsvpList = document.querySelector('.rsvp-participants');
  const nameInput = document.getElementById('full-name');
  const stateInput = document.getElementById('location');
  const emailInput = document.getElementById('email');

  // Create the person object
  let person = {
      name: nameInput.value.trim(),
      location: stateInput.value.trim(),
      email: emailInput.value.trim()
  };

  const listitem = document.createElement('p');
  listitem.textContent = `🎟️ ${person.name} from ${person.location} has RSVP'd.`;
  rsvpList.prepend(listitem);

  // Clear the form fields 
  nameInput.value = '';
  stateInput.value = '';
  emailInput.value = '';

  // update count
  rsvpCount = rsvpCount + 1;
  updateRsvpCount();
  
  // Call the modal function!
  toggleModal(person);
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
/*** Scroll Animations ***
  
  Purpose:
  - Use this starter code to add scroll animations to your website.

  When To Modify:
  - [x] Project 8 (REQUIRED FEATURE)
  - [ ] Any time after
***/

// Step 1: Select all elements with the class 'revealable'.
let revealableContainers = document.querySelectorAll('.revealable');

// Step 2: Write function to reveal elements when they are in view.
const reveal = () => {
    for (let i = 0; i < revealableContainers.length; i++) {
        let current = revealableContainers[i];

        // Get current height of container and window
        let windowHeight = window.innerHeight;
        let topOfRevealableContainer = current.getBoundingClientRect().top;
        let revealDistance = parseInt(getComputedStyle(current).getPropertyValue('--reveal-distance'), 10);

        // If the container is within range, add the 'active' class to reveal
        if (topOfRevealableContainer < windowHeight - revealDistance) {
            current.classList.add('active');
        }
        // If the container is not within range, hide it by removing the 'active' class
        else { 
            current.classList.remove('active');
        }
    }
}

// Step 3: Whenever the user scrolls, check if any containers should be revealed
window.addEventListener('scroll', reveal);

/*** Success Modal [PLACEHOLDER] [ADDED IN UNIT 9] ***/
/*** Modal ***
  
  Purpose:
  - Use this starter code to add a pop-up modal to your website.

  When To Modify:
  - [x] Project 9 (REQUIRED FEATURE)
  - [ ] Project 9 (STRETCH FEATURE)
  - [ ] Any time after
***/

// Animation Helper Variables
let rotateFactor = 0;
const modalImage = document.getElementById('modal-image');

// Helper function to wiggle the image
const animateImage = () => {
    if (rotateFactor === 0) {
        rotateFactor = 15;
    } else {
        rotateFactor = 0;
    }
    if(modalImage) {
        modalImage.style.transform = `rotate(${rotateFactor}deg)`;
        modalImage.style.transition = "0.3s ease";
    }
}

const toggleModal = (person) => {
    const modal = document.getElementById('success-modal');
    const modalText = document.getElementById('modal-text');

    if (!modal || !modalText) return;

    // Update modal display to flex
    modal.style.display = 'flex';

    // Update modal text to personalized message
    modalText.textContent = `Thanks for RSVPing, ${person.name}! See you in ${person.location}!`;

    // Start the animation (every 500ms)
    let intervalId = setInterval(animateImage, 500);

    // Set modal timeout to 5 seconds, then hide it
    setTimeout(() => {
        modal.style.display = 'none';
        clearInterval(intervalId); // Stop the animation
    }, 5000);
}