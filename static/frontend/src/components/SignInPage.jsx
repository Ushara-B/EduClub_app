import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { TextField, Button, Typography, Container } from '@mui/material';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await login(email, password);
            navigate('/home'); // Navigate to the home page after login
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed!');
        }
    };

    const handleSignUp = () => {
        navigate('/signup'); // Navigate to the signup page
    };

    return (
        <Container component="main" maxWidth="xs">
            <Typography component="h1" variant="h5" align="center" gutterBottom>
                Sign In
            </Typography>
            <form onSubmit={handleLogin}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Email Address"
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
            </form>
            <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                Don't have an account?{' '}
                <Button
                    onClick={handleSignUp}
                    variant="text"
                    sx={{
                        color: 'primary.main',
                        textTransform: 'none',
                        fontSize: '1rem',
                        padding: 0,
                        marginLeft: 0.5,
                    }}
                >
                    Sign Up
                </Button>
            </Typography>
        </Container>
    );
};

export default SignInPage;
