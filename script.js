let lastLoop   = 0;
let score      = 0;
let iterations = 0;

const targets = new Array();

function createSprite(element, x, y, w, h) {
  const result         = new Object();
        result.element = element;
        result.x       = x;
        result.y       = y;
        result.w       = w;
        result.h       = h;
        
  return result;
}


function setPosition(sprite) {
  const e            = document.getElementById(sprite.element);
        e.style.left = sprite.x + 'px';
        e.style.top  = sprite.y + 'px';
}



// function gameOver() {
  
//   element.style.visibility = 'hidden';
//   element = document.getElementById('gameover');
//   element.style.visibility = 'visible';
// }

function showSprites() {

  for (let i = 0; i < targets.length; i++) {
    setPosition(targets[i]);
  }
  const scoreElement           = document.getElementById('score');
        scoreElement.innerHTML = 'SCORE: ' + score;
}

function updatePositions() {
  for (let i = 0; i < targets.length; i++) {
    targets[i].y += 4;
    targets[i].x += getRandom(14) - 3;
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
    const elementName = 'target' + getRandom(10000000);
    const target      = createSprite(elementName, getRandom(950), -40, 35, 35);
    
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