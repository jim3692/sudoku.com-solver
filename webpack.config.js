const path = require('path')

module.exports = {
  mode: 'production',
  entry: {
    demo: './src/demo.js',
    'sudoku.com': './src/sudoku.com.js'
  },
  output: {
    filename: '[name]-bundle.js',
    path: path.resolve(__dirname, 'build')
  }
}
