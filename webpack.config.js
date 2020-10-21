const path = require('path')

module.exports = {
  target: 'webworker',
  entry: () => './index.js',
  mode: 'production',
  context: path.resolve(__dirname, ''),
}
