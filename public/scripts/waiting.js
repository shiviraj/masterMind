const getElement = selector => document.querySelector(selector);

const showGameId = function(gameId) {
  getElement('#game-id').innerText = gameId;
};

const showNames = function(names) {
  const namesInHtml = names.map(name => `<div class="name">${name}</div>`);
  const $names = getElement('.joined-player');
  $names.innerHTML = namesInHtml;
};

const showWaitingResult = function(data, syncRequest) {
  if (!data.isStarted) {
    showGameId(data.gameId);
    return showNames(data.playerNames);
  }
  clearInterval(syncRequest);
  location = 'game.html';
};

const getSyncRequest = function(syncRequest) {
  fetch('/waitingStatus')
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      location = 'index.html';
      clearInterval(syncRequest);
    })
    .then(data => showWaitingResult(data, syncRequest));
};

const main = function() {
  const syncRequest = setInterval(() => getSyncRequest(syncRequest), 200);
};

window.onload = main;
