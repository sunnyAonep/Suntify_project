const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
    songs: [{type: mongoose.Types.ObjectId , ref:"Songs"}],
    userId: {type : mongoose.Types.ObjectId, ref: 'User'},
    playlistImg:{type:String , required:false},
    publicId:{type:String , required:false},
    title : {type: String , require:true},
    description: {type: String}
})

const Playlist = mongoose.model("Playlist" , playlistSchema);
module.exports ={Playlist};