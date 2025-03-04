import { NextPage } from "next";
import { WrapperCursos } from "./@components/WrapperCursos";
import { CardCursoAula } from "./@components/CardCursoAula";

const Page: NextPage = () => {
  return (
    <>
      <div className="w-full mb-6">
        <h2 className="text-3xl text-primary-main font-bold">Mis Cursos</h2>
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-3/5">
          <WrapperCursos>
            <CardCursoAula />
          </WrapperCursos>
        </div>
      </div>
    </>
  );
};

export default Page;
