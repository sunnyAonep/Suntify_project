import React, { useContext, useEffect, useState } from "react";
import { userContext } from "../../context/UserProvider";
import PlaylistImg from "./PlaylistImg";
import { Link } from "react-router-dom";
import axios from "axios";
import { api } from "../../config/API";
import styles from "./PlaylistShowPro.module.css"
import defaultImg from "../../assets/imgs/defultProfile.jpg";

export default function PlaylistShow() {
  const { user } = useContext(userContext);
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistId] = useState();
  
  useEffect(() => {
    setPlaylists(user.playlistIds);
  }, [user.playlistIds]);

  const handleDeletePlaylist = async (id) => {
    try {
      await axios.delete(`${api}/playlist/${id}`);
      setPlaylists(playlists.filter(playlist => playlist._id !== id));
      console.log("Playlist deleted successfully!");
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  const handlePlaylistClick = (playlistId) => {
    setPlaylistId(playlistId);
  };

  const updatePlaylistImage = (id, imageUrl) => {
    setPlaylists(playlists.map(playlist => playlist._id === id ? { ...playlist, playlistImg: imageUrl } : playlist));
  };

  return (
<div className={styles.playlists}>
  {playlists.map((playlist) => (
    <div key={playlist._id} className={styles.playlistContainer}>
      {playlist.playlistImg ?
        <img src={playlist.playlistImg} alt="Playlist" /> :
        <>
        <img src={defaultImg} alt="Playlist"></img>
      </>}

      <div className={styles.overlay}>
        <button onClick={() => handlePlaylistClick(playlist._id)}>add img</button>
        <h3>{playlist.title}</h3>
        <p>Description: {playlist.description}</p>
        <div id={styles.buttonsProfile}>
        <button onClick={() => handleDeletePlaylist(playlist._id)}>Delete</button>
        <Link to={`/playlist/${playlist._id}`}><button>to playlist</button></Link>
        </div>
      </div>
      {playlistId ? <PlaylistImg playlistId={playlistId} updatePlaylistImage={updatePlaylistImage} /> : null}
    </div>
  ))}
</div>
  );
}
