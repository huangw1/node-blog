/**
 * Created by Administrator on 2017/1/14.
 */

const posts  = require('../models/posts')
const utils  = require('../common/utils')
const moment = require('moment')
const config = require('../config')

module.exports = function (route) {

    route.get('/', function *(next) {
        var articles = yield posts.getPostList()
        var resultByTime = {articles: {}, now: {}}

        articles.forEach(function(article) {
            article.tags = utils.handleTags(article.tags)
            article.id = article._id.toString()
            article.year = moment(new Date(article.create_time).getTime()).format('YYYY')
            article.date = moment(new Date(article.create_time).getTime()).format('MM-DD')

            if(moment().format('YYYY') == article.year) {
                !resultByTime['now'][article.year] && (resultByTime['now'][article.year] = [])
                resultByTime['now'][article.year].push(article)
            } else {
                !resultByTime['articles'][article.year] && (resultByTime['articles'][article.year] = [])
                resultByTime['articles'][article.year].push(article)
            }

        })

        this.renderView('index', {
            resultByTime: resultByTime,
            now: moment().format('YYYY'),
            info: config.info
        })
    })

    /*  article */
    route.get('/article/:id', function *(next) {
        var article = yield posts.getPostById({_id: this.request.params.id})
        article.tags = utils.handleTags(article.tags)
        article.id = article._id.toString()
        this.renderView('article', {
            article: article,
            info: Object.assign({}, config.info, {title: article.title, keywords: article.tags.join(',')})
        })
    })

    /* tag */
    route.get('/tags/:id', function *(next) {
        var articles = yield posts.getPostByTag(this.request.params.id)
        articles.forEach(function(article) {
            article.tags = utils.handleTags(article.tags)
            article.id = article._id.toString()
        })
        this.renderView('tags', {
            articles: articles || [],
            tag: this.request.params.id,
            info: Object.assign({}, config.info, {title: this.request.params.id, keywords: this.request.params.id})
        })
    })
}