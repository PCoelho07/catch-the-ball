class Ball {
  constructor(x = 0, y = 0, floor = 0) {
    this.x = x;
    this.y = y;
    this.size = 20;
    this.floor = floor
    this.hitAgent = false
  }

  fall() {
    if (this.y < this.floor) {
      this.y += 25
    }
  }

  hitTheFloor() {
    if (this.y >= this.floor) {
      return true
    }

    return false
  }

  draw() {
    fill(51);
    circle(this.x, this.y, this.size);
  }

  getY() {
    return this.y
  }

  getX() {
    return this.x
  }

  getCoord() {
    return {
      x: Math.floor(this.x),
      y: Math.floor(this.y)
    }
  }

  diameter() {
    return this.size
  }

  radius() {
    return Math.floor(this.size / 2)
  }

  sethitAgent() {
    this.hitAgent = true
  }

  doesHitAgent() {
    stroke('#222222');
    strokeWeight(4);
    return this.hitAgent
  }

}
