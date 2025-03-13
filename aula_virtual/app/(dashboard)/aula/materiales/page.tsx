import { NextPage } from "next";
import Materiales from "./@components/Materiales";
import { TitleAula } from "../../@components/estructura/TitleAula";

export async function getStaticProps() {
  const res = await fetch('https://api.example.com/data');
  const data :  = await res.json();

  return {
    props: {
      data,
    },
  };
}

const Page: NextPage = async ({ data }) => {
  return (
    <div>
      <TitleAula titulo="Materiales por Curso" />
      <Materiales />
    </div>
  );
};

export default Page;
