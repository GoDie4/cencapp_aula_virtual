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
      const res = await axios.post(`${config.apiUrl}/comentarios/save`, {
        claseId,
        userId,
        comentario: input,
      });

      toast.success("Comentario enviado");
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
      await axios.delete(`http://localhost:3000/api/comentarios/${commentId}`);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error("Error al eliminar el comentario", error);
      // podrías mostrar un mensaje al usuario
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-secondary-50 py-6 px-3 rounded-lg shadow">
      <form onSubmit={handleSubmit} className="mb-4 flex gap-2">
        <div className="w-full relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Escribe un comentario..."
            className="w-full p-2 border pr-8 border-gray-300 focus:border-primary-main rounded-md focus:outline-none"
            disabled={loading}
          />
          <button
            type="submit"
            className="absolute top-0 right-2 text-primary-main h-full text-white py-2 rounded-md"
            disabled={loading}
          >
            <BsFillSendFill />
          </button>
        </div>
      </form>

      <ul className="space-y-4">
        {comments.length > 0 ? (
          comments.map((comentario: ComentarioListar) => (
            <li
              key={comentario.id}
              className="p-4 pt-6 rounded-lg shadow bg-white-main relative"
            >
              {user?.id === comentario.userId && (
                <button
                  type="button"
                  onClick={() => handleDelete(comentario.id)}
                  className="absolute top-2 right-2 text-sm text-red-500"
                >
                  <BsFillTrashFill />
                </button>
              )}
              <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-800">
                  {comentario.usuario.nombres}
                </span>
                <span className="text-xs text-black-500">
                  {new Date(comentario.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mt-2 text-black-800 text-sm">
                {comentario.comentario}
              </p>
              <button className="text-primary-main text-sm font-semibold mt-2 hover:underline">
                Responder
              </button>
            </li>
          ))
        ) : (
          <p className="text-sm text-center text-black-800">
            Aún no hay comentarios para esta clase
          </p>
        )}
      </ul>
    </div>
  );
};

export default CommentComponent;
