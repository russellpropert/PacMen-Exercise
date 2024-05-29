let pos = 0;
const pacArray = [
  ['./images/pacman1.png', './images/pacman2.png'],
  ['./images/pacman3.png', './images/pacman4.png'],
];
let direction = 0;
let mouth = 0;
let distance = 0;
const pacmen = []; // This array holds all the pacmen

function setRandomVelocity(scale) {
  return {
    x: Math.round(Math.random() * 9 + 1),
    y: Math.round(Math.random() * 9 + 1),
  };
}

function setRandomPosition() {
  return {
    x: Math.ceil(Math.random() * (window.innerWidth - 100)),
    y: Math.ceil(Math.random() * (window.innerHeight - 193)) + 93,
  };
}

// Makes a PacMan at a random position with random velocity
function makePacMan() {
  let velocity = setRandomVelocity();
  let position = setRandomPosition();

  // Adds image to div id = field
  let field = document.getElementById('field');
  let newimg = document.createElement('img');
  newimg.style.position = 'absolute';
  newimg.src = pacArray[direction][mouth];
  newimg.width = 100;
  newimg.height = 100;
  newimg.style.zIndex = 1;

  // Sets position
  newimg.style.top = position.y;
  newimg.style.left = position.x;

  // Adds a new Child image to field
  field.appendChild(newimg);

  let distancePerInterval = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);

  // Returns details in an object
  return {
    position,
    velocity,
    newimg,
    direction,
    distance,
    distancePerInterval,
    mouth
  };
}

function update() {
  // Loops over field array and moves each one and moves image in DOM
  pacmen.forEach((item) => {
    checkBorderCollisions(item);
    item.position.x += item.velocity.x;
    item.position.y += item.velocity.y;
    item.distance += item.distancePerInterval;

    item.newimg.style.left = item.position.x;
    item.newimg.style.top = item.position.y;

    if (item.distance >= 50) {
      item.mouth = (item.mouth + 1) % 2;
      item.distance = 0;
    }

    item.newimg.src = pacArray[item.direction][item.mouth];

  });
  setTimeout(update, 20);
}

function checkBorderCollisions(item) {
  // Detects collision with all walls and makes pacman bounce
  if (item.position.x + 100 >= window.innerWidth && item.velocity.x > 0 || item.position.x <= 0 && item.velocity.x < 0) {
    item.velocity.x = item.velocity.x * -1;
    item.direction = (item.direction + 1) % 2
  }
  if (item.position.y + 100 >= window.innerHeight && item.velocity.y > 0 || item.position.y <= 94 && item.velocity.y < 0) {
    item.velocity.y = item.velocity.y * -1;
  }

}

function makeOne() {
  pacmen.push(makePacMan()); // Adds a new PacMan
}