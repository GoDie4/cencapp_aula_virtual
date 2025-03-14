"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
type InputType = React.InputHTMLAttributes<HTMLInputElement>["type"];
import { LuEye, LuEyeClosed } from "react-icons/lu";
export const InputForm = ({
  label,
  placeholder,
  type,
  name,
  onBlur,
  onChange,
  value,
  className,
  disabled
}: {
  label: string;
  placeholder: string;
  type: InputType;
  name: string;
  onBlur?: any;
  onChange?: any;
  value: string;
  className?: string;
  disabled?: boolean
}) => {
  const [verContrasena, setVerContrasena] = useState<boolean>(false);

  return (
    <>
      <label htmlFor={name} className="text-secondary-400">
        {label}
      </label>
      <div className="relative w-full">
        <input
          type={type === "password" && verContrasena ? "text" : type}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          disabled={disabled}
          className={`border w-full placeholder:text-sm outline-none  rounded-md p-2 ${className ?? ""}`}
          placeholder={placeholder}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => {
              setVerContrasena(!verContrasena);
            }}
            className="absolute top-0 bottom-0 my-auto border-none outline-none right-5 text-black-900"
          >
            {verContrasena ? <LuEye /> : <LuEyeClosed />}
          </button>
        )}
      </div>
    </>
  );
};
