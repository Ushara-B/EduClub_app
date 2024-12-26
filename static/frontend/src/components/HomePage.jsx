import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    const navigate = useNavigate();

    return (
        <div style={{ padding: 20 }}>
            <h1>Welcome to Course Club</h1>
            <Button variant="contained" onClick={() => navigate('/courses')}>
                Enroll Courses
            </Button>
        </div>
    );
}

export default HomePage;
