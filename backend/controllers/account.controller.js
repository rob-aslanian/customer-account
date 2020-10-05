const Account = require('../models/account.model');

function getUserAccounts(req, res) {
  const user_id = req.params.user_id;

  Account.find({ user_id }, (err, accounts) => {
    if (err) {
      return res
        .status(404)
        .json({ message: `Can\`t find user with id ${id}` });
    }
    res.send(accounts);
  });
}

function getAccountByID(req, res) {
  const id = req.params.id;

  Account.findById(id, (err, account) => {
    if (err) {
      return res
        .status(404)
        .json({ message: `Can\`t find user with id ${id}` });
    }
    res.send(account);
  });
}

function addAccount(req, res) {
  const data = req.body;
  const account = new Account({
    ...data,
    user_id: req.active_user._id,
  });

  account
    .save()
    .then((el) => res.send(el))
    .catch((err) => res.status(500).send(err));
}

function updateAccount(req, res) {
  try {
    const user_id = req.active_user._id;
    const _id = req.params.id;

    Account.findOneAndUpdate(
      { _id, user_id },
      req.body,
      { new: true },
      (err, account) => {
        if (err) {
          return res.status(500).send(err);
        }

        if (account === null) {
          return res
            .status(404)
            .json({ message: `Can\`t find account with id ${id}` });
        }
        res.send(account);
      },
    );
  } catch (error) {
    return res.status(403).send(error);
  }
}

function removeAccount(req, res) {
  try {
    const user_id = req.active_user._id;
    const _id = req.params.id;

    Account.findOneAndRemove({ _id, user_id }, (err, account) => {
      if (err) {
        return res.status(500).send(err);
      }

      if (account === null) {
        return res
          .status(404)
          .json({ message: `Can\`t find account with id ${id}` });
      }
      res.status(200).send(null);
    });
  } catch (error) {
    return res.status(403).send(error);
  }
}

module.exports = {
  getUserAccounts,
  getAccountByID,
  addAccount,
  updateAccount,
  removeAccount,
};
