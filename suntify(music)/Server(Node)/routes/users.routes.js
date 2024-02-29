const { Router } = require("express");
const router = Router();
const {
  showUsers,
  updateUser,
  register,
  login,
  deleteUser,
  uploadUserImage,
  addLikeSongs,
  showUser,
  addplaylist,
  forgotPassword,
  counter
} = require("../controllers/users.controller");
const upload = require("../middleware/upload");
const { auth } = require("../middleware/auth");

// router.get("/", showUsers);
router.get("/userdb", auth , showUser);
router.patch("/:id", updateUser);
router.post("/like-songs", auth, addLikeSongs);
router.post("/add-playlist", auth, addplaylist);
router.post("/register", register);
router.post("/login", login);
router.put("/forgot" ,forgotPassword);
router.post("/image/:id", upload.single("userImage"), uploadUserImage);
router.delete("/:id", deleteUser);
router.put('/countersongs', auth, counter)

module.exports = router;
