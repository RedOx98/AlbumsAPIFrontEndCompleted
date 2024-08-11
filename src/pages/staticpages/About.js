// material-ui
import React from 'react';
import { Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';

// ==============================|| SAMPLE PAGE ||============================== //



const About = () => {

  return(
  <MainCard title="About">
    <Typography variant="body2">
      About Olahammed and React!
    </Typography>
  </MainCard>
)};

export default About;