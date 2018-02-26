function setup() {
  loadPlayerInfo();
  loadDice();
  loadScorecard();
  buildScoreCardRow();
  rollDice();
  saveDie();
}

function loadPlayerInfo() {
  document.getElementById('playerName').innerHTML = yahtzee.player.name;
  document.getElementById('playerAvatar').src = yahtzee.player.avatar;
}

function loadDice() {
  dieImages = ['', '1.png', '2.png', '3.png', '4.png', '5.png', '6.png'];
  yahtzee.dice.forEach(function (die, index) {
    img = document.getElementById('die' + index);
    img.src = dieImages[die.sideUp];
    if (die.saved) {
      img.className = "saved";
    } else {
      img.className = "";
    }
  });
  document.getElementById('throwsRemain').innerHTML = yahtzee.throwsRemainingInTurn
  document.getElementById('throwsRemainLabel').innerHTML = yahtzee.throwsRemainingInTurn
  document.getElementById('roll').disabled = (yahtzee.throwsRemainingInTurn <= 0);
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

function rollDice() {
  //TODO: do not allow roll if all dice saved
  rerolled = false;
  if (yahtzee.throwsRemainingInTurn > 0) {
  yahtzee.dice.forEach(function(die) {
    if (!die.saved) {
      die.sideUp = Math.floor(Math.random() * 6) + 1;
      rerolled = true;
    }
  });
  if (rerolled)
      yahtzee.throwsRemainingInTurn--;
    loadDice();
  }
}

function saveDie(dieIndex) {
  if (yahtzee.throwsRemainingInTurn != 3) {
  yahtzee.dice[dieIndex].saved = !yahtzee.dice[dieIndex].saved;
  loadDice();
  }
}
