/* eslint-disable @typescript-eslint/no-explicit-any */

import { revertUrl } from "@/logic/formateador";
import { getServerSideProps } from "@/server/getServerSideProps";

export async function SeoCurso({ params }: any) {
  const { nombre } = params;
  const curso = await getServerSideProps(`cursosBuscar/${revertUrl(nombre)}`);

  function stripHTML(htmlString: any) {
    return htmlString.replace(/<[^>]+>/g, "");
  }

  const seoDescription = `${stripHTML(curso?.detalles?.presentacion ?? "")} `;

  return {
    title: `${curso?.nombre} | CENCAP PERÚ`,
    description: seoDescription,
    generator: "Next.js",
    authors: [{ name: "Logos Perú" }],
    icons: {
      icon: "/assets/images/logo/ico.png",
    },
  };
}
