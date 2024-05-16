// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delayInput = document.querySelector('input[name="delay"]');
  const stateInputs = document.querySelectorAll('input[name="state"]');

  const delay = parseInt(delayInput.value);
  const state = getStateValue(stateInputs);

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  promise.then(
    (delay) => {
    iziToast.show({message:`✅ Fulfilled promise in ${delay}ms`,position: 'topCenter'});
    },
    (delay) => {
    iziToast.show({message:`❌ Rejected promise in ${delay}ms`,position: 'topCenter'});
    }
  );
}

function getStateValue(inputs) {
  for (const input of inputs) {
    if (input.checked) {
      return input.value;
    }
  }
}