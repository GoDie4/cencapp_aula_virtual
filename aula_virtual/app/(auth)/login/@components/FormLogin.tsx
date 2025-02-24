/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { LoginInterface } from "@/interfaces/AuthInteface";
import { SchemaLogin } from "@/schemas/AuthSchema";
import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { toast } from "sonner";
import { Errors } from "@/components/form/Errors";
import { config } from "@/config/config";
import { useRouter } from "next/navigation";

const FormLogin = () => {
  const { setIsAuthenticated } = useAuth();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter()

  const login = async (values: LoginInterface): Promise<void> => {
    setLoading(true);

    const data = {
      email: values.email,
      password: values.password,
    };

    try {
      const response = await axios.post(`${config.apiUrl}/login`, data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
        toast.success(response.data.message);
        router.push('/aula');
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
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
    <form className="p-5" onSubmit={handleSubmit}>
      <div className="w-full mb-5 flex flex-col gap-1">
        <label htmlFor="email">Correo electrónico</label>
        <input
          type="email"
          name="email"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.email}
          className={`${
            errors.email && touched.email
              ? "border-red-500 focus:border-red-500"
              : ""
          } border rounded-md p-2`}
          placeholder="Escribe tu correo electrónico"
        />
        <Errors errors={errors.email} touched={touched.email} />
      </div>
      <div className="w-full flex flex-col gap-1 mb-8">
        <label htmlFor="password">Contraseña</label>
        <input
          type="password"
          name="password"
          onBlur={handleBlur}
          onChange={handleChange}
          value={values.password}
          className={`${
            errors.password && touched.password
              ? "border-red-500 focus:border-red-500"
              : ""
          } border rounded-md p-2`}
          placeholder="Escribe tu Contraseña"
        />
        <Errors errors={errors.password} touched={touched.password} />
      </div>

      <button
        type={loading ? "button" : "submit"}
        className="w-full text-center text-white justify-center flex py-3 rounded-md bg-blue-700 "
      >
        {loading ? "Ingresando..." : "Ingresar"}
      </button>
    </form>
  );
};

export default FormLogin;
