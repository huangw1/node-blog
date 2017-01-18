/**
 * Created by wlhuang on 2017/1/13.
 */

const METHODS = ['get', 'post', 'put', 'delete', 'all']

/**
 * 路由
 * @param proto
 */
function Route() {
    this.routes = []
}

var proto = Route.prototype

METHODS.forEach(function(method) {
    proto[method] = function(path, generate) {
        this.routes.push({
            method: method,
            path:   path,
            fn:     generate
        })
    }
})

/**
 *
 * @returns {Function}
 */
proto.middleware = function () {
    var routes      = this.routes,
        paramRegexp = /:(\w+)/g
    return function*(next) {
        var path    = this.request.path,
            method  = this.request.method,
            request = this.request,
            match   = null,
            that    = this

        routes.forEach(function(route) {
            var params = route.path.match(paramRegexp)
            var pathRegexp = new RegExp(route.path.replace(paramRegexp, '(\\w+)'))

            if(params) {
                if((method === route.method || method === 'all') && (match = path.match(pathRegexp))) {
                    if(match[0] === path) {
                        request.params = {}
                        params.forEach(function(param, index) {
                            request.params[param.slice(1)] = match[index +1]
                        })
                        next = route.fn.call(that, next)
                    }

                }
            } else {
                if((method === route.method || method === 'all') && (route.path === '*' || route.path === path)) {
                    next = route.fn.call(that, next)
                }
            }
        })
        yield *next
    }
}

module.exports = Route