interface Errores {
  errors: string | undefined | string[];
  touched: boolean | undefined;
}

export const Errors = (props: Errores) => {
  return (
    <p className="text-sm  mt-1 text-red-500">
      {props.errors !== null &&
        props.errors !== undefined &&
        props.errors !== "" &&
        props.touched !== null &&
        props.touched !== undefined &&
        props.touched && <span>{props.errors}</span>}
    </p>
  );
};
