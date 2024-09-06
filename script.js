
function hanoi(number) {

  if (!number) {
    return;
  }
  fetch('http://10.172.1.109:7070/tower/brunch', {

    method: 'POST',

    headers: {

      'Content-Type': 'application/json',

    },

    body: JSON.stringify({

      n: number,

    })

  })

    .then(res => res.json())

    .then(async data => {
      playing = true;



      console.log(data.steps);


      for (let i = 0; i < (data.steps.length); i++) {
        console.log(data.steps.length);
        let elt = data.steps[i];
        console.log(elt)
        let from = elt.from
        let to = elt.to;
        if (!playing) {
          return;
        }
        if (from === 'A') {
          tour1.click();
        }

        if (from === 'C') {
          tour2.click();
        }


        if (from === 'B') {
          tour3.click();
        }
        await delay(800)
        if (playing) {

          if (to === 'A') {
            tour1.click();
          }
  
          if (to === 'C') {
            tour2.click();
  
          }
  
  
          if (to === 'B') {
            tour3.click();
          }
        }

      }
    })

    .catch(error => {




      console.log(error)

    })

}

let element;
let tour1 = document.getElementById('a');
let tour2 = document.getElementById('c');
let tour3 = document.getElementById('b');

let steps = []
let playing = false;
let demoPlaying = false;
const colors = ['brown', 'skyblue', 'violet', 'grey', 'orange'];
function main() {
  let number = parseInt(document.getElementById("number").value);
  if (!number || number < 3) {
    alert('The number of disk should be between 3 and 6');
    return;
  }
  reset();
  $('.disc').remove();
  

  

  if (number > 6) {
    alert('The number of disk should be between 3 and 6');
    return;
  }


  console.log(number)


  


  let width = 12 + ((number - 1) * 2);
  let old = colors[0];

  for (let i = 0; i < number;
    i++) {


    let disc = document.createElement("div");

    disc.className = 'disc';

    disc.id = i;

    console.log('log', Math.random(0, colors.length));

    let color = colors[i];

    if (i >= colors.length) {

      color = randomColor(old, 3);

      old = color

    }

    disc.style.backgroundColor = color;

    disc.style.width = width + 'vmin';

    width = width - 2;
    tour1.appendChild(disc);

  }
  document.getElementById('minMovesValue').textContent = `${2 ** number - 1}`
  initListeners();
}

function randomColor(color, retry) {

  let c = colors[Math.floor(Math.random()
    * colors.length)];

  if (c === color && retry > 0) {
    return randomColor(color, retry - 1);
  }

  return c;

}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function simuler() {
  // if (demoPlaying) {
  //   console.log("Simulation already running.");
  //   return;
  // }

  // demoPlaying = true;
  main()
  let number = document.getElementById("number");
  nb = number.value;
  await delay(1000)

  hanoi(number.value);

}




function initListeners() {

  var targets = document.querySelectorAll('.towerr');

  console.log('----', targets);

  for (let i = 0; i < targets.length; i++) {

    let target = targets[i];


    target.addEventListener('click', moveDisk);


  }

}
var startTime;
var endTime;
var firstClick = true;



let clickCount = 0;
var timerVar = null;
function moveDisk(event) {
  console.log('moveDisk::')
  if (firstClick === true) {
    firstClick = false;
    startTime = new Date().getTime();
    timerVar = setInterval(countTimer, 1000);
  }


  if (!element && this.childElementCount === 0) {

    return;
  }

  if (!element) {
    element = this.lastChild;
    addAnimation();
    // // element.animate([
    // //   { transform: 'translateY(0)' },
    // //   { transform: 'translateY(-30vmin)' }

    // // ], {
    // //   duration: 1000,
    // //   easing: 'ease',

    // // });
    //  clickCount++;
    //  document.getElementById("click").innerText = `  ${clickCount}`;
    return;

  }
  if (element === this.lastChild) {
    removeAnimation();
    element.style.top = '0vmin';
    element = null;

    return
  }
  if (!element) {

    element = this.lastChild;
    element = null;
    return;
  }
  if (this.lastChild && element.offsetWidth > this.lastChild.offsetWidth) {
    return;
  }
  removeAnimation();
  this.appendChild(element);
  countMoves();
  element = null;

  let number = document.getElementById("number");

  let count = parseInt(tour3.childElementCount);
  console.log("p" + count, ' tour count', tour3.childElementCount, number.value);
  // let totalDiscs = parseInt(number.value);
  end = Date.now() + (1 * 1000);
  if (count == (number.value)) {
    console.log(count);

    clearInterval(timerVar);

    initConfetti();

tour1.removeEventListener('click', moveDisk);
tour2.removeEventListener('click', moveDisk);
tour3.removeEventListener('click', moveDisk);


  }

}

function addAnimation() {
  if (element) {
    element.classList.add('animate');
  }
}
function removeAnimation() {
  if (element) {
    element.classList.remove('animate');
  }
}
function countMoves() {
  clickCount++;
  document.getElementById("click").innerText = `  ${clickCount}`;
}


var totalSeconds = 0;
function countTimer() {
  ++totalSeconds;

  var hour = Math.floor(totalSeconds / 3600);
  var minute = Math.floor((totalSeconds - hour * 3600) / 60);
  var seconds = totalSeconds - (hour * 3600 + minute * 60);
  if (hour < 10)
    hour = "0" + hour;
  if (minute < 10)
    minute = "0" + minute;
  if (seconds < 10)
    seconds = "0" + seconds;

  document.getElementById("chrono").innerHTML = hour + ":" + minute + ":" + seconds;


}
function effacer() {
  console.log('hhhhhhh');
  main();
}
function reset() {
  clearInterval(timerVar);
  document.getElementById("chrono").innerHTML = "00:" + "00:" + "00";
  document.getElementById("click").innerHTML = "0";
  totalSeconds = 0;
  clickCount=0;
  firstClick = true;
  playing = false;
  element= null;
  // demoPlaying = false;
}


var end;
function initConfetti() {

  // go Buckeyes!
  var colors = ['#bb0000', '#ffffff', '#bb0000', '#ffffff', '#bb0000'];


  confetti({
    particleCount: 5,
    angle: 60,
    spread: 55,
    origin: { x: 0 },
    colors: colors
  });
  confetti({
    particleCount: 5,
    angle: 120,
    spread: 55,
    origin: { x: 1 },
    colors: colors
  });

  if (Date.now() < end) {
    requestAnimationFrame(initConfetti);
  }
};


function clearAll() {
  $('.disc').remove();
  reset();
  document.getElementById('minMovesValue').textContent = `0`
}


