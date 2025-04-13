import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; 


export const loginUser = async (credentials) => {
  return await axios.post(`${API_URL}/token/`, credentials);
};