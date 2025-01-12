//с документации https://flatpickr.js.org/getting-started/
import flatpickr from 'flatpickr';
//есть в node_modules-подкл стили
import 'flatpickr/dist/flatpickr.min.css';

// Для відображення повідомлень
import iziToast from 'izitoast';
// Додатковий імпорт стилів
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
  //вкл выбор времени
  enableTime: true,

  //При включении отображает выбор времени в 24-часовом режиме без выбора AM/PM.
  time_24hr: true,

  //Устанавливает начальную выбранную дату(ы).
  //предоставить один объект Date или строку даты.
  defaultDate: new Date(),

  //Регулирует шаг ввода минут (включая прокрутку)
  minuteIncrement: 1,

  //Функция(и) для срабатывания каждый раз при закрытии календаря.
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    //вибрав дату в минулому
    //кнопку «Start» не активною.
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

    // дату в майбутньому, кнопка = активною.
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

    //конв числo => {дни/часы/мин/сек}
    const timeDiffConvert = convertMs(timeDiff);

    //оновлювати інтерфейс таймера,
    //форматує значення -додавати 0, якщо в числі менше двох символів(padStart() ).
    fieldDays.textContent = addLeadingZero(timeDiffConvert.days);
    fieldHours.textContent = addLeadingZero(timeDiffConvert.hours);
    fieldMinutes.textContent = addLeadingZero(timeDiffConvert.minutes);
    fieldSecond.textContent = addLeadingZero(timeDiffConvert.seconds);
  }, 1000);
});

//ф-ция конвертации: числo => {дни/часы/мин/сек}
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
