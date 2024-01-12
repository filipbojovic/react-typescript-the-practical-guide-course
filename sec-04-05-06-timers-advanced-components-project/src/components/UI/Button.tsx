import { ComponentPropsWithRef, ComponentPropsWithoutRef } from "react";

// href must never be set for buttons
type ButtonProps = ComponentPropsWithRef<"button"> & {
  href?: never;
};

// if href is present, it should be string. Now if we use button and specify 'href' property,
// the typescript knows that it is a link
type AnchorProps = ComponentPropsWithoutRef<"a"> & { href?: string };

function isAnchorProps(props: ButtonProps | AnchorProps): props is AnchorProps {
  return "href" in props;
}

export default function Button(props: ButtonProps | AnchorProps) {
  if (isAnchorProps(props)) {
    return <a className="button" {...props}></a>;
  }
  return <button className="button" {...props}></button>;
}
