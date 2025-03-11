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
  const playerRef = useRef(null);
  const intervalRef = useRef(null); // referencia al intervalo
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  // Opciones del reproductor
  const opts = {
    height: "650",
    width: "100%",
    playerVars: {
      autoplay: 0,
      rel: 0,
      modestbranding: 1, // menos branding de YouTube
      showinfo: 0, // ya no es soportado, pero solía ocultar título
      controls: 1,
    },
  };

  const onReady = (event) => {
    playerRef.current = event.target;

    // Obtener duración del video
    const totalDuration = playerRef.current.getDuration();
    console.log(totalDuration);
    setDuration(totalDuration);
  };

  const startTrackingProgress = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        if (playerRef.current && playerRef.current.getCurrentTime) {
          console.log(playerRef.current.getCurrentTime());
          setProgress(playerRef.current.getCurrentTime());
        }
      }, 3000);
    }
  };

  const stopTrackingProgress = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const onStateChange = (event) => {
    const playerStatus = event.data;

    if (playerStatus === 1) {
      // PLAYING
      startTrackingProgress();
    } else if (playerStatus === 2 || playerStatus === 0) {
      // PAUSED or ENDED
      stopTrackingProgress();
    }
  };

  // Limpiar cuando se desmonte el componente
  useEffect(() => {
    return () => stopTrackingProgress();
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    setProgreso(Number(((progress / duration) * 100).toFixed(0)));
  }, [duration, progress, setProgreso]);
  return (
    <>
      <div onContextMenu={(e) => e.preventDefault()}>
        <YouTube
          videoId={id} // Reemplaza con el ID de tu video
          opts={opts}
          onReady={onReady}
          onStateChange={onStateChange}
        />
      </div>
      {/* <div>
        <p>
          Tiempo: {formatTime(progress)} / {formatTime(duration)}
        </p>
        <p>Progreso: {((progress / duration) * 100).toFixed(0)}%</p>
      </div> */}
    </>
  );
};
