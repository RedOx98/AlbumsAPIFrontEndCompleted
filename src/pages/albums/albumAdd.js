import React, {useEffect, useState} from 'react';
import {Button, TextField } from '@mui/material';
import {useNavigate} from "react-router-dom"
import { fetchPostAddAlbumWithAuth } from 'client/client';


const AddAlbums = () => {
  const navigate = useNavigate()
  useEffect(()=> {
    const isLoggedIn = localStorage.getItem("token");
    if (!isLoggedIn) {
      navigate('/login');
      window.location.reload();
    }
  },[]);


  const [formData, setFormData]= useState({
    name: '',
    description: ''
  });
  const [errors, setErrors]= useState({name: '', description: ''});

  

  const handleChange = (e)=>{
    const {name, value} = e.target;
    setFormData((prevData)=> ({
      ...prevData,
      [name]:value
    }));
    console.log(formData);
  };


  const handleSubmit = async (e)=>{
    e.preventDefault();
    // Validation
    let isValid = true;
    const newErrors = {name: '', decsription: ''};
    if (!formData.name.trim()) {
      newErrors.name = "name is required!";
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "description is required!";
      isValid = false;
    }

    setErrors(newErrors);


    // If form is valid, you can proceed with further actions
    if (isValid) {
      const payload = {
        name: formData.name,
        description: formData.description
      };
      fetchPostAddAlbumWithAuth('/albums/add', payload)
      .then((res)=>{
        console.log(res)
      })
      .catch((err)=> {
        console.log("error with adding album: ",err.message);
      });
      console.log("Form submitted!");
      navigate('/');
    window.location.reload();
    }
  };
const toke = localStorage.getItem("token");
// console.log(toke);
  useEffect(()=>{
    if (!toke) {
      navigate('/login')
      window.location.reload();
    }
  },[])

  return (
    <form onSubmit={handleSubmit}>
      <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      label="Name"
      name="name"
      value={formData.name}
      onChange={handleChange}
      error={!!errors.name}
      helperText={errors.name}
      />
      <TextField
      variant="outlined"
      margin="normal"
      fullWidth
      label="description"
      name="description"
      multiline
      rows="5"
      type="description"
      value={formData.description}
      onChange={handleChange}
      error={!!errors.description}
      helperText={errors.description}
      />

      <Button variant="contained" type="submit" color="primary" fullWidth>Add Album</Button>
      {/* {
        loginError.name == '' && <p style={{color: 'red'}}>{loginError}</p>
      } */}
    </form>
  );
};

export default AddAlbums;