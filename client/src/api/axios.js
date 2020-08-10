import axios from 'axios';

const token = localStorage.getItem('auth-token');

const instance = axios.create();
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth-token');
    config.headers['x-auth-token'] = token;
    return config;
})

instance.defaults.headers.common['x-auth-token'] = token;


export default instance;