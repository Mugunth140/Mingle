import  axios from 'axios';

export const Server = axios.create({
    baseURL: "https://mingle-backend-t56t.onrender.com/api",
    withCredentials: true,
})

