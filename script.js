let lastLoop   = 0;
let score      = 0;
let iterations = 0;

const targets = new Array();

function createSprite(element, x, y, s) {
  const result         = new Object();
        result.element = element;
        result.x       = x;
        result.y       = y;
        result.s       = s;
        // result.h       = h;
        
  return result;
}


function setPosition(sprite) {
  const e              = document.getElementById(sprite.element);
        e.style.left   = sprite.x + 'px';
        e.style.top    = sprite.y + 'px';
        e.style.width  = sprite.s + 'px';
        e.style.height = e.style.width;
        // e.onclick = console.log('toucher');
        
}



// function gameOver() {
  
//   element.style.visibility = 'hidden';
//   element = document.getElementById('gameover');
//   element.style.visibility = 'visible';
// }

function showSprites() {

  for (let i = 0; i < targets.length; i++) {
    setPosition(targets[i]);
    // console.log(targets[i]);
    // targets[i]
    document.getElementById(targets[i].element).addEventListener("click", touchIt);
    
  }
  const scoreElement           = document.getElementById('score');
        scoreElement.innerHTML = 'SCORE: ' + score;
}

function touchIt(){
  console.log('toucher');
  this.classList.remove("target")
  
}

function updatePositions() {
  for (let i = 0; i < targets.length; i++) {
    targets[i].y += getRandom(14) - 6;
    targets[i].x += getRandom(14) - 6;
    // setLimits(targets[i], true);
  }
  
}

function addTarget() {
  let interval = 50;
  if (iterations > 1500) {
    interval = 5;
  } else if (iterations > 1000) {
    interval = 20;
  } else if (iterations > 500) {
    interval = 35;
  }
  
  if (getRandom(interval) == 0) {
    const elementName = 'target' + getRandom(50);
    const target      = createSprite(elementName, getRandom(950), getRandom(950), getRandom(70)+35);
    
    const element           = document.createElement('div');
          element.id        = target.element;
          element.className = 'target';
    document.children[0].appendChild(element);
    
    targets[targets.length] = target;
  }
}

function getRandom(maxSize) {
  return parseInt(Math.random() * maxSize);
}

function loop() {
  if (new Date().getTime() - lastLoop > 40) {
    updatePositions();

    
    addTarget();
    
    showSprites();
    
    lastLoop = new Date().getTime();
    iterations++;
  }
  setTimeout('loop();', 2);
}


// onclick je lance le loop
loop();