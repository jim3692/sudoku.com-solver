const Cell = require('./cell')

module.exports = class {
    constructor(table) {
        this._table = table
        this._board = [...Array(9)].map((_, rowIndex) => {
            return [...Array(9)].map((_, columnIndex) => {
                const onCellUpdated = (newValue, oldValue) => {
                    if (newValue && !oldValue) {
                        this._zerosLeft--
                    } else if (!newValue && oldValue) {
                        this._zerosLeft++
                    }
                }

                const cell = new Cell(this, rowIndex, columnIndex, onCellUpdated)

                return cell
            })
        })

        this.getDefaultCell = this.getDefaultCell.bind(this)
        this.getRow = this.getRow.bind(this)
        this.getColumn = this.getColumn.bind(this)
        this.getSquare = this.getSquare.bind(this)
        this.countZeros = this.countZeros.bind(this)

        this._zerosLeft = 0
        this.countZeros()
    }

    get zerosLeft() {
        return this._zerosLeft
    }

    getDefaultCell(rowIndex, columnIndex) {
        return this._table[rowIndex][columnIndex]
    }

    getRow(rowIndex, fromTable = false) {
        const row = [...Array(9)].map((_, columnIndex) => {
            if (fromTable) {
                return this._table[rowIndex][columnIndex]
            } else {
                return this._board[rowIndex][columnIndex]
            }
        })
        return row
    }

    getColumn(columnIndex, fromTable = false) {
        const column = [...Array(9)].map((_, rowIndex) => {
            if (fromTable) {
                return this._table[rowIndex][columnIndex]
            } else {
                return this._board[rowIndex][columnIndex]
            }
        })
        return column
    }

    getSquare(squareIndex, fromTable = false) {
        const squareY = Math.floor(squareIndex / 3)
        const squareX = Math.floor(squareIndex % 3)
        
        return this.flatSquare(squareY, squareX, fromTable)
    }

    flatSquareFromCell(row, column, fromTable = false) {
        if (column === undefined) { // row is cell
            column = row.columnIndex
            row = row.rowIndex
        }

        const squareY = Math.floor(row / 3)
        const squareX = Math.floor(column / 3)

        return this.flatSquare(squareY, squareX, fromTable)
    }

    flatSquare(squareY, squareX, fromTable = false) {
        const startPoints = [ 0, 3, 6 ]
        const endPoints = [ 2, 5, 8 ]

        const cells = []

        for (let i = startPoints[squareY]; i <= endPoints[squareY]; i++) {
            for (let j = startPoints[squareX]; j <= endPoints[squareX]; j++) {
                if (fromTable) {
                    cells.push(this._table[i][j])
                } else {
                    cells.push(this._board[i][j])
                }
            }
        }

        return cells
    }

    countZeros() {
        this._zerosLeft = 0

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (!this._board[i][j].value) {
                    this._zerosLeft++
                }
            }
        }
    }
}