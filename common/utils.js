/**
 * Created by Administrator on 2017/1/16.
 */

module.exports = {
    handleTags: function(tags) {
        return tags.split(',').filter(function(tag) {
            return tag !== ''
        })
    }
}