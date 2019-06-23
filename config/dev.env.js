'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://100.168.1.48:8181/mamon"',
//   BASE_API: '"http://100.168.1.48:7000/mamon"',
//   BASE_API: '"http://100.168.1.161:8080/mamon"',
//   BASE_API: '"http://192.168.11.104:8080/mamon"',
  // BASE_API: '"http://100.168.1.199:8080/mamon"',
  BASE_API: '"http://matest.mf-tal.com/mamon"',
//   BASE_API: '"http://stage.mf-tal.com/mamon"',
//   BASE_API: '"http://100.168.20.68:8181/mamon"',
  
})
