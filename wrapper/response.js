/**
 * Created by wlhuang on 2017/1/10.
 */

const http = require('http')
const cookie  = require('../cookie')
const session = require('../session')

function Response(res) {
    http.ServerResponse.prototype.cookie = function(sessionItem) {
        !this.cookieMap && (this.cookieMap = {})
        this.cookieMap[sessionItem.key] = cookie.stringify(sessionItem)
        var sessions = []
        Object.keys(this.cookieMap).forEach(function(key) {
            sessions.push(this.cookieMap[key])
        }.bind(this))
        this.setHeader('Set-Cookie', sessions.join(', '))
    }
    return res
}

module.exports = Response