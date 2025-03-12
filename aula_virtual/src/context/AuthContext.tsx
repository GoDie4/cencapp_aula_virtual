"use client";
import { config } from "@/config/config";
import { UserInterface } from "@/interfaces/AuthInteface";
import axios from "axios";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface AuthContextInterface {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<SetStateAction<boolean>>;
  user: UserInterface | null;
  setUser: React.Dispatch<SetStateAction<UserInterface | null>>;
  token: string | null;
  setToken: React.Dispatch<SetStateAction<string | null>>;
  modalContent: ReactNode | null;
  setModalContent: Dispatch<SetStateAction<ReactNode>>;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
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
      const response = await axios.post(`${config.apiUrl}/logout`, null, {
        withCredentials: true,
      });
      if (response.status === 200) {
        window.location.href = "/";
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.log(error);
    }
  };



  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
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
        openModal,
        closeModal,
        isModalOpen,
        modalContent,
        setModalContent,
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
