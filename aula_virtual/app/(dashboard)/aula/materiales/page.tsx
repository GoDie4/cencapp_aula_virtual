import { NextPage } from "next";
import Materiales from "./@components/Materiales";
import { TitleAula } from "../../@components/estructura/TitleAula";
import { AulaMetadata } from "@/layouts/seo/aula/AulaMetaData";
export function generateMetadata() {
  const metadata = AulaMetadata({ title: "Materiales" });
  return metadata;
}
const Page: NextPage = () => {
  return (
    <div>
      <TitleAula titulo="Materiales por Curso" />
      <Materiales />
    </div>
  );
};

export default Page;
