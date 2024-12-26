import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import {
    Button,
    Container,
    Typography,
    TextField,
    Box,
    IconButton,
    InputAdornment,
    CircularProgress,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import backgroundImage from '../assets/backimglogin.jpg';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        try {
            await login(email, password);
            navigate('/home'); // Redirect to home after successful login
        } catch (err) {
            setError('Invalid email or password');
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
                backgroundImage: `url(${backgroundImage})`, // Set the background image
                backgroundSize: 'cover', // Make sure the image covers the entire viewport
                backgroundPosition: 'center', // Center the image
                backgroundRepeat: 'no-repeat', // Prevent repetition
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
                    Sign In
                </Typography>
                <form onSubmit={handleLogin}>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
                            type={showPassword ? 'text' : 'password'}
                            required
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
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
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
                        </Button>
                        <Typography align="center" variant="body2" sx={{ mt: 2 }}>
                            Don't have an account?{' '}
                            <Button
                                variant="text"
                                color="primary"
                                onClick={() => navigate('/signup')}
                                sx={{ textTransform: 'none', fontWeight: 'bold' }}
                            >
                                Sign Up
                            </Button>
                        </Typography>
                    </Box>
                </form>
            </Container>
        </Box>
    );
};

export default SignInPage;
