/**
 * Created by Administrator on 2017/1/15.
 */

const mongoose = require('./connection')

const adminSchema = mongoose.Schema({
    user_name: String,
    pass_word: String,
    create_time: {type: Date, default: Date.now()},
    update_time: {type: Date, default: Date.now()}
})

const adminModel = mongoose.model('admin', adminSchema)

module.exports = {
    createAdmin: function(data) {
        var admin = new adminModel(data)
        return admin.save()
    },
    getAdmin: function(query) {
        return adminModel.findOne(query).exec()
    },
    updateAdmin: function(query, data) {
        return adminModel.update(query, data).exec()
    }
}