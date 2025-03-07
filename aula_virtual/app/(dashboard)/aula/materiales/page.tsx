import { NextPage } from "next";
import Materiales from "./@components/Materiales";
import { TitleAula } from "../../@components/estructura/TitleAula";

const Page: NextPage = () => {
  return (
    <div>
      <TitleAula titulo="Materiales por Curso"/>
      <Materiales />
    </div>
  );
};

export default Page;
