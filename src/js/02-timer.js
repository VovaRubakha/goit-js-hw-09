import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

const ref = {
  btnStart: document.querySelector('button[data-start]'),
  inputData: document.querySelector('#datetime-picker'),
  daysCount: document.querySelector('[data-days]'),
  hoursCount: document.querySelector('[data-hours]'),
  minutesCount: document.querySelector('[data-minutes]'),
  secondsCount: document.querySelector('[data-seconds]'),
};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function (selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
      ref.btnStart.removeAttribute('disabled');
      Notify.success(`It's a valid date))`);
      return;
    }
    ref.btnStart.setAttribute('disabled', 'disabled');
    Notify.failure('Please choose a date in the future');
  },
};

flatpickr('#datetime-picker', options);

ref.btnStart.setAttribute('disabled', 'disabled');
ref.btnStart.addEventListener('click', onClickTimer);

let intervalId = null;

function onClickTimer() {
  Notify.success(`Your counter was started`);
  intervalId = setInterval(() => {
    const newDate = new Date(ref.inputData.value);
    let intervalTime = convertMs(newDate - Date.now());

    if (newDate < Date.now()) {
      clearInterval(intervalId);
      return init();
    }
    init(intervalTime);
  }, 1000);
}

function init(time = { days: 0, hours: 0, minutes: 0, seconds: 0 }) {
  ref.daysCount.textContent = `${time.days}`.padStart(2, 0);
  ref.hoursCount.textContent = `${time.hours}`.padStart(2, 0);
  ref.minutesCount.textContent = `${time.minutes}`.padStart(2, 0);
  ref.secondsCount.textContent = `${time.seconds}`.padStart(2, 0);
}
// ---------------------------
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
