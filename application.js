/**
 * Created by wlhuang on 2017/1/9.
 */

const coo    = require('./lib/coo')
const Log    = require('./lib/log')
const config = require('./config')
const path   = require('path')
const http   = require('http')
const https  = require('https')

const context  = require('./wrapper/context')
const Request  = require('./wrapper/request')
const Response = require('./wrapper/response')
const handler  = require('./lib/handleStatic')
const session  = require('./session')
const log      = new Log(config.level)

/**
 * simplify koa
 * 上下文
 * @constructor
 */
function Application() {
    this.middleware = []
    this.routes = []
    this.request = {}
    this.response = {}
    this.sessionManager = new session.SessionManage(config.cookie.timeout)
}

var App = Application.prototype

/**
 * set static resource
 */
App.setStatic  = function(path) {
    this.staticPath = path
}

/**
 * start ---------------->
 * <---------------- send
 * @param next
 */
function *send(next) {
    log.info('---------------------------->')
    yield *next
    log.info('<----------------------------')
}

App.handleSession = function () {
    var sessionId = this.request.cookie[config.cookie.key],
        session
    if(sessionId && (session = this.sessionManager.get(sessionId))) {
        if(session.isTimeout) {
            this.sessionManager.remove(sessionId)
            session = this.sessionManager.renew(this.response)
        } else {
            session.updateTime()
        }
    } else {
        session = this.sessionManager.renew(this.response)
    }
    this.request.session = session
}

App.compose = function(middleware, context) {
    return coo(function *() {
        var refer = (function *() {})(),
            len  = middleware.length
        while(len--) {
            refer = middleware[len].call(context, refer)
        }
        yield *refer
    })
}

App.use = function(generator) {
    this.middleware.push(generator)
}

App.dispatch = function() {
    var next = this.compose.call(this, [send].concat(this.middleware), this),
        ext = null
    return function(request, response) {
        this.request = Request(request)
        this.response = Response(response)

        if(ext = path.extname(this.request.path).slice(1)) {
            handler(this.response, this.staticPath + this.request.path, ext)
        } else {
            this.handleSession()
            next.call(this)
        }
    }.bind(this)
}

App.listen = function(port, https) {
    var server = https ? https.createServer(this.dispatch()) : http.createServer(this.dispatch())
    server.listen(port, function() {
        log.info('Server listening at Port　%s.', port)
    })
}

Object.assign(App, context)

module.exports = Application