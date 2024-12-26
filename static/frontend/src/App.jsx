import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import NavBar from './components/AppBar';
import HomePage from './components/HomePage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import CourseList from './components/CourseList';
import UserProfile from './components/UserProfile';

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
                    <Route path="/" element={<SignInPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/login" element={<SignInPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/courses" element={<CourseList />} />
                    <Route path="/profile" element={<UserProfile />} />
                    {/* Redirect to home if the route does not exist */}
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
