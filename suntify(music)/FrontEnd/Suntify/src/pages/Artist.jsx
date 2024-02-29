import React from 'react'
import MakeSongs from '../components/artist/MakeSongs'
import styles from "./Artist.module.css"
import artist from "../assets/imgs/artist.jpg";

export default function Artist() {
  return (
    <div className={styles.artist}>
      <div className={styles.sideImg}>
        <img src={artist} alt="artist" />
      </div>
      <div className={styles.makeSongs}>
        <MakeSongs/>
      </div>
    </div>
  )
}
