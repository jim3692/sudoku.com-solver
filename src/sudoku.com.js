/* global $, gameScene */
const SudokuSolver = require('./sudoku-solver')

const solveButton = $('<button>Solve</button>')
solveButton.css('float', 'right')
solveButton.click(() => {
  const board = gameScene.cellsGroup.children.entries
    .map(e => e.dataValue._text)
    .map(v => parseInt(v || 0))
    .map((_, i, cells) => cells.slice(i * 9, (i + 1) * 9))

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
          await asyncTask(() => $.event.trigger({ type: 'keydown', which: val.toString().charCodeAt(0) }))
        }

        if (++i >= 81) {
          clearInterval(fill)
        }
      }, 1)
    })
})
solveButton.prependTo($('#masthead .new-game-button-wrapper').get(0))
