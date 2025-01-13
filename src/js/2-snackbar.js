import flatpickr from 'flatpickr'; // Описаний в документації
import 'flatpickr/dist/flatpickr.min.css'; // Додатковий імпорт стилів
import iziToast from 'izitoast'; // Описаний у документації
import 'izitoast/dist/css/iziToast.min.css'; // Додатковий імпорт стилів

const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const promiseState = event.target.elements.state.value; // отримуємо rejected або fulfilled
  const delay = event.target.elements.delay.value;

  // створення
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (promiseState === 'fulfilled') {
        resolve(delay); //проміс виконується
      } else {
        reject(delay); // проміс не виконується
      }
    }, delay);

    event.currentTarget.reset();
  });

  // обробка

  promise
    .then(data => {
      iziToast.show({
        theme: 'dark',
        backgroundColor: '#B5EA7C',
        title: '✅ Ок',
        titleSize: '16px',
        titleLineHeight: '24px',
        titleColor: '#FFFFFF',
        message: `Fulfilled promise in ${data} ms `,
        messageSize: '16px',
        messageLineHeight: '24px',
        messageColor: '#FFFFFF',
        position: 'topRight',
        timeout: 10000,
      });
    })
    .catch(error => {
      iziToast.show({
        theme: 'dark',
        backgroundColor: '#EF4040',
        title: '❌ Error',
        titleSize: '16px',
        titleLineHeight: '24px',
        titleColor: '#FFFFFF',
        message: ` Rejected promise in ${error} ms`,
        messageSize: '16px',
        messageLineHeight: '24px',
        messageColor: '#FFFFFF',
        position: 'topRight',
        timeout: 10000,
      });
    });
}
