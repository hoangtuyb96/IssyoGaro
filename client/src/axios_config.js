import axios from 'axios';

const axiosConfig = () => {
  axios.interceptors.request.use(config => {
    config.headers['IG-AUTH-TOKEN'] = localStorage.getItem('auth-token');
    return config;
  })
}

export default axiosConfig;
