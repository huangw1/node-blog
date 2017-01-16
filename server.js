/**
 * Created by wlhuang on 2017/1/9.
 */

const Application = require('./application')
const frontRoute  = require('./routes')
const backRoute   = require('./routes/admin')
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

const Route          = require('./middleware/route')
const route          = new Route()

/**
 * url route
 */
frontRoute(route)
backRoute(route)

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
                console.log('exception: ', exception)
                break
        }
    }
})

/**
 * middleware
 */
app.use(postMiddleware())
app.use(route.middleware())

/**
 * session: 获取session.get() session.set({})
 */
app.use(function *(next) {
    this.renderView('index', {})
    yield *next
})

app.use(function *(next) {
    yield *next
})

app.listen(config.port)