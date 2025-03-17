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
    <div className="max-w-lg mx-auto bg-white py-4 px-4 rounded-md shadow-sm border border-gray-200">
      <h3 className="text-lg font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
        Comentarios
      </h3>

      <form onSubmit={handleSubmit} className="mb-6">
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

      <div className="overflow-y-auto max-h-96">
        {comments.length > 0 ? (
          <ul className="space-y-3">
            {comments.map((comentario: ComentarioListar) => (
              <li
                key={comentario.id}
                className="p-3 rounded-md border border-gray-100 bg-gray-50 relative"
              >
                {user?.id === comentario.userId && (
                  <button
                    type="button"
                    onClick={() => handleDelete(comentario.id)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition-colors"
                    aria-label="Eliminar comentario"
                  >
                    <BsFillTrashFill size={14} />
                  </button>
                )}
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700 text-sm">
                    {comentario.usuario.nombres}
                  </span>
                  <span className="text-xs text-gray-500">
                    {new Date(comentario.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {comentario.comentario}
                </p>
                <button className="text-blue-600 text-xs font-medium mt-2 hover:text-blue-800 transition-colors">
                  Responder
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="py-6 text-center">
            <p className="text-sm text-gray-500">
              No hay comentarios para esta clase
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentComponent;
