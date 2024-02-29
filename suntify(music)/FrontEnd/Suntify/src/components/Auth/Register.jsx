import React, { useContext } from "react";
import { userContext } from "../../context/UserProvider";
import { Link } from "react-router-dom";
import { Box, Button, MenuItem, TextField, Typography } from "@mui/material";
import styles from "./AuthRegisterAndLogin.module.css"

export default function Register({ toggleForm }) {
  const { changeHandler, handleRegister } = useContext(userContext);
  const artist = [
    {
      value: true,
      label: "yes",
    },
    {
      value: false,
      label: "no",
    },
  ];
  return (
    <div className={styles.auth}>
    <div className={styles.thing}> 
  <div className={styles.background}>
    <div className={styles.shape}></div>
    <div className={styles.shape}></div>
  </div>
      <form
        onSubmit={handleRegister}
        className={styles.theForm}
        >
        <h4>register Here</h4>
        <label className={styles.formLabel} htmlFor="fullname">First Name</label>
        <input 
        className={styles.formInput}
          type="text"
          placeholder="First Name"
          id="firstName"
          name="firstName"
          onChange={changeHandler}
        />
        <input 
        className={styles.formInput}
          type="text"
          placeholder="Last Name"
          id="lastName"
          name="lastName"
          onChange={changeHandler}
        />

        <label className={styles.formLabel} htmlFor="email">Email</label>
        <input 
        className={styles.formInput}
          type="email"
          placeholder="Email"
          id="email"
          name="email"
          onChange={changeHandler}
        />

        <label className={styles.formLabel} htmlFor="password">Password</label>
        <input 
        className={styles.formInput}
          type="password"
          placeholder="Password"
          id="password"
          name="password"
          onChange={changeHandler}
        />

        <div>
          <label className={styles.formLabel} htmlFor="artist">Are you an artist?</label>
          <select
            id="artist"
            name="artist"
            defaultValue={false}
            onChange={changeHandler}
          >
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </div>
        <button type="submit" className={styles.FormButton}>Submit</button>
      </form></div>
       <form className={styles.MobileAuth} onSubmit={handleRegister} style={{ maxWidth: '400px', margin: 'auto' }}>
   <Box sx={{ '& .MuiTextField-root': {background: "#333", marginBottom: '1.5rem', width: '100%' } }} noValidate autoComplete="off">
     <TextField
       id="firstName"
       label="First Name"
       type="text"
       name="firstName"
       variant="outlined"
       onChange={changeHandler}
       fullWidth
     />
     <TextField
       id="lastName"
       label="Last Name"
       type="text"
       name="lastName"
       variant="outlined"
       onChange={changeHandler}
       fullWidth
     />
     <TextField
       id="email"
       label="Email"
       type="email"
       name="email"
       variant="outlined"
       onChange={changeHandler}
       fullWidth
     />
     <TextField
       id="password"
       label="Password"
       type="password"
       name="password"
       variant="outlined"
       onChange={changeHandler}
       fullWidth
     />
     <TextField
       id="artist"
       label="Are you an artist?"
       select
       name="artist"
       defaultValue={false}
       variant="outlined"
       onChange={changeHandler}
       fullWidth
     >
       {artist.map((option) => (
         <MenuItem key={option.value} value={option.value}>
           {option.label}
         </MenuItem>
       ))}
     </TextField>
     <Button variant="contained" type="submit">
       Submit
     </Button>
   </Box>
   <Typography variant="body2">Already have an account? <a onClick={toggleForm}>Login</a></Typography>
 </form>
    </div>
  );
}

// <form onSubmit={handleRegister} style={{ maxWidth: '400px', margin: 'auto' }}>
//   <Box sx={{ '& .MuiTextField-root': {background: "#333", marginBottom: '1.5rem', width: '100%' } }} noValidate autoComplete="off">
//     <TextField
//       id="firstName"
//       label="First Name"
//       type="text"
//       name="firstName"
//       variant="outlined"
//       onChange={changeHandler}
//       fullWidth
//     />
//     <TextField
//       id="lastName"
//       label="Last Name"
//       type="text"
//       name="lastName"
//       variant="outlined"
//       onChange={changeHandler}
//       fullWidth
//     />
//     <TextField
//       id="email"
//       label="Email"
//       type="email"
//       name="email"
//       variant="outlined"
//       onChange={changeHandler}
//       fullWidth
//     />
//     <TextField
//       id="password"
//       label="Password"
//       type="password"
//       name="password"
//       variant="outlined"
//       onChange={changeHandler}
//       fullWidth
//     />
//     <TextField
//       id="artist"
//       label="Are you an artist?"
//       select
//       name="artist"
//       defaultValue={false}
//       variant="outlined"
//       onChange={changeHandler}
//       fullWidth
//     >
//       {artist.map((option) => (
//         <MenuItem key={option.value} value={option.value}>
//           {option.label}
//         </MenuItem>
//       ))}
//     </TextField>
//     <Button variant="contained" type="submit">
//       Submit
//     </Button>
//   </Box>
//   <Typography variant="body2">Already have an account? <a onClick={toggleForm}>Login</a></Typography>
// </form>
