import React, { useState, useEffect, createContext, useContext, useRef } from "react";
import { FaPlay, FaPause, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import styles from "./Music-Player.module.css"
import { audioContext } from "../context/AudioProvider";
export default function Player() {
  const { audio } = useContext(audioContext);
  const AudioRef = useRef(null)
   
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [volume, setVolume] = useState(0.5);
//   const [currentTime, setCurrentTime] = useState(0);
//   const [duration, setDuration] = useState(0);
//   console.log({ audio });
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTime(player.currentTime);
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [player]);

  useEffect(() => {
    AudioRef.current.play()
  }, [audio]);

//   const togglePlayPause = () => {
//     if (isPlaying) {
//       player.pause();
//     } else {
//       player.play();
//     }
//     setIsPlaying(!isPlaying);
//   };

//   const handleVolumeChange = (e) => {
//     setVolume(e.target.value);
//   };

//   const handleSeekBarChange = (e) => {
//     setCurrentTime(e.target.value);
//     player.currentTime = e.target.value;
//   };

//   const formatTime = (time) => {
//     const minutes = Math.floor(time / 60);
//     const seconds = Math.floor(time % 60);
//     return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//   };

  return (
    <div className="player">
      {/* <div className="time-control">
        <p>{formatTime(currentTime)}</p>
        <input
          type="range"
          value={currentTime}
          max={duration}
          onChange={handleSeekBarChange}
        />
        <p>{formatTime(duration)}</p>
      </div> */}
      {/* <div className="play-control">
                <button onClick={togglePlayPause}>
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button>
                    <FaAngleLeft />
                </button>
                <button>
                    <FaAngleRight />
                </button>
                <input
                    type="range"
                    value={volume}
                    min={0}
                    max={1}
                    step={0.1}
                    onChange={handleVolumeChange}
                />
            </div> */}
            <br/>
      <audio src={audio} ref={AudioRef} controls id={styles.audio}></audio>
    </div>
  );
}
