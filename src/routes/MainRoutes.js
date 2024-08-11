import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import MainLayout from 'layout/MainLayout';
// import Albums from 'pages/albums/Albums';

// render - sample page
const AlbumsPage = Loadable(lazy(() => import('pages/albums/Albums')));
const AboutPage = Loadable(lazy(() => import('pages/staticpages/About')));
const AlbumAddPage = Loadable(lazy(() => import('pages/albums/albumAdd')));
const AlbumShowPage = Loadable(lazy(() => import('pages/albums/albumShow')));
const AlbumUploadPage = Loadable(lazy(() => import('pages/albums/albumUpload')));
const AlbumEditPage = Loadable(lazy(() => import('pages/albums/albumEdit')));
const PhotoEditPage = Loadable(lazy(() => import('pages/albums/photoEdit')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <AlbumsPage />
    },
    {
      path: '/about',
      element: <AboutPage />
    },
    {
      path: '/album/add',
      element: <AlbumAddPage />
    },
    {
      path: '/album/show',
      element: <AlbumShowPage />
    },
    {
      path: '/album/upload',
      element: <AlbumUploadPage />
    },
    {
      path: '/album/edit',
      element: <AlbumEditPage />
    },
    {
      path: '/photo/edit',
      element: <PhotoEditPage />
    }
  ]
};

export default MainRoutes;
