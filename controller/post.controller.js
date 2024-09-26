const Post = require("./../model/post.model");

/**
 * Methode pour récupérer 10 post (les plus récents) par page
 * @param page le numéro de la page actuelle
 * Si la page est 1 il faut récupérer les 10 post les plus récents
 * Si la page est 2 il faut récupérer les post du 11ème au 20ème les plus récents
 * ...
 */
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

/**
 * Methode pour récupérer un post par son id, et les commentaires associés à ce post
 */
exports.getById = async (req, res) => {
    try{
        let id = req.params.id;
        let postWithComment = await Post.findById(id).populate("comments");
        res.status(200).json(postWithComment);
    }catch(e){
        res.status(500).json(e.message);
    }
}

/**
 * Methode pour créer un nouveau post (attention à bien enregistrer la date de création)
 * @body
 * {
 *     message: <string>,
 *     userId: <string>
 * }
 */
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

/**
 * Methode pour modifier un post (attention de bien mettre à jour la date du post)
 * @param id l'id du post à modifier
 * @body
 * {
 *     message: <string>
 * }
 */
exports.update = async (req, res) => {
    try{
        let postUpdated = await Post.findByIdAndUpdate(req.params.id, {message: req.body.message, date: new Date()});
        res.status(201).json({message: "Post mis à jour", post: postUpdated});
    }catch(e){
        res.status(500).json(e.message);
    }
}

/**
 * Methode pour supprimer un post (attention de bien supprimer les commentaires associés)
 * @param id l'id du post à supprimer
 */
exports.delete = async (req, res) => {
    try{
        await Post.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Post supprimé"});
    }catch(e){
        res.status(500).json(e.message);
    }
}
