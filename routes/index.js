/**
 * Created by Administrator on 2017/1/14.
 */

module.exports = function (route) {
    /**
     * route map
     */
    route.get('/article/:id', function *(next) {
        console.log(this.request.params, 111111)
        this.renderView('article')
    })
    route.get('/index', function *(next) {
        var data = {
            title: '标签',
            list: ['文艺', '博客', '摄影', '电影', '民谣', '旅行', '吉他']
        }
        this.renderView('index', data)
    })
}