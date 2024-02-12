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

  const firstDelay = parseInt(document.querySelector('[name="delay"]').value);
  const stepDelay = parseInt(document.querySelector('[name="step"]').value);
  const amount = parseInt(document.querySelector('[name="amount"]').value);

  async function createPromises() {
    let currentDelay = firstDelay;
    for (let i = 1; i <= amount; i++) {
      try {
        const { position } = await createPromise(i, currentDelay);
        console.log(`✅ Fulfilled promise ${position} in ${currentDelay}ms`);
      } catch ({ position }) {
        console.log(`❌ Rejected promise ${position} in ${currentDelay}ms`);
      }
      currentDelay = stepDelay; // Zastąpienie wartości currentDelay wartością stepDelay dla kolejnej obietnicy
    }
  }

  createPromises();
});
