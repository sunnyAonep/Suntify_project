import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { api } from '../config/API';
import AudioPlayer from '../components/home/AudioPlayer';
import { userContext } from '../context/UserProvider';
import AddSongToPlaylist from '../components/home/AddSongToPlaylist';
import Player from './Music-Player';
import styles from "./Home.module.css";
import sky from "../assets/imgs/skys.jpg";
import space from "../assets/imgs/skys.webp";
import ads from "../assets/imgs/ads.jpg";
import { RiPaypalFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
export default function Home() {
  const { user , userIn } = useContext(userContext);
  const [homeData, setHomeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchingSongData = async () => {
      try {
        const response = await axios.get(`${api}/songs?page=${page}`);
        setHomeData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching song data:', error);
        setError('An error occurred while fetching songs.');
        setLoading(false);
      }
    };
    
    fetchingSongData();
  }, [page]);
  
  const handleNextPage = () => {
    setPage(page + 1);
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };
  return (
    <>
    <div className={styles.explore}>
      <div className={styles.bg}>
        <img src={space} alt="" />
      </div>
      <div className={styles.titles}>
        <div className={styles.capture}>
        <h1>Music <br /> Suntify</h1>
        <p>explore the world <br /> of music</p>
        </div>
        {userIn? <div className={styles.buttons}>
        <Link to={"/Profile"}><button>explore</button></Link>
        <Link to={"/Search"}><button>discover</button></Link>
        </div> :null}
      </div>
    </div>
    <br />
    <div className={styles.cardsAndAds}>
      <div className={styles.ads}>
        <div className={styles.theAds}>
          <h1>come and be a member <br /> of our app</h1>
          <div>
            <h2>to pay:</h2>
          <Link to={"/pay"}><RiPaypalFill/></Link>
          </div>
        </div>
      </div>
      <div className={styles.cardsPart}>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        homeData.map((song) => (
          <div key={song.id} className={styles.cards}>
            <AudioPlayer src={song} />
            <AddSongToPlaylist playlists={user.playlistIds} song={song} />
          </div>
        ))
        )}
        <div className={styles.buttonsHomes}>
        <button onClick={handlePrevPage}>prev</button>
        <button onClick={handleNextPage}>next</button>
        </div>
        <h1>more features will be...</h1>
        </div>
    </div></>
  );
}