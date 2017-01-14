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
    this._map = {}
}
Session.prototype = {
    get: function(name) {
        return this._map[name] || ''
    },
    set: function(session) {
        Object.keys(session).forEach(function(key) {
            this._map[key] = session[key]
        }.bind(this))
    },
    remove: function(name) {
        delete this._map[name]
    },
    removeAll: function() {
        delete this._map
        this._map = {}
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
    renew: function(res) {
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