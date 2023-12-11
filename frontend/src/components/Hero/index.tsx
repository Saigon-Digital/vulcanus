import {HeroBlockFragment} from "@/__generated__/graphql";
import Image from "next/image";
import React from "react";
import Button from "../Button";
import {getAcfLinkProps, getUrlPathname} from "@/utils";

const Hero: React.FC<HeroBlockFragment> = (props) => {
  return (
    <div className="container-fluid">
      <div className="relative flex min-h-[calc(100svh-var(--header-height))] items-center justify-center overflow-hidden rounded-[5px]">
        <div className="absolute left-0 top-0 z-10 aspect-[100.528/278.4] w-[5vw] min-w-[45px] max-w-[100.52px]">
          <Image
            fill
            src="/images/hero-shape.png"
            alt="Hero Shape"
            className="object-cover object-center"
          />
        </div>

        <Image
          fill
          src={props?.backgroundImage?.node?.sourceUrl || "/images/hero.jpg"}
          alt={props?.backgroundImage?.node?.altText || "Hero Banner"}
          className="z-0 object-cover object-center"></Image>
        <div className="overlay absolute inset-0 z-0 h-full w-full bg-eerie-black/70"></div>
        <div className="w-full grow grid-cols-12 gap-x-6 lg:grid">
          <div className="relative z-10 mx-auto max-w-[85%] text-secondary-offWhite-white lg:col-span-full lg:col-start-2 lg:mx-0 lg:max-w-[868px]">
            <h1 className="break-words font-extrabold uppercase leading-[140%] tracking-tight min-max-[40_64]">
              {props?.title}
            </h1>
            <p className="font-semibold leading-[140%] tracking-tight min-max-[18_32]">
              {props?.description}
            </p>
            {props?.button?.url && props?.button?.title ? (
              <Button className="mt-10" {...getAcfLinkProps(props?.button)}>
                {props?.button?.title}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
