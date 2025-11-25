import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const isAuthenticated = Boolean(user);

  const login = async (email, password) => {
    try {
      const fakeUser = {
        email,
        accessToken: "test-token-" + Date.now(),
      };

      setUser(fakeUser);
      localStorage.setItem("user", JSON.stringify(fakeUser));
    } catch (err) {
      console.log("Login error:", err);
      throw err;
    }
  };

  const register = async (email, password) => {
    const newUser = {
      email,
      accessToken: "test-token-" + Date.now(),
    };

    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const contextValue = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}