const { Router } = require("express");
const router = Router();
const { searchSong, searchPlaylist, searchArtist } = require('../controllers/search.controller');


router.get('/songs', searchSong);
router.get('/playlist', searchPlaylist);
router.get('/artist', searchArtist);

module.exports = router;