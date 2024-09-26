const {Schema, model} = require('mongoose');

const Comment = new Schema({
    message: {type: String},
    date: {type: Date, default: Date.now},
    userId: {type: String},
    postId: {type: String}
})

module.exports = model('Comment', Comment);