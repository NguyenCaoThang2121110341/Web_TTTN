import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [email, setEmail] = useState('');
  const [passwordHash, setPasswordHash] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (token, lastName) => {
    localStorage.setItem("accessToken", token);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("email", email);
    localStorage.setItem("username", lastName);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("email");
    localStorage.removeItem("username");
    localStorage.removeItem("lastName");
    setEmail('');
    setPasswordHash('');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ email, passwordHash, isLoggedIn, handleLogin, handleLogout, setEmail, setPasswordHash }}>
      {children}
    </AuthContext.Provider>
  );
};