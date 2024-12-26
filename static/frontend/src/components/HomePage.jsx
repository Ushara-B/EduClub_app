import React from "react";
import { Button, Container, Typography, Box, Grid, Card, CardContent } from "@mui/material";
import { MenuBook as MenuBookIcon, People as PeopleIcon, School as SchoolIcon } from "@mui/icons-material";

const features = [
  {
    icon: <MenuBookIcon fontSize="large" color="primary" />,
    title: "Wide Range of Courses",
    description: "Access hundreds of courses across different disciplines and skill levels.",
  },
  {
    icon: <PeopleIcon fontSize="large" color="primary" />,
    title: "Expert Instructors",
    description: "Learn from industry professionals and experienced educators.",
  },
  {
    icon: <SchoolIcon fontSize="large" color="primary" />,
    title: "Certified Learning",
    description: "Earn certificates upon course completion to showcase your achievements.",
  },
];

const HomePage = () => (
  <Box sx={{ minHeight: "100vh", background: "#fff", textAlign: "center", py: 8 }}>
    <Container maxWidth="lg">
      <Box sx={{ mb: 8 }}>
        <Typography variant="h2" fontWeight="bold" gutterBottom>
          Welcome to Course Club
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, mx: "auto", mb: 4 }}>
          Expand your knowledge and skills with our carefully curated online courses. Start your learning journey today.
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<MenuBookIcon />}
          sx={{ py: 1.5, px: 4, fontSize: "1.1rem" }}
          onClick={() => (window.location.href = "/courses")}
        >
          Explore Courses
        </Button>
      </Box>
      <Grid container spacing={4} sx={{ mt: 4 }}>
        {features.map(({ icon, title, description }, index) => (
          <Grid item xs={12} md={4} key={index}>
            <Card elevation={3} sx={{ height: "100%", p: 2, textAlign: "center" }}>
              <CardContent>
                {icon}
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, mb: 1 }}>
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
);

export default HomePage;
