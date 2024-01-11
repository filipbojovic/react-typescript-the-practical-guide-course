import { ComponentPropsWithoutRef, forwardRef } from "react";

type InputProps = {
  label: string;
  id: string;
} & ComponentPropsWithoutRef<"input">;

// after putting Input function inside React's forwardRef function, we also receive 'ref' property.
// that's why it is added after InputProps
// forwardRef is generic type, so we should provide type of the element on which the ref will be used
// it requires 2 generic types. the second is the type of props
const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, id, ...props }: InputProps,
  ref
) {
  return (
    <p>
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} {...props} ref={ref} />
    </p>
  );
});

export default Input;
