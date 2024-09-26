const User = require("./../model/user.model");

/**
 * Methode pour la connexion utilisateur
 * @body
 * {
 *     email: <string>,
 *     password: <string>
 * }
 */
exports.login = async (req, res) => {
  try {
    let user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json(e.message);
    console.log(e.message);
  }
};

/**
 * Méthode pour la création d'un compte utilisateur
 * @body
 * {
 *     email: <string>,
 *     password: <string>,
 *     username: <string>
 * }
 */
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
