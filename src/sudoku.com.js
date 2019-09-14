/* global $ */
const parser = require('./sudoku.com-parser')
const SudokuSolver = require('./sudoku-solver')

const solveButton = $('<button>Solve</button>')
solveButton.css('float', 'right')
solveButton.click(() => {
  const parsed = parser()
  const solver = new SudokuSolver(parsed)
  solver.solve().then((solution) => {
    if (solution) {
      let i = 0
      const cells = $('.game-cell')
      const fill = setInterval(() => {
        cells.get(i).click()

        const currentValue = solution[Math.floor(i / 9)][Math.floor(i % 9)]
        $.event.trigger({ type: 'keydown', which: currentValue.toString().charCodeAt(0) })

        if (++i >= 81) {
          clearInterval(fill)
        }
      }, 1)
    }
  })
})
solveButton.appendTo($('#masthead > .content-wrapper').get(0))
