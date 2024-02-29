import React, { useContext, useState } from "react";
import { userContext } from "../../context/UserProvider";
import { api } from "../../config/API";
import axios from "axios";
import styles from "./AudioPlayerHome.module.css"
import { audioContext } from "../../context/AudioProvider";
export default function AudioPlayer({ src }) {
  const { userIn} = useContext(userContext);
  const { setAudio } = useContext(audioContext);
  const [counter, setCounter] = useState(0);

  const incrementCounter = async () => {
    const songID = {songId : src._id}
    try {
      const response = await axios.put(`${api}/users/countersongs`,  songID  ,{ 
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`
      }});
    } catch (error) {
      console.error('Error:', error); 
    }
  };

  const getSongUrl = (url) => {
    setAudio(url);
  };

  const addToCounter = () => {
    if(userIn){
      incrementCounter()
    }
  };

  return (
    <div
      className={styles.audio_player_container}
      onClick={() => {
        getSongUrl(src.audioUrl);
        addToCounter();
      }}
    > <img
          src={src.imgUrl}
          alt="Song Cover"
          className={styles.song_cover_image}
        />
    <div className={styles.song_and_artist_info}>
      <div className={styles.song_info}>
          <h2 className={styles.song_name}>{src.song_name}</h2>
          <p className={styles.song_category}>Category: {src.cotegory}</p>
        </div>
      <div className={styles.user_info}>
        <img
          src={src.artistId.profileImg}
          alt="artist img"
          className={styles.song_profile_image}
        />
          <h2 className={styles.user_name}>
          singer: <br />
          {src.artistId.firstName} {src.artistId.lastName}
          </h2>
      </div>
      </div>
    </div>
  );
}
