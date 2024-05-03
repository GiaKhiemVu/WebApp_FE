import axios from 'axios';
import { apiRoute } from '@/route/route'; 

const api = axios.create({
    baseURL: apiRoute.base.toString(), 
    headers: {"Content-Type": "application/json"},
});

api.interceptors.request.use((request) => {
    console.log(
        `URL: ${request.baseURL}${request.url}\nHeader: ${JSON.stringify(request.headers)}\nData: ${JSON.stringify(request.data.data)}`
    );

    return request;
});

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
