const {Router} = require("express")
const { updateSong, deleteSong, showSongs, ShowSong, addSong, uploadSongImage, uploadSongAudio} = require("../controllers/songs.controller");
const { auth, authorize } = require("../middleware/auth");
const upload = require("../middleware/upload");
const router = Router();

router.get("/" , showSongs)
router.get("/:id" , ShowSong)
router.post("/" , auth , authorize(true) ,addSong)
router.post("/image/:id" , upload.single("songImage") , uploadSongImage)
router.post("/audio/:id" , upload.single("songsAudio"), uploadSongAudio)
router.patch("/:id" , updateSong)
router.delete("/:id" , deleteSong)


module.exports = router;
// router.post("/files/:id", upload.fields([
//     { name: 'songsAudio', maxCount: 1 },
//     { name: 'songImage', maxCount: 1 }
// ]), uploadSongFiles);