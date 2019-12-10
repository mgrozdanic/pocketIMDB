const express = require('express');

const router = express.Router();

const {
  index, show, destroy, store, update,
} = require('./../services/movies.service');

router.get('/movies/:page', async (req, res) => {
  const bearer = req.headers.authorization.split(" ");
  res.send(await index(req.params.page, bearer[1]))});
router.get('/movies/:id', async (req, res) => res.send(await show(req.params.id)));
router.delete('/movies/:id', async (req, res) => res.send(await destroy(req.params.id)));
router.put('/movies/:id', async (req, res) => res.send(await update(req.params.id, req.body)));
router.post('/movies', async (req, res) => res.send(await store(req.body)));

module.exports = router;
