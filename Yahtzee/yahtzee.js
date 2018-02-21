function setup() {
  loadPlayerInfo();
  loadDice();
}

function loadPlayerInfo() {
  document.getElementById('playerName').innerHTML = yahtzee.player.name;
  document.getElementById('playerAvatar').src = yahtzee.player.avatar;
}

function loadDice() {
  dieImages = ['', '1.png', '2.png', '3.png', '4.png', '5.png'];
  yahtzee.dice.forEach(function (die, index) {
    img = document.getElementById('die' + index);

    img.src = dieImages[die.sideUp];
    //set the saved class
    if (die.saved) {
      img.className = "saved";
    } else {
      img.className = "";
    }
  });
}
