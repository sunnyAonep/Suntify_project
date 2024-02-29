import React, { useContext, useState } from 'react';
import axios from 'axios';
import { api } from '../../config/API';
import { Box, Button, TextField, Typography } from '@mui/material';
import { userContext } from '../../context/UserProvider';
import { Link } from 'react-router-dom';
export default function ForgotPassWord() {
  const {handleChangePassword} = useContext(userContext)
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        passwordConfirm: ''
      });
      const [passwordError, setPasswordError] = useState('');
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
          ...prevState,
          [name]: value
        }));
      };
      const handleSubmit = async (e) => {
        e.preventDefault();
        handleChangePassword(formData)
      }

      // const handleconnect = async (e) => {
      //   e.preventDefault();
      //   if (formData.password !== formData.passwordConfirm) {
      //     setPasswordError('Passwords do not match');
      //     return;
      //   }
      //   try {
      //     const response = await axios.put(`${api}/users/forgot`, formData);
    
      //     if (response.status === 200) {
      //       console.log(response.data.message);
      //     } else {
      //       console.error(response.data.message);
      //     }
      //   } catch (error) {
      //     console.error('Error:', error);
      //   }
      // };
    
      return (
        <div id='forg'>
          <br />
          <form onSubmit={handleSubmit} style={{ maxWidth: '400px', margin: 'auto' }}>
            <Box sx={{ '& .MuiTextField-root': { marginBottom: '1.5rem', width: '100%',  background: "#333"} }} noValidate autoComplete="off">
              <TextField
                id="email"
                label="Email"
                type="email"
                name="email"
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                id="firstName"
                label="First Name"
                type="text"
                name="firstName"
                variant="outlined"
                value={formData.firstName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                id="lastName"
                label="Last Name"
                type="text"
                name="lastName"
                variant="outlined"
                value={formData.lastName}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                id="password"
                label="New Password"
                type="password"
                name="password"
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                fullWidth
              />
              <TextField
                id="passwordConfirm"
                label="Confirm New Password"
                type="password"
                name="passwordConfirm"
                variant="outlined"
                value={formData.passwordConfirm}
                onChange={handleChange}
                fullWidth
              />
              {passwordError && <Typography variant="body2" color="error">{passwordError}</Typography>}
              <Link to="/Auth"><Button variant="contained" type="submit">

                Submit
              </Button></Link>
            </Box>
          </form>
        </div>
      );
    }
