/**
 * Created by wlhuang on 2017/1/9.
 */

const path = require('path')

module.exports = {
    // default port
    port : 3002,

    // default log level
    level: 'info',

    // default view
    view: {
        base: path.resolve(__dirname, './view'),
        ext : '.html'
    },

    // default cookie
    cookie: {
        timeout: 30 * 60 * 1000,
        key    : 'session-id'
    },

    // user
    user: {
        user_name: 'test',
        pass_word: 'test'
    },

    // database
    database: {
        host: 'localhost:27017',
        db  : 'node-blog'
    },
    // default
    info: {
        title: 'huangw1\'blog',
        description: 'sharing of work experience',
        keywords: 'html, css, javascript, node'
    }
}