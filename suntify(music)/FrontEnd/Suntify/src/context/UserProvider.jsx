import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import {api} from '../config/API'
export const userContext = createContext()

export default function UserProvider({children}) {
    const [audio ,setAudio] = useState();
    const [userData , setUserData] = useState([]);
    const [user , setUser] = useState([]);
    const [userIn , setUserIn] = useState(false);
    const changeHandler= (e)=>{
      userData[e.target.name] = e.target.value;
      setUserData({ ...userData });
      console.log(userData);
    }

    const handleChangePassword = async (formData) => {
      if (formData.password !== formData.passwordConfirm) {
        setPasswordError('Passwords do not match');
        return;
      }
      try {
        const response = await axios.put(`${api}/users/forgot`, formData);
  
        if (response.status === 200) {
          console.log(response.data.message);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const handleRegister = async (event) => {
      event.preventDefault()        
      try {
        const response = await axios.post(`${api}/users/register`, userData);
        console.log('Registration successful');
      } catch (error) {
        console.error('Registration failed:', error);
      }
    };

  
    const handleLogin = async (event) => {
      try {
          const response = await axios.post(`${api}/users/login`, userData);
          if(response.data.message ==="User not found"){
            return alert("user not found")
          }
          console.log('Login successful');
          localStorage.setItem("token", response.data.token);
          setUser(response.data.user);
          setUserIn(true);
        } catch (error) {
          console.error('Login failed:', error);
      }
  };

      
      const logOut = ()=>{
        localStorage.removeItem("token")
        setUser(null)
        setUserIn(false)
        console.log("U log-out");
      }
      
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`${api}/users/userdb`, {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`
            }
          });
          setUser(response.data);
          setUserIn(true);
        } catch (error) {
          console.error('Error fetching user data:');
        }
      };

      useEffect(()=>{
        fetchUserData()
      },[])

      const shared = {
        audio,
        setAudio,
        userIn,
        user,
        logOut,
        changeHandler,
        handleRegister,
        handleLogin,
        fetchUserData,
        handleChangePassword
      };
  return <userContext.Provider value={shared}>{children}</userContext.Provider>;
}
