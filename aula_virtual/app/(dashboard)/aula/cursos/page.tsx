import { NextPage } from "next";
import { WrapperCursos } from "./@components/WrapperCursos";
import { CardCursoAula } from "./@components/CardCursoAula";
import { ProgressCurso } from "./@components/ProgressCurso";

const Page: NextPage = () => {
  return (
    <>
      <div className="w-full mb-6">
        <div className="w-full flex items-center justify-between">
          <h2 className="text-2xl sm:text-3xl text-primary-main font-bold">
            Mis Cursos
          </h2>
          <a href="#progreso" className="block w-fit lg:hidden underline text-secondary-main">Ver progreso</a>
        </div>
      </div>
      <div className="w-full flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-3/5">
          <WrapperCursos>
            <CardCursoAula />
            <CardCursoAula />
            <CardCursoAula />
          </WrapperCursos>
        </div>
        <div className="w-full lg:w-2/5" id="progreso">
          <div className="w-full rounded-main shadow-lg p-2 sm:p-4 md:p-6">
            <h3 className="text-2xl text-primary-main mb-4">
              Progreso de aprendizaje
            </h3>
            <ul className="space-y-6">
              <li>
                <ProgressCurso progreso={35} />
              </li>
              <li>
                <ProgressCurso progreso={60} />
              </li>
              <li>
                <ProgressCurso progreso={90} />
              </li>
              <li>
                <ProgressCurso progreso={40} />
              </li>
              <li>
                <ProgressCurso progreso={5} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
