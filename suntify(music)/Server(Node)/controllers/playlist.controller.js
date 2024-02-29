const { Playlist } = require("../models/playlist.model");
const { User } = require("../models/users.model");
const { uploadToCloudinary } = require("../upload-madia-cloud/cloudinary");
const ShowUserPlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const playlist = await Playlist.findOne({ _id: id })
      .populate("userId")
      .populate("songs");
    if (!playlist) {
      return res.status(404).json({ error: "Playlist not found" });
    }
    res.send(playlist);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const creatPlaylist = async (req, res) => {
  const body = req.body;
  try {
    body.userId = req.user.id;
    const newPlaylist = new Playlist(body);
    newPlaylist.id = newPlaylist._id;
    await newPlaylist.save();

    await User.findByIdAndUpdate(
      req.user.id,
      { $push: { playlistIds: newPlaylist._id } },
      { new: true }
    );
    res.send(body);
  } catch {
    res.status(400).send("Error");
  }
};

const addSongToPlaylist = async (req, res) => {
  const { playlistId, songId } = req.body;

  if (!playlistId || !songId)
    return res
      .status(400)
      .send({ message: "Both playlistId and songId are required." });

  try {
    const user = await User.findById(req.user.id);
    const playlist = await Playlist.findById(playlistId);

    if (!user._id.equals(playlist.userId))
      return res
        .status(403)
        .send({ message: "User doesn't have access to add!" });

    if (playlist.songs.includes(songId))
      return res
        .status(400)
        .send({ message: "Song already exists in the playlist." });

    const data = await Playlist.findByIdAndUpdate(playlistId, {
      $push: { songs: songId },
    });

    res.status(200).send({ data });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const removeSongFromPlaylist = async (req, res) => {
  const { playlistId, songId } = req.body;

  if (!playlistId || !songId)
    return res
      .status(400)
      .send({ message: "Both playlistId and songId are required." });

  try {
    const user = await User.findById(req.user.id);
    const playlist = await Playlist.findById(playlistId);

    if (!user._id.equals(playlist.userId))
      return res
        .status(403)
        .send({ message: "User doesn't have access to remove from playlist." });

    const index = playlist.songs.indexOf(songId);
    if (index === -1)
      return res
        .status(404)
        .send({ message: "Song not found in the playlist." });

    playlist.songs.splice(index, 1);
    await playlist.save();

    res.status(200).send({ message: "Song removed from playlist" });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const updatePlaylist = async (req, res) => {
  const body = req.body;
  const { id } = req.params;
  await Playlist.findByIdAndUpdate(id, body, { new: true });
  res.send(body);
};

const deletePlaylist = async (req, res) => {
  const { id } = req.params;
  const dalete = await Playlist.findByIdAndDelete(id);
  res.send("the song got delete");
};

const uploadplaylistImage = async (req, res) => {
  try {
    const data = await uploadToCloudinary(req.file.path, "playlist-images");
    const saveImg = await Playlist.updateOne(
      { _id: req.params.id },
      {
        $set: {
          playlistImg: data.url,
          publicId: data.public_id,
        },
      }
    );
    res.status(200).send("user image upladed with success!");
  } catch (err) {
    res.status(400).send(err);
  }
};

module.exports = {
  creatPlaylist,
  addSongToPlaylist,
  removeSongFromPlaylist,
  ShowUserPlaylist,
  deletePlaylist,
  updatePlaylist,
  uploadplaylistImage,
};
