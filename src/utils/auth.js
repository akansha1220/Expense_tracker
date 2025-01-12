import { jwtDecode } from 'jwt-decode';


export const getToken = () => localStorage.getItem('token');

export const getUserRole = () => {
  const token = getToken();
  if (token) {
    const decoded = jwtDecode(token);
    return decoded.role; // Ensure your backend adds 'role' in the JWT payload
  }
  return null;
};

export const isAuthenticated = () => !!getToken();

export const logout = () => {
  localStorage.removeItem('token');
};
