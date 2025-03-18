/* eslint-disable @typescript-eslint/no-explicit-any */

import { getServerSideProps } from "@/server/getServerSideProps";

export async function SeoCursos({ params }: any) {
  const { slug } = params;
  const categoria = await getServerSideProps(`categoriasBuscar/${slug}`);

  return {
    title: `${
      categoria?.categoria?.nombre ? categoria?.categoria?.nombre : "Categorías"
    } | CENCAP PERÚ`,
    generator: "Next.js",
    authors: [{ name: "Logos Perú" }],
    icons: {
      icon: "/assets/images/logo/ico.png",
    },
  };
}
