import React from "react";
import Button from "../Button";
import Image from "next/image";
interface IHero {}

const Hero: React.FC<IHero> = () => {
  return (
    <section className="container-fluid">
      <div className="relative flex min-h-[calc(100vh-70px)] items-center">
        <Image
          fill
          src="/images/hero-banner.png"
          alt="banner"
          className="object-cover"></Image>
        <div className="overlay absolute inset-0 z-[5] h-full w-full bg-black/40"></div>
        <div className="grid grid-cols-12 gap-4">
          <div className="relative z-10 col-span-10 !col-start-2 gap-5 text-white md:col-span-8 lg:col-span-6">
            <div className="w-full 3xl:pr-8 ">
              <h1 className=" text-4xl font-bold xl:text-[60px] xl:leading-[89px] 3xl:text-[64px]">
                YOUR TRUSTED PARTNER
              </h1>
              <p className="mb-8 text-2xl tracking-[-0.01em] xl:leading-[44px] 3xl:text-[32px]">
                Dank unseren hochqualifizierten Mitarbeitern mit einem starken
                Fokus auf Qualität und Innovation sind wir verlässlicher Partner
                für Ihre anspruchsvollen Aufgabenstellungen.
              </p>
              <Button>More About Us</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
