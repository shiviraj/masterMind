const renderGame = function() {
  activeRow(1);
};

const colorFiller = function(event) {
  const $mousePopUp = getElement('.color-popup');
  $mousePopUp.classList.remove('hidden');
  $mousePopUp.style.top = `${event.clientY - 122}px`;
  $mousePopUp.style.left = `${event.clientX - 178}px`;
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
};

const main = function() {
  renderBoard();
  renderGame();
  attachListener();
};

window.onload = main;
