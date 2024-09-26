const User = require("./../model/user.model");

exports.login = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    if(user){
       res.status(200).json({message: "Connexion réussie : ", username: user.username});
    } else {
        res.status(404).json({message: "Connexion échouée"});
    }
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};

exports.signin = async (req, res) => {
  try {
    let user = await User.create({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    });
    res.status(201).json(user);
    console.log(user);
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};

