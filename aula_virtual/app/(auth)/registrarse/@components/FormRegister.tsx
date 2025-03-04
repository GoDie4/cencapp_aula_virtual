/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { RegisterInterface } from "@/interfaces/AuthInteface";
import { SchemaRegister } from "@/schemas/AuthSchema";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Errors } from "../../../../components/form/Errors";
import { config } from "@/config/config";
import { useRouter } from "next/navigation";
import { InputForm } from "../../../../components/form/InputForm";
import { ButtonSubmit } from "../../../../components/form/ButtonSubmit";

const FormRegister = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const register = async (values: RegisterInterface): Promise<void> => {
    setLoading(true);

    const data = {
      nombres: values.nombres,
      apellidos: values.apellidos,
      celular: values.celular,
      email: values.email,
      password: values.password,
    };

    try {
      const response = await axios.post(`${config.apiUrl}/register`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      console.log(response);
      if (response.status === 201) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.token);
        router.push("/aula");
      }
    } catch (error: any) {
      console.log(error);

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
      apellidos: "",
      celular: "",
      nombres: "",
      confirmPassword: ''
    },
    validationSchema: SchemaRegister,
    onSubmit: register,
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
    <form className="p-3 sm:p-5 max-w-xl w-full" onSubmit={handleSubmit}>
      <div className="w-full space-y-5 mb-10">
        <div className="w-full flex flex-col  gap-5">
          <div className="w-full  flex flex-col gap-1">
            <InputForm
              label="Nombres"
              name="nombres"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Escribe tus nombres"
              type="text"
              value={values.nombres}
              className={`${
                errors.nombres && touched.nombres
                  ? "border-red-500 focus:border-red-500"
                  : "border-secondary-main focus:border-secondary-main"
              }`}
            />
            {errors.nombres && (
              <Errors errors={errors.nombres} touched={touched.nombres} />
            )}
          </div>
          <div className="w-full  flex flex-col gap-1">
            <InputForm
              label="Apellidos"
              name="apellidos"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Escribe tus apellidos"
              type="text"
              value={values.apellidos}
              className={`${
                errors.apellidos && touched.apellidos
                  ? "border-red-500 focus:border-red-500"
                  : "border-secondary-main focus:border-secondary-main"
              }`}
            />
            {errors.apellidos && (
              <Errors errors={errors.apellidos} touched={touched.apellidos} />
            )}
          </div>
        </div>
        <div className="w-full flex flex-col lg:flex-row gap-6">
          <div className="w-full lg:w-1/2 flex flex-col gap-1">
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
          <div className="w-full lg:w-1/2 flex flex-col gap-1">
            <InputForm
              label="Celular"
              name="celular"
              onBlur={handleBlur}
              onChange={handleChange}
              placeholder="Escribe tu celular"
              type="text"
              value={values.celular}
              className={`${
                errors.celular && touched.celular
                  ? "border-red-500 focus:border-red-500"
                  : "border-secondary-main focus:border-secondary-main"
              }`}
            />
            {errors.celular && (
              <Errors errors={errors.celular} touched={touched.celular} />
            )}
          </div>
        </div>

        <div className="w-full flex flex-col gap-1 ">
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
        <div className="w-full flex flex-col gap-1 ">
          <InputForm
            label="Confirmar contraseña"
            name="confirmPassword"
            onBlur={handleBlur}
            onChange={handleChange}
            placeholder="Confirma tu contraseña"
            type="password"
            value={values.confirmPassword}
            className={`${
              errors.confirmPassword && touched.confirmPassword
                ? "border-red-500 focus:border-red-500"
                : " focus:border-secondary-main"
            }`}
          />
          {errors.confirmPassword && (
            <Errors errors={errors.confirmPassword} touched={touched.confirmPassword} />
          )}
        </div>
      </div>
      

      <ButtonSubmit loading={loading} text="Registrarme" />
    </form>
  );
};

export default FormRegister;
