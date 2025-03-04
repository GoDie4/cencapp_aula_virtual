"use client";
import { useCarrito } from "@/store/useCarrito";
import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

export default function Carrito() {
  const { carrito } = useCarrito();
  return (
    <Link
      href="/carrito"
      className="carrito rounded-full fixed bottom-5 border border-secondary-main right-5 z-50 bg-primary-main text-white-main h-16 w-16 flex justify-center items-center shadow-2xl shadow-black/90 hover:bg-primary/90 duration-500 ease-in-out transition-colors"
    >
      <div className="w-7 h-7 absolute -top-2 -left-2 bg-secondary-main  shadow-xl rounded-full flex justify-center items-center">
        {carrito.length}
      </div>
      <FiShoppingCart size={22} />
    </Link>
  );
}
