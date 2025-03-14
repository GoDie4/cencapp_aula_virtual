import { TitleAula } from "../../@components/estructura/TitleAula";
import { getServerSideProps } from "@/server/getServerSideProps";
import { FormEditarPerfil } from "./@components/FormEditarPerfil";
import FormCambiarContrasena from "../../../(auth)/restablecer/@components/FormCambiarContrasena";
import { AulaMetadata } from "@/layouts/seo/aula/AulaMetaData";
export function generateMetadata() {
  const metadata = AulaMetadata({ title: "Perfil " });
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
      <FormCambiarContrasena />
    </>
  );
}
