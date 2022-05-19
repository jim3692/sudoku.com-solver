/* global gameScene */
const SudokuSolver = require('./sudoku-solver')

const canvas = document.querySelector('#game canvas')

const solveButton = document.createElement('button')
solveButton.innerHTML = 'Solve'
solveButton.style.float = 'right'

solveButton.addEventListener('click', () => {
  const board = gameScene.cellsGroup.children.entries
    .map(e => e.dataValue)
    .map(v => parseInt(v || 0))
    .map((_, i, cells) => cells.slice(i * 9, (i + 1) * 9))
    .slice(0, 9)

  const solver = new SudokuSolver(board)
  solver.solve()
    .then(({ possibleValues, solution }) => {
      let i = 0
      let busy = false

      const asyncTask = async cb => {
        busy = true
        await new Promise(resolve => {
          cb()
          setTimeout(() => resolve(), 1)
        })
        busy = false
      }

      const fill = setInterval(async () => {
        if (busy) {
          return
        }

        gameScene.setActiveCell(i)

        if (!possibleValues) {
          const val = solution[Math.floor(i / 9)][Math.floor(i % 9)]
          await asyncTask(() => canvas.dispatchEvent(
            new window.KeyboardEvent(
              'keydown',
              { keyCode: val.toString().charCodeAt(0), bubbles: true }
            )))
        }

        if (++i >= 81) {
          clearInterval(fill)
        }
      }, 1)
    })
})

document.querySelector('#masthead > .content-wrapper')
  .appendChild(solveButton)
