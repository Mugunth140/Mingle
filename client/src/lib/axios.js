import  axios from 'axios';

export const Server = axios.create({
    baseURL: 'http://localhost:8080/api',
    withCredentials: true,
})

