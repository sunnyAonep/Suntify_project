const { User } = require("../models/users.model");
const bcryptjs = require("bcryptjs");
const { generateToken } = require("../util/jws");
const upload = require("../middleware/upload");
const { uploadToCloudinary } = require("../upload-madia-cloud/cloudinary");
const { sendMail } = require("../config/nodemailer");
const { Songs } = require("../models/songs.model");
const numSaltRounds = process.env.NODE_ENV === "test" ? 1 : 12;

const login= async (req, res) => {
    const body = req.body;
    try {
        const user = await User.findOne({ email: body.email });
        if (!user) {
            return res.send({ message: "User not found" });
        }
        const isPasswordMatch = await bcryptjs.compare(body.password, user.password);
        if (isPasswordMatch) {
            const token = generateToken({id: user.id , email:user.email ,role:user.role})
            return res.send({ message: "Login successful", user: user , token:token});
        } else {
            return res.status(401);
        }
    } catch (error) {
        res.status(400).send("Error");
    }
}
const register= async (req, res) => {
    const body = req.body;
    console.log(body);
    try {
        const hashedPassword = await bcryptjs.hash(body.password, numSaltRounds);
        body.password = hashedPassword;
        const newUser = new User(body);
        newUser.id = newUser._id
        await newUser.save();
        sendMail(body , "welcom to suntify" ,`Hello ${body.firstName} and welcome to our Suntify App`)
        return res.send(body);
    } catch (error) {
        res.status(400).send("Error");
    }
}
const forgotPassword = async (req, res) => {
    const { email, firstName, lastName, password } = req.body;
    try {
        const user = await User.findOne({ email, firstName, lastName });
        if (!user) {
            return res.send({ message: "User not found" });
        }

        const hashedPassword = await bcryptjs.hash(password, 10); 
        user.password = hashedPassword;
        await user.save();
        
        return res.send({ message: "Password updated successfully" });
    } catch (error) {
        console.error("Error in forgotPassword:", error);
        return res.status(500).send({ message: "Internal server error" });
    }
};

const deleteUser = async(req ,res)=>{
    const {id} = req.params
    await User.findByIdAndDelete(id)
    const users = await User.find({})
    res.send(users)
}

const updateUser = async (req, res) => {
    const body = req.body;
    const { id } = req.params;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, body, { new: true });

        if (!updatedUser) {
            return res.status(404).send("User not found");
        }

        res.send(updatedUser);
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal server error");
    }
};


const showUsers = async (req, res) => {
    const query = req.query;
    const user = await User.find({ ...query });
    res.send(user);
  };

const showUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("likedSongs").populate("playlistIds").populate("counterSongs.SongsId");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.send(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
const counter = async (req, res) => {
    const { songId } = req.body;
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const SongID = await Songs.findById(songId);
      if (!SongID) {
        return res.status(404).json({ message: 'Song not found' });
      }
      const songIndex = user.counterSongs.findIndex(item => String(item.SongsId) === String(songId));
      if (songIndex === -1) {
        user.counterSongs.push({ SongsId: songId, counter: 1 });
      } else {
        user.counterSongs[songIndex].counter++;
      }
      await user.save();
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };
  
const uploadUserImage = async(req ,res)=>{
    try{
        //Upload Image to Cloudinary
        const data = await uploadToCloudinary(req.file.path , "user-images")
        //Save Image Url and PubliId to the database
        const saveImg = await User.updateOne(
            {id: req.params.id},
            {
                $set: {
                    profileImg: data.url,
                    publicId: data.public_id,
                },
            }
        );
        res.status(200).send("user image upladed with success!")
    }catch(err){
        res.status(400).send(err)
    }
}

const addLikeSongs = async (req, res) => {
    const { songId } = req.body;
    if (!songId)
        return res.status(400).send({ message: "songId required." });

    try {
        const user = await User.findById(req.user.id);

        if (user.likedSongs.includes(songId))
            return res.status(400).send({ message: "Song already exists in the playlist." });

        // Correct usage: findByIdAndUpdate takes ID as first argument
        const data = await User.findByIdAndUpdate(user.id, { $push: { likedSongs: songId } }, { new: true });

        res.status(200).send({ data });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

const addplaylist = async (req, res) => {
    const { playlistId } = req.body;
    if (!playlistId)
        return res.status(400).send({ message: "playlistId required." });

    try {
        const user = await User.findById(req.user.id);

        if (user.playlistIds.includes(playlistId))
            return res.status(400).send({ message: "playlist already exists in your collection." });

        // Correct usage: findByIdAndUpdate takes ID as first argument
        const data = await User.findByIdAndUpdate(user.id, { $push: { playlistIds: playlistId } }, { new: true });

        res.status(200).send({ data });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}


module.exports = {counter,forgotPassword , showUsers,updateUser,showUsers,showUser,deleteUser ,register , login ,uploadUserImage ,addLikeSongs ,addplaylist}