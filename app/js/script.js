const navToggle = document.querySelector('.nav__toggle');
const nav = document.querySelector('.nav');
const portfolioContainer = document.querySelector('.portfolio__items');
const menuButton = document.getElementById('menu__button');
const form = document.querySelector('form');
const submitButton = form.querySelector('button');
const userInputs = form.querySelectorAll('input');
const userMessage = form.querySelector('textarea');
const errorSpanInput = form.querySelectorAll('span');
let modalElement;

// main menu
const menuHandler = () => {
  document.body.classList.toggle('nav--open');
};

// portfolio modals
const modalHandler = (event) => {
  event.preventDefault();

  const modalToggle = event.target.closest('.portfolio__link'); // will give us the link element of the particular modal

  if (!modalToggle) return;

  const modal = modalToggle.parentNode.nextElementSibling; // select figcaption element of the link (parent node), then select next element which is modal div;

  if (!modal) return;

  const closeButton = modal.querySelector('button');

  // set the element to close
  modalElement = modal;
  modalOpen();
  closeButton.addEventListener('click', modalAnimationClose);
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') modalAnimationClose();
  });
};

const modalOpen = () => {
  // animation
  modalElement.style.animation = 'modalIn 500ms forwards';
  modalElement.classList.add('modal--is--open');
  navToggle.style.display = 'none';
  if (document.body.classList.contains('nav--open')) { // check if menu is open
    menuHandler();
  }

  document.body.style.overflowY = 'hidden';
};

const modalAnimationClose = () => {
  // animation
  modalElement.style.animation = 'modalOut 500ms forwards';
  modalElement.addEventListener('animationend', modalClose);
  navToggle.style.display = 'block';

  document.body.style.overflowY = 'scroll';
};

const modalClose = () => {
  modalElement.classList.remove('modal--is--open');
  modalElement.removeEventListener('animationend', modalClose);
  modalElement = null;
  document.body.style.overflowY = 'scroll';
};

// form section
const submitFormHandler = (event) => {
  event.preventDefault();

  const name = userInputs[0].value;
  const email = userInputs[1].value;
  const message = userMessage.value;
  console.log(name, email, message);

  const errors = [];

  if (name.trim() === '') {
    addAlertClass(userInputs[0], errorSpanInput[0]);
    errors.push(new Error('invalid name input'));
  } else {
    removeAlertClass(userInputs[0], errorSpanInput[0]);
  }

  if (email.trim() === '') {
    addAlertClass(userInputs[1], errorSpanInput[1]);
    errors.push(new Error('invalid email input'));
  } else {
    removeAlertClass(userInputs[1], errorSpanInput[1]);
  }

  if (message.trim() === '') {
    addAlertClass(userMessage, errorSpanInput[2]);
    errors.push(new Error('invalid message input'));
  } else {
    removeAlertClass(userMessage, errorSpanInput[2]);
  }

  if (errors.length > 0) {
    throw errors;
  } else {
    // add submit form then clear inputs
    clearUserInputs(userInputs, userMessage);
  }
};

const addAlertClass = (element, span) => {
  console.log(element, span);
  element.classList.add('alert');
  span.style.visibility = 'visible';
};

const removeAlertClass = (element, span) => {
  element.classList.remove('alert');
  span.style.visibility = 'hidden';
};

const clearUserInputs = (inputs, message) => {
  for (let input of inputs) {
    input.value = '';
  }
  message.value = '';
};

navToggle.addEventListener('click', menuHandler);
portfolioContainer.addEventListener('click', modalHandler);
submitButton.addEventListener('click', submitFormHandler);
