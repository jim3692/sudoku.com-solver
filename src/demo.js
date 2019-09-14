/* global alert, Vue */
window.onload = () => {
  const SudokuSolver = require('./sudoku-solver')

  const table = [[0, 7, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 8, 0, 0], [2, 0, 6, 0, 9, 1, 4, 0, 0], [0, 0, 0, 9, 0, 0, 0, 6, 0], [0, 1, 5, 0, 0, 7, 0, 4, 0], [0, 8, 0, 0, 5, 0, 0, 9, 0], [0, 3, 0, 4, 0, 0, 0, 0, 0], [0, 0, 8, 0, 6, 0, 7, 0, 0], [7, 0, 0, 0, 3, 0, 0, 1, 9]]
  const solver = new SudokuSolver(table)

  // eslint-disable-next-line
  new Vue({
    el: '#app',
    data: {
      rows: [...Array(9)].map((_, rowIndex) => solver.board.getRow(rowIndex))
    },
    methods: {
      changeValue (cell) {
        if (cell.isDefault || cell.finalValue) {
          return
        }

        cell.value++
        if (cell.value > 9) {
          cell.value = 0
        }
      },
      printPossibleValues (cell) {
        console.log(cell.possibleValues)
      }
    },
    computed: {
      cellValue: () => cell => {
        return cell.value || ''
      }
    },
    mounted () {
      solver.solve().then(solution => solution && alert('Solved!'))
    }
  })
}
