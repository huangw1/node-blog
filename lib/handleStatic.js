/**
 * Created by wlhuang on 2017/1/11.
 */

const fs           = require('fs')
const mime         = require('../mime')
const promisify    = require('./promisify')
const readFileSync = promisify(fs.readFile)

function send(status,content, type) {
    this.writeHead(status, {'Content-Type': type})
    this.write(content)
    this.end()
}

module.exports = function handleStatic(res, path, ext) {
    if(fs.existsSync(path)) {
        readFileSync(path).then(function(content) {
            send.call(res, 200, content, mime[ext] || mime.txt)
        }).catch(function(err) {
            send.call(res, 500, err, mime.txt)
        })
    } else {
        send.call(res, 404, 'The resource does not exist.', mime.txt)
    }
}