import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import "flatpickr/dist/flatpickr.min.css";

const refs = {
    
start : document.querySelector('button[data-start]'),
input : document.querySelector('#datetime-picker'),
daysEl : document.querySelector('.value[data-days]'),
hoursEl : document.querySelector('.value[data-hours]'),
    minEl: document.querySelector('.value[data-minutes]'),
secEl: document.querySelector('.value[data-seconds]')

}


refs.start.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      
        if (selectedDates[0] < Date.now()) {
    
           Notiflix.Notify.failure('Please choose a date in the future');

        } else {
        refs.start.disabled = false;}
  },
};

const datePicker  = flatpickr(refs.input, options) 

refs.start.addEventListener('click', onClick) 

let interval = null;

function onClick() {

    const startTime = datePicker.selectedDates[0].getTime()
   

    interval = setInterval(() => {
        refs.start.disabled = true;
        const currentTime = Date.now()
        const deltaTime = startTime - currentTime;
        const convertTime = convertMs(deltaTime);
        
        if (deltaTime <= 0) {
            return;
        }
        refs.daysEl.textContent = convertTime.days;
        refs.hoursEl.textContent = convertTime.hours;
        refs.minEl.textContent = convertTime.minutes;
        refs.secEl.textContent = convertTime.seconds
    }, 1000)
   

}



function addLeadingZero(value) {
    return String(value).padStart(2,'0')
}




function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero (Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}