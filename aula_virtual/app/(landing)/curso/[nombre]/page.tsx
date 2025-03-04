/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  FiInfo,
  FiTarget,
  FiSettings,
  FiAward,
  FiDollarSign,
  FiVideo,
  FiMessageCircle,
  FiClock,
  FiClipboard,
  FiTool,
} from "react-icons/fi";
import Banner from "../../../../components/public/Banner";
import area8 from "../../../../assets/areas/8.webp";
import area1 from "../../../../assets/areas/1.webp";
import area6 from "../../../../assets/areas/6.webp";
import { BsWhatsapp } from "react-icons/bs";
import * as React from "react";
/*
import { styled } from '@mui/material/styles'
import MuiAccordion, { type AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
  type AccordionSummaryProps
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import { IoChevronDown } from 'react-icons/io5'
import { Accordion, AccordionSummary } from '../@components/Acordion'
import AccordionDetails from '@mui/material/AccordionDetails'
*/
import { RenderTemarioItem } from "../@components/TemarioItem";
import { ContentMain } from "../../../../components/public/estructura/ContentMain";
/*
const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&::before': {
    display: 'none'
  }
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<IoChevronDown style={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}))
*/

const ViewCurso = async ({
  params,
}: {
  params: Promise<{ nombre: string }>;
}): Promise<React.JSX.Element> => {
  // const [expanded, setExpanded] = React.useState<string | false>('panel1')
  /*
  React.useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  */
  /*
  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      event.preventDefault()
      setExpanded(newExpanded ? panel : false)
    }
  */
  const cursosData = {
    levantamientotopografico: {
      titulo: "Levantamiento topográfico",
      presentacion:
        "La topografía permite adquirir los conocimientos necesarios para realizar levantamientos topográficos para los distintos tipos de proyectos y estudios para el diseño de obras de ingeniería. El aprendizaje de la topografía es de suma importancia para todas aquellas personas que desean realizar estudios de ingeniería en cualquiera de sus ramas, así como para los estudiantes de arquitectura.",
      certifica:
        'Los participantes que cumplan satisfactoriamente con los requisitos académicos y administrativos del programa recibirán el certificado en: "LEVANTAMIENTO TOPOGRÁFICO-CON ESTACION TOTAL" expedido por el CENTRO DE CAPACITACION Y ASESORAMIENTO PROFESIONAL PERU S.A.C',
      precio: 120,
      imagen: `${area8.src}`,
      beneficios: [
        {
          icono: "video",
          descripcion:
            "Las sesiones serán grabadas para posteriormente visualizarse en el aula virtual.",
        },
        {
          icono: "award",
          descripcion:
            "Certificación por 48 horas académicas. Para los participantes del exterior será de manera digital y para los participantes de Perú será físico (previa coordinación para pago de envío).",
        },
        {
          icono: "message",
          descripcion:
            "Se creará un grupo de WhatsApp para consultas fuera de horario de clases virtuales.",
        },
        {
          icono: "clock",
          descripcion:
            "Acceso al aula virtual (Google Classroom) las 24 horas y estará disponible durante 6 meses luego de culminado el curso.",
        },
        {
          icono: "clipboard",
          descripcion:
            "Para la obtención del certificado el participante deberá obtener una nota mínima de 14.",
        },
        {
          icono: "tool",
          descripcion:
            "Se compartirá los instaladores de los softwares utilizados.",
        },
        // Agrega más beneficios según sea necesario
      ],
      dirigido:
        "Ingenieros civiles, arquitectos, así como estudiantes de las carreras afines que deseen aprender a realizar levantamientos topográficos (con estación total)",
      temario: [
        {
          titulo: "SESIÓN 01",
          detalles: [
            "Teoría .- Introducción a los conceptos de topografía y su ámbito de aplicación.",
          ],
        },
        {
          titulo: "SESIÓN 02",
          detalles: [
            "Teoría .- Levantamiento Topográfico usando Estación total. ",
          ],
        },
        {
          titulo: "SESIÓN 03",
          detalles: [
            "Practica.- Levantamiento Topográfico usando Estación total en CARRETERAS.",
          ],
        },
        {
          titulo: "SESIÓN 04",
          detalles: [
            "Practica.- Levantamiento Topográfico usando Estación total en PISTAS Y VEREDAS.",
          ],
        },
        {
          titulo: "SESIÓN 05",
          detalles: [
            "Procesamiento de datos.- Importación de puntos y curvas de nivel, alineamiento y perfil longitudinal en CIVIL 3D",
          ],
        },
        {
          titulo: "SESIÓN 06",
          detalles: ["Replanteo.- de poligonal y eje de alineamientos."],
        },
        // Agregar más sesiones según sea necesario
      ],
    },
    topografiaaplicadaaobrasciviles: {
      titulo: "TOPOGRAFÍA EN OBRAS CIVILES",
      imagen: `${area8.src}`,
      presentacion:
        "El presente curso de Topografía en obras Civiles te va permitir adquirir los conocimientos necesarios para realizar estudios topográficos para los distintos tipos de proyectos en la elaboracion de estudios y ejecución de obras de ingeniería. El estudio básico de topografía es de suma importancia en los proyectos de ingenieria por lo que es necesario conocer los equipos, recursos y la metodologia en los diferentes ambitos de su aplicación antes, durante y despues de la ejecución.",
      dirigido:
        "Ingenieros civiles, Arquitectos, Técnicos en construcción civil, así como estudiantes de las carreras afines que deseen aprender a realizar estuidos de topografía en obras civiles",
      certifica:
        'Los participantes que cumplan satisfactoriamente con los requisitos académicos y administrativos del programa recibirán el certificado en: "TOPOGRAFÍA EN OBRAS CIVILES" expedido por el CENTRO DE CAPACITACION Y ASESORAMIENTO PROFESIONAL PERU S.A.C EN CONVENIO CON EL CIP AMAZONAS',
      beneficios: [
        {
          icono: "video",
          descripcion:
            "Las sesiones serán grabadas para posteriormente visualizarse en el aula virtual.",
        },
        {
          icono: "award",
          descripcion:
            "Certificación por 48 horas académicas. Para los participantes del exterior será de manera digital y para los participantes de Perú será físico (previa coordinación para pago de envío).",
        },
        {
          icono: "message",
          descripcion:
            "Se creará un grupo de WhatsApp para consultas fuera de horario de clases virtuales.",
        },
        {
          icono: "clock",
          descripcion:
            "Acceso al aula virtual (Google Classroom) las 24 horas y estará disponible durante 6 meses luego de culminado el curso.",
        },
        {
          icono: "clipboard",
          descripcion:
            "Para la obtención del certificado el participante deberá obtener una nota mínima de 14.",
        },
        {
          icono: "tool",
          descripcion:
            "Se compartirá los instaladores de los softwares utilizados.",
        },
        // Agrega más beneficios según sea necesario
      ],
      temario: [
        {
          titulo: "SESIÓN 01",
          detalles: [
            "Introducción a la topografía",
            "Conceptos básicos",
            "Materiales y recursos",
            "Metodología",
          ],
        },
        {
          titulo: "SESIÓN 02",
          detalles: [
            "Conociendo los Equipos Topográficos",
            "Manejo de Estación Total Topcon OS-105",
            "Manejo de Nivel de Ingeniero",
            "Manejo de GNSS (GPS DIFERENCIAL)",
          ],
        },
        {
          titulo: "SESIÓN 03",
          detalles: [
            "Instalacion de BM y Puntos de Control",
            "Manejo de estaciön Total",
            "Manejo de Nivel de Ingeniero",
          ],
        },
        {
          titulo: "SESIÓN 04",
          detalles: [
            "Trazo de Poligonal",
            "Levantamiento Topográfico",
            "Nivelación Topográfica",
          ],
        },
        {
          titulo: "SESIÓN 05",
          detalles: [
            "Presentación del Software CIVIL 3D",
            "Importacion de puntos",
            "Georeferenciación del proyecto",
            "Compensación de Poligonal",
          ],
        },
        {
          titulo: "SESIÓN 06",
          detalles: [
            "Creación de Superficie",
            "Creación de alineamiento (varias maneras)",
            "Creación de Perfiles Longitudinales",
            "Creación de Secciones Transversales",
          ],
        },
        {
          titulo: "SESIÓN 07",
          detalles: [
            "Creación de corredor",
            "Cálculo de Volumenes de tierra",
            "Reporte de Metrados calculados",
            "Reporte de datos para replanteo",
          ],
        },
        {
          titulo: "SESIÓN 08",
          detalles: [
            "Importación de Puntos a la estación Total",
            "Replanteo (tangentes y curvas horizontales)",
            "Emplantillado para ejecución del proyecto",
          ],
        },
        // Agregar más sesiones según sea necesario
      ],
      precio: 350,
    },
    presupuestoyprogramaciondeobrasconpresupuestope: {
      titulo: "Presupuesto y programación de obras",
      presentacion:
        "Durante el desarrollo del curso obtendrás los conocimientos teóricos y prácticos para desempeñarte como un especialista en presupuesto y programación de obras. Además desarrollarás criterios objetivos para la determinación de rendimientos de obra, el manejo presupuestal, uso de normativa y la correcta programación del proyecto en los apartados de presupuestos y programación de obras.",
      objetivo:
        "El principal objetivo de este curso es brindar los conocimientos básicos teórico prácticos en temas relacionados con la determinación de las Partidas de Obra, Rendimientos, Análisis de Costos Unitarios, Costos Directos, Costos Indirectos, Formulas Polinómicas y Programación de Obras ; para lo cual utilizaremos el software presupuestos.pe y mediante ejemplos de aplicación el estudiante pondrá en práctica los conocimientos aprendidos.",
      dirigido:
        "Ingenieros civiles, arquitectos, así como estudiantes de las carreras afines que deseen aprender a realizar levantamientos topográficos (con estación total)",
      metodologia:
        "Acceso Libre a las clases mediante nuestras paginas de facebook y youtube, el participante podrá realizar el curso desde su dispositivo móvil, tablet o computadora (20 horas sincrónicas , 28 horas asincrónicas). ",
      certifica:
        'Los participantes que cumplan satisfactoriamente con los requisitos académicos y administrativos del programa recibirán el certificado en: "PRESUPUESTOS Y PROGRAMACIÓN DE OBRAS" expedido por el CENTRO DE CAPACITACIÓN Y ASESORAMIENTO PROFESIONAL PERU S.A.C. para ello deben añadir un costo segun se indica en el ítem: "Inversión y forma de pago"',
      precio: 80,
      dolar: 25,
      imagen: `${area6.src}`,
      beneficios: [
        {
          icono: "video",
          descripcion:
            "Las sesiones serán grabadas para posteriormente visualizarse en el aula virtual.",
        },
        {
          icono: "award",
          descripcion:
            "Certificación por 48 horas académicas. Para los participantes del exterior será de manera digital y para los participantes de Perú será físico (previa coordinación para pago de envío).",
        },
        {
          icono: "message",
          descripcion:
            "Se creará un grupo de WhatsApp para consultas fuera de horario de clases virtuales.",
        },
        {
          icono: "clock",
          descripcion:
            "Acceso al aula virtual (Google Classroom) las 24 horas y estará disponible durante 6 meses luego de culminado el curso.",
        },
        {
          icono: "clipboard",
          descripcion:
            "Para la obtención del certificado el participante deberá obtener una nota mínima de 14.",
        },
        {
          icono: "tool",
          descripcion:
            "Se compartirá los instaladores de los softwares utilizados.",
        },
        // Agrega más beneficios según sea necesario
      ],
      temario: [
        {
          titulo: "SESIÓN 01",
          detalles: [
            "Introducción al manejo de Presupuestos.pe.",
            "Creación de cuenta en Presupuesto.pe",
          ],
        },
        {
          titulo: "SESIÓN 02",
          detalles: [
            "Elaboración de presupuesto con el software Presupuestos.pe.",
            "Estructura de presupuesto utilizando el software Presupuestos.pe",
          ],
        },
        {
          titulo: "SESIÓN 03",
          detalles: [
            "Análisis de costos unitarios, en obras provisionales, trabajos preliminares, arquitectura, instalaciones sanitarias, instalaciones eléctricas, complementarios.",
          ],
        },
        {
          titulo: "SESIÓN 04",
          detalles: ["Calculo de rendimientos, referenciados según Capeco."],
        },
        {
          titulo: "SESIÓN 05",
          detalles: [
            "Elaboración de la formula polinómica paso a paso utilizando Excel y el software de Presupuestos.pe.",
          ],
        },
        {
          titulo: "SESIÓN 06",
          detalles: [
            "Desagregado de gastos, gastos administrativos, gastos de gestión, gastos de supervisión.",
          ],
        },
        {
          titulo: "SESIÓN 07",
          detalles: [
            "Programación de obra utilizando el software de presupuestos.pe (Definiciones, método de programación de obra, calculo de tiempos, cronograma de obra).",
          ],
        },
        {
          titulo: "SESIÓN 08",
          detalles: [
            "Gestión documentaria, calculo de flete, conclusiones y recomendaciones.",
          ],
        },
      ],
    },
    elaboraciondeplanosestructuralesconautocadstructuraldetailling: {
      titulo: "Elaboración de planos estructurales",
      imagen: `${area1.src}`,
      dirigido:
        "Ingenieros civiles, arquitectos, así como estudiantes de las carreras afines que deseen aprender a realizar levantamientos topográficos (con estación total)",
      presentacion:
        'La elaboración de planos es muy importante para representar todo tipo de proyecto, se presenta el curso "Elaboración de planos estructurales en edificaciones de concreto armado", debido a la gran necesidad que existe para la elaboración de este tipo de planos, teniendo como herramienta principal Autocad Structural Detailling programa que ayudará a mejor la precisión, calidad y automatización para la generación de planos estructurales. ',
      certifica:
        'Los participantes que cumplan satisfactoriamente con los requisitos académicos y administrativos del programa recibirán el certificado en: "ELABORACIÓN DE PLANOS ESTRUCTURALES EN EDIFICACIONES DE CONCRETO ARMADO" expedido por el CENTRO DE CAPACITACIÓN Y ASESORAMIENTO PROFESIONAL PERU S.A.C ',
      objetivo:
        "El principal objetivo de este curso es la aplicación de ASD (Autocad Structural Detailing) para la elaboración de planos estructurales en edificaciones de concreto armado basados en la norma ACI 318-19, E-060. ",
      precio: 100,
      dolar: 30,
      metodologia:
        "Acceso a las clases online en plataforma virtual con acceso 24/7, el participante podrá realizar el curso desde su dispositivo móvil, tablet o computadora (16 horas sincrónicas , 16 horas asincrónicas).",
      beneficios: [
        {
          icono: "video",
          descripcion:
            "Las sesiones serán grabadas para posteriormente visualizarse en el aula virtual.",
        },
        {
          icono: "award",
          descripcion:
            "Certificación por 32 horas académicas. Para los participantes del exterior será de manera digital y para los participantes de Perú será físico (previa coordinación para pago de envío).",
        },
        {
          icono: "message",
          descripcion:
            "Se creará un grupo de WhatsApp para consultas fuera de horario de clases virtuales.",
        },
        {
          icono: "clock",
          descripcion:
            "Acceso al aula virtual (Google Classroom) las 24 horas y estará disponible durante 6 meses luego de culminado el curso.",
        },
        {
          icono: "clipboard",
          descripcion:
            "Para la obtención del certificado el participante deberá obtener una nota mínima de 14.",
        },
        {
          icono: "tool",
          descripcion:
            "Se compartirá los instaladores de los softwares utilizados.",
        },
        // Agrega más beneficios según sea necesario
      ],
      temario: [
        {
          titulo: "SESIÓN 01",
          detalles: [
            "Introducción al manejo de Autocad Structural Detailing.",
            "Proyección de elementos estructurales de manera automatizada con ASD",
          ],
        },
        {
          titulo: "SESIÓN 02",
          detalles: [
            "Empalmes en elementos sometidos a flexión y flexo compresión, recubrimientos mínimos.",
            "Longitudes de desarrollo, diámetros de doblado y gancho estándar",
            "Recomendaciones en el detallado de refuerzo en tabiqueportico.",
          ],
        },
        {
          titulo: "SESIÓN 03",
          detalles: [
            "Refuerzo en losas armadas en 1 y 2 direcciones.",
            "Refuerzo en losas inclinadas",
            "Disposición del refuerzo en voladizos de losas.",
          ],
        },
        {
          titulo: "SESIÓN 04",
          detalles: [
            "Refuerzo en vigas y columnas",
            "Refuerzo en vigas inclinadas y de sección variable",
            "Detalle de refuerzo en unión viga-columnas, vigas con vigas.",
          ],
        },
        {
          titulo: "SESIÓN 05",
          detalles: [
            "Detallado (sísmico) de refuerzo en pórticos especiales resistentes a momento (SMF).",
            "Detallado (sísmico) de refuerzo en Muros estructurales y elementos de borde.",
            "Tablas de metrados detallado y en resumen, tablas de corte y doblado del refuerzo.",
          ],
        },
        {
          titulo: "SESIÓN 06",
          detalles: [
            "Detallado de refuerzo en zapatas de muros y columnas",
            "Refuerzo y detallado en vigas de cimentación y de riostra.",
            "Detalle del refuerzo en escaleras",
            "Creación y configuración de layouts para la impresión de planos.",
          ],
        },

        // Agregar más sesiones según sea necesario
      ],
    },
  };

  const nombre = (await params).nombre;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const curso = cursosData[nombre]; // Obtenemos los datos del curso según el nombre de la URL

  if (!curso) {
    return <div>Curso no encontrado</div>;
  }

  const renderIcon = (icono: any): any => {
    switch (icono) {
      case "video":
        return <FiVideo className="benefit-icon text-4xl text-primary-main" />;
      case "award":
        return <FiAward className="benefit-icon text-4xl text-primary-main" />;
      case "message":
        return (
          <FiMessageCircle className="benefit-icon text-4xl text-primary-main" />
        );
      case "clock":
        return <FiClock className="benefit-icon text-4xl text-primary-main" />;
      case "clipboard":
        return (
          <FiClipboard className="benefit-icon text-4xl text-primary-main" />
        );
      case "tool":
        return <FiTool className="benefit-icon text-4xl text-primary-main" />;
      // Agregar más casos según los íconos necesarios
      default:
        return null;
    }
  };
  /*
  const TemarioItem = ({
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
          {/* Acceder a los detalles de la sesión actual */ /*}
          {detalles.map((detalle: any, i: any) => (
            <li key={i}>{detalle}</li>
          ))}
        </ul>
      </AccordionDetails>
    </Accordion>
  )*/

  return (
    <>
      <Banner titulo={curso.titulo} imagen={`${curso.imagen ?? ""}`} />

      <div className="py-20 px-5 lg:px-20">
        <ContentMain>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <section className="space-y-4 p-5 rounded-xl shadow-lg">
                <h2 className="text-2xl  flex items-center gap-2">
                  <FiInfo className="text-xl  text-secondary-main" />
                  Presentación del curso
                </h2>
                <p className="text-black-900">{curso?.presentacion}</p>
              </section>

              {curso?.dirigido && (
                <section className="space-y-4 p-5 rounded-xl shadow-lg">
                  <h2 className="text-2xl  flex items-center gap-2">
                    <FiSettings className="text-xl text-secondary-main" />
                    Dirigido a
                  </h2>
                  <p className="text-black-900">{curso.dirigido}</p>
                </section>
              )}

              {curso?.objetivo && (
                <section className="space-y-4 p-5 rounded-xl shadow-lg">
                  <h2 className="text-2xl flex items-center gap-2">
                    <FiTarget className="text-xl text-secondary-main" />
                    Objetivo
                  </h2>
                  <p className="text-black-900">{curso.objetivo}</p>
                </section>
              )}

              {curso?.metodologia && (
                <section className="space-y-4 p-5 rounded-xl shadow-lg">
                  <h2 className="text-2xl  flex items-center gap-2">
                    <FiSettings className="text-xl text-secondary-main" />
                    Metodología
                  </h2>
                  <p className="text-black-900">{curso.metodologia}</p>
                </section>
              )}

              {curso?.certifica && (
                <section className="space-y-4 p-5 rounded-xl shadow-lg">
                  <h2 className="text-2xl  flex items-center gap-2">
                    <FiAward className="text-xl text-secondary-main" />
                    Certificación
                  </h2>
                  <p className="text-black-900">{curso.certifica}</p>
                </section>
              )}

              {/* Comentarios de secciones temario omitidas */}
            </div>

            <div className="space-y-8">
              <h2 className="text-3xl text-center text-secondary-main font-semibold">
                Beneficios
              </h2>
              {curso?.beneficios && (
                <section className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {curso.beneficios.map((beneficio: any, index: number) => (
                      <div
                        key={index}
                        className="px-4 py-8 shadow-lg rounded-lg flex flex-col items-center"
                      >
                        {renderIcon(beneficio.icono)}
                        <p className="text-center mt-2">
                          {beneficio.descripcion}
                        </p>
                      </div>
                    ))}
                    {/* Comentarios de beneficios omitidos */}
                  </div>
                </section>
              )}

              <section className="space-y-4 shadow-xl rounded-lg px-5 py-12">
                <h2 className="text-3xl md:text-4xl text-center justify-center text-primary-main font-semibold flex items-center gap-2">
                  <FiDollarSign className="text-xl" />
                  Inversión
                </h2>
                {curso?.dolar ? (
                  <div className="text-lg text-center">
                    S/ {curso.precio}.00 Soles ó {curso.dolar}.00 Dólares
                  </div>
                ) : (
                  <div className="text-lg text-center">
                    S/ {curso.precio}.00 Soles
                  </div>
                )}

                {curso?.descuento && (
                  <div className="space-y-2">
                    <span className="font-semibold">Descuentos CENCAPP</span>
                    <p>
                      Pago al contado por grupo de 3 personas: <br /> 80 soles ó
                      25 dólares.
                    </p>
                  </div>
                )}
              </section>

              {/* Comentarios de sección formas de pago omitida */}

              <div className="mt-8">
                <a
                  href="https://wa.me//+51973044253"
                  target="_blank"
                  rel="noreferrer"
                  className="flex uppercase font-bold justify-center text-center text-xl items-center gap-2 bg-green-500 hover:bg-green-600 text-white-main py-3 px-4 rounded-lg"
                >
                  <BsWhatsapp />
                  Más información
                </a>
              </div>
            </div>
          </div>
        </ContentMain>
      </div>
      <RenderTemarioItem curso={curso} />
      {/*curso.temario && (
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
      )*/}
    </>
  );
};

export default ViewCurso;
