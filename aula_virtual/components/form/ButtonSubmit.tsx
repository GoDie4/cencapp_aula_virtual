import React from "react";
import { LoaderSubmit } from "./LoaderSubmit";

export const ButtonSubmit = ({
  loading,
  text,
}: {
  loading: boolean;
  text: string;
}) => {
  return (
    <button
      type={loading ? "button" : "submit"}
      className="w-full text-center text-white-main  justify-center flex py-3 rounded-lg  bg-secondary-main hover:bg-secondary-700 transition-all duration-200"
    >
      {loading ? <LoaderSubmit /> : text}
    </button>
  );
};
