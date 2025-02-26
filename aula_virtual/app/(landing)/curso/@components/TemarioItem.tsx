'use client'
import { Typography } from "@mui/material"
import { Accordion, AccordionDetails, AccordionSummary } from "./Acordion"
import React from "react"

export const TemarioItem = ({
  sesion,
  expanded,
  handleChange,
  detalles
}: {
  sesion: any
  expanded: any
  handleChange: any
  detalles: string[]
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
      <ul>
        {/* Acceder a los detalles de la sesión actual */}
        {detalles.map((detalle: any, i: any) => (
          <li key={i}>{detalle}</li>
        ))}
      </ul>
    </AccordionDetails>
  </Accordion>
)

export const RenderTemarioItem = ({ curso }: { curso: any }) => {
  const [expanded, setExpanded] = React.useState<string | false>('panel1')
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      event.preventDefault()
      setExpanded(newExpanded ? panel : false)
    }
  return (
    <>
      {curso.temario && (
        <section className="temario2">
          {curso.temario.map((sesion: any, index: number) => (
            <TemarioItem
              key={index}
              sesion={sesion.titulo}
              expanded={expanded === `panel${index + 1}`}
              handleChange={handleChange(`panel${index + 1}`)}
              detalles={sesion.detalles}
            />
          ))}
        </section>
      )}
    </>
  )
}