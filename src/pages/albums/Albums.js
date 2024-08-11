// material-ui
import React, {useEffect, useState} from 'react';
import { Grid, Card, CardContent } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {useNavigate, Link} from "react-router-dom"

// project import
// import MainCard from 'components/MainCard';
import { fetchGetDataWithAuth } from 'client/client';





  const brightPopColors = [
    '#9cd425', '#6f1a22', '#637bf7', '#15b7f9', '#adbbc5', '#99b0d4', 
    '#ef5455', '#f95cca', '#b86aba', '#26aa38', '#9e8e19', '#9b7a6a', 
    '#870d27', '#9eb474', '#802138', '#eb307e', '#8a8078', '#79837e', 
    '#fcb7ea', '#6924ca', '#7e580e', '#9a86d0', '#09cd66', '#bf1ee9', 
    '#d7fc55', '#effbf2', '#2e2054', '#c4fa65', '#3ab573', '#bcfb73', 
    '#308f3f', '#548948', '#7ede80', '#65bd97', '#c0c617', '#d2de17', 
    '#326e83', '#1ec5d5', '#c033a5', '#ac2cb6', '#4040ce', '#5fd586', 
    '#08aa7d', '#397de8', '#2e81a5', '#b851f6', '#5c70f2', '#d78234', 
    '#67ce5c', '#fbaa4d', '#4f45af', '#eb5e95'
  ];
  
  
  const getRandomColor = ()=>{
    const randomIndex = Math.floor(Math.random() * brightPopColors.length);
  return brightPopColors[randomIndex];
  }
  console.log(getRandomColor());
  const useStyles = makeStyles((theme)=> ({
    card: {
      backgroundColor: getRandomColor(),
      textAlign: 'center',
      padding: theme.spacing(3),
      borderRadius: theme.spacing(2),
      height: '250px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      cursor: 'pointer',
    },
  }));

  const AlbumDynamicGridPage = ()=> {
    const [dataArray, setDataArray]= useState([]);
    const navigate = useNavigate();
  useEffect(()=>{
    const toke = localStorage.getItem("token");
    if (!toke) {
      navigate('/login')
      window.location.reload();
    }
    fetchGetDataWithAuth('/albums')
  .then((res)=> {
    setDataArray(res.data);
    console.log("Data Array: ", dataArray);
  })
  .catch((err)=> {
    console.log("error with fetch: ", err.message);
  })
  },[]);

  const classes = useStyles();
  return(
  <Grid container spacing={2}>
    {
      dataArray.map((data, index)=> (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Link to={`/album/show?id=${data?.id}`} style={{ textDecoration: 'none' }}>
          <Card className={classes.card} style={{backgroundColor: getRandomColor() }}>
            <CardContent>
              <h1 style={{ fontSize: '2rem', margin: 0, color: 'white' }}>
                {data.name}
              </h1>
            </CardContent>
          </Card>
          </Link>
        </Grid>
      ))
    }
  </Grid>
)
  };

export default AlbumDynamicGridPage;