/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import YouTube from "react-youtube";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import axios from "axios";
import { config } from "@/config/config";

export const ReproductorClase = ({
  id,
  userId,
  cursoId,
  setProgreso,
  totalClases,
  porcentajeGuardado,
  posicionClase,
  seccionId,
  dataClase,
}: {
  id: string;
  userId: string;
  cursoId: string;
  setProgreso: Dispatch<SetStateAction<number>>;
  totalClases: number;
  porcentajeGuardado: number;
  posicionClase: number;
  seccionId: number;
  dataClase: any;
}) => {
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<any>(null);
  const lastSavedProgress = useRef(0);
  const [duration, setDuration] = useState(0);

  const porcentajeRegistradoRef = useRef<{
    seccionId: number;
    porcentaje: number;
  }>({
    seccionId,
    porcentaje: porcentajeGuardado,
  });
  const claseRegistrada = useRef(false);

  const opts = {
    height: "650",
    width: "100%",
    playerVars: {
      autoplay: 0,
      rel: 0,
      modestbranding: 1,
      controls: 1,
      disablekb: 1,
    },
  };

  const onReady = (event: any) => {
    playerRef.current = event.target;
    const totalDuration = playerRef.current.getDuration();
    setDuration(totalDuration);
  };

  const saveProgress = async (currentTime: number) => {
    const porcentaje = Number(((currentTime / duration) * 100).toFixed(0));
    console.log("Progreso:", porcentaje);

    const porcentajePorClase = (1 / totalClases) * 100;
    setProgreso(porcentaje);
    lastSavedProgress.current = currentTime;

    const claseYaRegistrada =
      seccionId === porcentajeRegistradoRef.current.seccionId - 1 &&
      porcentajeRegistradoRef.current.porcentaje >=
        porcentajePorClase * posicionClase;

    console.log("Clase ya registrada (por porcentaje):", claseYaRegistrada);

    console.log(porcentajeRegistradoRef.current);

    if (
      porcentaje >= 90 &&
      !claseYaRegistrada &&
      !claseRegistrada.current &&
      porcentajeRegistradoRef.current.porcentaje < 99
    ) {
      try {
        const nuevoPorcentaje =
          porcentajeRegistradoRef.current.porcentaje + porcentajePorClase;
        const { data } = await axios.post(
          `${config.apiUrl}/porcentajeCurso`,
          {
            userId,
            cursoId,
            porcentaje: nuevoPorcentaje,
            ultimaClase: {
              seccion: dataClase.clase.seccion.nombre,
              clase: dataClase.clase.nombre,
              slugClase: dataClase.clase.slug,
            },
          },
          {
            withCredentials: true,
          }
        );
        porcentajeRegistradoRef.current.porcentaje = nuevoPorcentaje;
        claseRegistrada.current = true;
        console.log("Progreso guardado correctamente:", data);
      } catch (error: any) {
        if (axios.isAxiosError(error)) {
          console.error(
            "Error al guardar el progreso:",
            error.response?.data || error.message
          );
        } else {
          console.error("Error desconocido:", error);
        }
      }
    }
  };

  const startTrackingProgress = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        if (playerRef.current && playerRef.current.getCurrentTime) {
          const currentTime = playerRef.current.getCurrentTime();
          setProgreso(currentTime);

          // Guarda cada 15 segundos
          if (currentTime - lastSavedProgress.current >= 15) {
            saveProgress(currentTime);
          }
        }
      }, 3000); // Verifica cada 3 segundos
    }
  };

  const stopTrackingProgress = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // Guarda el progreso final al pausar o terminar
    if (playerRef.current?.getCurrentTime) {
      const currentTime = playerRef.current.getCurrentTime();
      saveProgress(currentTime);
    }
  };

  const onStateChange = (event: any) => {
    const playerStatus = event.data;

    if (playerStatus === 1) {
      startTrackingProgress();
    } else if (playerStatus === 2 || playerStatus === 0) {
      stopTrackingProgress();
    }
  };

  useEffect(() => {
    return () => stopTrackingProgress();
  }, []);

  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <YouTube
        videoId={id}
        opts={opts}
        onReady={onReady}
        onStateChange={onStateChange}
      />
    </div>
  );
};
