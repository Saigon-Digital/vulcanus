import Link from "next/link";
import React, {PropsWithChildren} from "react";

interface IButton extends PropsWithChildren {
  type?: "button" | "submit" | "reset" | undefined;
  link?: string;
}

const Button: React.FC<IButton> = ({children, type, link}) => {
  if (link)
    return (
      <Link
        href={link}
        className="bg-primary-blue-main px-14 py-4 pb-3 uppercase leading-[1] text-white
    transition-all hover:bg-primary-midBlue-main hover:bg-transparent 
  ">
        {children}
      </Link>
    );

  return (
    <button
      type={type}
      className="bg-primary-blue-main px-14 py-4 pb-3 uppercase leading-[1] text-white transition-all
      hover:bg-primary-midBlue-main hover:bg-transparent 
  ">
      {children}
    </button>
  );
};

export default Button;
