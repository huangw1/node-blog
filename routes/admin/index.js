/**
 * Created by wlhuang on 2017/1/16.
 */

const admins = require('../../models/admins')
const posts  = require('../../models/posts')
const config = require('../../config')
const crypto = require('crypto')

const utils    = require('../../common/utils')

function isEqual(password1, password2) {
    return crypto.createHash('md5').update(password1).digest('hex') == password2
}
function redirect2Login() {
    this.request.session.redirect = this.request.url
    this.redirect('/admin/login')
}

/**
 * 若要支持路由的权限验证，可修改路由中间件的处理函数为数组形式
 * @param route
 */
module.exports = function (route) {
    /* index */
    route.get('/admin', function *(next) {
        console.log('this.redirect: ', this.redirect)
        this.redirect('/admin/articles')
    })

    /* login */
    route.get('/admin/login', function *() {
        this.renderView('admin/login')
    })

    /* login post */
    route.post('/admin/login', function *() {

        var fields = this.request.body.fields
        var admin = yield admins.getAdmin({user_name: fields.user_name})

        if(!admin) {
            this.renderJSON({code: 0, redirect: '/admin/login'})
        } else {
            if(!isEqual(fields.pass_word, admin.pass_word)) {
                this.renderJSON({code: 0, redirect: '/admin/login'})
            } else {
                this.request.session.user = admin
                this.renderJSON({code: 200, redirect: this.request.session.redirect || '/admin/articles'})
            }
        }
    })

    /* article list */
    route.get('/admin/articles', function *(next) {
        if(!this.request.session.user) {
            redirect2Login.call(this)
        } else {
            var articles = yield posts.getPostList()
            articles.forEach(function(article) {
                article.tags = utils.handleTags(article.tags)
                article.id = article._id.toString()
            })
            this.renderView('admin/index', {articles: articles})
        }

    })

    /* update article */
    route.get('/admin/article/:id/edit', function *(next) {
        console.log(this.request.session.user, 11)
        if(!this.request.session.user) {
            redirect2Login.call(this)
        } else {
            var article = yield posts.getPostById({_id: this.request.params.id})
            this.renderView('admin/new', {article: article})
        }

    })

    route.post('/admin/article/:id/edit', function *(next) {
        if(!this.request.session.user) {
            redirect2Login.call(this)
        } else {
            var fields = this.request.body.fields
            var article = yield posts.updatePost({_id: this.request.params.id}, fields)
            this.renderJSON({code: 200, redirect: '/admin/articles'})
        }

    })

    /* create article */
    route.get('/admin/article/new', function *(next) {
        if(!this.request.session.user) {
            redirect2Login.call(this)
        } else {
            this.renderView('admin/new')
        }

    })

    /* post list */
    route.post('/admin/article/new', function *(next) {
        if(!this.request.session.user) {
            redirect2Login.call(this)
        } else {
            var fields = this.request.body.fields
            var result = yield posts.createPost(fields)
            this.renderJSON({code: 200, redirect: '/admin/articles'})
        }

    })
}