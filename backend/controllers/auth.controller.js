const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const process = require('process');

function genereateToken(user) {
  return (token = jwt.sign({ user }, process.env.ACCESS_TOKEN, {
    expiresIn: '7d',
  }));
}

function register(req, res) {
  const data = req.body;
  const user = new User(data);
  const token = genereateToken(user);

  user
    .save()
    .then((el) =>
      res.send({
        ...el._doc,
        token,
      }),
    )
    .catch(() =>
      res
        .status(500)
        .send({ message: `User with this id already exist` }),
    );
}

function signIn(req, res) {
  const personal_number = req.body.personal_number;
  User.findOne({ personal_number }, function (err, user) {
    if (err) {
      res.status(500);
    }
    if (user === null) {
      return res.status(404).json({
        message: `User with ${personal_number} not exist`,
      });
    }

    const token = genereateToken(user);
    res.send({
      token,
    });
  });
}

module.exports = { register, signIn };
