import React from "react";
import Card from "../Card/index";
import Image from "next/image";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import {ServiceComponent} from "@/__generated__/graphql";
import Gear from "./images/gear.svg";
type TService = {
  featureImage?: {image: string | StaticImport}[];
} & ServiceComponent;

const cardData: any[] = [
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
const Service: React.FC<TService> = ({services, featureImage = images}) => {
  return (
    <div className="container-fluid py-20">
      <h3 className="mb-14 text-3xl font-bold leading-[89px] lg:text-6xl lg:leading-[84px] xl:text-[64px]">
        Our services
      </h3>
      <div className="relative grid h-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:min-h-[400px] xl:grid-cols-4 ">
        {/* Check emty array instead check null value: services.length >0 ... */}
        {services &&
          services.map((ele, index) => {
            return (
              <Card
                key={index}
                title={ele?.title || ""}
                description={ele?.description || ""}
                link={ele?.link}
                hoverImage={ele?.featuredImage?.node?.sourceUrl || undefined}
                className={`col-span-1 ${index == 1 ? "xl:col-start-3" : ""}`}
              />
            );
          })}
        <Gear
          className="absolute left-[calc(25%-20px)] top-[180px] scale-90 object-contain"
          width={394}
          height={217}
          alt="gear"
        />
      </div>
      <div className="mt-6 grid h-full  grid-cols-1 gap-6 sm:grid-cols-2  lg:grid-cols-4 xl:min-h-[400px] ">
        {featureImage?.map((img, index) => {
          return (
            <div
              key={index}
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
