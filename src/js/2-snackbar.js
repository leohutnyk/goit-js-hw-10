// Описаний у документації
import iziToast from 'izitoast';
// Додатковий імпорт стилів
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

iziToast.info({
  title: 'Hello',
  message: 'Welcome!',
});

form.addEventListener('submit', event => {
  event.preventDefault();

  //доступ к значению в форме- число delay
  const ms = Number(form.elements.delay.value);

  //значение радио кнопки- value
  const radioBtnVal = form.elements.state.value;

  // Проверка значений
  if (ms <= 0 || isNaN(ms)) {
    iziToast.error({
      message: 'Delay must be a positive number!',
    });
    return;
  }

  //вызов промиса
  promise(ms, radioBtnVal)
    .then(ms =>
      iziToast.success({
        message: `Fulfilled promise in ${ms}ms`,
      })
    )
    .catch(err =>
      iziToast.error({
        message: `Rejected promise in ${ms}ms`,
      })
    );

  //-/submit
  form.reset();
});

//созд промиса
function promise(ms, radioBtnVal) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      radioBtnVal === 'fulfilled' ? resolve(ms) : reject(ms);
    }, ms);

    //-prom
  });
  //-promis
}
