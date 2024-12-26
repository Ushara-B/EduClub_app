import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import NavBar from './components/AppBar';
import HomePage from './components/HomePage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import CourseList from './components/CourseList';
import UserProfile from './components/UserProfile';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute component

function Layout({ children }) {
    const location = useLocation();

    // Show NavBar only if not on the SignIn or SignUp page
    const showNavBar = !['/', '/login', '/signup'].includes(location.pathname);

    return (
        <>
            {showNavBar && <NavBar />}
            {children}
        </>
    );
}

function App() {
    return (
        <Router>
            <Layout>
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<SignInPage />} />
                    <Route path="/login" element={<SignInPage />} />
                    <Route path="/signup" element={<SignUpPage />} />

                    {/* Protected Routes */}
                    <Route
                        path="/home"
                        element={
                            <ProtectedRoute>
                                <HomePage />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/courses"
                        element={
                            <ProtectedRoute>
                                <CourseList />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/profile"
                        element={
                            <ProtectedRoute>
                                <UserProfile />
                            </ProtectedRoute>
                        }
                    />

                    {/* Redirect to login if the route does not exist */}
                    <Route path="*" element={<Navigate to="/login" />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
