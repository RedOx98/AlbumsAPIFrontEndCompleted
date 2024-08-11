// src/PhotoUpload.js
import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Button, Grid, Typography, Card, CardMedia, CardContent, IconButton, Paper, Container, CircularProgress } from '@mui/material';
import { styled } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadIcon from '@mui/icons-material/Upload';
import Header from './albums/header';
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchPostFileUploadWithAuth } from 'client/client';

const StyledDropzone = styled(Box)({
  border: '2px dashed #ccc',
  borderRadius: '8px',
  padding: '20px',
  textAlign: 'center',
  cursor: 'pointer',
  backgroundColor: '#fafafa',
  '&:hover': {
    backgroundColor: '#f0f0f0'
  }
});

const PhotoUpload = () => {
  const [files, setFiles] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const navigate = useNavigate();
  const [processing, setProcessing]= useState(false);
  console.log(id);

  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles((prevFiles) => [
        ...prevFiles,
        ...acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      ]);
    }
  });

  const handleUpload = async () => {
    setProcessing(true);
    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      await fetchPostFileUploadWithAuth(`/albums/${id}/upload-photos`, formData)
        .then((res) => {
          console.log('Files uploaded successfully! ', res.data);
        })
        .catch((err) => {
          console.log('error with fetching upload: ', err.message);
        });

      setFiles([]);
      navigate(`/album/show?id=${id}`);
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = (fileName) => {
    setFiles(files.filter((file) => file.name !== fileName));
  };

  return (
    <div>
      <Header />
      <Container>
        <Box sx={{ p: 4 }}>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom>
              Upload Photos
            </Typography>
            <StyledDropzone {...getRootProps()}>
              <input {...getInputProps()} />
              <Typography variant="body1">Drag & drop some files here, or click to select files</Typography>
            </StyledDropzone>
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {files.map((file) => (
                <Grid item xs={12} sm={6} md={4} key={file.name}>
                  <Card>
                    <CardMedia component="img" height="140" image={file.preview} alt={file.name} />
                    <CardContent>
                      <Typography variant="body2" color="textSecondary" component="p">
                        {file.name}
                      </Typography>
                      <IconButton onClick={() => handleDelete(file.name)} aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
                <Grid item xs={12}>
              {
                processing ? 
                (
                    <Box textAlign='center'>
                        <CircularProgress/>
                        <Typography
                        variant='body2'
                        color='textSecondary'
                        marginTop='10px'
                        >
                            Uploading...
                        </Typography>
                    </Box>
                )
                :
                (
                    <Button variant="contained" color="primary" startIcon={<UploadIcon />} onClick={handleUpload} sx={{ mt: 2 }} disabled={files.length === 0}>
                Upload
              </Button>
                )
              }
              </Grid>
          </Paper>
        </Box>
      </Container>
    </div>
  );
};

export default PhotoUpload;
