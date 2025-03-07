"use client";

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface AulaContextType {
  modalContent: ReactNode | null;
  setModalContent: Dispatch<SetStateAction<ReactNode | null>>;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const aulaContext = createContext<AulaContextType | undefined>(undefined);

export const useAulaContext = () => {
  const context = useContext(aulaContext);

  if (!context) {
    throw new Error("useAulaContext debe usarse dentro de AulaProvider");
  }

  return context;
};

export const AulaProvider = ({ children }: { children: ReactNode }) => {
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
    <aulaContext.Provider
      value={{
        openModal,
        closeModal,
        isModalOpen,
        modalContent,
        setModalContent,
      }}
    >{children}</aulaContext.Provider>
  );
};
