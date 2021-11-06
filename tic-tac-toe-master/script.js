const probablities = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 5, 9],
  [3, 5, 7],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
];



const userMoves = [];
const botMoves = [];
let winRow = [];
let userOrder = true;
let level = 1; // 1 2 3
let gameStarted = false;

window.onload = function () {
  const screen = document.createElement("div");
  style(screen, {
    boxShadow: "0px 0px 20px rgba(0,0,0,0.4)",
    width: "180px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  });

  if(gameStarted){
    draw(screen);
  }
  else{
    getLevel(screen)
  }

  document.body.replaceChildren(screen);
};

function draw(screen) {
  checkWin();
  for (let i = 1; i <= 9; i++) {
    const button = document.createElement("button");
    style(button, {
      height: "60px",
      width: "60px",
      cursor: "pointer",
    });

    if (winRow.includes(i)) {
      style(button, { backgroundColor: "red" });
    }

    button.textContent = userMoves.includes(i)
      ? `❌`
      : botMoves.includes(i)
      ? `⭕`
      : ``;

    if (winRow.length === 0) {
      button.addEventListener("click", function () {
        user(i);
        setTimeout(() => {
          bot();
        }, 500);
      });
    }

    screen.appendChild(button);
  }
}

function getLevel(screen){
  const div = document.createElement("div");
  style(div, {
    height: "200px",
    width: "80px",
    boxShadow: "0 0 10 rgba(0,0,0,0.5)",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  });

  const select = document.createElement("select");

  style(select, {
    width: "60px",
    marginBottom: "10px"
  })

  for(let i = 1; i <= 3; i++){
    const option = document.createElement("option");
    option.textContent = i
    select.appendChild(option)
  }

  select.addEventListener("change", function(e){ 
    level = Number(e.target.value)
  })

  const btn = document.createElement("button");
  btn.textContent = "Oyuna bashla !";
  btn.addEventListener("click", function(){
    gameStarted = true;
    window.onload()
  })

  div.appendChild(select)
  div.appendChild(btn)
  screen.appendChild(div)
}


function user(i) {
  if (userOrder && ![...botMoves, ...userMoves].includes(i)) {
    userMoves.push(i);
    userOrder = false;
    window.onload();
  }
}

function bot() {
  if (!userOrder && winRow.length === 0) {
    const num = getRandomNum(); 
    const userWinNum = getWinNum(userMoves)
    const botWinNum = getWinNum(botMoves)

    
    if(botWinNum && level !== 1){
      botMoves.push(botWinNum) 
    }
    else if(userWinNum && level !== 1){
      botMoves.push(userWinNum) 
    }
    else{
      botMoves.push(num);
    }

    userOrder = true;
    window.onload();
  }
}

function getWinNum(winSide){
  let winNum;
  let winList = probablities.filter(element => element.filter(e => winSide.includes(e)).length === 2);
  
  for(let item of winList){
    const winRow = item.some(e => ![...userMoves, ...botMoves].includes(e));
    if(winRow){
      winNum = item?.filter(e => ![...userMoves, ...botMoves].includes(e))[0] 
    }
  }
  return winNum
}

function checkWin() {
  const userWinRow = probablities.filter((p) =>
    p.every((pEl) => userMoves.includes(pEl))
  )[0];

  const botWinRow = probablities.filter((p) =>
    p.every((pEl) => botMoves.includes(pEl))
  )[0];

  if (userWinRow?.length > 0) {
    console.log("user won !");
    winRow = userWinRow;
  } else if (botWinRow?.length > 0) {
    console.log("user  lose !");
    winRow = botWinRow;
  } else if ([...userMoves, ...botMoves].length === 9) {
    console.log("draw !");
    winRow.push(0);
  }
}

function getRandomNum() {
  const num = Math.floor(Math.random() * 8 + 1);
  if (![...userMoves, ...botMoves].includes(num)) {
    return num;
  } else {
    return getRandomNum();
  }
}
 

function style(element, obj) {
  for (let key in obj) {
    element.style[key] = obj[key];
  }
}
