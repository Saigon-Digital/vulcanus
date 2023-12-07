import React from "react";
import parse from "html-react-parser";
import Link from "next/link";
import Arrow from "public/icons/arrow-box.svg";
import CardShape from "./images/card-shape.svg";
import Image from "next/image";
export type TCard = {
  title?: string;
  description?: string;
  link?: string;
  shape?: boolean;
  className?: string;
};
const Card: React.FC<TCard> = ({title, description = "", link, className}) => {
  return (
    <div
      className={`group relative flex w-full cursor-pointer  flex-col justify-between rounded-sm border border-primary-blue-main p-6 
    text-left hover:bg-primary-midBlue-main ${className}
    `}>
      <CardShape
        alt="shape"
        className="w absolute right-0 top-0 opacity-0 group-hover:opacity-100"
        width={48}
        height={133}
      />
      <h5
        className="trasition text-xl font-semibold tracking-tight
         text-primary-blue-main group-hover:text-white lg:text-2xl">
        {title}
      </h5>
      <div className="">
        <p className="group-hover mb-5 text-lg font-light text-white ">
          {parse(description)}
        </p>
        {link && (
          <Link
            className="text-md flex items-center text-primary-blue-main transition group-hover:text-white 3xl:text-lg 3xl:leading-[24px]"
            href={link}>
            Read more
            <span className="ml-2 inline-block transition group-hover:translate-x-3">
              <Arrow />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Card;
