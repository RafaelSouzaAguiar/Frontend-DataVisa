import axios from 'axios'

axios.defaults.withCredentials = true;

export default axios.create({
    baseURL: 'https://datavisa-a95e5e4eec8d.herokuapp.com',
    withCredentials: false//'http://localhost:8081'
})