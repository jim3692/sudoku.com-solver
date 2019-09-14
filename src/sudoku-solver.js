const Board = require('./board')

module.exports = function (table) {
  this.table = table

  const preciseSolve = board => {
    const values = () => new Set([...Array(9)].map((_, index) => index + 1))
    const positionsStructure = values => {
      const struct = {}
      const valuesArr = [...values]
      valuesArr.forEach(value => { struct[value] = new Set([]) })
      return struct
    }

    let changes = 0

    const lookup = group => {
      const missingValues = values()

      // Get missing values
      group.forEach(cell => {
        const cellValue = cell.value
        if (missingValues.has(cellValue)) {
          missingValues.delete(cellValue)
        }
      })

      // Find possible positions
      const positions = positionsStructure(missingValues)
      group.forEach(cell => {
        if (cell.value) {
          return
        }
        const possibilities = [...cell.possibleValues]
        if (possibilities && possibilities.length) {
          possibilities.forEach(value => {
            if (positions[value]) {
              positions[value].add(cell)
            }
          })
        }
      })

      // Look for arrays with 1 cell and change the value of that cell
      for (const value of Object.keys(positions)) {
        if (positions[value].size === 1) {
          const [cell] = [...positions[value]]
          if (!cell.finalValue) {
            cell.value = value
            cell.finalValue = true
            changes++
          }
        }
      }
    }

    for (let i = 0; i < 9; i++) {
      const row = board.getRow(i)
      lookup(row)

      const column = board.getColumn(i)
      lookup(column)

      const square = board.getSquare(i)
      lookup(square)
    }

    return changes > 0
  }

  this.board = new Board(this.table)
  this.solve = () => new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      try {
        if (this.board.zerosLeft) {
          if (!preciseSolve(this.board)) {
            clearInterval(interval)
            resolve()
          }
        } else {
          clearInterval(interval)
          const solution = [...Array(9)].map((_, rowIndex) => this.board.getRow(rowIndex).map(cell => cell.value))
          resolve(solution)
        }
      } catch (err) {
        clearInterval(interval)
        reject(err)
      }
    }, 1)
  })
}
