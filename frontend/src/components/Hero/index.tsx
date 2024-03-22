import {HeroBlockFragment} from "@/__generated__/graphql";
import {getAcfLinkProps} from "@/utils";
import Image from "next/image";
import React from "react";
import Button from "../Button";

const Hero: React.FC<HeroBlockFragment> = (props) => {
  return (
    <div className="sm:container-fluid">
      <div className="relative flex min-h-[calc(100svh-var(--header-height)-2*var(--header-py))] items-center justify-center overflow-hidden rounded-[5px]">
        <div className="absolute inset-0 z-[5] h-full w-full bg-black/20"></div>
        <div className="absolute -top-[28px] left-0  z-10 hidden aspect-[100.528/278.4] md:block md:w-[80px] 3xl:-top-[24px] 3xl:w-[100px] ">
          <Image
            fill
            src="/shapes/hero-shape.png"
            alt="Hero Shape"
            className="object-contain object-center"
          />
        </div>

        <Image
          fill
          src={props?.backgroundImage?.node?.sourceUrl || "/images/hero.jpg"}
          alt={props?.backgroundImage?.node?.altText || "Hero Banner"}
          className="z-0 object-cover object-center"></Image>

        <div className="w-full grow grid-cols-12 gap-x-6 lg:grid">
          <div className="relative z-10 mx-auto max-w-[85%] text-secondary-offWhite-white lg:col-span-full lg:col-start-2 lg:mx-0 lg:max-w-[868px]">
            <h1 className="relative z-10 break-words font-extrabold uppercase leading-[140%] tracking-tight min-max-[40_64]">
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
