"use client"
import React, { useEffect, useState } from 'react';
import LoginForm from './loginForm';
import { login } from '@/api/api';

const Login = () => {
    const [user, setUser] = useState({account: null, password: null})

    useEffect(() => {
        const fetchData = async () => {
        try {
            if(user.account!==null&&user.password!==null){
                const response = await login(user);
                console.log(response);
            }
        } catch (error) {
            console.error('Error:', error);
        }
        };

        fetchData();
    }, [user]);

    const updateUser = async (userData) => {
        setUser(userData)
    }

    return (
        <div style={{ justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <LoginForm submit={updateUser} />
        </div>
    )
}

export default Login;