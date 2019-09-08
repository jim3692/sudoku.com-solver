module.exports = () => {
    const elNumbers = $('.numpad > .numpad-item')
    const elRows = $('.game-table .game-row')

    const numbersPaths = {}
    elNumbers.each(function() {
        const value = $(this).data('value')
        const path = $(this).find('svg > path').attr('d')
        numbersPaths[path] = value
    })

    const rows = []
    elRows.each(function(row) {
        const elCells = $(this).find('.game-cell')

        const cells = []
        elCells.each(function(cell) {
            if ($(this).hasClass('game-value')) {
                const path = $(this).find('svg > path').first().attr('d')
                cells[cell] = numbersPaths[path]
            } else {
                cells[cell] = 0
            }
        })

        rows[row] = cells
    })

    return rows
}