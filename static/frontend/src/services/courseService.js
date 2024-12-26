import axios from 'axios';

const API_URL = 'http://localhost:5000/api/';

export const getAllCourses = async () => {
    return axios.get(`${API_URL}courses`);
};

export const enrollCourse = async (userId, courseId) => {
    return axios.post(`${API_URL}enroll`, {
        user_id: userId,
        course_id: courseId,
    });
};

export const getRegisteredCourses = async (userId) => {
    return axios.get(`${API_URL}registered-courses`, {
        params: { user_id: userId },
    });
};
