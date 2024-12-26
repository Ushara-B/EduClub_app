import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/authService';
import {
    Button,
    Container,
    Typography,
    TextField,
    Box,
    CircularProgress,
} from '@mui/material';
import backgroundImage from '../assets/backimglogin.jpg';

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        try {
            await signup(name, email, password); // Send name, email, and password only
            alert('Sign Up Successful! Please log in.');
            navigate('/login'); // Redirect to login page after successful sign-up
        } catch (err) {
            setError(err.response?.data?.error || 'Sign Up Failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                px: 2,
            }}
        >
            <Container
                maxWidth="xs"
                sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    p: 4,
                    borderRadius: 2,
                    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.1)',
                }}
            >
                <Typography variant="h4" align="center" sx={{ mb: 3, color: '#004D40' }}>
                    Sign Up
                </Typography>
                <form onSubmit={handleSignUp}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Name"
                            required
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <TextField
                            label="Email"
                            type="email"
                            required
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            required
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && (
                            <Typography color="error" variant="body2" align="center">
                                {error}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            variant="contained"
                            fullWidth
                            disabled={loading}
                            sx={{
                                bgcolor: '#0000FF',
                                '&:hover': { bgcolor: '#0000CC' },
                                color: 'white',
                                textTransform: 'none',
                                py: 1.5,
                            }}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign Up'}
                        </Button>
                        <Typography align="center" variant="body2" sx={{ mt: 2 }}>
                            Already have an account?{' '}
                            <Button
                                variant="text"
                                color="primary"
                                onClick={() => navigate('/login')}
                                sx={{ textTransform: 'none', fontWeight: 'bold' }}
                            >
                                Sign In
                            </Button>
                        </Typography>
                    </Box>
                </form>
            </Container>
        </Box>
    );
};

export default SignUpPage;
