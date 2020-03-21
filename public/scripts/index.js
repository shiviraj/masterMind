const getAllElement = selector => document.querySelectorAll(selector);

const renderGame = function() {
  activeRow(12);
};

const colorFiller = function(event) {
  const $mousePopUp = getElement('.color-popup');
  $mousePopUp.classList.remove('hidden');
  localStorage.setItem('holeId', event.target.id); //
  $mousePopUp.style.top = `${event.clientY - 122}px`;
  $mousePopUp.style.left = `${event.clientX - 178}px`;
};

const showError = function(event, errorMsg) {
  const $mousePopUp = getElement('.error');
  $mousePopUp.classList.remove('hidden');
  $mousePopUp.style.top = `${event.clientY - 10}px`;
  $mousePopUp.style.left = `${event.clientX}px`;
  $mousePopUp.innerText = errorMsg;
  setTimeout(() => $mousePopUp.classList.add('hidden'), 1500);
};

const fillColor = function(event) {
  if (event.target.id.match('hole')) {
    colorFiller(event);
  }
};

const addListenerOnHole = function() {
  const $activeRow = getElement('.enable');
  $activeRow.addEventListener('click', () => fillColor(event));
};

const attachListener = function() {
  addListenerOnHole();
  listenerOnColorBall();
  listenerOnTickMark();
};

const startIfGameStarted = function() {
  fetch('/waitingStatus')
    .then(res => res.json())
    .then(data => {
      if (!data.isStarted) {
        location = 'index.html';
      }
    });
};

const changeColor = function(hole, color) {
  const $hole = getElement(`.enable #${hole}`);
  $hole.innerHTML = `<div class="hole ${color}" id="${hole}"></div>
                     <span class='hidden insertedCode'>${color}</span>`;
};

const insertColor = function(event) {
  const holeId = localStorage.getItem('holeId');
  const color = event.target.id;
  changeColor(holeId, color);
  const $mousePopUp = getElement('.color-popup');
  $mousePopUp.classList.add('hidden');
};

const listenerOnColorBall = function() {
  const $colorBalls = Array.from(getAllElement('.color'));
  $colorBalls.forEach($colorBall => {
    $colorBall.addEventListener('click', insertColor);
  });
};

const showResult = function(code) {
  const $codeResult = getElement('.enable .code-result');
  const resultHtml = code.map(codeUnit => {
    return `<div class="result-hole ${codeUnit}" id="result-hole-1"></div>`;
  });
  $codeResult.innerHTML = resultHtml.join('');
};

const showGameResultScreen = function(game) {
  const $gameResult = getElement('.game-result');
  $gameResult.classList.remove('hidden');
  const $gameStatus = getElement('#game-status');
  $gameStatus.innerText = game.status;
  const $gameCodeResult = getElement('.game-code-result');
  const codeResult = game.code.map(code => `<div class="color ${code}"></div>`);
  $gameCodeResult.innerHTML = codeResult.join('');
};

const showGameResult = function() {
  fetch('/gameResult')
    .then(res => res.json())
    .then(showGameResultScreen);
};

const enableNextChance = function(remainingChances) {
  const lastRow = remainingChances + 1;
  disableRow(lastRow);
  if (lastRow === 1) {
    return showGameResult();
  }
  activeRow(remainingChances);
  attachListener();
};

const showCodeResult = function(event, data) {
  if (data.error) {
    return showError(event, data.error);
  }
  showResult(data.code);
  enableNextChance(data.remainingChances);
};

const submitCode = function(event) {
  const $code = Array.from(getAllElement('.enable .insertedCode'));
  const code = $code.map($codeUnit => $codeUnit.innerText);
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({code})
  };
  fetch('/submitCode', options)
    .then(res => res.json())
    .then(data => showCodeResult(event, data));
};

const listenerOnTickMark = function() {
  const $tickMark = getElement('.enable .enter-code .submit-code');
  $tickMark.addEventListener('click', submitCode);
};

const main = function() {
  startIfGameStarted();
  renderBoard(5);
  renderGame();
  attachListener();
};

window.onload = main;
