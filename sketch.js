let pies = [];
let plate;
let logo;

let pi;
let sky;
let piShow = '';
let shareButtons = [];
let platforms = ['Twitter', 'Facebook', 'WhatsApp', 'Telegram'];

let digitsDiv;
let digits = '3.';
let piCounter = 0;

let gameOver = false;
let start;

function preload() {
  pi = loadStrings('one-million.txt');
  sky = loadImage('Sky.png');
  logo = loadImage('Pi-in-the-sky-Logo.png');
  Plate.loadImage();
  Pie.loadImages();
}

function setup() {
  pi = pi.join('');
  createCanvas(windowWidth, windowHeight);
  plate = new Plate(width / 2, 50);
  piShow = pi.substring(0, 2);
  start = true;
  let col = color(25, 23, 200, 50);
  platform = 0;
  for (let i = 0; i < 4; i++) {
    button = createButton(platforms[i]);
    button.style('background-color', col);
    button.size(width / 8, height / 16);
    button.position(width / 2 + (3 * width) / 16 - (2.5 * i * width) / 16, (23 * height) / 32);
    button.style('border-radius:10px');
    button.style('font-size : 20px');
    button.mousePressed(copyScore(i));
    button.hide();
    shareButtons.push(button);
  }
}

function draw() {
  background(sky);
  if (gameOver) {
    push();
    imageMode(CENTER);
    let scale = min(width, height);
    image(logo, width / 2, height / 5, scale / 2, scale / 4);
    fill(112, 50, 126);
    textAlign(CENTER, BOTTOM);
    text(
      'Game Over.\nGo and Enjoy Some Delicious 🥧!\nYour Final PI:\n' +
        digits +
        '\n Share with your friends:',
      width / 2,
      (2 * height) / 3
    );

    textSize(28);
    for (let button of shareButtons) {
      button.show();
    }
    text('Press p to play again.', width / 2, (5 * height) / 6);
    pop();
    return;
  }
  if (start) {
    push();
    textSize(48);
    imageMode(CENTER);
    let scale = min(width, height);
    image(logo, width / 2, height / 5, scale / 2, scale / 4);
    fill(112, 50, 126);
    textAlign(CENTER, BOTTOM);
    text('Welcome to PI in the sky!\nCatch the digits of PI on your plate!', width / 2, height / 2);
    textSize(28);
    text('Press p to play!', width / 2, (5 * height) / 6);
    pop();
    return;
  }

  fill(255);
  textSize(48);
  text(piShow, width - 64, 50);
  fill(0, 255, 0);
  text(piShow.charAt(0), width - 64, 50);
  fill(0, 0, 255);
  textSize(48);
  let overflow = digits.length > 10;
  text('🥧:' + (overflow ? '...' : '') + digits.slice(-10), 18, 50);

  if (random(1) < 0.1) {
    pies.push(new Pie(random(width), random(-100, -20)));
  }

  for (let pie of pies) {
    pie.show();
    pie.update();
  }

  for (let i = pies.length - 1; i >= 0; i--) {
    if (plate.catches(pies[i])) {
      // catch the pie
      // Check what digit was caught and deal with score!
      let digit = pies[i].digit;

      let correctDigit = pi.charAt(piCounter);
      if (correctDigit == digit) {
        console.log('🥧');
        digits += digit;
        piCounter++;
        piShow = pi.substring(piCounter, piCounter + 2);
      } else {
        gameOver = true;
        // console.log("🚂");
      }

      pies.splice(i, 1);
    } else if (pies[i].y > height + pies[i].r) {
      // eat the pie?
      pies.splice(i, 1);
    }
  }

  plate.x = mouseX;
  plate.show();
}

function keyPressed() {
  if (keyCode == '80' && (gameOver || start)) {
    digits = '3.';
    plate = new Plate(width / 2, 50);
    piShow = pi.substring(0, 2);
    piCounter = 0;
    pies = [];
    start = false;
    gameOver = false;
    for (let button of shareButtons) {
      button.hide();
    }
  }
}

function copyScore(index) {
  return function () {
    let scoreString = encodeURIComponent(
      'I got a score of: ' + digits + ' in PI in the Sky! Try it yourself now!'
    );
    let urlString = encodeURIComponent('https://thecodingtrain.com/pi2022');

    let twitter = 'https://twitter.com/intent/tweet?text=' + scoreString + '&url=' + urlString;
    let facebook =
      'https://www.facebook.com/sharer/sharer.php?u=' + urlString + '&quote=' + scoreString;
    let whatsApp = 'https://wa.me/?text=' + scoreString + ' ' + urlString;
    let telegram = 'https://t.me/share/url?url=' + urlString + '&text=' + scoreString;
    let links = [twitter, facebook, whatsApp, telegram];
    window.open(links[index]);
  };
}
