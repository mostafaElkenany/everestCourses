import axios from 'axios';

const token = localStorage.getItem('auth-token');

const instance = axios.create();

instance.defaults.headers.common['x-auth-token'] = token;

export default instance;