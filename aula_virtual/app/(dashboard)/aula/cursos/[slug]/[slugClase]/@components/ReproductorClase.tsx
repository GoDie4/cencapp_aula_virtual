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

export const ReproductorClase = ({
  id,
  setProgreso,
}: {
  id: string;
  setProgreso: Dispatch<SetStateAction<number>>;
}) => {
  const playerRef = useRef<any>(null);
  const intervalRef = useRef<any>(null);
  const lastSavedProgress = useRef(0); // última vez que se guardó el progreso
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

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

  const saveProgress = (currentTime: number) => {
    const porcentaje = Number(((currentTime / duration) * 100).toFixed(0));
    console.log("Progreso: ", porcentaje)

    setProgreso(porcentaje);
    lastSavedProgress.current = currentTime;
    // Aquí podrías hacer una llamada a la API si lo deseas
    // fetch('/api/progreso', { method: 'POST', body: JSON.stringify({ videoId: id, progreso: currentTime }) });
  };

  const startTrackingProgress = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        if (playerRef.current && playerRef.current.getCurrentTime) {
          const currentTime = playerRef.current.getCurrentTime();
          setProgress(currentTime);

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
    // Guardar el último progreso al pausar o terminar
    if (playerRef.current?.getCurrentTime) {
      const currentTime = playerRef.current.getCurrentTime();
      saveProgress(currentTime);
    }
  };

  const onStateChange = (event: any) => {
    const playerStatus = event.data;

    if (playerStatus === 1) {
      // PLAYING
      startTrackingProgress();
    } else if (playerStatus === 2 || playerStatus === 0) {
      // PAUSED or ENDED
      stopTrackingProgress();
    }
  };

  useEffect(() => {
    return () => stopTrackingProgress(); // limpiar al desmontar
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
