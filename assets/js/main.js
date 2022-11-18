const btn = document.querySelector(".reset");
const game = document.querySelector(".game");
const field = document.querySelectorAll(".field");
const result = document.querySelector(".result");
var step;
var crug =
  '<svg class="crug"><circle r="50" cx="50%" cy="50%" stroke="blue" stroke-width="10px" fill="none" stroke-linecap="round"/></svg>';
var crestik =
  '<div class="crestik-block"><svg class="crestik" width="100px" height="100px"><line  class="first"  x1="0"  y1="0"  x2="100"  y2="100"  stroke="red"  stroke-width="10"  stroke-linecap="round"/><line class="second"x1="100"y1="0"x2="0"y2="100"stroke="red"stroke-width="10"stroke-linecap="round"/></svg></div>';
var count = 0;

function stepCrestik(object) {
  object.innerHTML = crestik;
  object.classList.add("x");
  count++;
  object.removeEventListener("click", Init);
}
function stepCrug(object) {
  object.innerHTML = crug;
  object.classList.add("o");
  count++;
}
function Init(e) {
  if (!step) {
    stepCrestik(e.target);
  } else {
    stepCrug(e.target);
  }
  step = !step;
  checkWin();
}
function newGame() {
  step = false;
  count = 0;
  result.innerText = "";
  field.forEach((item) => {
    item.innerHTML = "";
    item.classList.remove("x", "o", "active");
  });
  game.addEventListener("click", Init);
}
function checkWin() {
  var comb = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (var i = 0; i < comb.length; i++) {
    if (
      field[comb[i][0]].classList.contains("x") &&
      field[comb[i][1]].classList.contains("x") &&
      field[comb[i][2]].classList.contains("x")
    ) {
      field[comb[i][0]].classList.add("active");
      field[comb[i][1]].classList.add("active");
      field[comb[i][2]].classList.add("active");
      result.innerText = "Виграл X";
      game.removeEventListener("click", Init);
    } else if (
      field[comb[i][0]].classList.contains("o") &&
      field[comb[i][1]].classList.contains("o") &&
      field[comb[i][2]].classList.contains("o")
    ) {
      field[comb[i][0]].classList.add("active");
      field[comb[i][1]].classList.add("active");
      field[comb[i][2]].classList.add("active");
      result.innerText = "Виграл O";
      game.removeEventListener("click", Init);
    } else if (count == 9) {
      result.innerText = "Ничия";
    }
  }
}

btn.addEventListener("click", newGame);
game.addEventListener("click", Init);
