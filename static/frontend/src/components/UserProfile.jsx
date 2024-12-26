import React, { useEffect, useState } from 'react';
import { Typography, Container, Grid, Card, CardContent, Avatar, CircularProgress } from '@mui/material';
import axios from 'axios';

function UserProfile() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const storedUser = JSON.parse(localStorage.getItem('user'));

            if (storedUser) {
                try {
                    const response = await axios.get('http://localhost:5000/api/profile', {
                        params: { user_id: storedUser.id },
                    });
                    setUser(response.data);
                } catch (error) {
                    console.error('Error fetching user details:', error);
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    if (loading) {
        return (
            <Container style={{ textAlign: 'center', marginTop: '20%' }}>
                <CircularProgress />
                <Typography variant="body1" style={{ marginTop: '10px' }}>Loading...</Typography>
            </Container>
        );
    }

    if (!user) {
        return (
            <Container style={{ textAlign: 'center', marginTop: '20%' }}>
                <Typography variant="h6" color="error">
                    User not found. Please log in.
                </Typography>
            </Container>
        );
    }

    return (
        <Container component="main" maxWidth="sm" style={{ marginTop: '30px' }}>
            <Card elevation={3}>
                <CardContent>
                    <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <Avatar
                                src={user.avatar || '/placeholder-avatar.png'}
                                alt={user.name}
                                sx={{ width: 100, height: 100, margin: '0 auto' }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center" gutterBottom>
                                {user.name}
                            </Typography>
                            <Typography variant="h6" align="center" color="textSecondary">
                                {user.email}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" align="center">
                                <strong>Bio:</strong> {user.bio || 'No bio available.'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" align="center">
                                <strong>Joined:</strong> {new Date(user.joinedDate).toLocaleDateString() || 'N/A'}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
}

export default UserProfile;
