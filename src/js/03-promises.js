import { Notify } from 'notiflix/build/notiflix-notify-aio'

const formEl = document.querySelector('.form')

formEl.addEventListener('submit', onSubmit)

function onSubmit(evt) {

  evt.preventDefault()

  const delay = Number(evt.target.elements.delay.value);
  const step = Number(evt.target.elements.step.value);
  const amount = Number(evt.target.elements.amount.value);
  
  for (let i = 0; i < amount; i += 1){
    const position = i + 1;
    const currentDelay = delay + (i * step);
    createPromise(position, currentDelay)
		.then(({ position, delay }) => {
			Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
		})
		.catch(({ position, delay }) => {
			Notify.failure(`Rejected promise ${position} in ${delay}ms`);
		});
  }
}


function createPromise(position, delay) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			const shouldResolve = Math.random() > 0.3;
			if (shouldResolve) {
				resolve({ position, delay });
			} else {
				reject({ position, delay });
			}
		}, delay);
	});
}


