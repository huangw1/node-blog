/**
 * Created by Administrator on 2017/1/15.
 */

/**
 手动修改mongoose中的promise
 */
const mongoose   = require('mongoose')
mongoose.Promise = require('bluebird')
const config     = require('../config')

mongoose.connect('mongodb://' + config.database.host + '/' + config.database.db)

module.exports = mongoose
