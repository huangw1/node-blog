/**
 * Created by wlhuang on 2017/1/10.
 */

/**
 * type
 * @param obj
 * @returns {*|boolean}
 */
function isGenerator(generator) {
    return generator && 'function' == typeof generator.next && 'function' == typeof generator.throw
}

/**
 * co simplify coo
 * @param generator
 * @returns {Function}
 */
function coo(generator) {
    return function() {
        var gen = isGenerator(generator) ? generator : generator.call(this)
        function next(data) {
            var iterator = gen.next(data)
            if (iterator.done) {
                Promise.resolve(iterator.value)
            } else {
                Promise.resolve(iterator.value).then(data => next(data)).catch(ex => gen.throw(ex))
            }
        }
        try {
            return next()
        } catch (ex) {
            return Promise.reject(ex)
        }
    }
}

module.exports = coo