import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

iziToast.info({
  title: 'Hello',
  message: 'Welcome!',
});

form.addEventListener('submit', event => {
  event.preventDefault();

  const ms = Number(form.elements.delay.value);

  const radioBtnVal = form.elements.state.value;

  if (ms <= 0 || isNaN(ms)) {
    iziToast.error({
      message: 'Delay must be a positive number!',
    });
    return;
  }

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

  form.reset();
});

function promise(ms, radioBtnVal) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      radioBtnVal === 'fulfilled' ? resolve(ms) : reject(ms);
    }, ms);
  });
}
