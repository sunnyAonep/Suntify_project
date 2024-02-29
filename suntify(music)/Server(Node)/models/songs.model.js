const mongoose = require("mongoose");

const songsSchema = new mongoose.Schema({
  artistId: { type: mongoose.Types.ObjectId, ref: "User" },
  id: { type: String},
  song_name: { type: String, require: true },
  cotegory: { type: String, require: true },
  audioPublicId: { type: String },
  audioUrl: { type: String },
  imgPublicId: { type: String },
  imgUrl: { type: String },
});

const Songs = mongoose.model("Songs", songsSchema);
module.exports = { Songs };
