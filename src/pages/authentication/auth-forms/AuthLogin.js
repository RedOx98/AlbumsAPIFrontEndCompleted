import React, {useEffect, useState} from 'react';
import {Button, TextField, Container} from '@mui/material';
import { fetchPostData } from 'client/client';
import {useNavigate} from "react-router-dom"


const AuthLogin = () => {
  const [email, setEmail]= useState('');
  const [password, setPassword]= useState('');
  const [errors, setErrors]= useState({email: '', password: ''});
  // const [loginError, setLoginError]= useState({email: '', password: ''});

  const navigate = useNavigate()

  const validateEmail = (email) => {
    // Improved email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  const validatePassword = (password) => {
    // Ensure password is defined and is a string
    if (typeof password !== 'string') {
      return false;
    }
    // Basic password length validation
    return password.length >= 6 && password.length <= 15;
  }


  const handleLogin = async ()=>{
    // Reset previous errors
    setErrors({email: '', password: ''});

    // Validation

    if (!validateEmail()) {
      console.log(email,password, validateEmail(email));
      setErrors((prevErrors)=> ({
        ...prevErrors, email: "Invalid email format"
      }));
    }

    if (!validatePassword()) {
      setErrors((prevErrors)=> ({
        ...prevErrors, password: "Password must be at least 6 characters"
      }));
    }

    // Add your login logic here
    fetchPostData('/auth/token',{email,password})
    .then((res)=> {
      const {token} = res.data;
      // console.log(token)
      // setLoginError({email: '', password: ''});
      localStorage.setItem('token', token);
      navigate('/');
      window.location.reload();
    })
    .catch((err)=>{
      // Handle other login errors
      // setLoginError('An error occurred during login: ', err)
      console.log(err)
    })
  };
const toke = localStorage.getItem("token");
// console.log(toke);
  useEffect(()=>{
    if (toke !== null) {
      navigate('/');
      window.location.reload();
    }
  },[])

  return (
    <Container component="main" maxwidth="xs">
      <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      label="email"
      value={email}
      onChange={(e)=> setEmail(e.target.value)}
      error={!!errors.email}
      helperText={errors.email}
      />
      <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      label="password"
      type="password"
      value={password}
      onChange={(e)=> setPassword(e.target.value)}
      error={!!errors.password}
      helperText={errors.password}
      />

      <Button variant="contained" color="primary" fullWidth onClick={handleLogin}>Login</Button>
      {/* {
        loginError.email == '' && <p style={{color: 'red'}}>{loginError}</p>
      } */}
    </Container>
  );
};

export default AuthLogin;