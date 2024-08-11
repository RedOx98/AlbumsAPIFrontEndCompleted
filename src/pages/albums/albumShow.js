import React from 'react';
import Header from './albums/header';
import PhotoGrid from './albums/photoGrid';


// const photoUrls = [
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


const Albums = () => {
  
  return (
    <div>
      <Header />
      <div style={{ marginTop: '20px', padding: '20px', marginBottom: '20px' }}>
        <PhotoGrid />
      </div>
    </div>
  );
};

export default Albums;
