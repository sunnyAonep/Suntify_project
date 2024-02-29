import React, { useContext } from 'react';
import { userContext } from '../context/UserProvider';
import GetUserDetials from '../components/Profile/GetUserDetials';
import CreatePlaylist from '../components/Profile/CreatePlaylist';
import PlaylistShow from '../components/Profile/PlaylistShow';
import styles from "./Profile.module.css"
import Graph from '../components/Profile/Graph';
export default function Profile() {
  const { user } = useContext(userContext);
  console.log(user);
  return (
    <div>
      <GetUserDetials user={user} />
      <br />
      <CreatePlaylist />
      <br />
      {user.playlistIds && 
      <div className={styles.playlistShowGrid}>
      <h2>playlist</h2>
      <PlaylistShow />
      </div>}
      <div>
        <h2>graphs</h2>
        <Graph/>
      </div>
    </div>
  );
}