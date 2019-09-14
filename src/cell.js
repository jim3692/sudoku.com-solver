module.exports = class {
  constructor (board, rowIndex, columnIndex, onCellUpdated) {
    this.rowIndex = rowIndex
    this.columnIndex = columnIndex

    this._board = board
    this._value = board.getDefaultCell(rowIndex, columnIndex)
    this._possibleValues = this.calculatePossibleValues()

    this._onCellUpdated = onCellUpdated || (() => {})

    this.isDefault = this._value > 0
    this.finalValue = this._value > 0

    this.updatePossibleValues = this.updatePossibleValues.bind(this)
  }

  get value () {
    return parseInt(this._value)
  }

  set value (newValue) {
    if (!this.finalValue) {
      const oldValue = this._value
      this._value = parseInt(newValue)
      this._onCellUpdated(newValue, oldValue)
      this.updatePossibleValues()
    }
  }

  get possibleValues () {
    return this._possibleValues
  }

  updatePossibleValues (removed) {
    if (removed) {
      if (this._possibleValues) {
        this._possibleValues.delete(removed)
        if (!this._value && this._possibleValues.size === 1) {
          this.value = [...this._possibleValues][0]
          this.finalValue = true
        }
      }
    } else {
      this._possibleValues.delete(this.value)

      this._board.getColumn(this.columnIndex).forEach(cell => cell.updatePossibleValues(this.value))
      this._board.getRow(this.rowIndex).forEach(cell => cell.updatePossibleValues(this.value))
      this._board.flatSquareFromCell(this.rowIndex, this.columnIndex).forEach(cell => cell.updatePossibleValues(this.value))
    }
  }

  calculatePossibleValues () {
    if (!this._value) {
      const values = new Set([...Array(9)].map((_, index) => index + 1))

      const check = group => group.forEach(cell => {
        if (values.has(cell)) {
          values.delete(cell)
        }
      })

      check([this._value])
      check(this._board.getRow(this.rowIndex, true))
      check(this._board.getColumn(this.columnIndex, true))
      check(this._board.flatSquareFromCell(this.rowIndex, this.columnIndex, true))

      return values
    }
  }
}
