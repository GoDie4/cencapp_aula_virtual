"use client";
import { useAuth } from "@/context/AuthContext";
import React from "react";
import ModalWrapper from "./ModalWrapper";

export const ModalRender = () => {
  const { modalContent } = useAuth();
  return (
    <>
      <ModalWrapper componente={modalContent} />
    </>
  );
};
