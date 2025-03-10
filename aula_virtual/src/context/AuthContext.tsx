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
  cerrarSesion: () => void;
}

interface AuthProviderInterface {
  children: ReactNode;
  userInitial: UserInterface | null;
}

export type AuthContextValue = AuthContextInterface;

export const AuthContext = createContext<AuthContextInterface | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderInterface> = ({
  children,
  userInitial,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<UserInterface | null>(userInitial);
  const [token, setToken] = useState<string | null>(null);

  const cerrarSesion = async () => {
    try {
      console.log("cerrar");
      const response = await axios.post(`${config.apiUrl}/logout`, null, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const isClient = typeof window !== 'undefined';
    const urlIncludesAula = isClient && window.location.pathname.includes('aula');

    if (isClient && urlIncludesAula && token === null) {
      window.location.href = '/';
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        token,
        setToken,
        cerrarSesion,
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
