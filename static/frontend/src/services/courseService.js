import axios from 'axios';

const API_URL = 'http://localhost:5000/api/';

export const getAllCourses = async () => {
  return axios.get(`${API_URL}courses`);
};

export const enrollCourse = async (studentId, courseId) => {
  return axios.post(`${API_URL}enroll`, { studentId, courseId });
};

export const unenrollCourse = async (studentId, courseId) => {
  return axios.delete(`${API_URL}unenroll`, { data: { studentId, courseId } });
};

export const getEnrolledCourses = async (studentId) => {
  return axios.get(`${API_URL}enrolled-courses`, { params: { studentId } });
};
