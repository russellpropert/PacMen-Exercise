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
  let pacmanImage = document.createElement('img');
  pacmanImage.style.position = 'absolute';
  pacmanImage.src = pacArray[direction][mouth];
  pacmanImage.width = 100;
  pacmanImage.height = 100;
  pacmanImage.style.zIndex = 1;

  // Sets position
  pacmanImage.style.top = position.y;
  pacmanImage.style.left = position.x;

  // Adds a new Child image to field
  field.appendChild(pacmanImage);

  let distancePerInterval = Math.sqrt(velocity.x ** 2 + velocity.y ** 2);

  // Returns details in an object
  return {
    position,
    velocity,
    pacmanImage,
    direction,
    distance,
    distancePerInterval,
    mouth
  };
}

function update() {
  // Loops over field array and moves each one and moves image in DOM
  pacmen.forEach((pacman) => {
    checkBorderCollisions(pacman);
    pacman.position.x += pacman.velocity.x;
    pacman.position.y += pacman.velocity.y;
    pacman.distance += pacman.distancePerInterval;

    pacman.pacmanImage.style.left = pacman.position.x;
    pacman.pacmanImage.style.top = pacman.position.y;

    if (pacman.distance >= 50) {
      pacman.mouth = (pacman.mouth + 1) % 2;
      pacman.distance = 0;
    }

    pacman.pacmanImage.src = pacArray[pacman.direction][pacman.mouth];

  });
  setTimeout(update, 20);
}

function checkBorderCollisions(pacman) {
  // Detects collision with all walls and makes pacman bounce
  if (pacman.position.x + 100 >= window.innerWidth && pacman.velocity.x > 0 || pacman.position.x <= 0 && pacman.velocity.x < 0) {
    pacman.velocity.x = pacman.velocity.x * -1;
    pacman.direction = (pacman.direction + 1) % 2
  }
  if (pacman.position.y + 100 >= window.innerHeight && pacman.velocity.y > 0 || pacman.position.y <= 94 && pacman.velocity.y < 0) {
    pacman.velocity.y = pacman.velocity.y * -1;
  }

}

function makeOne() {
  pacmen.push(makePacMan()); // Adds a new PacMan
}