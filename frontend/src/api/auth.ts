import axios from 'axios';

export const login = async (username: string, password: string) => {
  const response = await axios.post('http://localhost:8000/api/login/', {
    username,
    password,
  });
  const token = response.data.token;
  localStorage.setItem('token', token); // Save token for future use
  return token;
};
