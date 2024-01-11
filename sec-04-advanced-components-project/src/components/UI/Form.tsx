import {
  FormEvent,
  type ComponentPropsWithoutRef,
  useRef,
  useImperativeHandle,
  forwardRef,
} from "react";

// this type describes object which is returned by useImperativeHandle hook
// this enables App component to be aware of clear() method
export type FormHandle = {
  clear: () => void;
};

type FormProps = ComponentPropsWithoutRef<"form"> & {
  // we dont know in advance what the value here will be
  onSave: (value: unknown) => void;
};

const Form = forwardRef<FormHandle, FormProps>(function Form(
  { onSave, children, ...otherProps }: FormProps,
  ref
) {
  const formRef = useRef<HTMLFormElement>(null);

  // expose method from the current component to somewhere else in the app
  // This hook only works in a component which also receives forwardRef.
  // the second arg is a method which should return an object which contains methods
  // that we want to be able to call outside this component
  useImperativeHandle(ref, () => {
    return {
      clear() {
        console.log("CLEARING");
        formRef.current?.reset();
      },
    };
  });

  // which exactly element triggered form event
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // mechanism built into javascript to gather automatically inputs from form.
    // all the inputs must include name property in order to use FormData
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData); // convert formData to simpler object
    onSave(data);
    formRef.current?.reset();
  }

  return (
    // props also contains custom props (onSave: (value: unknown))
    <form onSubmit={handleSubmit} {...otherProps} ref={formRef}>
      {children}
    </form>
  );
});

export default Form;
