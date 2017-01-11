/**
 * Created by Administrator on 2017/1/10.
 */

const util   = require('util')
const errors = {
    RequestParamError: 'RequestParamError',
    PageNotFound: 'PageNotFound',
    DataBaseError: 'DataBaseError',
    ServerError: 'ServerError'
}

function Exception(type, message) {
    /**
     * auto return instance
     */
    if (!(this instanceof Exception)) {
        return new Exception(code, msg)
    }
    this.type = type
    this.message = 'Exception: ' + message
}
util.inherits(Exception, Error)

module.exports = Exception

Object.keys(errors).forEach(function (type) {
    module.exports[type] = function() {
        return new Exception(type, errors[type])
    }
})
