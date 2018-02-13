function add() {
  boxes = Array.from(document.getElementsByClassName('numeric'));
  sum = 0;
  boxes.forEach(function(box) {
    sum += parseInt(box.value);
  });
  document.getElementById('answer').innerHTML = sum;
}

function createBox() {
  textBox = document.createElement('input');
  textBox.setAttribute('class', 'numeric');
  textBox.setAttribute('value', 1);
  textBox.setAttribute('onkeyup', 'validateTextbox(this)');
  document.getElementById('textBoxes').appendChild(textBox);
}

function validateTextbox(textBox) {
  num = textBox.value;
  if (isNaN(num)) {
    textBox.className = 'numeric invalid';
  } else {
  textBox.className = 'numeric';
  }
  setButtonState();
}

function setButtonState() {
  invalids = document.getElementsByClassName('invalid');
  if (invalids.length > 0) {
    document.getElementById('addButton').disabled = true;
  } else {
  document.getElementById('addButton').disabled = false;
  }
}
