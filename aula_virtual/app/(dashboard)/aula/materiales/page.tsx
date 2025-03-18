import { NextPage } from "next";
import Materiales from "./@components/Materiales";
import { TitleAula } from "../../@components/estructura/TitleAula";
import { MaterialesMetadata } from "@/seo/aula/MaterialesMetaData";
export function generateMetadata() {
  const metadata = MaterialesMetadata;
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
