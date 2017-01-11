/**
 * Created by wlhuang on 2017/1/9.
 */

exports.getUid  = function getUid(size) {
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        len   = chars.length,
        str   = '',
        size  = size || 24
    while(size--) {
        str += chars.charAt(Math.floor(Math.random() * (len - 1)))
    }
    return str
}
