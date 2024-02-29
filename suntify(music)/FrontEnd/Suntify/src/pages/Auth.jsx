import React, { useContext, useState } from 'react'
import Register from '../components/Auth/Register'
import Login from '../components/Auth/Login'
import { userContext } from '../context/UserProvider'
import styles from "./Auth.module.css"
export default function Auth() {
  const {logOut , user} = useContext(userContext)
  const [showLogin, setShowLogin] = useState(true);

  const toggleForm = () => {
    setShowLogin(!showLogin); 
  };
  return (
    <div>
      <br />
      {showLogin? 
      <div className={styles.register}>
        <div className={styles.coust} >
        <h1>Suntify</h1>
        <div>
        <button onClick={toggleForm} className={styles.AuthButton}>Login</button>
        </div>
        </div>
        <Register toggleForm={toggleForm}/> 
      </div>
      :
        <div className={styles.login}>
      <h1>Suntify</h1>
      <Login toggleForm={toggleForm}/>
      </div> }
    </div>
  )
}
