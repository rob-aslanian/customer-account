const jwt = require('jsonwebtoken');
const process = require('process');

const userController = require('../controllers/user.controller');
const accountController = require('../controllers/account.controller');
const authController = require('../controllers/auth.controller');
const API_PATH = '/api/v1';

const verifyToken = (req, res, next) => {
  let accessToken = req.headers['authorization'];

  if (!accessToken) {
    return res.status(403).send({
      message: 'Missing Authorization header',
    });
  }

  try {
    const token = accessToken.split(' ')[1];
    const user = jwt.verify(token, process.env.ACCESS_TOKEN).user;

    req.active_user = user;
    next();
  } catch (e) {
    return res.status(401).send();
  }
};
module.exports = function (app) {
  // __ ACCOUNT __ //
  app.get(
    `${API_PATH}/accounts/:user_id`,
    accountController.getUserAccounts,
  );
  app.get(
    `${API_PATH}/account/:id`,
    accountController.getAccountByID,
  );
  app.post(
    `${API_PATH}/account`,
    verifyToken,
    accountController.addAccount,
  );
  app.put(
    `${API_PATH}/account/:id`,
    verifyToken,
    accountController.updateAccount,
  );
  app.delete(
    `${API_PATH}/account/:id`,
    verifyToken,
    accountController.removeAccount,
  );

  // __ USERS __ //
  app.get(`${API_PATH}/users`, userController.getAllUsers);
  app.get(`${API_PATH}/users/:id`, userController.getUserByID);
  app.put(`${API_PATH}/user`, verifyToken, userController.updateUser);
  app.delete(
    `${API_PATH}/user`,
    verifyToken,
    userController.deleteUser,
  );

  // __ UPLOAD __ //
  app.post(
    `${API_PATH}/upload`,
    verifyToken,
    userController.uploadAvatar,
  );

  // __ AUTH __ //
  app.post(`${API_PATH}/auth/register`, authController.register);
  app.post(`${API_PATH}/auth/sign_in`, authController.signIn);
};
