
import mongoose ,{Schema} from 'mongoose'
var deepPopulate = require('mongoose-deep-populate')(mongoose)

const CategarySchema = new Schema({
    title: String,
    index: Number,
    logo: String,
    password: String
})

const CommentSchema = new Schema({
    post: {
        id: ObjectId,
        typePath: String
    }
})

const AuthorSchema = new Schema({
    nick_name: String,
    full_name: String
})

const PostSchema = new Schema({
    categary: {type: Schema.Types.ObjectId, ref: 'category'},
    tages: [{type: Schema.Types.ObjectId, ref: 'tag'}],
    auth: {type: Schema.Types.ObjectId, ref: 'author'},
    title: String,
    prefix: String,
    excerpt: String,
    makedown: String,
    visits: Number,
    stars: Number
})

Categary.plugin(deepPopulate)

const Categary = mongoose.model('categary', CategarySchema)
const Author = mongoose.model('author', AuthorSchema)
const Post = mongoose.model('post', PostSchema)

export {Categary, Author, Post}


