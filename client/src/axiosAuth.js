import axios from 'axios';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');

  return axios.create({
    baseURL: 'http://192.168.1.212:5000/api',
    headers: {
      Authorization: token,
    },
  });
};
