
var game = null

function setup() {
  createCanvas(600, 423)
  background(153);

  game = new Game()
}

function draw() {
  background(153);
  game.generateBalls(1)
  game.draw()
  game.movements()
}


function dist(x, y, destX, destY) {
  const a = x - destX
  const b = y - destY

  return Math.sqrt(a * a + b * b)
}
