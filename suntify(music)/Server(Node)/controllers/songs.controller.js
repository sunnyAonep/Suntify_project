const { sendMail } = require("../config/nodemailer");
const { Songs } = require("../models/songs.model");
const { uploadToCloudinary } = require("../upload-madia-cloud/cloudinary");

const showSongs = async (req, res) => {
  const query = req.query;
  const page = parseInt(req.query.page) || 1; 
  const limit = 3; 
  const skip = (page - 1) * limit; 
  delete query.page;
  try {
    const songs = await Songs.find({ ...query })
      .populate("artistId")
      .skip(skip)
      .limit(limit);

    res.send(songs);
  } catch (error) {
    res.status(500).send({ message: "Error retrieving songs", error });
  }
}
const ShowSong = async (req, res) => {
  const { id } = req.params;
  const song = await Songs.find({ _id: id }).populate("artistId");
  res.send(song);
};

const addSong = async (req, res) => {
  const body = req.body;
  try {
    body.artistId = req.user.id;
    const newsong = new Songs(body);
    newsong.id = newsong._id;
    await newsong.save();
    res.send({data:body , id:newsong.id});
  } catch(err) {
    res.status(400).send("Error");
  }
};

const deleteSong = async (req, res) => {
  const { id } = req.params;
  const dalete = await Songs.findByIdAndDelete(id);
  res.send("the song got delete");
};

const updateSong = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  try {
    const update = await Songs.findByIdAndUpdate(id, body, { new: true });
    res.send({ messege: "the change as append", data: update });
  } catch (error) {
    res.status(400).send("Error");
  }
};
const uploadSongImage = async(req ,res)=>{
  try{
      const data = await uploadToCloudinary(req.file.path , "songs-images")
      const saveImg = await Songs.updateOne(
          {_id: req.params.id},
          {
              $set: {
                imgUrl: data.url,
                imgPublicId: data.public_id,
              },
          }
      );
      res.status(200).send("atrist song image upladed with success!")
      // sendMail(req.user , "Songs" ,`Hello ${req.user.firstName} your art song as been uploud to our website to our Suntify App`)
  }catch(err){
      res.status(400).send(err)
  }
}
const uploadSongAudio = async(req ,res)=>{
  try{
      const data = await uploadToCloudinary(req.file.path , "songs-audio")
      const saveAudio = await Songs.updateOne(
          {_id: req.params.id},
          {
              $set: {
                audioUrl: data.url,
                audioPublicId: data.public_id,
              },
          }
      );
      res.status(200).send("atrist song Audio upladed with success!")
  }catch(err){
      res.status(400).send(err)
  }
}
  
  module.exports = { updateSong, deleteSong, showSongs, ShowSong, addSong , uploadSongAudio , uploadSongImage  };
  

  // const uploadSongFiles = async (req, res) => {
  //   try {
  //     console.log(req.files.songImage);
  //       // Upload audio file to Cloudinary
  //       const audioData = await uploadToCloudinary(req.files.songsAudio.path, "song-audio");  
  //       // Upload video file to Cloudinary if it exists
  //       // let videoData = {};
  //       // if (videoFile) {
  //       //     videoData = await uploadToCloudinary(req.files.videoFile.path, "song-video");
  //       //     if (!videoData || !videoData.url) {
  //       //         throw new Error("Failed to upload video file");
  //       //     }
  //       // }
  
  //       // Upload image file to Cloudinary
  //       const imageData = await uploadToCloudinary(req.files.songImage.path, "song-images");
  //       console.log(imageData);
  //       if (!imageData || !imageData.url) {
  //           throw new Error("Failed to upload image file");
  //       }
  
  //       // Update the song document with file URLs
  //       const song = await Songs.findByIdAndUpdate(
  //           req.params.id,
  //           {
  //               $set: {
  //                   audioUrl: audioData.url,
  //                   // videoUrl: videoData.url || null,
  //                   imgUrl: imageData.url
  //               }
  //           },
  //           { new: true }
  //       );
  
  //       if (!song) {
  //           return res.status(404).send("Song not found");
  //       }
  
  //       res.status(200).json({
  //           message: "Song files uploaded successfully",
  //           song: song
  //       });
  //   } catch (err) {
  //       console.error("Error uploading song files:", err);
  //       res.status(500).send("Failed to upload song files" + err.message);
  //   }
  // };


