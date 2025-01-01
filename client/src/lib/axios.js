import  axios from 'axios';

export const Server = axios.create({
    baseURL: `${import.meta.env.VITE_SERVER_URL}/api` || 'http://localhost:8000',
    withCredentials: true,
})

