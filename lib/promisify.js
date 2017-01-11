/**
 * Created by Administrator on 2017/1/10.
 */

/**
 * tj
 * @param fn
 * @returns {Function}
 */
function thunk(fn){
    return function(){
        var args = new Array(arguments.length)
        var that = this

        for(var i = 0; i < args.length; ++i) {
            args[i] = arguments[i]
        }

        return function(done){
            var called
            args.push(function(){
                if (called) {
                    return
                }
                called = true
                done.apply(null, arguments)
            })

            try {
                fn.apply(that, args)
            } catch (err) {
                done(err)
            }
        }
    }
}

/**
 * wrapper fn
 * @param fn
 * @returns {Function}
 */
function promisify(fn) {
    return function () {
        var wrapper = thunk(fn).apply(this, arguments)
        return new Promise(function (resolve, reject) {
                wrapper(function (err, data) {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(data)
                    }
                })
            }
        )
    }
}

module.exports = promisify