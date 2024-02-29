import axios from 'axios'
import React, { useState } from 'react'
import { api } from '../../config/API'
import PlaylistShow from './PlaylistShow'
import { Button, TextField } from '@mui/material'
import styles from "./CreatPlaylist.module.css"
export default function CreatePlaylist({}) {
    const [PlaylistData , setPlaylistData] = useState([])
    const [addPlaylist , setAddPlaylist] = useState(false)
    const playlistChangeHandler= (e)=>{
        PlaylistData[e.target.name] = e.target.value;
        setPlaylistData({ ...PlaylistData });
        console.log(PlaylistData);
       }

       const handleUpload = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${api}/playlist`, PlaylistData, {
                headers: {
                    authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });

            console.log('Playlist created successfully!');
            location.reload()
        } catch (error) {
            console.error('Error creating playlist:', error);
        }
    };
  return (
    <div className={styles.CreatPlaylist}>
      {addPlaylist?<>
    <Button variant="outlined" color="error" onClick={()=>{return setAddPlaylist(!addPlaylist)}}>add playlist</Button>
      <form action="" onChange={playlistChangeHandler} onSubmit={handleUpload} className={styles.CreatPlaylist}>
      <TextField
          id="filled-basic"
          label="Title"
          name="title"
          variant="filled"
          InputProps={{
            style: {
              color: '#000', 
              backgroundColor: 'rgb(83, 83, 83)',
            },
          }}
        />
        <TextField
          id="filled-basic"
          label="Description"
          name="description"
          variant="filled"
          InputProps={{
            style: {
              color: '#000', 
              backgroundColor: 'rgb(83, 83, 83)', 
            },
          }}
        />
      <Button type="submit" >Submit</Button>
    </form></>:
    <Button variant="outlined" onClick={()=>{return setAddPlaylist(!addPlaylist)}}>add playlist</Button>}
    </div>
  )
}
