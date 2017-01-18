/**
 * Created by Administrator on 2017/1/15.
 */

const mongoose = require('./connection')

const postSchema = mongoose.Schema({
    title: String,
    auth: String,
    tags: String,
    content: String,
    create_time: {type: Date, default: Date.now()},
    update_time: {type: Date, default: Date.now()}
})

const postModel = mongoose.model('post', postSchema)

module.exports = {
    createPost: function(data) {
        var post = new postModel(data)
        return post.save()
    },
    getPostList: function() {
        return postModel.find().lean().sort({create_time: -1}).exec()
    },
    getPostById: function(query) {
        return postModel.findOne(query).lean().exec()
    },
    getPostByTag: function(tag) {
        return postModel.find({tags: new RegExp(tag, 'i')}).lean().sort({create_time: -1}).exec()
    },
    updatePost: function(query, data) {
        return postModel.update(query, data).exec()
    }
}

