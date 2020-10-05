const User = require('../models/user.model');
const Account = require('../models/account.model');

function uploadAvatar(req, res) {
  try {
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded',
      });
    } else {
      const avatar = req.files.avatar;
      const id = req.active_user._id;

      if (id) {
        const folderPath = `./uploads/${avatar.name}`;

        avatar.mv(folderPath, function (err) {
          if (err) {
            return res.status(500).send(err);
          }
          User.findByIdAndUpdate(id, { avatar: avatar.name }).then(
            (user) => {
              user.avatar = avatar.name;
              res.send(user);
            },
          );
        });
      }
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

function getAllUsers(req, res) {
  let sort$ = {
    $sort: {
      first_name: -1,
      last_name: -1,
    },
  };
  let { first, after, sort } = req.query;
  first = +first || 5;
  after = +after || 0;

  if (sort) {
    sort$ = {
      $sort: {
        [sort]: 1,
      },
    };
  }

  User.aggregate([
    sort$,
    {
      $group: {
        _id: null,
        users: {
          $push: '$$ROOT',
        },
      },
    },
    {
      $addFields: {
        users_amount: {
          $cond: [{ $isArray: '$users' }, { $size: '$users' }, 0],
        },
      },
    },
    {
      $project: {
        _id: 0,
        users_amount: 1,
        users: {
          $slice: ['$users', after, first],
        },
      },
    },
  ]).exec((err, users) => {
    if (err) {
      res.status(403).send(err);
    }
    return res.json(users[0]);
  });
}

function getUserByID(req, res) {
  const id = req.params.id;

  User.findById(id, async (err, user) => {
    if (err) {
      res.status(403).send(err);
    }
    if (user === null) {
      return res.status(404).send({ message: 'User not found' });
    }
    const accounts = await Account.find({ user_id: id });
    return res.send({ ...user._doc, accounts });
  });
}

function updateUser(req, res) {
  try {
    const id = req.active_user._id;
    User.findByIdAndUpdate(
      id,
      req.body,
      { new: true },
      async (err, user) => {
        if (err) {
          return res.status(500).send(err);
        }

        if (user === null) {
          return res
            .status(404)
            .json({ message: `Can\`t find user with id ${id}` });
        }
        const accounts = await Account.find({ user_id: id });
        res.send({
          ...user._doc,
          accounts,
        });
      },
    );
  } catch (error) {
    return res.status(403).send(error);
  }
}

function deleteUser(req, res) {
  try {
    const id = req.active_user._id;

    User.findByIdAndDelete(id, (err, user) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (user === null) {
        return res
          .status(404)
          .json({ error: `Can\`t find user with id ${id}` });
      }
      res.status(200).send(null);
    });
  } catch (error) {
    return req.status(403).send(error);
  }
}

module.exports = {
  uploadAvatar,
  getAllUsers,
  getUserByID,
  updateUser,
  deleteUser,
};
