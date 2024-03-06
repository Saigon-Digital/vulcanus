import Link from "next/link";
import React, {forwardRef} from "react";
import {twMerge} from "tailwind-merge";

type Props =
  | (React.ComponentProps<typeof Link> & {
      as?: "link";
    })
  | (React.ButtonHTMLAttributes<HTMLButtonElement> & {
      as: "button";
    });

const Button = forwardRef<HTMLAnchorElement | HTMLButtonElement, Props>(
  (props, ref) => {
    const commonProps = {
      ...props,

      className: twMerge(
        "inline-flex items-center fit-content justify-center text-secondary-offWhite-white lg:px-[60px] px-10 py-[17px] bg-primary-blue-main uppercase leading-[125%] text-center hover:bg-primary-blue-400 font-bold transition-all duration-300",
        props.className
      ),
    } satisfies Props;

    if (commonProps.as === "button") {
      return (
        <button
          ref={ref as React.ForwardedRef<HTMLButtonElement>}
          {...commonProps}
        />
      );
    }
    return (
      <Link
        ref={ref as React.ForwardedRef<HTMLAnchorElement>}
        {...commonProps}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
