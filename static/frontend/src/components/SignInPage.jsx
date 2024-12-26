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
            navigate('/courses'); // Redirect to courses after successful login
        } catch (error) {
            alert('Login failed');
        }
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
        </Container>
    );
};

export default SignInPage;
