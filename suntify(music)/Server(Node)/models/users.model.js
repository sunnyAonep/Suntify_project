const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  firstName: { type: String },
  lastName: { type: String },
  role: { type: String, require: false ,default: 'normal'},
  artist: { type: Boolean, require: true },
  email: { type: String, required: true, unique: true },
  profileImg: { type: String, required: false },
  publicId: { type: String, required: false },
  counterSongs: [{ 
    SongsId: { type: mongoose.Types.ObjectId, ref: "Songs" },
    counter: { type: Number, default: 0 }
  }],
  likedSongs: [{ type: mongoose.Types.ObjectId, ref: "Songs" }],
  playlistIds: [{ type: mongoose.Types.ObjectId, ref: "Playlist" }],
  password: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
module.exports = { User };
