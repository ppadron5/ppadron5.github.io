function setup() {
  loadPlayerInfo();
  loadDice();
  loadScorecard();
  buildScoreCardRow();
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

function loadScorecard() {
  // make TR and TD and insert into scoreRows
  yahtzee.scoreCard.forEach(function(scoreCardRow) {
  if(scoreCardRow.top) {
      buildScoreCardRow(scoreCardRow.title, scoreCardRow.score);
    }
  });
  buildScoreCardRow("Top Subtotal", " ");
  buildScoreCardRow("Top Bonus", " ");
  yahtzee.scoreCard.forEach(function(scoreCardRow) {
    if (!scoreCardRow.top) {
      buildScoreCardRow(scoreCardRow.title, scoreCardRow.score);
    }
  });
  buildScoreCardRow("Total Score:", " ");

}

function buildScoreCardRow(title, score) {
  tr = document.createElement('tr');
  td1 = document.createElement('td');
  td1.innerHTML = title;
  tr.appendChild(td1);
  td2 = document.createElement('td');
  td2.innerHTML = score;
  tr.appendChild(td2);
  document.getElementById('scoreRows').appendChild(tr);
}
