const getElement = selector => document.querySelector(selector);

const showError = function(msg) {
  const $errorDiv = getElement('#error');
  $errorDiv.innerText = msg;
};

const hostGame = function(event) {
  event.preventDefault();
  const username = getElement('#username').value;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username})
  };
  fetch('/hostGame', options).then(res => {
    if (res.ok) {
      location = 'waiting.html';
    }
    showError('Something went wrong, try again');
  });
};

const main = function() {
  const $form = getElement('.form');
  $form.addEventListener('submit', hostGame);
};

window.onload = main;
