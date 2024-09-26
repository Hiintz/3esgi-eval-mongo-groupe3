const Post = require("./../model/post.model");
const Comment = require("./../model/comment.model");

exports.getAll = async (req, res, next) => {
    try{
        let page = req.params.page;
        // on vérifie que la page est un nombre, sinon on continue au prochain middleware
        if(isNaN(page)){
            return next();
        }
        let listPost = await Post.find().sort({date: -1}).skip((page - 1) * 10).limit(10);
        res.status(200).json(listPost);
    }catch(e){
        res.status(500).json(e.message);
    }
}

exports.getById = async (req, res) => {
    try{
        let id = req.params.id;
        let post = await Post.findById(id);
        let comments = await Comment.find({postId: id});
        let postWithComments = {
            post: post,
            comments: comments
        };
        res.status(200).json(postWithComments);
    }catch(e){
        res.status(500).json(e.message);
    }
}

exports.create = async (req, res) => {
    try{
        let newPost = {
            message: req.body.message,
            date: new Date(),
            userId: req.body.userId
        };
        newPost = await Post.create(newPost);
        res.status(201).json(newPost);
    }catch(e){
        res.status(500).json(e.message);
    }
}

exports.update = async (req, res) => {
    try{
        let postUpdated = await Post.findByIdAndUpdate(req.params.id, {message: req.body.message, date: new Date()});
        res.status(201).json({message: "Post mis à jour", post: postUpdated});
    }catch(e){
        res.status(500).json(e.message);
    }
}

exports.delete = async (req, res) => {
    try{
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Post supprimé"});
    }catch(e){
        res.status(500).json(e.message);
    }
}
