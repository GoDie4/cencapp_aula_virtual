"use client";
import { config } from "@/config/config";
import { UserInterface } from "@/interfaces/AuthInteface";
import axios from "axios";
import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>;
  user: UserInterface | null;
  setUser: React.Dispatch<SetStateAction<UserInterface | null>>;
  token: string | null;
  setToken: React.Dispatch<SetStateAction<string | null>>;
}

interface AuthProviderInterface {
  children: ReactNode;
}

export type AuthContextValue = AuthContextInterface;

export const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

export async function getUser(setUser: React.Dispatch<SetStateAction<UserInterface | null>>, token: string | null) {
  try {
    const response = await axios.get(`${config.apiUrl}/alumno`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || token}`,
      },
    });

    if (response.status === 200) {
        console.log(response.data)
      setUser(response.data);
    }
  }
  catch (error) {
    console.log('No estas dentro de nuestra aula ' + error);
    setUser(null);
  }
}

export const AuthProvider: React.FC<AuthProviderInterface> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserInterface | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, [])

  useEffect(() => {
    getUser(setUser, token);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        token,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextInterface => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth se debe de utilizar dentro de AuthProvider");
  }
  return context;
};
