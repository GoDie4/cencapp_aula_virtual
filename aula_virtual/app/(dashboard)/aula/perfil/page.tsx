import { NextPage } from "next";
import { TitleAula } from "../../@components/estructura/TitleAula";
import { InputForm } from "../../../../components/form/InputForm";
import { ButtonSubmit } from "../../../../components/form/ButtonSubmit";

const Page: NextPage = () => {
  return (
    <>
      <TitleAula titulo="Mi Perfil" />
      <form className="w-full p-2 md:p-4">
        <div className="w-full space-y-5 mb-8">
          <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <InputForm
                label="Nombres"
                name="nombres"
                placeholder="Nombres"
                type="text"
                value="Logos Desarrollo 1"
              />
            </div>
            <div className="w-full md:w-1/2">
              <InputForm
                label="Apellidos"
                name="apellidos"
                placeholder="Apellidos"
                type="text"
                value="Logos Perú"
              />
            </div>
          </div>
          <div className="w-full flex flex-col md:flex-row gap-4 ">
            <div className="w-full md:w-1/2">
              <InputForm
                label="Correo electrónico"
                name="email"
                placeholder="Correo electrónico"
                type="text"
                value="desarrollo1@logosperu.com"
              />
            </div>
            <div className="w-full md:w-1/2">
              <InputForm
                label="Celular"
                name="celular"
                placeholder="Celular"
                type="text"
                value="(+51) 987 654 321"
              />
            </div>
          </div>
        </div>
        <ButtonSubmit loading text="Actualizar" />
      </form>
    </>
  );
};

export default Page;
