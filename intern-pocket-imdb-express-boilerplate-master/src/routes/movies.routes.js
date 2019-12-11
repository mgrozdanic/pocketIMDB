const express = require('express');

const router = express.Router();

const {
  index, show, destroy, store, update, userActionDo, addView, addComment, getComments
} = require('./../services/movies.service');

router.post('/movies', async (req, res) => res.send(await store(req.body)));
router.post('/movies/action', async (req, res) => {
  const bearer = req.headers.authorization.split(" ");
  res.send(await userActionDo(req.body, bearer[1]))});
router.post('/movies/view', async (req, res) => res.send(await addView(req.body)));
router.post('/movies/comment', async (req, res) => {
  const bearer = req.headers.authorization.split(" ");
  res.send(await addComment(bearer[1], req.body.movie, req.body.comment));
});
router.post('/movies/comments/', async(req, res) => res.send(await getComments(req.body)));
router.get('/movies/:page', async (req, res) => {
  const bearer = req.headers.authorization.split(" ");
  res.send(await index(req.params.page, bearer[1]))});
router.get('/movies/:id', async (req, res) => res.send(await show(req.params.id)));
router.delete('/movies/:id', async (req, res) => res.send(await destroy(req.params.id)));
router.put('/movies/:id', async (req, res) => res.send(await update(req.params.id, req.body)));


module.exports = router;
