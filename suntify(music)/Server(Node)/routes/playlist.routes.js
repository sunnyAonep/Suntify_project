const { Router } = require("express");
const router = Router();
const {creatPlaylist, addSongToPlaylist , removeSongFromPlaylist, ShowUserPlaylist, deletePlaylist, updatePlaylist, uploadplaylistImage} = require("../controllers/playlist.controller");
const { auth } = require("../middleware/auth");
const upload = require("../middleware/upload");

router.get("/:id", ShowUserPlaylist);
router.post("/", auth ,creatPlaylist);
router.post("/add-song", auth, addSongToPlaylist)
router.post("/image/:id" , upload.single("playlistImage"), uploadplaylistImage)
router.patch("/delete", auth, removeSongFromPlaylist)
router.patch("/edit", updatePlaylist)
router.delete("/:id", deletePlaylist);

module.exports = router;