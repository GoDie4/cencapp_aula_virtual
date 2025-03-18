"use client";
import { config } from "@/config/config";
import { useAuth } from "@/context/AuthContext";
import {
  useCarrito,
} from "@/store/useCarrito";
import { useToRedirect } from "@/store/useToRedirect";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoMdSend } from "react-icons/io";

export const ValidarDatos = () => {
  const { carrito, carritoMercadoPago } = useCarrito();
  const { user } = useAuth();
  const [renderButton, setRenderButton] = useState<boolean>(false);
  const navigate = useRouter();
  const { setRedirect } = useToRedirect();

  useEffect(() => {
    if (carrito.length === 0) {
      setRenderButton(false);
      navigate.push("/");
    }
    setRenderButton(true);
  }, [carrito.length, navigate]);

  async function validarDatos() {
    if (user?.id) {
      const data = {
        items: carritoMercadoPago,
        info: {
          email: user.email,
          id: user.id,
        },
      };
      const response = await axios.post(`${config.apiUrl}/mercado`, data);
      if (response.status === 200) {
        window.open(response.data.init_point);
      }
    } else {
      navigate.push("/login");
      setRedirect("/carrito");
    }
  }
  return (
    <div className="w-full flex justify-center">
      {renderButton && (
        <button
          type="button"
          onClick={validarDatos}
          className="flex gap-2 items-center text-xl px-4 py-2 bg-primary-600 rounded-lg text-white-main font-medium transition-colors duration-500 hover:bg-primary-900"
        >
          Valida mis datos{" "}
          <span>
            <IoMdSend size={20} />
          </span>
        </button>
      )}
    </div>
  );
};
