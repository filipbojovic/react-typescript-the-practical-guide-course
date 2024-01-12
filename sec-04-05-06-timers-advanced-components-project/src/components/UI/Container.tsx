import { ReactNode, type ElementType, ComponentPropsWithoutRef } from "react";

type ContainerProps<T extends ElementType> = {
  // as: ElementType; // a valid identifier of a component, e.g. <button>, <a>
  as?: T;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

export default function Container<C extends ElementType>({
  as,
  children,
  ...props
}: ContainerProps<C>) {
  // '|| "div"' is added to get rid of the error which was about variable Component being undefined
  // so 'div' is here the default value. Also it is needed to add 'as' as optional in ContainerProps type
  const Component = as || "div";

  return <Component {...props}>{children}</Component>;
}
