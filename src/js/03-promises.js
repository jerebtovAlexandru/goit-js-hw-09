import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

formRef.addEventListener('submit', onSubmitClick);

function onSubmitClick(evt) {
  evt.preventDefault();

  const { delay, step, amount } = formRef;

  const firstDelay = Number(delay.value);
  const stepDelay = Number(step.value);
  const total = Number(amount.value);

  for (let i = 0; i < total; i++) {
    const currentDelay = firstDelay + stepDelay * i;

    createPromise(i + 1, currentDelay)
      .then(({ position, delay }) =>
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
  }
}

function createPromise(position, delay) {

  return new Promise ((resolve , reject) => {
      const shouldResolve = Math.random() > 0.3;
  setTimeout(() => {
    if (shouldResolve) {
     resolve({position , delay})
  } else {
    reject({position , delay})
  }
  }, delay );
  })
}
