import React, { useState } from 'react';
import axios from 'axios';
import { api } from '../../config/API';
import styles from "./AddSongToPlaylist.module.css"
export default function AddSongToPlaylist({ playlists, song }) {
  const [choosenPlaylistId, setChoosenPlaylistId] = useState('');
  const handleSelectChange = (e) => {
    setChoosenPlaylistId(e.target.value);
  };

  const handlePlaylistAddSong = async (event) => {
    event.preventDefault();
    try {
      const data = {
        songId: song._id,
        playlistId: choosenPlaylistId
      };
      console.log(data);
      const response = await axios.post(`${api}/playlist/add-song`, data ,{
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
      console.log('Song added to playlist:', response.data);
      setChoosenPlaylistId('');
    } catch (error) {
        console.log(error.response.data.message);

      console.error('Failed to add song to playlist:', error);
    }
  };

  return (
    <div className={styles.selectContainer}>
        <label htmlFor="playlistSelect">Select Playlist:</label>
        <select className={styles.playlistSelect} value={choosenPlaylistId} onChange={handleSelectChange}>
          <option value="">Select a Playlist</option>
          {playlists &&
            playlists.map((playlist) => (
              <option key={playlist._id} value={playlist._id}>
                {playlist.title}
              </option>
            ))}
        </select>
        <button onClick={handlePlaylistAddSong} className={styles.addButton}>Add</button>
    </div>
  );
}
