/**
 * Créer ici le model pour post
 * 
 * Un post doit avoir au minimum : un message, une date, un userId (auteur du post) et un postId
 */

const {Schema, model} = require('mongoose');

const Comment = new Schema({
    message: {type: String},
    date: {type: Date, default: Date.now},
    userId: {type: String},
    postId: {type: String}
})

module.exports = model('Comment', Comment);