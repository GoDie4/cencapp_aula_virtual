"use client";
import { useCarrito } from "@/store/useCarrito";
import { useRouter } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";
import { toast } from "sonner";

export default function Carrito() {
  const navigate = useRouter();
  const { carrito } = useCarrito();
  function redirectToCarrito() {
    if (carrito.length === 0) {
      toast.error("No podemos redirigirlo si no tiene pedidos en el carrito");
    } else {
      navigate.push("/carrito");
    }
  }
  return (
    <button
      onClick={redirectToCarrito}
      type="button"
      className="fixed z-50 flex items-center justify-center w-16 h-16 transition-colors duration-500 ease-in-out border rounded-full shadow-2xl carrito bottom-5 border-secondary-main right-5 bg-primary-main text-white-main shadow-black/90 hover:bg-primary/90"
    >
      <div className="absolute flex items-center justify-center rounded-full shadow-xl w-7 h-7 -top-2 -left-2 bg-secondary-main">
        {carrito.length}
      </div>
      <FiShoppingCart size={22} />
    </button>
  );
}
