import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const timerInput = document.querySelector('#datetime-picker');
const btnTimerInput = document.querySelector('[data-start]');

const fieldDays = document.querySelector('[data-days]');
const fieldHours = document.querySelector('[data-hours]');
const fieldMinutes = document.querySelector('[data-minutes]');
const fieldSecond = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let timerCalc = null;
//Кнопка «Start» повинна бути неактивною
btnTimerInput.disabled = true;

flatpickr('#datetime-picker', {
  //вкл вибір часу
  enableTime: true,

  time_24hr: true,

  defaultDate: new Date(),

  minuteIncrement: 1,

  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate <= new Date()) {
      btnTimerInput.disabled = true;
      iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
      });
    } else {
      btnTimerInput.disabled = false;

      iziToast.success({
        title: 'Success',
        message: 'Valid date selected!',
      });
    }

    if (userSelectedDate > Date.now()) {
      btnTimerInput.disabled = false;
    }
  },
});

// обчислювати раз на секунду, скільки часу залишилось до вказаної дати,
btnTimerInput.addEventListener('click', () => {
  //кнопка Старт і інпут стають неактивним
  btnTimerInput.disabled = true;
  timerInput.disabled = true;

  timerCalc = setInterval(() => {
    const timeDiff = userSelectedDate - Date.now();

    //зупинятися, коли дійшов до кінцевої дати
    if (timeDiff <= 0) {
      clearInterval(timerCalc);

      //Після зупинки таймера інпут стає активним
      timerInput.disabled = false;
      return;
    }

    const timeDiffConvert = convertMs(timeDiff);

    //оновлювати інтерфейс таймера,
    //форматує значення -додавати 0, якщо в числі менше двох символів(padStart() ).
    fieldDays.textContent = addLeadingZero(timeDiffConvert.days);
    fieldHours.textContent = addLeadingZero(timeDiffConvert.hours);
    fieldMinutes.textContent = addLeadingZero(timeDiffConvert.minutes);
    fieldSecond.textContent = addLeadingZero(timeDiffConvert.seconds);
  }, 1000);
});

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

//необхідно додавати 0, якщо в числі менше двох символів.
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
