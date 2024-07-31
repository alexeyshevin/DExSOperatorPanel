import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5005"
    // timeout: 1000,
    // headers: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    // }
});

export default api;
