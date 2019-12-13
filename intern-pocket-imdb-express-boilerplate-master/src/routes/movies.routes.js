const express = require('express');

const router = express.Router();

const {
  index, show, destroy, store, update, userActionDo, addView, addComment, getComments, getMostPopular,
  getRelated, watchListAddRemove
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
router.post('/movies/watchlist', async(req, res) => {
  const bearer = req.headers.authorization.split(" ");
  res.send(await watchListAddRemove(bearer[1], req.body.movie, req.body.action));
});
router.get('/movies/mywatchlist', async(req, res) => {
  console.log("TU SAM POSLAO SI KAKO TREBA");
});
router.post('/movies/related', async(req, res) => res.send(await getRelated(req.body.genre)));
router.get('/movies/mostpopular', async(req, res) => {
  const bearer = req.headers.authorization.split(" ");
  res.send(await getMostPopular(bearer[1]));
});
router.get('/movies/:page/:filter/:search', async (req, res) => {
  const bearer = req.headers.authorization.split(" ");
  res.send(await index(req.params.page, req.params.filter, req.params.search, bearer[1]))});
router.get('/movies/:id', async (req, res) => res.send(await show(req.params.id)));
router.delete('/movies/:id', async (req, res) => res.send(await destroy(req.params.id)));
router.put('/movies/:id', async (req, res) => res.send(await update(req.params.id, req.body)));


module.exports = router;
