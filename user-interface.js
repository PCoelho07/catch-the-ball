
function upateScore(data) {
  const scoreInstance = document.querySelector('.number')
  scoreInstance.textContent = data
}

function updateMissed(data) {
  const missedInstance = document.querySelector('.missed')
  missedInstance.innerHTML = data
}

function updateAverage(data) {
  const average = document.querySelector('.percent')
  average.innerHTML = data
}

function updateAverageMin(data) {
  const average = document.querySelector('.percent-min')
  average.innerHTML = data
}
