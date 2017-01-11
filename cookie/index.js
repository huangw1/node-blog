/**
 * Created by wlhuang on 2017/1/9.
 */

/**
 * 解析cookie
 * @param cookies
 * @returns {object}
 */
exports.parse = function(cookies) {
    var map = {},
        pairs = cookies.split(';')
    pairs.forEach(function(pair) {
        var cookie = pair.split('=')
        map[cookie[0].trim()] = cookie[1] || ''
    })
    return map
}

/**
 * 单个cookie序列化（一个set-cookie头只能设置一个cookie，要设多个cookie需要设置多set-cookie头）
 * @param cookie
 * @returns {string}
 */
exports.stringify = function(cookie) {
    var cookies = [cookie.key, '=', cookie.value]
    if (cookie.expires) {
        cookies.push('; expires=', (new Date(cookie.expires)).toUTCString())
    }
    if (cookie.path) {
        cookies.push('; path=', cookie.path)
    }
    if (cookie.domain) {
        cookies.push('; domain=', cookie.domain)
    }
    if (cookie.secure) {
        cookies.push('; secure')
    }
    if (cookie.httpOnly) {
        cookies.push('; httponly')
    }

    return cookies.join('')
}