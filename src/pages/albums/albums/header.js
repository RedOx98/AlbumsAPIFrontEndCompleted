import React from 'react';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { fetchDeleteDataWithAuth } from 'client/client';

const Header = () => {
    const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  console.log(id);

  const handleDelete = (albumId)=> {
    console.log(albumId, "delete clicked");
    const isConfirmed = window.confirm("Are you sure you want to delete the album?")
    if (isConfirmed) {
        fetchDeleteDataWithAuth(`/albums/${albumId}/delete`).then((res)=>{
            console.log(res.data);
        }).catch((err)=>{
            console.log("error fetching uri: ", err.message);
        })
        navigate('/');
        window.location.href = "/";
    }
  };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Photo Gallery
        </Typography>

        <Button
          component={Link}
          to={`/album/edit?id=${id}`}
          color="inherit"
          variant="contained"
          sx={{ mr: 2, backgroundColor: '#799edc', '&:hover': { backgroundColor: '#2f6ad0' } }}
        >
          Edit Album
        </Button>

        <Button
          component={Link}
          to={`/album/upload?id=${id}`}
          color="inherit"
          variant="contained"
          sx={{ mr: 2, backgroundColor: '#4CAF50', '&:hover': { backgroundColor: '#388E3C' } }}
        >
          Upload Photos
        </Button>
        <Button
        onClick={()=>handleDelete(id)}
          color="inherit"
          variant="contained"
          sx={{ mr: 2, backgroundColor: '#F44336', '&:hover': { backgroundColor: '#D32F2F' } }}
        >
          Delete Album
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
