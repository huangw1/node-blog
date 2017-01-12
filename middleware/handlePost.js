/**
 * Created by Administrator on 2017/1/11.
 */

const formidable = require('formidable')
const path       = require('path')
const Xss        = require('../common/xss')

const xss        = new Xss()

/**
 * 封装为promise
 * @param context
 * @param options
 */
function handlePost(context, options) {
    return new Promise(function(resolve, reject) {
        var fields = {},
            files  = {}
        var form = new formidable.IncomingForm(options)
        form.on('error', function(err) {
            reject(err)
        })
        form.on('end', function() {
            resolve({fields: fields, files: files})
        })
        form.on('field', function(name, value) {
            if(fields[name]) {
                if(Array.isArray(fields[name])) {
                    fields[name].push(xss.filter(value))
                } else {
                    fields[name] = [fields[name], xss.filter(value)]
                }
            } else {
                fields[name] = xss.filter(value)
            }
        })
        form.on('file', function(name, file) {
            if(files[name]) {
                if(Array.isArray(files[name])) {
                    files[name].push(file)
                } else {
                    files[name] = [files[name], file]
                }
            } else {
                files[name] = file
            }
        })
        form.parse(context.request)
    })
}

module.exports = function postMiddleware(options) {
    options = options || {}
    options.uploadDir = 'uploadDir' in options ? options.uploadDir : path.resolve(__dirname, '../upload')
    options.multipart = 'multipart' in options ? options.multipart : true
    options.encoding  = 'encoding'  in options ? options.encoding  : 'utf-8'
    options.keepExtensions = 'keepExtensions' in options ? options.keepExtensions : true
    return function *(next) {
        var body = {}
        if(['get', 'head', 'delete'].indexOf(this.request.method) === -1) {
            body = yield handlePost(this, options)
        }
        this.request.body = body
        yield *next
    }
}
