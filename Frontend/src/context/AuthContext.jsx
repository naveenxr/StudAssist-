import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  getCurrentUser,
  getToken,
  logoutUser,
  sendSignupOtp as sendSignupOtpService,
  verifySignupOtp as verifySignupOtpService,
  sendLoginOtp as sendLoginOtpService,
  verifyLoginOtp as verifyLoginOtpService
} from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(getToken());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedToken = getToken();
      if (storedToken) {
        try {
          const currentUser = await getCurrentUser();
          if (currentUser) {
            setUser(currentUser);
            setTokenState(storedToken);
          } else {
            logoutUser();
            setUser(null);
            setTokenState(null);
          }
        } catch (err) {
          console.error('Failed to initialize user session:', err);
          logoutUser();
          setUser(null);
          setTokenState(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const sendSignupOtp = async (studentData) => {
    return await sendSignupOtpService(studentData);
  };

  const verifySignupOtp = async (email, otp) => {
    return await verifySignupOtpService(email, otp);
  };

  const sendLoginOtp = async (email) => {
    return await sendLoginOtpService(email);
  };

  const verifyLoginOtp = async (email, otp) => {
    const data = await verifyLoginOtpService(email, otp);
    setUser(data.user);
    setTokenState(data.token);
    return data;
  };

  const logout = () => {
    logoutUser();
    setUser(null);
    setTokenState(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user,
        loading,
        sendSignupOtp,
        verifySignupOtp,
        sendLoginOtp,
        verifyLoginOtp,
        // Backward compatibility
        requestOtp: sendLoginOtp,
        verifyOtpCode: verifyLoginOtp,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

