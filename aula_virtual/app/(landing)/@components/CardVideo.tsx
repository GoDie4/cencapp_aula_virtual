"use client";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
export const CardVideo = ({ id }: { id: string }) => {
  return <LiteYouTubeEmbed id={id} title="Video" />;
};
