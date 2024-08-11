import React, { useEffect, useState } from 'react';
import { Grid, Card, CardMedia, CardContent, Typography, Tooltip, Modal, Button } from '@mui/material';
import { fetchGetDataWithAuth, fetchGetDataWithAuthArrayBuffer, fetchDeleteDataWithAuth, fetchGetBlobDataWithAuth } from 'client/client';
import { useLocation } from 'react-router-dom';
import { Buffer } from 'buffer';
import { PictureOutlined, EditOutlined, DownloadOutlined, DeleteOutlined } from '@ant-design/icons';
import {makeStyles} from '@mui/styles';

const useStyles = makeStyles((theme)=> ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalMain: {
        backgroundColor: theme.palette.background.paper,
        borderRadius: '10px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2,4,3),
        maxHeight: '90%',
        maxWidth: '90%',
        overflow: 'auto',
    },
    closeButton: {
        marginLeft: 'auto',
    },
}));

const PhotoGrid = () => {
  // const [photos, setPhotos] = useState(new Set());
  const [photos, setPhotos] = useState([]);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const albumId = queryParams.get('id');
  const [albumInfo, setAlbumInfo] = useState({});
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState({
    photoContent: '',
    photoDescription: '',
    url: ''
  })
  const handleOpen = ()=> {
    setOpen(true);
  }
  const handleClose = ()=> {
    setOpen(false);
  }
  const handleView = (downloadLink, description, url) => {
    setPhoto({
        photoContent:  downloadLink,
        photoDescription: description,
        url:url
    });
    console.log('view clicked', "alt: ", description, 'open status: ', true, "url: ", url);
    handleOpen();
  };
  const handleDownload = (download_link) => {
    console.log(download_link, 'download clicked');
    fetchGetBlobDataWithAuth(`${download_link}`)
      .then((res) => {
        console.log(res.data);
        const disposition = res?.headers.get('Content-Disposition');
        const match = /filename="(.*)"/.exec(disposition);
        const filename = match ? match[1] : 'downloadedFile';
        const uri = window.URL.createObjectURL(new Blob([res?.data]));
        const link = document.createElement('a');
        link.href = uri;
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => {
        console.log('error downloading photo: ', err.message);
      });
  };
  const handleDelete = (photoId) => {
    console.log(photoId, 'delete clicked');
    const isConfirmed = window.confirm('Are you sure you want to delete the photo?');
    console.log(isConfirmed);
    if (isConfirmed) {
      fetchDeleteDataWithAuth(`/albums/${albumId}/photos/${photoId}/delete`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log('error fetching uri: ', err.message);
        });
      window.location.reload();
    }
  };
  useEffect(() => {
    fetchGetDataWithAuth(`/albums/${albumId}`)
      .then((res) => {
        setAlbumInfo(res?.data);
        const photosList = res?.data?.photos; //Extract list of photos from album data
        //   Fetch individual photo data
        photosList.forEach((photo) => {
          let thumbnail_link = photo?.download_link.replace('/download-photo', '/download-thumbnail');
          fetchGetDataWithAuthArrayBuffer(thumbnail_link).then((res) => {
            // Construct a unique ID for the photo
            const albumPhotoId = `album_${albumId}_photo${photo?.id}`;
            console.log('album_id: ', albumPhotoId);
            // Convert photo to base64 format
            const buffer = Buffer.from(res?.data, 'binary').toString('base64');
            // Update state with the fetched photo
            const temp = {
              album_id: albumId,
              photo_id: photo?.id,
              name: photo?.name,
              description: photo?.description,
              content: buffer,
              download_link: photo?.download_link
            };
            setPhotos((prevPhotos) => ({ ...prevPhotos, [albumPhotoId]: temp }));
            setPhoto({
              url: temp.download_link
            })
          });
        });
      })
      .catch((err) => {
        console.log('error fetching photos: ', err.message);
      });
  }, [albumId]); //Dependency array ensures useEffect runs when album_id changes

  // const samplePhotos = [
  //     {
  //       id: 1,
  //       url: 'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg',
  //       title: 'Sunset Over Mountains',
  //     },
  //     {
  //       id: 2,
  //       url: 'https://images.pexels.com/photos/1461974/pexels-photo-1461974.jpeg',
  //       title: 'Forest Path',
  //     },
  //     {
  //       id: 3,
  //       url: 'https://images.pexels.com/photos/34950/pexels-photo.jpg',
  //       title: 'Beautiful Beach',
  //     },
  //     {
  //       id: 4,
  //       url: 'https://images.pexels.com/photos/355146/pexels-photo-355146.jpeg',
  //       title: 'Snowy Mountains',
  //     },
  //     {
  //       id: 5,
  //       url: 'https://images.pexels.com/photos/462118/pexels-photo-462118.jpeg',
  //       title: 'City Skyline',
  //     },
  //     {
  //       id: 6,
  //       url: 'https://images.pexels.com/photos/1022923/pexels-photo-1022923.jpeg',
  //       title: 'Desert Dunes',
  //     },
  //     {
  //         id: 7,
  //         url: 'https://images.pexels.com/photos/1022923/pexels-photo-1022923.jpeg',
  //         title: 'Majestic Mountains',
  //       },
  //     {
  //       id: 8,
  //       url: 'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg',
  //       title: 'Aurora Borealis',
  //     },
  //     {
  //       id: 9,
  //       url: 'https://images.pexels.com/photos/158607/cairn-fog-mystical-background-158607.jpeg',
  //       title: 'Foggy Forest',
  //     },
  //     {
  //       id: 10,
  //       url: 'https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg',
  //       title: 'Aurora Borealis',
  //     }
  //   ];

  // useEffect(()=>{
  //     const addPhotoAsync = async (link)=>{
  //         await new Promise(resolve => setTimeout(resolve, 1000));

  //         setPhotos(prevPhotos=> new Set([...prevPhotos, link]));
  //     }

  //     const loadPhotos = async () => {
  //         for (const link of photoUrls) {
  //             await addPhotoAsync(link);
  //         }
  //     }
  //     loadPhotos();
  // },[])
  // console.log(photoUrls);
  return (
    <div>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        className={classes.modal}
        >
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <img src={`data:image/jpeg;base64,${photo.photoContent}`} alt={photo.photoDescription}  style={{width: '100%', height: 'auto', flex: 3}}/>
                </div>
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '10px', flex: 1}}>
                <Button onClick={() => handleDownload(photo.url)} className={classes.closeButton}>Download Photo</Button>
                <Button onClick={handleClose} className={classes.closeButton}>Close</Button>
                </div>
            </div>
        </Modal>
      <Typography variant="h4" gutterBottom>
        {albumInfo?.name}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {albumInfo?.description}
      </Typography>
      <Grid container spacing={2}>
        {/* Render each photo */}
        {Object.keys(photos).map((key) => {
          return (
            <Grid item key={key} xs={8} sm={4} md={4} lg={2}>
              <Card>
                <Tooltip title={photos[key]['description']}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={`data:image/jpeg;base64,${photos[key]['content']}`}
                    alt={photos[key]['description']}
                    // {photos[key]['description']}
                  />
                </Tooltip>
                <CardContent>
                  <Tooltip title={photos[key]['description']}>
                    <Typography variant="subtitle1">{photos[key]['name']}</Typography>
                  </Tooltip>
                  <a href="#" onClick={() => handleView(photos[key]['content'], photos[key]['description'], photos[key]['download_link'])} style={{ textDecoration: 'none', textDecorationColor: 'navy', cursor: 'pointer' }}>
                    {' '}
                    <PictureOutlined />{' '}
                  </a>
                  |
                  <a
                    href={`/photo/edit?album_id=${albumId}&photo_id=${photos[key]['photo_id']}&photo_name=${photos[key]['name']}&photo_desc=${photos[key]['description']}`}
                    style={{ textDecoration: 'none', textDecorationColor: 'navy', cursor: 'pointer' }}
                  >
                    {' '}
                    <EditOutlined />{' '}
                  </a>
                  |
                  <a
                    href="#"
                    onClick={() => handleDownload(photos[key]['download_link'])}
                    style={{ textDecoration: 'none', textDecorationColor: 'navy', cursor: 'pointer' }}
                  >
                    {' '}
                    <DownloadOutlined />{' '}
                  </a>
                  |
                  <a
                    href="#"
                    onClick={() => handleDelete(photos[key]['photo_id'])}
                    style={{ textDecoration: 'none', textDecorationColor: 'navy', cursor: 'pointer' }}
                  >
                    {' '}
                    <DeleteOutlined />{' '}
                  </a>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};

export default PhotoGrid;
