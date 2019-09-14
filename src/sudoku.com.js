/* global $ */
const parser = require('./sudoku.com-parser')
const SudokuSolver = require('./sudoku-solver')

const solveButton = $('<button>Solve</button>')
solveButton.css('float', 'right')
solveButton.click(() => {
  const parsed = parser()
  const solver = new SudokuSolver(parsed)
  solver.solve()
    .then(({ possibleValues, solution }) => {
      let i = 0
      let busy = false
      const notes = $('.game-controls-item.game-controls-pencil').first()
      const sudokuWrapper = $('#sudoku-wrapper')
      const notesActive = () => sudokuWrapper.hasClass('pencil-mode')

      const asyncTask = async cb => {
        busy = true
        await new Promise(resolve => {
          cb()
          setTimeout(() => resolve(), 1)
        })
        busy = false
      }

      const cells = $('.game-cell')
      const fill = setInterval(async () => {
        if (busy) {
          return
        }

        cells.get(i).click()

        if (possibleValues) {
          const currentValues = possibleValues[Math.floor(i / 9)][Math.floor(i % 9)]

          if (currentValues.length > 0) {
            if (!notesActive()) {
              await asyncTask(() => notes.click())
            }

            for (const val of currentValues) {
              await asyncTask(() => $.event.trigger({ type: 'keydown', which: val.toString().charCodeAt(0) }))
            }
          }
        } else {
          if (notesActive()) {
            await asyncTask(() => notes.click())
          }

          const val = solution[Math.floor(i / 9)][Math.floor(i % 9)]
          await asyncTask(() => $.event.trigger({ type: 'keydown', which: val.toString().charCodeAt(0) }))
        }

        if (++i >= 81) {
          clearInterval(fill)
        }
      }, 1)
    })
})
solveButton.appendTo($('#masthead > .content-wrapper').get(0))
