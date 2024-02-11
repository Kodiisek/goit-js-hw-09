function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document.querySelector('.form').addEventListener('submit', function(event) {
  event.preventDefault();

  const delay = parseInt(document.querySelector('[name="delay"]').value);
  const step = parseInt(document.querySelector('[name="step"]').value);
  const amount = parseInt(document.querySelector('[name="amount"]').value);

  async function createPromises() {
    for (let i = 1; i <= amount; i++) {
      try {
        const { position, delay: currentDelay } = await createPromise(i, delay + (i - 1) * step);
        console.log(`✅ Fulfilled promise ${position} in ${currentDelay}ms`);
      } catch ({ position, delay: currentDelay }) {
        console.log(`❌ Rejected promise ${position} in ${currentDelay}ms`);
      }
    }
  }

  createPromises();
});







