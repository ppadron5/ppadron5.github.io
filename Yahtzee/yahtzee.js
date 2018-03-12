function setup() {
  loadModal();
  //loadPlayerInfo();
  loadDice();
  loadScorecard();
  //document.getElementById("roll").innerHTML = "Roll The Dice (" + yahtzee.throwsRemainingInTurn + ")";
}

function loadModal() {
  modal = document.getElementsByClassName('modal-wrapper')[0];
  modal.style.display = "block";
}

function closeModal() {
  name = document.getElementById('nameInput').value;
  if (name.length > 0) {
    yahtzee.player.name = name;
    document.getElementById('playerName').innerHTML = yahtzee.player.name;
    CheckedImage = document.querySelector('input[name=avatar][checked]').value;
    document.getElementsByClassName('avatar').src = CheckedImage.innerHTML = yahtzee.player.avatar;
    //CheckedImage.innerHTMl = yahtzee.player.avatar;
    modal = document.getElementsByClassName('modal-wrapper')[0];
    modal.style.display = "none";
  }
}


/*function loadPlayerInfo() {
  document.getElementById('playerName').innerHTML = yahtzee.player.name;
  document.getElementById('playerAvatar').src = yahtzee.player.avatar;
}*/

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
  document.getElementById('scoreRows').innerHTML = "";
  yahtzee.scoreCard.forEach(function(scoreCardRow, index) {
  if(scoreCardRow.top) {
      buildScoreCardRow(scoreCardRow.title, scoreCardRow.score, (scoreCardRow.scoreRecorded ? "scored" : "unscored"), !scoreCardRow.scoreRecorded, index);
    }
  });
  buildScoreCardRow("Top Subtotal", " ", "totals topSubtotal", false, 0);
  buildScoreCardRow("Top Bonus", " ", "totals topBonus", false, 0);
  yahtzee.scoreCard.forEach(function(scoreCardRow, index) {
    if (!scoreCardRow.top) {
      buildScoreCardRow(scoreCardRow.title, scoreCardRow.score, (scoreCardRow.scoreRecorded ? "scored" : "unscored"), !scoreCardRow.scoreRecorded, index);
      /*if (scoreCardRow.scoreRecorded) {
        className = "scored";
      } else {
        className = "unscored"
      }
      buildScoreCardRow(scoreCardRow.title, scoreCardRow.score);*/
    }
  });
  buildScoreCardRow("Total Score:", " ", "totals totalScore");
}

function buildScoreCardRow(title, score, columnClassName, clickable, scoreCardIndex) {
  tr = document.createElement('tr');
  td1 = document.createElement('td');
  td1.innerHTML = title;
  tr.appendChild(td1);
  td2 = document.createElement('td');
  td2.innerHTML = score;
  td2.className = columnClassName;
  if (clickable) {
    td2.onclick = saveScore;
    td2.setAttribute('data-scoreCardIndex', scoreCardIndex);
  }
  tr.appendChild(td2);
  document.getElementById('scoreRows').appendChild(tr);
}

function saveScore() {
  if (yahtzee.throwsRemainingInTurn < 3) {
    index = this.getAttribute('data-scoreCardIndex');
    yahtzee.scoreCard[index].scoreRecorded = true;
    loadScorecard();
    yahtzee.throwsRemainingInTurn = 3;
    yahtzee.dice.forEach(function (die) {
      die.sideUp = 0;
      die.saved = false;
    });
    loadDice();
    yahtzee.turnsRemaining--;
    if (yahtzee.turnsRemaining == 0) {
      finalScoring();
      document.getElementById("roll").innerHTML = "Game Over";
      document.getElementById("roll").className = "reded";
      document.getElementById("roll").onclick = function() {
        window.location.reload()
      }
    }
  }
}

function rollDice() {
  rerolled = false;
  if (yahtzee.throwsRemainingInTurn > 0) {
  yahtzee.dice.forEach(function (die) {
    if (!die.saved) {
      die.sideUp = Math.floor(Math.random() * 6) + 1;
      rerolled = true;
    }
  });
  if (rerolled)
      yahtzee.throwsRemainingInTurn--;
      loadDice();
      calculateScores();
  }
}

function saveDie(dieIndex) {
  if (yahtzee.throwsRemainingInTurn != 3) {
  yahtzee.dice[dieIndex].saved = !yahtzee.dice[dieIndex].saved;
  loadDice();
  }
}

function calculateScores() {
  yahtzee.scoreCard.forEach(function (scoreCardRow) {
    if (!scoreCardRow.scoreRecorded) {
      if (conditionIsMet(scoreCardRow.scoreCondition)) {
        if (scoreCardRow.scoreMath[0] == 'const') {
          scoreCardRow.score = scoreCardRow.scoreMath[1];
        }
        if (scoreCardRow.scoreMath[0] == 'sum') {
          scoreCardRow.score = sumOfDice(scoreCardRow.scoreMath[1])
        }
      } else {
        scoreCardRow.score = 0;
      }
    }
  });
  loadScorecard();
}


function sumOfDice(valueToMatch) {
  total = 0;
  yahtzee.dice.forEach(function (die) {
    if (die.sideUp == valueToMatch || valueToMatch === 0) {
      total += die.sideUp;
    }
  });
  return total;
}

function conditionIsMet(condition) {
  if (condition[0] == 'none') {
    return true;
  }
  if (condition[0] == 'ofAKind') {
    return  ofAKind(condition);
  }
  if (condition[0] == 'inARow') {
    return inARow(condition);
  }
  return false;
}

/*function ofAKind(condition) {
  return false;
}

function inARow(condition) {
  return false;
}

function inARow(anArray, numberToMath) {

}

function fourinRow(anArray) {
  for (i=1; i<=3; i++) {
    found = true;
    for (j=1; j<=1+3; j++) {
      if (!anArray.includes(j))
        found = false;
    }
    if (found)
      return true;
  }
  return false;
}

function fiveinARow(anArray) {
  for (i=1; i<=2; i++) {
    found = true;
    for (j=1; j<=1+4; j++) {
      if (!anArray.includes(j))
        found = false;
    }
    if (found)
      return true;
  }
  return false;
}
*/

function ofAKind(condition) {
  numberOfDuplicates = cacheArray();
  arrayForFour = buildSides();
  fourIsTrue = fourEval(arrayForFour);
  threeIsTrue = threeEval(arrayForFour);
  yahtzeeIsTrue = yahtzeeEval(arrayForFour);
  if (condition[1] == 3 && threeIsTrue == true) {
    return true;
  }
  if (condition[1] == 4 && fourIsTrue == true) {
    return true;
  }
  if (condition[1] == 2 && numberOfDuplicates >= 4) {
    return true;
  }
  if (condition[1] == 5 && yahtzeeIsTrue == true) {
    return true;
  }
}

function inARow(condition) {
  arrayForRow = buildSides();
  smIsTrue = smEval(arrayForRow);
  lgIsTrue = lgEval(arrayForRow);
  if (condition[1] == 4 && smIsTrue == true) {
    return true;
  }
  if (condition[1] == 5 && lgIsTrue == true) {
    return true;
  }
}

function buildSides() {
  cache = [];
  yahtzee.dice.forEach(function(die) {
    cache.push(die.sideUp);
  })
  cache = cache.sort();
  return cache;
}

function cacheArray() {
  cache = [];
  yahtzee.dice.forEach(function(die) {
    cache.push(die.sideUp);
  })
  cache = cache.sort();

  var numberOfDuplicates = [];
  for (var i = 0; i < cache.length - 1; i++) {
    if (cache[i + 1] == cache[i]) {
      numberOfDuplicates.push(cache[i]);
    }
  }
  if (numberOfDuplicates.length == 3) {
    var fullHouse = [];
    for (i = 0; i < numberOfDuplicates.length - 1; i++) {
      if (numberOfDuplicates[i + 1] != numberOfDuplicates[i]) {
        fullHouse.push(cache[i]);
      }
    }
    if (fullHouse.length >= 1) {
      return 7355608;
    }
  } else {
    return numberOfDuplicates.length;
  }
}

function lgEval(arrayMod) {
  arrayMod = arrayMod.sort();
  var numberInARow = [];
  for (var i = 0; i < arrayMod.length; i++) {
    if (arrayMod[i] + 1 == arrayMod[i + 1]) {
      numberInARow.push(arrayMod[i]);
    }
    if (i == arrayMod.length - 1) {
      if (arrayMod[i] - 1 == arrayMod[i - 1]) {
        numberInARow.push(arrayMod[i]);
      }
    }
  }

  if (numberInARow.length == 5) {
    return true;
  }
}

function fourEval(arrayMod) {
  const ones = arrayMod.filter(function(it) {
    return it === 1;
  });
  const twos = arrayMod.filter(function(it) {
    return it === 2;
  });
  const threes = arrayMod.filter(function(it) {
    return it === 3;
  });
  const fours = arrayMod.filter(function(it) {
    return it === 4;
  });
  const fives = arrayMod.filter(function(it) {
    return it === 5;
  });
  const sixes = arrayMod.filter(function(it) {
    return it === 6;
  });
  if (ones.length == 4) {
    return true;
  }
  if (twos.length == 4) {
    return true;
  }
  if (threes.length == 4) {
    return true;
  }
  if (fours.length == 4) {
    return true;
  }
  if (fives.length == 4) {
    return true;
  }
  if (sixes.length == 4) {
    return true;
  }
}

function yahtzeeEval(arrayMod) {
  const ones = arrayMod.filter(function(it) {
    return it === 1;
  });
  const twos = arrayMod.filter(function(it) {
    return it === 2;
  });
  const threes = arrayMod.filter(function(it) {
    return it === 3;
  });
  const fours = arrayMod.filter(function(it) {
    return it === 4;
  });
  const fives = arrayMod.filter(function(it) {
    return it === 5;
  });
  const sixes = arrayMod.filter(function(it) {
    return it === 6;
  });
  if (ones.length == 5) {
    return true;
  }
  if (twos.length == 5) {
    return true;
  }
  if (threes.length == 5) {
    return true;
  }
  if (fours.length == 5) {
    return true;
  }
  if (fives.length == 5) {
    return true;
  }
  if (sixes.length == 5) {
    return true;
  }
}

function threeEval(arrayMod) {
  const ones = arrayMod.filter(function(it) {
    return it === 1;
  });
  const twos = arrayMod.filter(function(it) {
    return it === 2;
  });
  const threes = arrayMod.filter(function(it) {
    return it === 3;
  });
  const fours = arrayMod.filter(function(it) {
    return it === 4;
  });
  const fives = arrayMod.filter(function(it) {
    return it === 5;
  });
  const sixes = arrayMod.filter(function(it) {
    return it === 6;
  });
  if (ones.length == 3) {
    return true;
  }
  if (twos.length == 3) {
    return true;
  }
  if (threes.length == 3) {
    return true;
  }
  if (fours.length == 3) {
    return true;
  }
  if (fives.length == 3) {
    return true;
  }
  if (sixes.length == 3) {
    return true;
  }
}

function smEval(arrayMod) {
  arrayMod = arrayMod.sort();
  duplicateStrip = [];
  for (i = 0; i < arrayMod.length; i++) {
    if (duplicateStrip.indexOf(arrayMod[i]) == -1) {
      duplicateStrip.push(arrayMod[i])
    }
  }
  arrayMod = duplicateStrip;

  var numberInARow = [];
  for (var i = 0; i < arrayMod.length; i++) {
    if (arrayMod[i] + 1 == arrayMod[i + 1] || arrayMod[i] - 1 == arrayMod[i - 1]) {
      console.log(arrayMod[i] + " + 1 = " + arrayMod[i + 1])
      console.log(arrayMod[i] + " - 1 = " + arrayMod[i - 1])
      numberInARow.push(arrayMod[i]);
      console.log(numberInARow);
    }
    if (i == 2) {
      if (arrayMod[i] + 1 != arrayMod[i + 1] || arrayMod[i] - 1 != arrayMod[i - 1]) {
        return false;
      }
    }
  }
  duplicateStrip = [];
  for (i = 0; i < numberInARow.length; i++) {
    if (duplicateStrip.indexOf(numberInARow[i]) == -1) {
      duplicateStrip.push(numberInARow[i])
    }
  }
  if (duplicateStrip.length >= 4) {
    return true;
  } else {
    return false;
  }
}

function purgeDuplicates(dupeArray) {
  //if all dupeArray are not equal
  //Find amount of duplicates
  //purge the smaller amount of duplicates
}

function sumOfDice(valueToMatch) {
  total = 0;
  yahtzee.dice.forEach(function(die) {
    if (die.sideUp == valueToMatch || valueToMatch === 0) {
      total += die.sideUp;
    }
  })
  return total;
}

function finalScoring() {
  topScore = topSubCalc();
  var topSub = document.getElementsByClassName("topSubtotal");
  topSub[0].innerHTML = topScore;

  bonusScore = topBonusCalc(topScore);
  var topBonus = document.getElementsByClassName("topBonus");
  topBonus[0].innerHTML = bonusScore;

  finalScore = totalScoreCalc(bonusScore);
  var totalScore = document.getElementsByClassName("totalScore");
  totalScore[0].innerHTML = finalScore;
}

function topSubCalc() {
  subAccum = 0;
  for (i = 0; i < 6; i++) {
    subAccum += yahtzee.scoreCard[i].score;
  }
  return subAccum;
}

function topBonusCalc(topScore) {
  if (topScore >= 63) {
    return 35;
  } else {
    return 0;
  }
}

function totalScoreCalc(bonus) {
  scoreAccum = 0;
  for (i = 0; i < yahtzee.scoreCard.length; i++) {
    scoreAccum += yahtzee.scoreCard[i].score;
  }
  return scoreAccum + bonus;
}
