if (process.env.NODE_ENV === 'production') {
  module.exports = require('./dist/axios.pro.min.js')
}
else {
  module.exports = require('./dist/axios.pro.js')
}
