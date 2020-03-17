const createBoard = function(codeLength) {
  let gameBoard = '';
  for (let row = 12; row > 0; row--) {
    gameBoard += `<div class="code-trial-row disable" id="code-try-${row}"><div class="enter-code">`;
    for (let hole = 0; hole < 5; hole++) {
      gameBoard += ` <div class="hole" id="hole-${hole}"></div>`;
    }
    gameBoard += `<div class="submit-code"></div></div><div class="code-result">`;
    for (let hole = 0; hole < 5; hole++) {
      gameBoard += `<div class="result-hole" id="result-hole-1"></div>`;
    }
    gameBoard += `</div></div>`;
  }
  return gameBoard;
};

const getElement = elementBy => document.querySelector(elementBy);

const activeRow = function(rowNo) {
  const $activeRow = getElement(`#code-try-${rowNo}`);
  $activeRow.classList.remove('disable');
  $activeRow.classList.add('enable');
};

const renderBoard = function() {
  const $gameBoard = getElement('#code-body');
  $gameBoard.innerHTML = createBoard();
};
