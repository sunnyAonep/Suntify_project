import React, { useContext, useState } from "react";
import styles from "./ShowSearch.module.css"
import { audioContext } from "../../context/AudioProvider";
export default function ShowSearchList({ song }) {
  const { setAudio } = useContext(audioContext);
  const getSongUrl = (url) => {
    setAudio(url);
  };

  return (
    <div className={styles.songInfo} onClick={() => getSongUrl(song.audioUrl)}>
      <img
        src={song.imgUrl}
        alt="Song Cover"
        className={styles.songCoverImage}
      />
      <div className={styles.songDetails}>
        <h2 className={styles.songName}>{song.song_name}</h2>
        <p className={styles.songCategory}>Category: {song.cotegory}</p>
      </div>
    </div>
  );
}
