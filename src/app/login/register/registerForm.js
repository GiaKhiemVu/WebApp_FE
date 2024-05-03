import { Box, Button, Card, FormControl, Input, InputLabel, Link, Typography } from '@mui/material';
import React, { useState } from 'react';
import { FormIconify } from '../../../component/Iconify';
import { loginRoute } from '../../../route/route';
import hashPassword from '@/util/hash';


const RegisterForm = ({ submit }) => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [name, setName] = useState({firstName: '', lastName: ''});
    const [email, setEmail] = useState('');
    const [error, setError] = useState({email: false, password: false, rePassword: false});
    const [isLoading, setIsLoading] = useState(false);

    const verifyUserData = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const newError = {...error};
        let isError = false;

        if(emailRegex.test(email)) {
            newError.email = false;
        } else {
            newError.email = true;
            isError = true;
        }

        if(password.length < 8){
            newError.password = true;
            isError = true;
        } else {
           newError.password = false;
        }

        if(password === rePassword){
            newError.rePassword = false;
        } else {
            newError.rePassword = true;
            isError = true;
        }
        setError(newError);

        return isError;
    };

    const handleSubmit = async (event) => {
        setIsLoading(true);
        event.preventDefault();
    
        let isError = await verifyUserData();

        if(isError){
            setIsLoading(false);
            return;
        }
    
        const userData = {
            account:account, 
            password: hashPassword(password), 
            firstName: name.firstName, 
            lastName: name.lastName, 
            email: email, 
        };
        submit(userData);

        setIsLoading(false);
    };

    return (
        <form 
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px'}} 
            onSubmit={handleSubmit}
        >
           <Card sx={{
                display: 'flex',
                flexDirection: 'column',
                padding: "30px",
                border: 2,
                borderRadius: '50px',
                height: '550px',
                width: '500px',
                boxShadow: '0px 0px 30px rgba(0, 0, 0, 0.7)',
                // backgroundImage: 'linear-gradient(to top right, #03fcfc, #0356fc )', // Gradient background
            }}>
                <h1 style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>Register</h1>
                <div style={{ display: 'flex', alignItems: 'center', flexFlow: 'row' }}>
                    <FormIconify icon="mdi:account-outline"/>
                    <Box sx={{ paddingRight: '10px', }}>
                        <FormControl margin='normal'>
                            <InputLabel htmlFor="FNameInput">First Name</InputLabel>
                            <Input 
                                id="FNameInput" 
                                required
                                value={name.firstName}
                                onChange={(e) => setName({firstName: e.target.value ,lastName: name.lastName})}
                            />
                        </FormControl>
                    </Box>
                    <Box sx={{ paddingRight: '10px'}}>
                        <FormControl margin='normal'>
                            <InputLabel htmlFor="LNameInput">Last Name</InputLabel>
                            <Input 
                                id="LNameInput" 
                                required
                                value={name.lastName}
                                onChange={(e) => setName({firstName: name.firstName, lastName:e.target.value})}
                            />
                        </FormControl>
                    </Box>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', paddingTop: '10px',  }}>
                    <FormIconify icon="ic:outline-email"/>
                    <Box sx={{ paddingRight: '10px', width:'400px'}}>
                        <FormControl margin='normal'>
                            <InputLabel htmlFor="EmailInput">Email</InputLabel>
                            <Input 
                                id="EmailInput"  
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={error.email}
                                style={{width:'400px'}}
                            />
                            {error.email && <Typography variant="caption" color="error">Please enter a valid email address.</Typography>}
                        </FormControl>
                    </Box>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', paddingTop: '10px' }}>
                    <FormIconify icon="icon-park-outline:edit-name"/>
                    <Box sx={{ paddingRight: '10px'}}>
                        <FormControl margin='normal'>
                            <InputLabel htmlFor="accountInput">Account</InputLabel>
                            <Input 
                                id="accountInput"
                                required
                                value={account}
                                onChange={(e) => setAccount(e.target.value)}
                                style={{width:'400px'}}
                            />
                        </FormControl>
                    </Box>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', paddingTop: '10px' }}>
                    <FormIconify icon="material-symbols:key-outline" />
                    <Box sx={{ paddingRight: '10px', maxWidth:"200px"}}>
                        <FormControl margin='normal'>
                            <InputLabel htmlFor="passwordInput">Password</InputLabel>
                            <Input 
                                id="passwordInput"
                                type="password" 
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                error={error.password}
                            />
                        </FormControl>
                        {error.password && <Typography variant="caption" color="error">8 characters required.</Typography>}
                    </Box>
                    <Box sx={{ paddingRight: '10px', maxWidth:"200px"}}>
                        <FormControl margin='normal'>
                            <InputLabel htmlFor="rePasswordInput">Password confirmation</InputLabel>
                            <Input 
                                id="rePasswordInput"
                                type="password" 
                                required
                                value={rePassword}
                                onChange={(e) => setRePassword(e.target.value)}
                            />
                        </FormControl>
                        {error.rePassword && <Typography variant="caption" color="error">Different with your password</Typography>}
                    </Box>
                </div>
                <Button 
                    variant='contained' 
                    sx={{bgcolor: 'black', margin: '40px', borderRadius: '20px',}} 
                    type='submit'
                >
                    {isLoading?<FormIconify icon='line-md:loading-twotone-loop' style={{border: 0}}/>:'Submit'}
                </Button><br/>
                <div style={{ margin: 'auto', display: 'flex', flexDirection: 'row'}}>
                    <Typography>Already have account? </Typography>
                    <Link href={loginRoute.loginPage} sx={{textDecoration: 'none', paddingLeft:'6px', paddingTop:'2px', fontWeight: 'bold',}}>Login</Link>
                </div>
            </Card>
        </form>
    );
};

export default RegisterForm;
