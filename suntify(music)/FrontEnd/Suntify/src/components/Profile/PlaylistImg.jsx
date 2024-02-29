import React, { useState } from 'react';
import axios from 'axios';
import { api } from '../../config/API';
import styles from "./PlaylistShowPro.module.css"

export default function PlaylistImg({ playlistId, updatePlaylistImage }) {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('playlistImage', image);

      const response = await axios.post(`${api}/playlist/image/${playlistId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.status === 200) {
        updatePlaylistImage(playlistId, response.data.imageUrl);
      }
      console.log("its up");
      location.reload()
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Error uploading playlist image.');
    }
  };

  return (
    <div className={styles.overlay}>
      <input type="file" id="imageProfile" name="image" onChange={handleImageChange} />
      <button onClick={handleUpload}>Upload Image</button>
    </div>
  );
}
