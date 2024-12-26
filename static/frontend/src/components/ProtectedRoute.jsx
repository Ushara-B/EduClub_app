import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('user')); // Check if user is logged in

    if (!user) {
        // If no user is logged in, redirect to the login page
        return <Navigate to="/login" />;
    }

    // Allow access if the user is logged in
    return children;
};

export default ProtectedRoute;
