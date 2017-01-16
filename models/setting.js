/**
 * Created by Administrator on 2017/1/15.
 */

const mongoose = require('./connection')

const settingSchema = mongoose.Schema({
    blog_name: String,
    blog_description: String,
    blog_keyword: String,
    create_time: {type: Date, default: Date.now()},
    update_time: {type: Date, default: Date.now()}
})

const settingModel = mongoose.model('setting', settingSchema)

module.exports = {
    createSetting: function(data) {
        var setting = new settingModel(data)
        return setting.save()
    },
    getSetting: function() {
        return settingModel.findOne().exec()
    },
    updateSetting: function(query, data) {
        return settingModel.update(query, data).exec()
    }
}