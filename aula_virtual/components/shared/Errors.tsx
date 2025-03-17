interface Errores {
  errors: string | undefined;
  touched: boolean | undefined;
}

export const Errors = (props: Errores) => {
  return (
    <p
      style={{ fontSize: "14px", margin: "8px 0" }}
      className="p-0 pl-2 m-0 mt-0 text-sm text-red-500 "
    >
      {props.errors !== null &&
        props.errors !== undefined &&
        props.errors !== "" &&
        props.touched !== null &&
        props.touched !== undefined &&
        props.touched && <span className="text-main">{props.errors}</span>}
    </p>
  );
};
