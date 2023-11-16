// ім'я гравця
let userName = prompt("Введіть ім'я:", "Гравець");
userName = userName.trim();
if(!userName) 
  userName = "Гравець";
document.getElementById("userName").textContent = userName;

let images = ["apple.png", "pear.png", "lemon.png", "cherry.png", "peach.png"];
let round = 0;

// генерувати індекс елементу масиву
function generateRandomIndex() {
  return Math.floor(Math.random() * images.length);
}

// генерація матриці
function generateMatrix() {
  let matrix = [];
  for(let i = 0; i < 3; i++) {
    let row = [];
    for(let j = 0; j < 3; j++) {
      row.push(generateRandomIndex());  
    }
    matrix.push(row);
  }
  return matrix;
}

// відобразити матрицю
function generateBoard(matrix) {
  let board = document.getElementById("board");
  board.innerHTML = "";
  matrix.forEach(row => {
    let block = document.createElement("div");
    row.forEach(num => {
      block.className = "block";
      let img = document.createElement("img");
      img.src = `images/${images[num]}`;
      let imgAlt = images[num].split('.');
      img.alt = imgAlt[0];
      block.appendChild(img);
      board.appendChild(block);
    }); 
  });
}

// почати гру
let generateButton = document.getElementById("generate");

generateButton.addEventListener("click", () => {
  round++;

  let matrix = generateMatrix();
  generateBoard(matrix);
  document.getElementById("roundCounter").textContent = `Спроба ${round} з 3`;

  if(showResult(matrix)) {
    setTimeout(function(){
      alert(`${userName} переміг!`);
      resetGame();
    }, 30);
  }

  else if(round == 3) {
    setTimeout(function(){
      alert("У вас немає спроб!");
      resetGame();
    }, 30);
  }
})

// показати результат гри
function showResult(matrix) {
  for(let i = 0; i < 3; i++) {
    if(matrix[i][0] == matrix[i][1] && 
       matrix[i][1] == matrix[i][2]) {
      return true;
    }
  }
  return false;
}

// скинути гру
function resetGame() {
  alert("Зіграємо ще раз?");
  round = 0;
  document.getElementById("roundCounter").textContent = `Спроба ${round} з 3`;
}
