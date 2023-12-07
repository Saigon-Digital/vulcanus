import React from "react";
import Card, {TCard} from "../Card/index";
import Image from "next/image";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import Gear from "./images/gear.svg";
type TService = {
  cards?: TCard[];
  featureImage?: {image: string | StaticImport}[];
};

const cardData: TCard[] = [
  {
    title: "Engineering",
    description: `We have been a partner in machinery and plant engineering for many years.<br/>
    Conveyor systems, special construction machinery and plant engineering, are part of our daily tasks.
    Read more`,
    link: "#",
  },
  {
    title: "Sawing technology",
    description: `As a specialist for split constructions, we segment rings up to 2200 mm in diameter.<br/>
    We have been sawing high-strength hardened materials, tungsten and special alloys for years.`,
    link: "#",
  },
  {
    title: "Sawing technology",
    description: `As a specialist for split constructions, we segment rings up to 2200 mm in diameter.<br/>
    We have been sawing high-strength hardened materials, tungsten and special alloys for years.`,
    link: "#",
  },
];
const images = [
  {
    image: img1,
  },
  {
    image: img2,
  },
];
const Service: React.FC<TService> = ({
  cards = cardData,
  featureImage = images,
}) => {
  return (
    <div className="container py-20">
      <h3 className="mb-14 text-3xl font-bold lg:text-6xl lg:leading-[84px] xl:text-[64px]">
        Our services
      </h3>
      <div className="relative grid h-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:min-h-[400px] xl:grid-cols-4 ">
        {cards.map((ele, index) => {
          return (
            <Card
              key={index}
              {...ele}
              className={`col-span-1 ${index == 1 ? "xl:col-start-3" : ""}`}
            />
          );
        })}
        <Gear
          className="absolute left-1/4 top-[200px]"
          width={300}
          height={217}
          alt="gear"
        />
      </div>
      <div className="mt-6 grid h-full  grid-cols-1 gap-6 sm:grid-cols-2  lg:grid-cols-4 xl:min-h-[400px] ">
        {featureImage?.map((img, index) => {
          return (
            <div
              className={`relative col-span-full min-h-[300px] ${
                index === 0 ? "md:col-span-2" : "lg:col-span-1"
              }`}>
              <Image
                fill
                src={img.image}
                alt="feature image"
                objectFit="cover"
                className=""
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Service;
