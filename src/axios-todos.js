import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://boldlyon.herokuapp.com/users',
})


export default instance;