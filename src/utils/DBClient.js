import axios from 'axios'

axios.defaults.withCredentials = true;

export default axios.create({
    baseURL: 'http://localhost:8081'
    //'https://datavisa-a95e5e4eec8d.herokuapp.com'
})