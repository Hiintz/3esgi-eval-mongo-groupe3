const {Schema, model} = require('mongoose');

const Post = new Schema({
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = model('Post', Post);