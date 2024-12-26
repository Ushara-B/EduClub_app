import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Grid,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Clock, Users, BookOpen, Trophy } from "lucide-react";
import { getAllCourses, enrollCourse } from "../services/courseService";

const getChipColor = (level) => ({ Beginner: "success", Intermediate: "warning", Advanced: "error" }[level]);

const CourseList = () => {
  const [courses, setCourses] = useState([]); // Dynamically fetched courses
  const [dialog, setDialog] = useState({ open: false, course: null });
  const user = JSON.parse(localStorage.getItem("user")); // Fetch user details from local storage

  // Fetch all courses when the component loads
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getAllCourses(); // Fetch courses from the backend
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };
    fetchCourses();
  }, []);

  // Handle enrolling a user in a course
  const handleEnroll = async (courseId) => {
    try {
      await enrollCourse(user.id, courseId); // Enroll the user using their ID and the course ID
      alert("Enrollment successful!");
      setDialog({ open: false, course: null });
    } catch (error) {
      alert(`Enrollment failed: ${error.response?.data?.error || "Unknown error"}`);
      console.error("Enroll error:", error.response || error.message);
    }
  };

  return (
    <div style={{ padding: 20, background: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" align="center">Available Courses</Typography>
      <Typography variant="subtitle1" align="center" color="textSecondary" gutterBottom>
        Expand your knowledge with our expert-led courses
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card
              sx={{
                borderRadius: 2,
                boxShadow: 3,
                "&:hover": { boxShadow: 6 },
              }}
            >
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ color: "primary.main", fontWeight: "bold" }}
                >
                  {course.name}
                </Typography>
                <Chip
                  label="Beginner" // Hardcoded for now; replace if backend provides levels
                  color={getChipColor("Beginner")}
                  size="small"
                  sx={{ mt: 1 }}
                />
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ my: 2 }}
                >
                  Learn the fundamentals of {course.name}. Enhance your
                  knowledge with expert guidance.
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ display: "flex", alignItems: "center", mt: 1 }}
                >
                  <Clock style={{ marginRight: 8 }} /> 8 weeks
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ display: "flex", alignItems: "center", mt: 1 }}
                >
                  <Users style={{ marginRight: 8 }} /> 0 students
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ display: "flex", alignItems: "center", mt: 1 }}
                >
                  <BookOpen style={{ marginRight: 8 }} /> Online
                </Typography>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{ display: "flex", alignItems: "center", mt: 1 }}
                >
                  <Trophy style={{ marginRight: 8 }} /> Certificate
                </Typography>
              </CardContent>
              <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ color: "goldenrod", fontWeight: "bold" }}
                >
                  ★ 4.5
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setDialog({ open: true, course })}
                >
                  Enroll Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {dialog.course && (
        <Dialog
          open={dialog.open}
          onClose={() => setDialog({ open: false, course: null })}
        >
          <DialogTitle>Confirm Enrollment</DialogTitle>
          <DialogContent>
            <Typography>
              Are you sure you want to enroll in{" "}
              <strong>{dialog.course.name}</strong>? This course will take 8
              weeks to complete.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setDialog({ open: false, course: null })}
              color="secondary"
            >
              Cancel
            </Button>
            <Button
              onClick={() => handleEnroll(dialog.course.id)}
              color="primary"
              variant="contained"
            >
              Confirm Enrollment
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default CourseList;
