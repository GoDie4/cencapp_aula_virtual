"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TabTitleProps {
  title: string;
  className?: string;
  onClick?: () => void;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TabTitle = ({ title }: TabTitleProps) => {
  // Este componente no renderiza nada por sí mismo,
  // su única función es servir para declarar el título.
  return null;
};

interface TabContentProps {
  children: ReactNode;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const TabContent = ({ children }: TabContentProps) => {
  // Este componente tampoco renderiza nada por sí mismo,
  // solo encapsula el contenido de la pestaña.
  return null;
};

interface TabsProps {
  children: ReactNode;
}

export default function Tabs({ children }: TabsProps) {
  // Aplanamos los hijos y asumimos que vienen en pares:
  // [<TabTitle />, <TabContent />, <TabTitle />, <TabContent />, ...]
  const childrenArray = Array.isArray(children) ? children : [children];

  const pairs: {
    title: string;
    className?: string;
    onClick: () => void;
    content: ReactNode;
  }[] = [];
  for (let i = 0; i < childrenArray.length; i += 2) {
    const titleElement = childrenArray[i];
    const contentElement = childrenArray[i + 1];

    const { onClick } = (titleElement as any).props;
    // Se asume que los elementos tienen las props esperadas.
    pairs.push({
      title: (titleElement as any).props.title,
      content: (contentElement as any).props.children,
      onClick: onClick ?? (() => {}),
    });
  }

  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-col sm:p-2 md:p-4">
      <div className="flex mb-4">
        {pairs.map((pair, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveTab(index);
              pair.onClick();
            }}
            className={`${
              pair.className
            } px-5 sm:px-8 md:px-12 lg:px-20 lg:min-w-72 text-black-900 py-2 border-b-2 font-medium ${
              activeTab === index ? "border-primary-main text-primary-main" : ""
            }`}
          >
            {pair.title}
          </button>
        ))}
      </div>
      <div className="w-full  sm:p-2 md:p-4 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.3 }}
          >
            {pairs[activeTab].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
