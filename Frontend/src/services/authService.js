const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Token Management Helpers
 */
export const getToken = () => localStorage.getItem('studassist_token');
export const setToken = (token) => localStorage.setItem('studassist_token', token);
export const removeToken = () => localStorage.removeItem('studassist_token');

export const getAuthHeaders = () => {
  const token = getToken();
  return token
    ? { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };
};

/**
 * Send Signup OTP for new student registration
 * @param {Object} studentData { name, email, rollNumber, department, year, section }
 */
export const sendSignupOtp = async (studentData) => {
  const response = await fetch(`${API_BASE_URL}/auth/send-signup-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(studentData)
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to send signup verification code.');
  }
  return data;
};

/**
 * Verify Signup OTP & activate student account
 * @param {string} email 
 * @param {string} otp 
 */
export const verifySignupOtp = async (email, otp) => {
  const response = await fetch(`${API_BASE_URL}/auth/verify-signup-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to verify signup code.');
  }
  return data;
};

/**
 * Send Login OTP for existing registered student
 * @param {string} email 
 */
export const sendLoginOtp = async (email) => {
  const response = await fetch(`${API_BASE_URL}/auth/send-login-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to send login verification code.');
  }
  return data;
};

/**
 * Verify Login OTP & retrieve JWT session token
 * @param {string} email 
 * @param {string} otp 
 */
export const verifyLoginOtp = async (email, otp) => {
  const response = await fetch(`${API_BASE_URL}/auth/verify-login-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp })
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to verify login code.');
  }

  if (data.data && data.data.token) {
    setToken(data.data.token);
  }

  return data.data;
};

/**
 * Fetch current authenticated student profile
 */
export const getCurrentUser = async () => {
  const token = getToken();
  if (!token) return null;

  const response = await fetch(`${API_BASE_URL}/auth/me`, {
    method: 'GET',
    headers: getAuthHeaders()
  });

  if (response.status === 401) {
    removeToken();
    return null;
  }

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch user profile.');
  }

  return data.data.user;
};

export const logout = () => {
  removeToken();
};

export const sendOtp = sendLoginOtp;
export const verifyOtp = verifyLoginOtp;
export const logoutUser = logout;
