/**
 * Created by Administrator on 2017/1/15.
 */

const mongoose = require('./connection')

const postSchema = mongoose.Schema({
    title: String,
    auth: String,
    tags: String,
    content: String,
    create_time: {type: Date, default: Date.time()},
    update_time: {type: Date, default: Date.time()}
})