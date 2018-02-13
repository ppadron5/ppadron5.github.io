function add() {
  boxes = Array.from(document.getElementsByClassName('numeric'));
  sum = 0;
  boxes.forEach(function(box) {
    sum += parseInt(box.value);
  })
  document.getElementById('answer').innerHTML = sum;
}

function createBox() {
  textBox = document.createElement('input');
  textBox.setAttribute('class', 'numeric');
  textBox.setAttribute('value', 1);
  document.getElementById('textboxes').appendChild(textBox);
}
