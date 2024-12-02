boxes = document.querySelectorAll("#box");
const newGame = document.querySelector("#new-game");
const resetGame = document.querySelector("#reset-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

let turn0 = true;
let count = 0;

const winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
  [6, 4, 2],
];

const disable = () => {
  for (box of boxes) {
    box.disabled = true;
  }
};

const enable = () => {
  for (box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};

const showWinner = (pos1Val) => {
  msgContainer.classList.remove("hidden");
  msg.innerText = `The Winner is ${pos1Val}`;
};

const reset = () => {
  enable();
  console.log("clicked");
  turn0 = true;
  count = 0;
  msg.innerText = "";
  msgContainer.classList.add("hidden");
};

const checkWinner = () => {
  for (let pattern of winPattern) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("Winner");
        disable();
        showWinner(pos1Val);
      }
    }
  }
};

const drawGame = () => {
  if (count === 9 && msg.innerText === "") {
    msg.innerText = "The Game is Draw";
    msgContainer.classList.remove("hidden");
  }
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    count++;
    if (turn0) {
      box.innerText = "O";
      turn0 = false;
      box.style.color = "#104F55";
    } else {
      box.innerText = "X";
      turn0 = true;
    }
    box.disabled = true;
    checkWinner();
    drawGame();
  });
});

resetGame.addEventListener("click", reset);
newGame.addEventListener("click", reset);
