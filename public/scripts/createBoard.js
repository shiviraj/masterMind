const createBoard = function(codeLength) {
  let gameBoard = '';
  for (let row = 1; row < 13; row++) {
    gameBoard += `<div class="code-trial-row disable" id="code-try-${row}"><div class="enter-code">`;
    for (let hole = 0; hole < codeLength; hole++) {
      gameBoard += ` <div class="hole" id="hole-${hole}"></div>`;
    }
    gameBoard +=
      '<div class="submit-code" id="submit-code"></div></div><div class="code-result">';
    for (let hole = 0; hole < codeLength; hole++) {
      gameBoard += `<div class="result-hole" id="result-hole-${hole}"></div>`;
    }
    gameBoard += '</div></div>';
  }
  return gameBoard;
};

const getElement = selector => document.querySelector(selector);

const activeRow = function(rowNo) {
  const $activeRow = getElement(`#code-try-${rowNo}`);
  $activeRow.classList.remove('disable');
  $activeRow.classList.add('enable');
};

const disableRow = function(rowNo) {
  const $activeRow = getElement(`#code-try-${rowNo}`);
  $activeRow.classList.remove('enable');
  $activeRow.classList.add('disable');
};

const renderBoard = function(codeDigit) {
  const $gameBoard = getElement('#code-body');
  $gameBoard.innerHTML = createBoard(codeDigit);
};
