function add() {
  boxes = Array.from(document.getElementsByClassName('numeric'));
  sum = 0;
  boxes.forEach(function(box) {
    sum += parseInt(box.value);
  });
  document.getElementById('answer').innerHTML = sum;
}

function average() {
  boxes = Array.from(document.getElementByClassName('numeric'));
  sum = 0;
  boxes.forEach(function(elem) {
    sum += parseInt(elem.value);
  });
  avg = sum
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

function chooseAction() {
  choice = document.getElementById('actionChoice');
  action = choice[choice.selectedIndex];
  if (action.value == 'add') {
    button = document.getElementById('addButton');
    button.innerHTML = "Add Up Contents";
    button.setAttribute('onclick', 'add()');
  }
  if (action.value == 'average') {
    button.innerHTML = "Average Contents";
    button.setAttribute('onclick', 'average()');

    //set button textBoxes
    // set button handler
  }
  if (action.value == 'median') {
    button.innerHTML = "Get Median";
    button.setAttribute('onclick', 'median()')
    //set button textBoxes
    // set button handler
  }
}

function setup(){
  chooseAction();
}
