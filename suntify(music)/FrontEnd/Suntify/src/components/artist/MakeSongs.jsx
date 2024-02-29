import React, { useContext, useState } from "react";
import { userContext } from "../../context/UserProvider";
import { api } from "../../config/API";
import axios from "axios";
import styles from "./MakeSongs.module.css";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { songCategories } from "./category";


export default function MakeSongs() {
  const [songInfo, setSongInfo] = useState({});
  const [songID, setSongID] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [SongAudio, setSongAudio] = useState({});
  const [SongImge, setSongImge] = useState({});
  const [SongData, setSongData] = useState([]);
  const [reload, setReload] = useState(false);

  const changeContactInfoHandler = (e) => {
    songInfo[e.target.name] = e.target.value;
    setSongInfo({ ...songInfo });
  };

  const changeSongHandler = (e) => {
    setSongAudio(e.target.files[0]);
  };
  const changeSongImgHandle = (e) => {
    setSongImge(e.target.files[0]);
  };

  const nextStage = (e) => {
    switch (currentPage) {
      case 1:
        setSongData({ ...SongData, ...songInfo });
        setCurrentPage(currentPage + 1);
        break;
      case 2:
        setSongData({ ...SongData });
        setCurrentPage(currentPage + 1);
        break;
      case 3:
        setSongData({ ...SongData });
        setCurrentPage(currentPage + 1);
        break;
      default:
        break;
    }
  };

  const prevStage = (e) => {
    e.preventDefault();
    setCurrentPage(currentPage - 1);
  };

  const handleSongInfoSubmit = async (e) => {
    e.preventDefault();
    try {
      const req = await axios.post(`${api}/songs`, songInfo, {
        headers: {
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setSongID(req.data);
      console.log("Song created successfully!");
      nextStage();
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  const handleSongAudioSubmit = async (e) => {
    setReload(true);
    e.preventDefault();
    try {
      const AudioData = new FormData();
      AudioData.append("songsAudio", SongAudio);

      const req = await axios.post(
        `${api}/songs/audio/${songID.id}`,
        AudioData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Song audio Added successfully!");
      setReload(false);
      nextStage();
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  const handleSongImgSubmit = async (e) => {
    setReload(true);
    e.preventDefault();
    try {
      const imageData = new FormData();
      imageData.append("songImage", SongImge);

      const req = await axios.post(
        `${api}/songs/image/${songID.id}`,
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Song img Added successfully!");
      setReload(false);
      nextStage();
    } catch (error) {
      console.error("Error creating playlist:", error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} id="Form">
        {currentPage === 1 ? (
          <>
            <div className={styles.input_group}>
              <input
                type="text"
                name="song_name"
                placeholder="Song Name"
                onChange={changeContactInfoHandler}
              />
            </div>
            <div className={styles.input_group}>
              <label htmlFor="category">Category</label>
            <select
                id="category"
                name="cotegory"
                defaultValue={"pop"}
                onChange={changeContactInfoHandler}
                className={styles.input_group}
            >
                {songCategories.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            </div>
            <button type="button" onClick={handleSongInfoSubmit}>
              Next
            </button>
          </>
        ) : currentPage === 2 ? (
          <>
            {reload ? (
              <div>
                <Backdrop
                  sx={{
                    color: "#fff",
                    zIndex: (theme) => theme.zIndex.drawer + 1,
                  }}
                  open={open}
                >
                  <CircularProgress color="inherit" />
                </Backdrop>
              </div>
            ) : (
              <>
                <h1>Upload Your Song:</h1>
                <div className={styles.input_group}>
                  <input
                    type="file"
                    id="audioProfile"
                    name="audio"
                    onChange={changeSongHandler}
                  />
                </div>
                <button type="button" onClick={handleSongAudioSubmit}>
                  Next
                </button>
              </>
            )}
          </>
        ) : currentPage === 3 ? (
          <>
            {reload ? (
              <div>
              <Backdrop
                sx={{
                  color: "#fff",
                  zIndex: (theme) => theme.zIndex.drawer + 1,
                }}
                open={open}
              >
                <CircularProgress color="inherit" />
              </Backdrop>
            </div>
            ) : (
              <>
                <h1>Upload Your Image:</h1>
                <div className={styles.input_group}>
                  <input
                    type="file"
                    id="imageProfile"
                    name="image"
                    onChange={changeSongImgHandle}
                  />
                </div>
                <button type="button" onClick={handleSongImgSubmit}>
                  Next
                </button>
              </>
            )}
          </>
        ) : currentPage === 4 ? (
          <>
            <button type="submit">Done</button>
            <button type="button" onClick={prevStage}>
              Back
            </button>
          </>
        ) : null}
      </form>
    </div>
  );
}
