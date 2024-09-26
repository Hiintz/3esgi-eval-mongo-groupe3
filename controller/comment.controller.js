const Comment = require("./../model/comment.model");

exports.create = async (req, res) => {
    try{
        let newComment = {
            message: req.body.message,
            userId: req.body.userId,
            postId: req.body.postId
        }
        let comment = await Comment.create(newComment);
        res.status(201).json(comment);
    }catch(e){
        res.status(500).json(e.message);
    }
}

exports.update = async (req, res) => {
    try{
        const message = req.body.message;
        let comment = await Comment.findOneAndUpdate(
            {_id: req.params.id}, 
            {$set: {message: message}},
            { new: true, runValidators: true });
        res.status(200).json(comment);
    }catch(e){
        res.status(500).json(e.message);
    }
}

exports.delete = async (req, res) => {
    try{
        await Comment.deleteOne({_id: req.params.id});
        res.status(200).json({message: "Commentaire supprimé"});
    }catch(e){
        res.status(500).json(e.message);
    }
}