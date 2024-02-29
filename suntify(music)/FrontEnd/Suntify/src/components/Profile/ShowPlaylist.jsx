import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../../config/API";
import ShowSongsInSinglePlaylist from "./ShowSongsInSinglePlaylist";
import { Link } from 'react-router-dom'
import styles from "./ShowPlaylist.module.css"
export default function ShowPlaylist() {
  const { id } = useParams();
  const [playlistData, setPlaylistData] = useState([]);
  const [songsData, setSongsData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${api}/playlist/${id}`);
      setPlaylistData(response.data);
      setSongsData(response.data.songs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  const handleDeleteSong = (deletedSongId) => {
    const updatedSongsData = songsData.filter(song => song._id !== deletedSongId);
    setSongsData(updatedSongsData); 
  };
  return (
    <div className={styles.PlaylistInfoContainer}>
  {playlistData && (
    <>
    <div className={styles.playlist_info}>
      <img
        src={playlistData.playlistImg}
        alt="playlist img"
        className={styles.playlist_image}
      />
      <div className={styles.playlist_details}>
        <div>
        <h2 className={styles.playlist_name}>title: {playlistData.title}</h2>
        <p className={styles.playlist_description}>
          desc: {playlistData.description}
        </p> 
        </div>
        
        <div className={styles.back_button_div}>
          <Link to="/Profile">
          <button className={styles.back_button}>Back</button>
        </Link>
        </div>
        
      </div>
      </div>
      <div>
        <h1 className={styles.h1_style}>songs:</h1>
        {songsData.length > 0
          ? songsData.map((songs, index) => (
              <ShowSongsInSinglePlaylist songs={songs} onDelete={handleDeleteSong} key={index} />
            ))
          : null}
      </div>
    </>
  )}
</div>
  );
}
