/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";
import CardCurso from "../../../../components/public/curso/CardCurso";
import Banner from "../../../../components/public/Banner";
import area8 from "../../../../assets/areas/8.webp";
import area6 from "../../../../assets/areas/6.webp";
import area1 from "../../../../assets/areas/1.webp";

import curso1 from "../../../../assets/cursos/1.webp";
import curso2 from "../../../../assets/cursos/2.webp";
import curso3 from "../../../../assets/cursos/3.webp";
import curso4 from "../../../../assets/cursos/4.webp";
import { JSX } from "react";

const Cursos = async ({
  params,
}: {
  params: Promise<{ nombre: string }>;
}): Promise<JSX.Element> => {
  /* const { nombre } = useParams() */
  const nombre = (await params).nombre;
  /*
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  */
  const cursosInfo = {
    topografiayfotogametria: {
      titulo: "Topografía y Fotogametría",
      fondo: `${area8.src}`,
      cursos: [
        {
          titulo: "Levantamiento topográfico",
          img: `${curso4.src}`,
          precio: "120",
          horas: "32 horas",
        },
        {
          titulo: "Topografía en obras civiles",
          img: `${curso1.src}`,
          precio: "350",
          horas: "40 horas",
        },
      ],
    },
    construccion: {
      titulo: "Construcción",
      fondo: `${area6.src}`,
      cursos: [
        {
          titulo: "Presupuesto y programación de obras con presupuesto.pe",
          img: `${curso2.src}`,
          precio: "80",
          horas: "48 horas",
        },
      ],
    },
    estructuras: {
      titulo: "Estructuras",
      fondo: `${area1.src}`,
      cursos: [
        {
          horas: "32 horas",
          img: `${curso3.src}`,
          precio: "100",
          titulo:
            "Elaboración de planos estructurales con Autocad Structural Detailling",
        },
      ],
    },
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const curso = cursosInfo[nombre]; // Obtenemos los datos del curso según el nombre de la URL

  if (!curso) {
    return <div>Curso no encontrado</div>;
  }
  return (
    <>
      <Banner imagen={`${curso.fondo}`} titulo={curso.titulo} />
      <div className="py-20 px-5 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-5">
          {curso?.cursos?.map((curso: any, index: number) => (
            <div key={index}>
              <CardCurso
                id={String(index)}
                horas={curso.horas}
                img={curso.img}
                precio={curso.precio}
                titulo={curso.titulo}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cursos;
