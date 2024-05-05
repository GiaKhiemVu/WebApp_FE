import axios from 'axios';
import { apiRoute } from '@/route/route'; 
import { getCookie } from '@/util/getCookie';

const api = axios.create({
    baseURL: apiRoute.base.toString(), 
    headers: {"Content-Type": "application/json"},
    withCredentials: true
});

api.interceptors.request.use((request) => {
    const token = getCookie()['token']
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request:",{
            "URL": request.baseURL + request.url,
            "Header": request.headers,
            "Data": request.data,
            "containToken": !!request.headers.Authorization,
        }
    )

    return request
})

api.interceptors.response.use((response) => {
    console.log("Response:",{
            "Header": response.headers,
            "Data": response.data,
            "Set-Cookie Header:": response.headers['set-cookie'],
        }
    )

    return response
})

export const login = async (data) => {
    if (!data.account||!data.password) {
        throw new Error('Account is null or undefined');
    }

    try {
        const response = await api.post('login', { account: data.account, password: data.password });
        localStorage.setItem("token", response.data.token)
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export const register = async  (data) => {
    if (!data) {
        throw new Error('Empty Information');
    }

    try {
        const response = await api.post('register', { data: data });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

export default api;
