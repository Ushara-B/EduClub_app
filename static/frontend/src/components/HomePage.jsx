import React from 'react';
import { Button, Container, Typography, Box, Grid, Card, CardContent, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SchoolIcon from '@mui/icons-material/School';
import PeopleIcon from '@mui/icons-material/People';
import MenuBookIcon from '@mui/icons-material/MenuBook';

function HomePage() {
    const navigate = useNavigate();
    const theme = useTheme();

    const features = [
        { icon: <MenuBookIcon sx={{ fontSize: 40 }} />, title: 'Wide Range of Courses', description: 'Access hundreds of courses across disciplines.' },
        { icon: <PeopleIcon sx={{ fontSize: 40 }} />, title: 'Expert Instructors', description: 'Learn from professionals and educators.' },
        { icon: <SchoolIcon sx={{ fontSize: 40 }} />, title: 'Certified Learning', description: 'Earn certificates to showcase your achievements.' }
    ];

    return (
        <Box sx={{ minHeight: '100vh', background: `linear-gradient(180deg, ${theme.palette.background.default} 0%, ${theme.palette.grey[100]} 100%)` }}>
            <Container maxWidth="lg">
                <Box sx={{ textAlign: 'center', pt: 8, pb: 6 }}>
                    <Typography variant="h2" sx={{ fontWeight: 'bold', mb: 4 }}>Welcome to Course Club</Typography>
                    <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
                        Expand your knowledge with our curated courses. Start your journey today.
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 4 }}>
                        <Button variant="contained" size="large" onClick={() => navigate('/courses')} startIcon={<MenuBookIcon />} sx={{ py: 1.5, px: 4 }}>Explore Courses</Button>
                        <Button variant="outlined" size="large" onClick={() => navigate('/signup')} sx={{ py: 1.5, px: 4 }}>Sign Up</Button>
                        <Button variant="outlined" size="large" onClick={() => navigate('/login')} sx={{ py: 1.5, px: 4 }}>Login</Button>
                    </Box>
                </Box>
                <Grid container spacing={4} sx={{ py: 8 }}>
                    {features.map((feature, index) => (
                        <Grid item xs={12} md={4} key={index}>
                            <Card elevation={2} sx={{ height: '100%', transition: 'transform 0.2s, box-shadow 0.2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: theme.shadows[8] } }}>
                                <CardContent sx={{ textAlign: 'center', p: 4 }}>
                                    <Box sx={{ color: 'primary.main', mb: 2 }}>{feature.icon}</Box>
                                    <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>{feature.title}</Typography>
                                    <Typography variant="body2" color="text.secondary">{feature.description}</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

export default HomePage;
