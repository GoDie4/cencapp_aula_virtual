"use client";
import { useCarrito } from "@/store/useCarrito";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";
import { toast } from "sonner";

export default function Carrito() {
  const navigate = useRouter()
  const { carrito } = useCarrito();
  function redirectToCarrito () {
    if (carrito.length === 0) {
      toast.error('No podemos redirigirlo si no tiene pedidos en el carrito')
    }
    else {
      navigate.push('/carrito')
    }
  }
  return (
    <button
      onClick={redirectToCarrito}
      type="button"
      className="carrito fixed bottom-5 right-5 z-50 bg-primary-main text-white h-20 w-20 flex justify-center items-center rounded-md shadow-lg shadow-black/80 hover:bg-primary/90 duration-500 ease-in-out transition-colors"
    >
      <div className="w-10 h-10 absolute -top-5 -left-5 bg-secondary-main  shadow-xl rounded-full flex justify-center items-center">
        {carrito.length}
      </div>
      <FiShoppingCart size={25} />
    </button>
  );
}
