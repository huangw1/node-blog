/**
 * Created by wlhuang on 2017/1/9.
 */

const Application = require('./application')
const errors      = require('./lib/exception')
const config      = require('./config')
const path        = require('path')
const Log         = require('./lib/log')

const app         = new Application()
const log         = new Log(config.level)
const enums       = (
    function() {
        var types = Object.keys(errors),
            map   = {}
        for(var key in types) {
            map[types[key]] = types[key]
        }
        return map
    }
)()

const postMiddleware = require('./middleware/handlePost')

/**
 * set static resource
 */
app.setStatic(path.resolve(__dirname, 'public'))

/**
 * common handler error
 */
app.use(function *(next) {
    try {
        yield *next
    } catch (exception) {
        log.info(exception.message)
        switch(exception.type) {
            case enums.RequestParamError:
                break
            case enums.PageNotFound:
                break
            case enums.DataBaseError:
                break
            case enums.ServerError:
                break
            default:
                break
        }
    }
})

/**
 * post data
 */
app.use(postMiddleware())

/**
 * session: 获取session.get() session.set({})
 */
app.use(function *(next) {
    var data = {
        title: '标签',
        list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
    }
    this.renderView('index', data)
    yield *next
})

app.use(function *(next) {
    log.info(this.request.path)
    yield *next
})

app.listen(config.port)