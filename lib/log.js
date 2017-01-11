/**
 * Created by wlhuang on 2017/1/10.
 */

const format = require('util').format

/**
 * simplify Log.js package
 * @type {Function}
 */
var exports = module.exports = function Log(level, stream) {
    this.level = exports[level.toUpperCase()]
    this.stream = stream || process.stdout
}

exports.ALERT = 1
exports.ERROR = 2
exports.WARNING = 3
exports.INFO = 4
exports.DEBUG = 5

exports.prototype = {
    log: function (level, args) {
        if(exports[level] <= this.level) {
            var msg = format.apply(null, args),
                timeStamp = new Date().toLocaleString()
            this.stream.write(
                `[ ${timeStamp} ] ${msg} \n`
            )
        }
    },
    alert: function() {
        this.log('ALERT', arguments)
    },
    error: function() {
        this.log('ERROR', arguments)
    },
    warning: function() {
        this.log('WARNING', arguments)
    },
    info: function() {
        this.log('INFO', arguments)
    },
    debug: function() {
        this.log('DEBUG', arguments)
    }
}