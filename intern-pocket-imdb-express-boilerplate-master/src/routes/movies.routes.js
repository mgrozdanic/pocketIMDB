const express = require('express');

const router = express.Router();

const {
  index, show, destroy, store, update, userActionDo, addView, addComment, getComments, getMostPopular,
  getRelated, watchListAddRemove, getWatchList, movieWatchUnwatch, setToken, messageRecieve, removeToken,
  getOldNotifications, getMyPosition, getPosition
} = require('./../services/movies.service');

const { redisMiddleware } = require('./../services/redis')

router.post('/movies', async (req, res) => {
  const bearer = req.headers.authorization.split(" ");
  res.send(await store(req.body, bearer[1]));
});
router.post('/movies/action', async (req, res) => {
  const bearer = req.headers.authorization.split(" ");
  res.send(await userActionDo(req.body, bearer[1]))});
router.post('/movies/view', async (req, res) => res.send(await addView(req.body))); // treba redis
router.post('/movies/comment', async (req, res) => {
  const bearer = req.headers.authorization.split(" ");
  res.send(await addComment(bearer[1], req.body.movie, req.body.comment));
});
router.post('/movies/token', async(req, res) => {
  const bearer = req.headers.authorization.split(" ");
  res.send(await setToken(bearer[1], req.body.token));
});
router.post('/movies/comments/', async(req, res) => res.send(await getComments(req.body)));
router.post('/movies/watchlist', async(req, res) => { // treba redis
  const bearer = req.headers.authorization.split(" ");
  res.send(await watchListAddRemove(bearer[1], req.body.movie, req.body.action, 
    req.body.currentPage, req.body.myCurrentPage));
});
router.post('/movies/token', async(req, res) => {
  const bearer = req.headers.authorization.split(" ");
  res.send(await setToken(bearer[1], req.body));
});
router.get('/movies/mywatchlist/:title/:filter', async(req, res) => {
  const bearer = req.headers.authorization.split(" ");
  res.send(await getWatchList(bearer[1], req.params.title, req.params.filter));
});
router.post('/movies/watchunwatch', async(req, res) => { // treba redis
  const bearer = req.headers.authorization.split(" ");
  res.send(await movieWatchUnwatch(bearer[1], req.body.movie, req.body.action, 
    req.body.currentPage, req.body.myCurrentPage));
});
router.delete('/movies/removetoken', async(req, res) => {
  const bearer = req.headers.authorization.split(" ");
  res.send(await removeToken(bearer[1]));
});
router.get('/movies/oldnotification', async (req, res) => {
  const bearer = req.headers.authorization.split(" ");
  res.send(await getOldNotifications(bearer[1]))
});
router.post('/movies/notification', async(req, res) => res.send(await messageRecieve(req.body.movie, req.body.to)));
router.post('/movies/related', async(req, res) => res.send(await getRelated(req.body.genre)));
router.get('/movies/mostpopular', async(req, res) => {
  const bearer = req.headers.authorization.split(" ");
  res.send(await getMostPopular(bearer[1]));
});
router.get('/movies/position/:movieId', async(req, res) => res.send(await getPosition(req.params.movieId)));
router.get('/movies/positionmy/:movieId', async(req, res) => {
  const bearer = req.headers.authorization.split(" ");
  res.send(await getMyPosition(bearer[1], req.params.movieId));
});
router.get('/movies/:page/:filter/:search/:flag', redisMiddleware, async (req, res) => { // sklonjen redis middleware
  const bearer = req.headers.authorization.split(" ");
  res.send(await index(req.params.page, req.params.filter, req.params.search, req.params.flag, bearer[1]))});
router.get('/movies/:id', async (req, res) => res.send(await show(req.params.id)));
router.delete('/movies/:id', async (req, res) => res.send(await destroy(req.params.id)));
router.put('/movies/:id', async (req, res) => res.send(await update(req.params.id, req.body)));


module.exports = router;
