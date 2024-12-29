import  axios from 'axios';

export const Server = axios.create({
    baseURL: import.meta.env.CLIENT_MODE === "production" ? `${import.meta.env.SERVER_URL}/api` : "http://localhost:8080/api",
    withCredentials: true,
})

