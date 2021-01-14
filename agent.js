class Agent {
  constructor() {
    this.x = width / 2
    this.y = height - 30
    this.size = 100
    this.dx = 25
  }

  getCoord() {
    return {
      x: this.x,
      y: this.y
    }
  }

  getSize() {
    return this.size
  }

  draw() {
    fill(255)
    rect(this.x, this.y, this.size, 30)
  }

  hitTheBall(ball) {
    if (ball.doesHitAgent()) {
      return false
    }

    if ((ball.getX() - 22.5 > (this.x + this.size)) || ((ball.getX() + 22.5) < this.x)) {
      return false
    }

    if (Math.floor((this.y - ball.getY())) <= ball.diameter()) {
      ball.sethitAgent()
      stroke(255, 204, 0);
      return true
    }

    return false
  }

  moveRight(dx = null) {
    if (dx === null) {
      dx = this.dx
    }

    if ((this.x + this.size + dx) < width) {
      this.x += dx
      return
    }
    this.x = width - this.size
  }

  moveLeft(dx = null) {
    if (dx === null) {
      dx = this.dx
    }

    if ((this.x - dx) > 0) {
      this.x -= dx
      return
    }
    this.x = 0
  }
}
