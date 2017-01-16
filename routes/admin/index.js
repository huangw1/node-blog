/**
 * Created by wlhuang on 2017/1/16.
 */

const admins = require('../../models/admins')
const posts  = require('../../models/posts')

const utils    = require('../../common/utils')
const mongoose = require('mongoose')

module.exports = function (route) {
    /* index */
    route.get('/admin', function *(next) {
        //if(!this.request.session.user) {
        //    this.request.session.redirect = this.request.url
        //    this.redirect('/admin/login')
        //} else {
        //    this.renderView('admin/index')
        //}
        this.renderView('admin/index')
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
            var result = yield admins.createAdmin(fields)
            console.log('Create admin: ', result.user_name)
        } else {
            this.request.session.user = fields
            this.redirect(this.request.session.redirect)
        }
    })

    /* article list */
    route.get('/admin/articles', function *(next) {
        var articles = yield posts.getPostList()
        articles.forEach(function(article) {
            article.tags = utils.handleTags(article.tags)
            article.id = article._id.toString()
        })
        this.renderView('admin/index', {articles: articles})
    })

    /* update a article */
    route.get('/admin/article/:id/edit', function *(next) {
        var article = yield posts.getPostById({_id: this.request.params.id})
        this.renderView('admin/new', {article: article})
    })

    route.post('/admin/article/:id/edit', function *(next) {
        //var article = yield posts.getPostById({_id: this.request.params.id})
        //this.renderView('admin/new', {article: article})
    })

    /* create a article */
    route.get('/admin/article/new', function *(next) {
        this.renderView('admin/new')
    })

    /* post a list */
    route.post('/admin/article/new', function *(next) {
        var fields = this.request.body.fields
        var result = yield posts.createPost(fields)
        this.renderJSON({code: 200, redirect: '/admin/articles'})
    })
}