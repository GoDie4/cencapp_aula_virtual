"use client";
import { useCarrito } from "@/store/useCarrito";
import s2 from "../../../assets/varios/c_banner.webp";
import Banner from "../../../components/public/Banner";
import CardCurso from "../../../components/public/curso/CardCurso";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { IoMdSend } from "react-icons/io";
import useAuth from "@/hooks/useAuth";
import { useToRedirect } from "@/store/useToRedirect";
import axios from "axios";
import { config } from "@/config/config";

export default function CarritoPage() {
  const navigate = useRouter();
  const { carrito, carritoMercadoPago } = useCarrito();
  const { user } = useAuth();
  const { setRedirect } = useToRedirect();
  const [renderButton, setRenderButton] = useState<boolean>(false);
  useEffect(() => {
    if (carrito.length === 0) {
      setRenderButton(false);
      navigate.push("/");
    }
    setRenderButton(true);
  }, [carrito.length]);

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
    <div className="w-full h-auto">
      <Banner titulo="Carrito" imagen={`${s2.src}`} />
      <main className="py-10 mx-auto w-dvw px-[120px] space-y-10">
        <h3 className="text-4xl font-bold">Pasos a seguir:</h3>
        <div className="flex items-center py-10">
          <div className="w-20 h-20 rounded-full text-lg font-bold bg-secondary-400 text-white flex justify-center items-center ring-4 ring-primary-600">
            1
          </div>
          <hr className="flex-grow border-2 border-primary-600" />
          <div className="w-20 h-20 rounded-full text-xl font-bold bg-gray-500 text-white-main text-white flex justify-center items-center ring-4 ring-primary-600">
            2
          </div>
          <hr className="flex-grow border-2 border-primary-600" />
          <div className="w-20 h-20 rounded-full text-xl font-bold bg-gray-500 text-white-main flex justify-center items-center ring-4 ring-primary-600">
            3
          </div>
        </div>
        <h3 className="text-4xl text-primary font-bold">
          Mis Cursos en Carrito
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {carrito.map((c, idx) => (
            <CardCurso
              key={idx}
              id={String(c.id)}
              img={c.imagen}
              titulo={c.nombre}
              precio={c.precio.toString()}
              horas={`${c.horas} horas`}
              pedido1={c.pedido}
            />
          ))}
        </div>
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
      </main>
    </div>
  );
}
