'use client'
import { useCarrito } from "@/store/useCarrito";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

export default function Carrito() {
  const { carrito } = useCarrito()
  return (
    <Link href='/carrito' className="carrito fixed bottom-5 right-5 z-50 bg-primary text-white h-20 w-20 flex justify-center items-center rounded-md shadow-lg shadow-black/80 hover:bg-primary/90 duration-500 ease-in-out transition-colors">
      <div className="w-10 h-10 absolute -top-5 -left-5 bg-red-600 rounded-full flex justify-center items-center">
        {carrito.length}
      </div>
      <FiShoppingCart size={25} />
    </Link>
  )
}
