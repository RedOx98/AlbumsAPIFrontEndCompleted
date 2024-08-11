import axios from 'axios';

// const BASE_URL = process.env.REACT_APP_BASE_URL
const API_VERSION = '/api/v1';

const fetchData = async (uri) => {
  const url = `${API_VERSION}${uri}`;
  return axios.get(uri).catch((err) => {
    console.log(`error fetching data from URL: ${url}, Error: ${err.message}`);
    throw err;
  });
};

const fetchPostData = async (uri, payload) => {
  const url = `${API_VERSION}${uri}`;
  return axios.post(url, payload).catch((err) => {
    console.log('error posting data to the url: ', uri, err.message);
    throw err;
  });
};

const fetchDeleteDataWithAuth = async (uri) => {
  const token = localStorage.getItem('token');
  const url = `${API_VERSION}${uri}`;
  return axios
    .delete(url, {
      headers: {
        Authorization: `Bearer ${token}` // Ensure "Bearer" has an uppercase "B"
      }
    })
    .catch((err) => {
      console.log('error fetching for url: ', uri, err.message);
      // You can throw the error again if you wanna handle it elsewhere
      throw err;
    });
};

const fetchPostAddAlbumWithAuth = async (uri, payload) => {
  const token = localStorage.getItem('token');
  const url = `${API_VERSION}${uri}`;
  return axios
    .post(url, payload, {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` // Ensure "Bearer" has an uppercase "B"
      }
    })
    .catch((err) => {
      console.log('error fetching for url: ', uri, err.message);
      // You can throw the error again if you wanna handle it elsewhere
      throw err;
    });
};

const fetchPutDataWithAuth = async (uri, payload) => {
  const token = localStorage.getItem('token');
  const url = `${API_VERSION}${uri}`;
  return axios
    .put(url, payload, {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` // Ensure "Bearer" has an uppercase "B"
      }
    })
    .catch((err) => {
      console.log('error fetching for url: ', uri, err.message);
      // You can throw the error again if you wanna handle it elsewhere
      throw err;
    });
};

const fetchGetDataWithAuth = async (uri) => {
  const token = localStorage.getItem('token');
  const url = `${API_VERSION}${uri}`;
  try {
    const res = await axios.get(url, {
      headers: {
        accept: '*/*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}` // Ensure "Bearer" has an uppercase "B"
      }
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

const fetchGetDataWithAuthArrayBuffer = async (uri) => {
  const token = localStorage.getItem('token');
  const url = `${API_VERSION}${uri}`;
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}` // Ensure "Bearer" has an uppercase "B"
      },
      responseType: "arraybuffer"
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

const fetchPostFileUploadWithAuth = async (uri, payload) => {
  const token = localStorage.getItem('token');
  const url = `${API_VERSION}${uri}`;
  try {
    const res = await axios.post(url, payload, {
      headers: {
        accept: '*/*',
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}` // Ensure "Bearer" has an uppercase "B"
      }
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

const fetchGetBlobDataWithAuth = async (uri) => {
  const token = localStorage.getItem('token');
  const url = `${API_VERSION}${uri}`;
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}` // Ensure "Bearer" has an uppercase "B"
      },
      responseType: 'blob'
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};

export default { fetchData };
export { fetchPostData, fetchPostAddAlbumWithAuth, fetchGetDataWithAuth, fetchPostFileUploadWithAuth, fetchGetDataWithAuthArrayBuffer, fetchPutDataWithAuth, fetchDeleteDataWithAuth, fetchGetBlobDataWithAuth };
