"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAulaContext } from "@/context/AulaContext";

interface ModalProps {
  componente: React.ReactNode;
}

const ModalWrapper: React.FC<ModalProps> = ({ componente }) => {
  const { isModalOpen, closeModal } = useAulaContext();

  const handleBackdropClick = (e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    const className = target.className?.toString() || "";
    if (className.includes("modal")) {
      closeModal();
    }
  };

  return (
    <AnimatePresence>
      {isModalOpen && (
        <div
          className="w-full overflow-hidden relative"
          onClick={handleBackdropClick}
        >
          <div className="fixed inset-0 modal flex items-center justify-center bg-black-main/20 z-[1300]">
            <motion.div
              initial={{ bottom: "-250%" }}
              animate={{ bottom: "0" }}
              exit={{ bottom: "-250%" }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
              }}
              className="p-6 w-full max-w-[850px] bg-white-main max-h-[650px] absolute top-0 my-auto  h-fit overflow-y-auto modales"
            >
              <button
                onClick={closeModal}
                className="absolute top-2 right-2 text-red-700"
              >
                ✖
              </button>
              <div className="h-fit">{componente}</div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ModalWrapper;
