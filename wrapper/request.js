/**
 * Created by wlhuang on 2017/1/10.
 */

const http = require('http')
const util = require('util')
const url  = require('url')
const qs   = require('querystring')
const cookie  = require('../cookie')
const session = require('../session')

/**
 * 获取字段通用方法
 * @param field
 * @returns {*}
 */
function getter(field) {
    switch (field = field.toLowerCase()) {
        case 'referer':
        case 'referrer':
            return this.headers.referrer || this.headers.referer || ''
        default:
            return this.headers[field] || ''
    }
}
/**
 * 拓展req
 * @param req
 * @returns {*}
 * @constructor
 */
function Request(req) {
    var cookieMap = cookie.parse(req.headers.cookie || '')
    req.get      = getter.bind(req)
    req.cookie   = Object.assign({}, cookieMap)
    req.path     = url.parse(req.url).pathname
    req.method   = req.method.toLowerCase()
    req.query    = Object.assign({}, qs.parse(url.parse(req.url).query))

    return req
}

module.exports = Request

