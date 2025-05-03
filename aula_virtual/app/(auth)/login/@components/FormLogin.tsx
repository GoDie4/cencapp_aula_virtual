/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { LoginInterface } from "@/interfaces/AuthInteface";
import { SchemaLogin } from "@/schemas/AuthSchema";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../src/context/AuthContext";
import { toast } from "sonner";
import { Errors } from "../../../../components/form/Errors";
import { useRouter } from "next/navigation";
import { InputForm } from "../../../../components/form/InputForm";
import { CheckInput } from "../../../../components/form/CheckInput";
import { ButtonSubmit } from "../../../../components/form/ButtonSubmit";
import { RecuperarContrasena } from "./RecuperarContrasena";

const FormLogin = () => {
  const { setIsAuthenticated, setUser, setToken, openModal, setModalContent } =
    useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const [mantenerConexion, setMantenerConexion] = useState<boolean>(false);

  const router = useRouter();

  const login = async (values: LoginInterface): Promise<void> => {
    setLoading(true);

    const data = {
      email: values.email,
      password: values.password,
      mantenerConexion: mantenerConexion,
    };

    try {
      const response = await axios.post(`https://api.cencapperu.com/api/login`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser(response.data.usuario);
        setToken(response.data.token);
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        router.push("/aula");
      }
    } catch (error: any) {
      console.log(error);
      console.log(error.message);

      toast.error(error.response ? error.response.data.message : error.message);
    } finally {
      setLoading(false);
    }
  };

  const {
    handleSubmit,
    handleChange,
    errors,
    values,
    touched,
    handleBlur,
    isSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SchemaLogin,
    onSubmit: login,
  });

  useEffect(() => {
    if (errors && isSubmitting) {
      const firstErrorKey = Object.keys(errors)[0];
      const firstErrorElement = document.getElementsByName(firstErrorKey)[0];
      if (firstErrorElement) {
        firstErrorElement.focus();
      }
    }
  }, [touched, errors, isSubmitting]);

  return (
    <form className="w-full max-w-xl p-3 sm:p-5" onSubmit={handleSubmit}>
      <div className="w-full space-y-6">
        <div className="flex flex-col w-full gap-1">
          <InputForm
            label="Correo electrónico"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Escribe tu correo electrónico"
            type="email"
            value={values.email}
            className={`${
              errors.email && touched.email
                ? "border-red-500 focus:border-red-500"
                : "border-secondary-main focus:border-secondary-main"
            }`}
          />
          {errors.email && (
            <Errors errors={errors.email} touched={touched.email} />
          )}
        </div>
        <div className="flex flex-col w-full gap-1 ">
          <InputForm
            label="Contraseña"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Escribe tu contraseña"
            type="password"
            value={values.password}
            className={`${
              errors.email && touched.email
                ? "border-red-500 focus:border-red-500"
                : " focus:border-secondary-main"
            }`}
          />
          {errors.password && (
            <Errors errors={errors.password} touched={touched.password} />
          )}
        </div>
      </div>
      <div className="flex items-center justify-between w-full mt-3 mb-10">
        <div className="flex items-center gap-2 w-fit">
          <CheckInput
            mantenerConexion={mantenerConexion}
            setMantenerConexion={setMantenerConexion}
          />
          <p className="text-xs text-white-main">Mantenerme conectado</p>
        </div>

        <button
          type="button"
          onClick={() => {
            openModal();
            setModalContent(<RecuperarContrasena />);
          }}
          className="text-xs underline text-white-main"
        >
          Olvidé mi contraseña
        </button>
      </div>

      <ButtonSubmit loading={loading} text="Ingresar" />
    </form>
  );
};

export default FormLogin;
