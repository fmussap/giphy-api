'use strict'
console.log('prod.js GIPHY_API_KEY', process.env.GIPHY_API_KEY)
console.log('prod.js GIPHY_PROD_KEY', process.env.GIPHY_PROD_KEY)
module.exports = {
  giphyKey: process.env.GIPHY_PROD_KEY
}
