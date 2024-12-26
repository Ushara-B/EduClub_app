import React, { useEffect, useState } from 'react';
import { Typography, Container } from '@mui/material';
import axios from 'axios';

function UserProfile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            // Retrieve user from localStorage
            const storedUser = JSON.parse(localStorage.getItem('user'));

            if (storedUser) {
                try {
                    const response = await axios.get('http://localhost:5000/api/profile', {
                        params: { user_id: storedUser.id }, // Send user ID as a query parameter
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching user details:', error);
                }
            }
        };

        fetchUserDetails();
    }, []);

    if (!user) return <Typography>Loading...</Typography>;

    return (
        <Container component="main" maxWidth="sm" style={{ marginTop: '20px' }}>
            <Typography variant="h4" gutterBottom>
                User Profile
            </Typography>
            <Typography variant="h6">Name: {user.name}</Typography>
            <Typography variant="h6">Email: {user.email}</Typography>
        </Container>
    );
}

export default UserProfile;
