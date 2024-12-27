import  axios from 'axios';

export const Server = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "http://localhost:5173/api" : "/api",
    withCredentials: true,
})

