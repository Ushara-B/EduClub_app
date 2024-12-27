import axios from "axios";

const API_URL = "http://localhost:5000/api/";

// Fetch user profile details (including enrolled courses)
export const getUserProfile = async (userId) => {
    const response = await axios.get(`${API_URL}profile`, {
        params: { user_id: userId },
    });
    return response.data;
};
