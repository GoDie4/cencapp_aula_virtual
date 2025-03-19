"use client";
import { config } from "@/config/config";
import { DialogResponsiveContext } from "@/context/DialogResponsive";
import axios from "axios";
import React, { useContext } from "react";
import { toast } from "sonner";

export default function FormRespuestaTarea({ id }: { id: string }) {
  const [archivo, setArchivo] = React.useState<File | null>(null);
  const { handleClose } = useContext(DialogResponsiveContext);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArchivo(event.target.files?.[0] ?? null);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData();
    if (archivo) {
      formData.append("respuesta", archivo);
    } else {
      toast.error("Debes mandar un archivo");
      return;
    }
    formData.append("testId", id);

    const token = localStorage.getItem("token");
    const response = await axios.postForm(
      `${config.apiUrl}/ejercicios/enviar`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 201) {
      toast.success(response.data.message);
      handleClose();
      window.location.reload();
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 flex flex-col items-center"
      >
        <div className="w-full h-auto space-y-2">
          <label htmlFor="file">Archivo de Respuesta: </label>
          <input
            type="file"
            onChange={handleChange}
            title="archivo"
            id="file"
            name="file"
          />
        </div>
        <button
          type="submit"
          className="bg-primary-main w-fit text-white-main hover:bg-primary-900 rounded-md py-2 px-4 text-sm font-medium"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
