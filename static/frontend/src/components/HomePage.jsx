import React, { useEffect, useState } from 'react';
import { Button, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getRegisteredCourses } from '../services/courseService';

function HomePage() {
    const navigate = useNavigate();
    const [registeredCourses, setRegisteredCourses] = useState([]);
    const user = JSON.parse(localStorage.getItem('user')); // Get user details from localStorage

    useEffect(() => {
        const fetchRegisteredCourses = async () => {
            if (user) {
                try {
                    const response = await getRegisteredCourses(user.id); // Fetch registered courses
                    setRegisteredCourses(response.data); // Update the state with fetched courses
                } catch (error) {
                    console.error('Error fetching registered courses:', error);
                }
            }
        };

        fetchRegisteredCourses();
    }, [user]);

    return (
        <div style={{ padding: 20 }}>
            <Typography variant="h4" gutterBottom>
                Welcome to Course Club, {user?.name || 'Guest'}!
            </Typography>

            {/* Button to navigate to the "Enroll Courses" page */}
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/courses')}
                style={{ marginBottom: 20 }}
            >
                Enroll Courses
            </Button>

            {/* Registered Courses Section */}
            <Typography variant="h5" gutterBottom>
                Registered Courses
            </Typography>
            <List>
                {registeredCourses.length > 0 ? (
                    registeredCourses.map((course) => (
                        <ListItem key={course.id}>
                            <ListItemText primary={course.name} />
                        </ListItem>
                    ))
                ) : (
                    <Typography variant="body1">
                        You are not enrolled in any courses yet.
                    </Typography>
                )}
            </List>
        </div>
    );
}

export default HomePage;
