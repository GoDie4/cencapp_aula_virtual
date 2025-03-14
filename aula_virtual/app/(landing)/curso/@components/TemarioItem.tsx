/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Typography } from "@mui/material";
import { Accordion, AccordionDetails, AccordionSummary } from "./Acordion";
import React from "react";

export const TemarioItem = ({
  sesion,
  expanded,
  handleChange,
  detalles,
}: {
  sesion: any;
  expanded: any;
  handleChange: any;
  detalles: string[];
}): React.JSX.Element => (
  <Accordion expanded={expanded} onChange={handleChange}>
    <AccordionSummary
      aria-controls={`
    ${sesion}-content`}
      id={`${sesion}-header`}
    >
      <Typography>{sesion}</Typography>
    </AccordionSummary>
    <AccordionDetails>
      <ul className="pl-6 list-outside">
        {/* Acceder a los detalles de la sesión actual */}
        {detalles.map((detalle: any, i: any) => (
          <li key={i}>{detalle.nombre}</li>
        ))}
      </ul>
    </AccordionDetails>
  </Accordion>
);

export const RenderTemarioItem = ({ curso }: { curso: any }) => {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      event.preventDefault();
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      {curso.Seccion && (
        <section className="temario2">
          {curso.Seccion.map((seccion: any, index: number) => (
            <TemarioItem
              key={index}
              sesion={seccion.nombre}
              expanded={expanded === `panel${index + 1}`}
              handleChange={handleChange(`panel${index + 1}`)}
              detalles={seccion.clases}
            />
          ))}
        </section>
      )}
    </>
  );
};
