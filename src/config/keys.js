// set NODE_ENV depending on the environment
// console.log('NODE_ENV', process.env.NODE_ENV)
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}
if (process.env.NODE_ENV === 'production') {
  module.exports = require('./prod')
} else if (process.env.NODE_ENV === 'test') {
  module.exports = require('./jest')
} else if (process.env.NODE_ENV === 'development') {
  module.exports = require('./dev')
}
