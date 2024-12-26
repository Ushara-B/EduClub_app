import React, { useEffect, useState } from 'react';
import { getAllCourses, enrollCourse } from '../services/courseService';
import { Button, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

function CourseList() {
    const [courses, setCourses] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            const response = await getAllCourses();
            setCourses(response.data);
        };
        fetchCourses();
    }, []);

    const handleEnrollClick = (course) => {
        setSelectedCourse(course);
        setOpen(true);
    };

    const handleEnroll = async () => {
        try {
            await enrollCourse(selectedCourse.id);
            alert('Enrollment successful');
            setOpen(false);
        } catch (error) {
            alert('Enrollment failed');
            console.error('Enroll error:', error);
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div style={{ padding: 20 }}>
            <List>
                {courses.map((course) => (
                    <ListItem key={course.id} button>
                        <ListItemText primary={course.name} />
                        <Button onClick={() => handleEnrollClick(course)}>Enroll</Button>
                    </ListItem>
                ))}
            </List>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Confirm Enrollment</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to enroll in {selectedCourse?.name}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleEnroll} autoFocus>
                        Enroll
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default CourseList;
