
class Brain extends Observable {
  constructor() {
    super()
    this.qmatrix = {}
    this.rmatrix = {}
    this.learningRate = 0.75
    this.randomize = 0.2
    this.discountFactor = 0.8
    this.avaliableActions = []

    this.initializeActions()
  }

  initializeActions() {
    let i = 0;
    while (i < width) this.avaliableActions.push(`left_${i++}`)
    i = 0
    while (i < width) this.avaliableActions.push(`right_${i++}`)

    this.avaliableActions.push('stay')
  }

  whichStateNow(agent, ball) {
    const agentCoord = agent.getCoord()
    const ballCoord = ball.getCoord()
    if (ball.hitTheFloor()) {
      return 'death'
    }

    if (((ballCoord.x - ball.radius()) < (agentCoord.x + agent.getSize()))
      && (ballCoord.x + ball.radius()) > agentCoord.x) {
      return 'catch'
    }

    let distanceLeft = Math.floor(agentCoord.x - (ballCoord.x + ball.radius()))
    let distanceRight = Math.floor((ballCoord.x - ball.radius()) - (agentCoord.x + agent.getSize()))
    /* console.log(distanceLeft)
    console.log(distanceRight) */

    const state = {
      side: (distanceLeft < distanceRight) ? 'right' : 'left',
      value: (distanceLeft < distanceRight) ? distanceRight : distanceLeft,
    }

    return `${state.side}_${state.value}`
  }

  whichNextState(currentState, action) {

    const actionSide = action.split('_')[0]
    const actionValue = parseInt(action.split('_')[1])

    const stateSide = currentState.split('_')[0]
    const stateValue = parseInt(currentState.split('_')[1])

    let nextValue = stateValue
    let nextSide = stateSide

    if (stateSide === 'catch') {
      nextSide = actionSide === 'right' ? 'left' : 'right'
      nextValue = actionValue
      return `${nextSide}_${nextValue}`
    }

    if (actionSide === 'right') {
      if (stateSide === 'left') {
        nextValue += actionValue
      }

      if (stateSide === 'right') {
        nextValue -= actionValue
        if (nextValue < 0) {
          nextValue *= -1
          if (nextValue <= 100) { // is a agent size
            return 'catch'
          }
          nextSide = 'left'
        }
      }
    }


    if (actionSide === 'left') {
      if (stateSide === 'right') {
        nextValue += actionValue
      }

      if (stateSide === 'left') {
        nextValue -= actionValue
        if (nextValue < 0) {
          nextValue *= -1
          if (nextValue <= 100) { // is a agent size
            return 'catch'
          }
          nextSide = 'right'
        }
      }
    }

    return `${nextSide}_${nextValue}`
  }

  updateQTable(currentState, nextState, action) {

    if (!this.qmatrix[currentState]) {
      this.qmatrix[currentState] = {
        [action]: 0
      }
    }

    let q = parseInt(this.qmatrix[currentState][action] || 0)
    q += this.learningRate * (this.getRew(nextState, action) + this.discountFactor * this.getMaxQActionByState(nextState).max) - q
    this.qmatrix[currentState] = {
      ...this.qmatrix[currentState],
      [action]: q
    }

    console.log('qualidade da ação: ', q)
  }

  getMaxQActionByState(state) {
    if (this.qmatrix.length <= 0) {
      return {
        max: 0,
      }
    }

    if (!this.qmatrix[state]) {
      return {
        max: 0
      }
    }

    let max = -1000
    let action = ''
    Object.keys(this.qmatrix[state]).forEach(item => {
      if (this.qmatrix[state][item] > max) {
        max = this.qmatrix[state][item]
        action = item
      }
    })

    return {
      max,
      action
    }
  }

  getRew(state, action) {

    if (state === 'catch') {
      return 1
    }

    return -10

    /* if (state === 'catch') {
      if (action !== 'stay') {
        return -1
      }
    }

    const actionSide = action.split('_')[0]
    const actionValue = parseInt(action.split('_')[1])

    const stateSide = state.split('_')[0]
    const stateValue = parseInt(state.split('_')[1])
    let delta = (actionValue - stateValue)

    if (delta < 0) {
      delta *= -1
    }

    if (stateSide !== actionSide) {
      return -1
    }

    if (actionSide === 'left') {
      if (actionValue > stateValue) {
        if (delta < 100) {
          return 100
        }
      }
      return -50
    }

    if (actionSide === 'right') {
      if (actionValue < stateValue) {
        if (delta < 100) {
          return 100
        }
      }
      return -50
    }

    if (actionValue !== stateValue) {
      return -50
    }

    return 100 */
  }

  getBestAction(state = null) {

    const randomAction = this.avaliableActions[Math.floor(Math.random() * (this.avaliableActions.length))]
    const maxAction = this.getMaxQActionByState(state)

    if (Math.random() < this.randomize) {
      let random = Math.floor(Math.random() * this.avaliableActions.length);
      return this.avaliableActions[random];
    }

    if (!this.qmatrix[state]) {
      return randomAction
    }

    if (state !== null) {
      return maxAction.action
    }

    return randomAction
  }

  fireAction(action, agent) {

    if (action === 'stay') {
      return
    }

    let actionSide = action.split('_')[0]
    let actionValue = action.split('_')[1]

    if (actionSide === 'right') {
      agent.moveRight(parseInt(actionValue))
    }

    if (actionSide === 'left') {
      agent.moveLeft(parseInt(actionValue))
    }
  }
}
