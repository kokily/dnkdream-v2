import axios from 'axios';

export const client = axios.create({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://dnkdream.com/api'
      : 'http://localhost:3000/api',
  withCredentials: true,
});
