import { NextPage } from "next";
import FormLogin from "./@components/FormLogin";

const Page: NextPage = () => {

  return (
    <div>
      <div className="w-full max-w-4xl h-dvh mx-auto flex flex-col items-center justify-center">
        <p className="text-4xl text-center w-full">Iniciar sesión</p>
        <FormLogin />
      </div>
    </div>
  );
};

export default Page;
