import React, { useContext, useState } from "react";
import { userContext } from "../../context/UserProvider";
import { Link } from "react-router-dom";
import ForgotPassWord from "./ForgotPassWord";
import { Box, Button, TextField } from "@mui/material";
import { IoSend } from "react-icons/io5";
import styles from "./AuthRegisterAndLogin.module.css"
export default function Login({toggleForm}) {
  const { changeHandler, handleLogin } = useContext(userContext);
  const [forgotPass , setForgotPass] = useState(false)
  const [data ,setData] = useState([])

  const changeHandlerPassWord= (e)=>{
    data[e.target.name] = e.target.value;
    setData({ ...data });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.passwordConfirm !== data.password) {
      alert('Passwords do not match')
      return;
    }
    handleLogin()
  }
  return (
    <div className={styles.auth}>
  <div className={styles.thing}>
  <div className={styles.background}>
    <div className={styles.shape}></div>
    <div className={styles.shape}></div>
  </div>
  <form onSubmit={handleSubmit} onChange={changeHandler} className={styles.theForm} >
    <h3>Login Here</h3>

    <label className={styles.formLabel} htmlFor="email">Email</label>
    <input className={styles.formInput} type="email" placeholder="Email" id="email" name="email" />

    <label className={styles.formLabel} htmlFor="password">Password</label>
    <input className={styles.formInput} type="password" placeholder="Password" id="password" name="password" onChange={changeHandlerPassWord}/>
    <input className={styles.formInput} type="password" placeholder="passwordConfirm" id="password" name="passwordConfirm"onChange={changeHandlerPassWord}/>
    <button type="submit" className={styles.FormButton}>Log In</button>
    <div className={styles.social}>
      <div className={styles.go} onClick={toggleForm}>  register</div>
      <Link to={"/Forgot"}><div className={styles.fb}>forgot</div></Link>
    </div>
    </form>
    </div>
    <div className={styles.MobileAuth}>
   <form className={styles.MobileAuth}onSubmit={handleSubmit} onChange={changeHandler} style={{ maxWidth: '400px', margin: 'auto' }}>
     <Box sx={{ '& .MuiTextField-root': {background: "#333", marginBottom: '1.5rem', width: '100%' } }} noValidate autoComplete="off">
       <TextField
         id="email"
         label="Email"
         type="email"
         name="email"
         variant="outlined"
         fullWidth
       />
       <TextField
         id="password"
         label="Password"
         type="password"
         name="password"
         variant="outlined"
         onChange={changeHandlerPassWord}
         fullWidth
       />
       <TextField
         id="passwordConfirm"
         label="Confirm Password"
         type="password"
         name="passwordConfirm"
         variant="outlined"
         onChange={changeHandlerPassWord}
         fullWidth
       />
       <Button variant="contained" type="submit" endIcon={<IoSend />}>
         Send
       </Button>
     </Box>
   </form>
     {forgotPass?<ForgotPassWord/>:null}
   <p>Dont have an account? <a onClick={toggleForm}>register</a></p>
   <p>dont remember? <a onClick={()=>{return setForgotPass(!forgotPass)}}>renew</a></p>
   </div>
   </div>
   
    );
  }
  
  {/* <input type="email" placeholder="email" name="email" />
  // <>
  // <form onSubmit={handleSubmit} onChange={changeHandler} style={{ maxWidth: '400px', margin: 'auto' }}>
  //   <Box sx={{ '& .MuiTextField-root': {background: "#333", marginBottom: '1.5rem', width: '100%' } }} noValidate autoComplete="off">
  //     <TextField
  //       id="email"
  //       label="Email"
  //       type="email"
  //       name="email"
  //       variant="outlined"
  //       fullWidth
  //     />
  //     <TextField
  //       id="password"
  //       label="Password"
  //       type="password"
  //       name="password"
  //       variant="outlined"
  //       onChange={changeHandlerPassWord}
  //       fullWidth
  //     />
  //     <TextField
  //       id="passwordConfirm"
  //       label="Confirm Password"
  //       type="password"
  //       name="passwordConfirm"
  //       variant="outlined"
  //       onChange={changeHandlerPassWord}
  //       fullWidth
  //     />
  //     <Button variant="contained" type="submit" endIcon={<IoSend />}>
  //       Send
  //     </Button>
  //   </Box>
  // </form>
   
  //   {forgotPass?<ForgotPassWord/>:null}
  //   <p>Dont have an account? <a onClick={toggleForm}>register</a></p>
  //   <p>dont remember? <a onClick={()=>{return setForgotPass(!forgotPass)}}>renew</a></p>
  //   </>
  
<input type="password" name="password" placeholder="password" onChange={changeHandlerPassWord}/>
<input
  type="password"
  placeholder="confirm password"
  name="passwordConfirm"
  onChange={changeHandlerPassWord}
/> */}