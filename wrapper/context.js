/**
 * Created by wlhuang on 2017/1/10.
 */
/**
 * art-template 默认缓存
 */
const template = require('art-template')

const config   = require('../config')
const mime     = require('../mime')
const path     = require('path')
const fs       = require('fs')

const ext      = config.view.ext
const base     = config.view.base

/**
 * 配置视图路径
 */
template.config('base', base)
template.config('extname', ext)

/**
 * 拓展application
 * @type {{}}
 */

module.exports = {
    renderJSON: function(json) {
        this.response.setHeader('Content-Type', mime.json)
        this.response.writeHead(200)
        this.response.end(JSON.stringify(json))
    },
    redirect: function(path) {
        this.response.setHeader('Location', path)
        this.response.writeHead(302)
        this.response.end()
    },
    renderView: function(view, data) {
        if(fs.existsSync(path.resolve(base, view + ext))) {
            try {
                this.response.writeHead(200, {'Content-Type': mime.html})
                this.response.write(template(view, data || {}))
                this.response.end()
            } catch(exception) {
                this.handle500('Parse template error.')
            }
        } else {
            this.handle500('The template file does not exist.')
        }
    },
    handle500: function(err) {
        this.response.writeHead(500, {'Content-Type': mime.txt});
        this.response.end(err)
    }
}
