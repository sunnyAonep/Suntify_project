import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { api } from '../../config/API';
import { audioContext } from '../../context/AudioProvider';
import styles from "./ShowSingelsSongsInPlaylist.module.css"
export default function ShowSongsInSinglePlaylist({ songs, onDelete }) {
  const { id } = useParams();
  const { setAudio } = useContext(audioContext);

  const getSongUrl = (url)=>{
    setAudio(url)
  }

  const handleDeleteSongFromPlaylist = async () => {
    try {
      const data = {
        songId: songs._id,
        playlistId: id
      };

      await axios.patch(`${api}/playlist/delete`, data, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });

      console.log('Song deleted from playlist successfully:', songs._id);
      onDelete(songs._id); 
    } catch (error) {
      console.error('Error deleting song from playlist:', error);
    }
  };

  return (
    <div>
      <div className={styles.song_info} onClick={()=>getSongUrl(songs.audioUrl)}>
        <img src={songs.imgUrl} alt="Song Cover" className={styles.song_cover_image} />
        <div className={styles.song_details}>
        <div className={styles.song_titles}>
          <h2 className={styles.song_name}>{songs.song_name}</h2>
          <p className="song-category">Category: {songs.cotegory}</p>
          </div>
          {/* <button className="play-button" onClick={()=>getSong(songs.audioUrl)} id="play-pause-button"> */}
        {/* </button> */}
          <button onClick={handleDeleteSongFromPlaylist}>Delete</button>
        </div>
      </div>
      
    </div>
  );
}