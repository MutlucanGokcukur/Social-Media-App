import axios from 'axios';
import { apiBaseURL } from '@/config/config';   //* Retrieves API base URL configuration settings

const appAxios = axios.create({
    baseURL: `${apiBaseURL.host}:${apiBaseURL.port}/`,
    timeout: 10000,
});

export default appAxios;


/*#region Gerekli olursa kullanılacak olan Content-Type ve Accent değerleri

appAxios.defaults.headers['Content-Type'] = 'application/json';
appAxios.defaults.headers['Accept'] = 'application/json';

#endregion*/

/*#region Her istekte token ekleme 

appAxios.interceptors.request.use(
    config => 
    {
        const token = localStorage.getItem('token');
        if (token) 
        {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => 
    {
        return Promise.reject(error);
    }
);

#endregion*/