let lastLoop   = 0;
let score      = 0;
let iterations = 0;
let counter    = 90;
let timeOut    = Boolean(false);

const targets = new Array();
const start   = document.getElementById('play');
const timeElt = document.getElementById('timer');



// add click event to start time out
start.addEventListener( 'click', function() {        
  start.classList.add("hide");

  console.log(timeOut);

      let timer = setInterval(function(){
        
        timeElt.innerHTML = counter;
        counter --;
        if(counter === 0) {
          timeElt.innerHTML = "Time Over";
          clearInterval(timer);
          timeOut = true
          console.log(timeOut);
        }
      }, 1000)
      loop();
  }
);

// create a sprite object with x y and's
function createSprite(element, x, y, s) {
  const result         = new Object();
        result.element = element;
        result.x       = x;
        result.y       = y;
        result.s       = s;
        
  return result;
}


// set the position of the specified sprite
function setPosition(sprite) {
  const e = document.getElementById(sprite.element);
  if(e) {
        e.style.left   = sprite.x + 'px';
        e.style.top    = sprite.y + 'px';
        e.style.width  = sprite.s + 'px';
        e.style.height = e.style.width;
        e.addEventListener("click", touchIt);
  }
        
}

// show all sprites on the page
function showSprites() {

  // set the position of all the targets
  for (const valeur of targets) {
    setPosition(valeur);
  }
  const scoreElement           = document.getElementById('score');
        scoreElement.innerHTML = 'SCORE: ' + score;
}

// touch it function
function touchIt(){
  console.log('toucher');
  // this.classList.remove("target")
  this.remove();

  score += 1;
}

// update the positions of all the targets
function updatePositions() {

  // move all the targets randomly
  for (const valeur of targets) {
    valeur.y += getRandom(14) - 6;
    valeur.x += getRandom(14) - 6;
  }
  
}

// add a target element to the page
function addTarget() {
  let interval = 50;
  if (iterations > 1500) {
    interval = 5;
  } else if (iterations > 1000) {
    interval = 20;
  } else if (iterations > 500) {
    interval = 35;
  }
  
  // create a random sprite if not already done
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

// loop until time out is true
function loop() {

  if(timeOut === false) {
  if (new Date().getTime() - lastLoop > 40) {
    updatePositions();

    addTarget();
    
    showSprites();
    
    lastLoop = new Date().getTime();
    iterations++;
  }
  }
  setTimeout('loop();', 2);
}


