/**
 * Created by Administrator on 2017/1/12.
 */

const util = require('util')

/**
 * base on xss-filter
 * 各类型正则表达式
 * @type {RegExp}
 */
const REGEXP_STYLE = /<style[^>]*>[^<]*<\/style>/img

const REGEXP_SCRIPT = /<script[^>]*>[^<]*<\/script>/img

const REGEXP_ATTR_WITH_SPACE = /\s*([\w-]+)\s*=\s*("([^"]*)"|'([^']*)'|([^ >]*))\s*/img

const BLACKLISTATTRS = {
    onclick: true,
    ondblclick: true,
    onchange: true,
    onblur: true,
    onfocus: true,
    onkeydown: true,
    onkeypress: true,
    onkeyup: true,
    onmousedown: true,
    onmousemove: true,
    onmouseover: true,
    onmouseout: true,
    onmouseup: true,
    onselect: true,
    onsubmit: true,
    onreset: true,
    onload: true,
    onabort: true,
    onerror: true
}

/**
 * 自定义属性白名单
 * 过滤属性多余空格
 * 字符转义
 * @param options
 */
function xss(options) {
    this.options = {
        escape: false,
        styleTag: true,
        scriptTag: true,
        removeTag: true,
        removeSpace: false,
        blackList: BLACKLISTATTRS
    }
    if(util.isObject(options)) {
        this.options = Object.assign(this.options, options)
    }
}

xss.prototype.filter = function(html) {
    if(html === '') {
        return html
    }

    var options = this.options
    if(options.styleTag) {
        html = filterStyleTag(html, options)
    }
    if(options.scriptTag) {
        html = filterScriptTag(html, options)
    }
    html = filterAttr(html, options.blackList)
    if(options.removeSpace) {
        html = filterAttrSpace(html)
    }
    if(options.escape) {
        html = escapeTags(html)
    }
    return html
}

module.exports = xss

function filterStyleTag(html, options) {
    if(options.removeTag) {
        return html.replace(REGEXP_STYLE, '')
    } else {
        return html.replace(REGEXP_STYLE, function(body) {
            return escapeTags(body)
        })
    }

}
function filterScriptTag(html, options) {
    if(options.removeTag) {
        return html.replace(REGEXP_SCRIPT, '')
    } else {
        return html.replace(REGEXP_SCRIPT, function(body) {
            return escapeTags(body)
        })
    }
}
function filterAttrSpace(html) {
    return html.replace(REGEXP_ATTR_WITH_SPACE, function(kv) {
        return ' ' + kv.split('=').map(function(k) {
            return k.trim()
        }).join('=')
    })
}
function filterAttr(html, blackList) {
    return html.replace(REGEXP_ATTR_WITH_SPACE, function(kv) {
        var k = kv.split('=')[0].trim()
        if(blackList[k]) {
            return ' '
        } else {
            return kv
        }
    })
}
function escapeTags(html) {
    return html.replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
