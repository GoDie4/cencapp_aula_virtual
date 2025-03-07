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
      className="flex justify-center w-full py-3 text-center transition-all duration-200 rounded-lg text-white-main bg-secondary-main hover:bg-secondary-700"
    >
      {loading ? <LoaderSubmit /> : text}
    </button>
  );
};
