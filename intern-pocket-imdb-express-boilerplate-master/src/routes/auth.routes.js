const express = require('express');

const router = express.Router();

const {
  me, register, login, logout, refresh, checkUnique, verify, updateUser, matchingPassword, updatePassword
} = require('./../services/user.service');

router.get('/auth/me', (req, res) => res.json(me(req.user)));
router.post('/auth/unique', async (req, res) => res.send(await checkUnique(req.body.email)));
router.post('/auth/register', (req, res) => register(req.body)
  .then(data => res.json(data))
  .catch(err => res.json(err, 500)));
router.post('/auth/verify', async (req, res) => res.send(await verify(req.body)))
router.post('/auth/login', (req, res) => login(req.body)
  .then(data => res.json(data))
  .catch(err => res.json(err.message, 500)));
router.put('/auth/update', async(req, res) => {
  const bearer = req.headers.authorization.split(" ");
  res.send( await updateUser(bearer[1], req.body));
});
router.put('/auth/passwordupdate', async(req, res) => res.send(await updatePassword(req.body)));
router.post('/auth/password', async (req, res) => res.send(await matchingPassword(req.body)));
router.post('/auth/logout', (req, res) => res.json(logout()));
router.post('/auth/refresh', (req, res) => res.json(refresh()));

module.exports = router;
