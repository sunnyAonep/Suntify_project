const { Songs } = require("../models/songs.model");
const { Playlist } = require("../models/playlist.model");
const { User } = require("../models/users.model");


const searchSong = async (req, res, next) => {
    try {
      const name = req.query.name;
      const songs = await Songs.find({
        song_name: { $regex: name, $options: 'i' },
      }).populate('artistId', 'fullName');
      if (songs.length === 0) {
        return res.status(404).json({ status: 'error', message: 'No songs found' });
      }
  
      res.status(200).json({
        status: 'success',
        data: {
          Song: songs 
        },
      });
    } catch (err) {
      next(err);
    }
  };

const searchPlaylist = async (req, res, next) => {
  try {
    const { name } = req.query;

    const playlists = await Playlist.find({
      title: { $regex: name, $options: 'i' },
    }).populate('userId', 'fullName');

    if (playlists.length === 0)
      throw new res.send('No playlist found', 404);

    res.status(200).json({
      status: 'success',
      data: {
        Song: playlists 
      },
    });
  } catch (err) {
    next(err);
  }
};

const searchArtist = async (req, res, next) => {
  try {
    const { name } = req.query;

    const artists = await User.find({
      firstName: { $regex: name, $options: 'i' },
      artist: true,
    });

    if (artists.length === 0) {
      return res.status(404).send('No artist found');
    }

    const artistIds = artists.map(artist => artist._id);

    const artistsSongs = await Songs.find({
      artistId: { $in: artistIds } // Find songs where artistId is in artistIds array
    });

    res.status(200).json({
      status: 'success',
      data: {
        Song: artistsSongs 
      },
    });

  } catch (err) {
    next(err);
  }
};

module.exports = {searchArtist , searchPlaylist , searchSong}