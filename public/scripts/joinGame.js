const getElement = selector => document.querySelector(selector);

const showError = function(msg) {
  const $errorDiv = getElement('#error');
  $errorDiv.innerText = msg;
};

const showJoin = function(data) {
  if (data.error) {
    return showError('data.error');
  }
  location = 'waiting.html';
};

const joinGame = function(event) {
  event.preventDefault();
  const username = getElement('#username').value;
  const gameId = getElement('#game-id').value;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({username, gameId})
  };
  fetch('/joinGame', options)
    .then(res => res.json())
    .then(showJoin);
};

const main = function() {
  const $form = getElement('.form');
  $form.addEventListener('submit', joinGame);
};

window.onload = main;
