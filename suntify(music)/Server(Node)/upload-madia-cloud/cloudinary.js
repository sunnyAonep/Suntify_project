const cloudinary = require("cloudinary");
require('dotenv').config()
cloudinary.config({
    cloud_name: "dzdsii4hw" ,
    api_key: "364391366281316",
    api_secret: process.env.API_SECRET ,
})

const uploadToCloudinary = (path , folder ) =>{
    return cloudinary.v2.uploader.upload(path , {
        folder,
        resource_type:"auto"
    }).then((data)=>{
        return {url: data.url , public_id: data.public_id }
    }).catch((err)=>{
        console.log(err);
    })
}

const removeFromCloudinary = async(public_id)=>{
    await cloudinary.v2.uploader.destroy(public_id , (err , result) =>{
        console.log(result , err);
    })
}

module.exports = {uploadToCloudinary , removeFromCloudinary}