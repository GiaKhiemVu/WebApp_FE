import React from 'react';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

const LoginLayout = ({ children }) => {
    return (
        <div className={inter.className} style={{
            overflow: 'hidden',
            backgroundImage: 'linear-gradient(to top right, #03fcfc, #fc05e4)',
            width: '100%',
            height: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
        }}>
            {children}
        </div>
    );
};

export default LoginLayout;
