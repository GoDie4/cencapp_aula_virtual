"use client";
import React, { useState, FormEvent } from "react";
import { BsFillSendFill } from "react-icons/bs";
import axios from "axios"; // Asegúrate de tener axios instalado
import { useAuth } from "@/context/AuthContext";
import { config } from "@/config/config";
import {
  Comentario,
  ComentarioListar,
} from "../../../@interfaces/InterfacesCurso";
import { toast } from "sonner";

interface Props {
  claseId: number;
  comentarios: Comentario[];
}
import { BsFillTrashFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
const CommentComponent = ({ claseId, comentarios }: Props) => {
  const [comments, setComments] = useState<ComentarioListar[]>(comentarios);
  const [input, setInput] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim() === "") return;

    setLoading(true);

    const userId = user?.id;
    if (!user || !user.id) {
      throw new Error("Usuario inválido");
    }
    try {
      const res = await axios.post(
        `${config.apiUrl}/comentarios/save`,
        {
          claseId,
          userId,
          comentario: input,
        },
        {
          withCredentials: true,
        }
      );

      const nuevoComentario = res.data;

      const formattedComment: ComentarioListar = {
        id: nuevoComentario.id,
        usuario: {
          ...(user || {}),
          nombres: user?.nombres?.split(" ")[0] ?? "",
        },
        comentario: nuevoComentario.comentario,
        createdAt: new Date(nuevoComentario.createdAt),
        userId: user.id,
      };

      setComments([formattedComment, ...comments]);
      setInput("");
    } catch (error) {
      console.error("Error al registrar el comentario", error);
      toast.error("Ha ocurrido un error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    try {
      const response = await axios.delete(
        `${config.apiUrl}/comentarios/delete/${commentId}`,
        {
          data: { claseId },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("Comentario eliminado");
      }
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error("Error al eliminar el comentario", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white overflow-hidden  rounded-md shadow-sm border border-gray-200">
      <h3 className="text-lg font-bold bg-primary-main text-white-main mb-4 px-4 py-4 border-b border-gray-200">
        Comentarios
      </h3>

      <form onSubmit={handleSubmit} className="mb-2 px-4  py-2">
        <div className="w-full relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escriba un comentario..."
            className="w-full p-3 border border-gray-300 focus:border-blue-600 focus:ring-1 focus:ring-blue-600 rounded-md focus:outline-none text-sm"
            disabled={loading}
          />
          <button
            type="submit"
            className="absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-600 hover:text-blue-800"
            disabled={loading}
          >
            <BsFillSendFill size={16} />
          </button>
        </div>
      </form>
      <div className="overflow-y-auto px-3  max-h-96   rounded-lg ">
        {comments.length > 0 ? (
          <ul className="divide-y divide-blue-100">
            {comments.map((comentario: ComentarioListar) => (
              <li
                key={comentario.id}
                className="px-1 py-4 hover:bg-blue-50 transition-colors relative flex items-start"
              >
                {/* Avatar */}
                <div className="mr-2">
                  <FaUserCircle size={28} className="text-blue-400" />
                </div>
                <div className="w-full">
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <span className="font-semibold text-blue-800 text-base">
                        {comentario.usuario.nombres}
                      </span>
                      <span className="ml-3 text-xs text-blue-600">
                        {new Date(comentario.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {user?.id === comentario.userId && (
                      <button
                        type="button"
                        onClick={() => handleDelete(comentario.id)}
                        className="ml-4 text-red-500 hover:text-red-700 transition-colors"
                        aria-label="Eliminar comentario"
                      >
                        <BsFillTrashFill size={16} />
                      </button>
                    )}
                  </div>
                  <p className="text-gray-800 text-sm leading-relaxed">
                    {comentario.comentario}
                  </p>
                  <div className="mt-3 text-right">
                    <button className="bg-blue-600 text-white-main text-sm font-medium px-3 py-1 hover:bg-blue-700 rounded transition-colors">
                      Responder
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-10 text-center">
            <p className="text-sm text-blue-600 font-medium">
              No hay comentarios para esta clase
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentComponent;
