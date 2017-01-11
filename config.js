/**
 * Created by wlhuang on 2017/1/9.
 */

const path = require('path')

module.exports = {
    // default port
    port: 3000,

    // default log level
    level: 'info',

    // default view
    view: {
        base: path.resolve(__dirname, './view'),
        ext: '.html'
    },

    // default cookie
    cookie: {
        timeout: 30 * 60 * 1000,
        key: 'session-id'
    }
}