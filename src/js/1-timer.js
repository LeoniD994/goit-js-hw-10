// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const btnStart = document.querySelector('button[data-start]');
const inputWindow = document.querySelector("#datetime-picker");
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');


// btnStart.disablet = true;

let countdown;
const DELAY = 1000;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.show({
        message: "Please choose a date in the future",position: 'topCenter',backgroundColor: 'red', messageColor: 'white',messageSize: '20'
      });
        btnStart.disabled = true;
        
    } else {
        countdown = selectedDates[0] - new Date(); 
        btnStart.disabled = false;
    }
    },
};
flatpickr(inputWindow, options)


function convertMs(ms) {
  // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

  // Remaining days
    const days = Math.floor(ms / day);
  // Remaining hours
    const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}

btnStart.addEventListener('click', startCoint);

function startCoint() {
  btnStart.disabled = true; 
  btnStart.style.background = 'black';
  btnStart.style.color = 'gray'
    inputWindow.disabled = true; 
    let timeObject = convertMs(countdown);

    const timerId = setInterval(() => {
        if (countdown >= 999) {
            
        btnStart.disabled = true;    
        countdown -= 1000;
        let timeObject = convertMs(countdown);
        padStart(timeObject);
        } else {
            inputWindow.disabled = false;
        };
    }, DELAY); 

};
function padStart(evt){
    days.textContent = evt.days;
    hours.textContent = evt.hours;
    minutes.textContent = evt.minutes;
    seconds.textContent = evt.seconds;
}