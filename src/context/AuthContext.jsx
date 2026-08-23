import { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../Services/authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("safarnaUser");
    if (savedUser) {
      try {
        return JSON.parse(savedUser);
      } catch {
        return null;
      }
    }
    return null;
  });

  async function login(email, password) {
    const loggedInUser = await loginUser(email, password);
    setUser(loggedInUser);
    localStorage.setItem("safarnaUser", JSON.stringify(loggedInUser));
    return loggedInUser;
  }

  async function register(userData) {
    const newUser = await registerUser(userData);
    setUser(newUser);
    localStorage.setItem("safarnaUser", JSON.stringify(newUser));
    return newUser;
  }

  function logout() {
    setUser(null);
    localStorage.removeItem("safarnaUser");
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}