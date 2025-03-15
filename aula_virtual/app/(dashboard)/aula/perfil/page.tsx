import { TitleAula } from "../../@components/estructura/TitleAula";
import { getServerSideProps } from "@/server/getServerSideProps";
import { FormEditarPerfil } from "./@components/FormEditarPerfil";
import { PerfilMetadata } from "@/seo/aula/PerfilMetaData";
import { FormEditarContrasena } from "./@components/FormEditarContrasena";
export function generateMetadata() {
  const metadata = PerfilMetadata;
  return metadata;
}
export default async function page() {
  const data = await getServerSideProps("user/yo");

  console.log("data: ", data);
  return (
    <>
      <TitleAula titulo="Mi Perfil" />
      <FormEditarPerfil />
      <TitleAula titulo="Editar Contraseña" />
      <FormEditarContrasena />
    </>
  );
}
