import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/authService';

function NavBar() {
    const navigate = useNavigate();

    // Function to handle logout action
    const handleLogout = () => {
        logout(); // Call logout service
        navigate('/login'); // Redirect to login page after logout
    };

    // Function to navigate to the user profile page
    const handleProfile = () => {
        navigate('/profile');
    };

    // Function to navigate to the home page
    const handleHome = () => {
        navigate('/home');
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: '#1a379e' }}>
            <Toolbar>
                {/* Application Title */}
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Course Club
                </Typography>

                {/* Navigation Buttons */}
                <Button color="inherit" onClick={handleHome}>
                    Home {/* Navigate to Home Page */}
                </Button>
                <Button color="inherit" onClick={handleProfile}>
                    Profile {/* Navigate to Profile Page */}
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                    Logout {/* Logout and navigate to Login Page */}
                </Button>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;
