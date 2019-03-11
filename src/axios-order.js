import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-builder-6b576.firebaseio.com/'
});

export default instance;