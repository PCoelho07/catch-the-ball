
class Game extends Observable {
  constructor() {
    super()
    this.balls = []
    this.agent = new Agent()
    this.brain = new Brain()
    this.giveMore = true
    this.score = 0
    this.missed = 0
    this.i = 0
    this.gaveScore = false
    this.minAverage = 10000

    this.newState = true
    this.stateBuffer = ''

    this.setObservers()
  }

  setObservers() {
    this.subscribe('score', upateScore)
    this.subscribe('missed', updateMissed)
    this.subscribe('average', updateAverage)
    this.subscribe('averageMin', updateAverageMin)
  }

  generateBalls(qtt = 0) {
    if (!qtt) {
      return
    }

    if (!this.giveMore) {
      return
    }

    let x = 0
    let y = 0

    for (let i = 0; i < qtt; i++) {
      x = Math.random() * ((width - 55) - (0)) + (0) + 55;
      y = Math.random() * (0 - (-40)) + (-40) + 55;
      this.balls.push(new Ball(x, y, height))
    }

    this.giveMore = false
  }

  drawBalls() {
    let average = 0
    for (let i = 0; i < this.balls.length; i++) {
      this.balls[i].fall()
      this.balls[i].draw()

      if (this.agent.hitTheBall(this.balls[i])) {
        this.score++
        this.notify('score', this.score)
        this.balls[i].sethitAgent()
      }

      if (this.balls[i].hitTheFloor() && !this.balls[i].doesHitAgent()) {
        this.missed++
        this.notify('missed', this.missed)
      }

    }

    average = (this.score !== 0) ? ((this.missed / (this.score + this.missed)) * 100) : 100
    if (average < this.minAverage) {
      this.minAverage = average
      this.notify('averageMin', this.minAverage)
    }

    this.notify('average', average.toFixed(1))

    if (this.balls[this.balls.length - 1].hitTheFloor()) {
      this.giveMore = true
      this.balls.pop()
    }
  }

  draw() {
    this.i++

    const currentState = this.brain.whichStateNow(this.agent, this.balls[0])

    console.log("estado:", currentState)

    this.drawBalls()
    this.stateBuffer = currentState

    const bestAction = this.brain.getBestAction(currentState)
    this.brain.fireAction(bestAction, this.agent)
    const nextState = this.brain.whichNextState(currentState, bestAction)

    console.log('action:', bestAction)
    console.log('proximo estado:', nextState)

    this.brain.updateQTable(currentState, nextState, bestAction)

    console.log('matrix', this.brain.qmatrix[currentState])

    this.agent.draw()

  }

  movements() {
    if (keyIsDown(LEFT_ARROW)) {
      this.agent.moveLeft()
    }

    if (keyIsDown(RIGHT_ARROW)) {
      this.agent.moveRight()
    }
  }

  getAgent() {
    return this.agent
  }

  getScore() {
    return this.score
  }
}
