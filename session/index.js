/**
 * Created by wlhuang on 2017/1/9.
 */

const util   = require('util')
const uuid   = require('../common/uuid')
const config = require('../config')

/**
 * session对象
 * @param sessionId
 */
function Session(sessionId) {
    this.sessionId = sessionId
}
Session.prototype = {
    remove: function() {
        Object.keys(this).forEach(function(key) {
            delete this[key]
        }.bind(this))
    },
    updateTime: function() {
        this._updateTime = Date.now()
    }
}

function SessionManage(timeout) {
    this.timeout = timeout
    this._sessions = {}
}

SessionManage.prototype = {
    get: function(sessionId) {
        return this._sessions[sessionId]
    },
    generate: function(res) {
        var sessionId = uuid.getUid(),
            session = new Session(sessionId)
        session.updateTime()
        this._sessions[sessionId] = session
        res.cookie({
            key: [config.cookie.key],
            value: sessionId,            path: '/',
            expires: new Date().getTime() + config.cookie.timeout
        })
        return session
    },
    remove: function(sessionId) {
        delete this._sessions[sessionId]
    },
    isTimeout: function(session) {
        return (session._updateTime + this.timeout) < new Date.now()
    }
}

exports.Session = Session
exports.SessionManage = SessionManage