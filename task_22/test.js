var timer = null;
var stack = [];

function preOrder(node) {
  if(node != null) {
    stack.push(node);
    preOrder(node.firstElementChild);
    preOrder(node.lastElementChild);
  }
}

function inOrder(node) {
  if(node != null) {
    inOrder(node.firstElementChild);
    stack.push(node);
    inOrder(node.lastElementChild);
  }
}

function postOrder(node) {
  if(node != null) {
    postOrder(node.firstElementChild);
    postOrder(node.lastElementChild);
    stack.push(node);
  }
}

function animate() {
  var temp = stack;
  count = 0;
  temp[count].style.backgroundColor = "blue";
  timer = setInterval(function() {
    count++;
    if(count < stack.length) {
      temp[count-1].style.backgroundColor = 'white';
      temp[count].style.backgroundColor = "blue";
    } else {
      clearInterval(timer);
      temp[count-1].style.backgroundColor = 'white';
    }
  },1000);
}

function reset() {
  clearInterval(timer);
  for (var i = 0; i < stack.length; i++) {
    stack[i].style.backgroundColor = 'white';
  }
  stack = [];
}

var root = document.getElementsByClassName('one')[0];
    prebtn = document.getElementById('preOrder'),
    inbtn = document.getElementById('inOrder'),
    postbtn = document.getElementById('postOrder');

    prebtn.onclick = function() {
      console.log(1);
      reset();
      preOrder(root);
      animate();
    }
    inbtn.onclick = function() {
      reset();
      inOrder(root);
      animate();
    }
    postbtn.onclick = function() {
      reset();
      postOrder(root);
      animate();
    }
