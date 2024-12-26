import axios from 'axios';

const API_URL = 'http://localhost:5000/api/';

export const signup = async (name, email, password) => {
    const response = await axios.post(`${API_URL}signup`, { name, email, password });
    return response.data;
};

export const login = async (email, password) => {
    const response = await axios.post(`${API_URL}login`, { email, password });
    if (response.data) {
        // Store user details in localStorage
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

export const logout = () => {
    // Clear all user data from localStorage
    localStorage.removeItem('user');
};
