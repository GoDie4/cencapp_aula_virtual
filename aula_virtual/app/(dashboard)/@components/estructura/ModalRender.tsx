"use client";
import { useAulaContext } from "@/context/AulaContext";
import React from "react";
import ModalWrapper from "./ModalWrapper";

export const ModalRender = () => {
  const { modalContent } = useAulaContext();
  return (
    <>
      <ModalWrapper componente={modalContent} />
    </>
  );
};
