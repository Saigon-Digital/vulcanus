import React from "react";
import Card from "../Card/index";
import Image from "next/image";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import dynamic from "next/dynamic";
import {StaticImport} from "next/dist/shared/lib/get-img-props";
import {ServiceComponent} from "@/__generated__/graphql";

import {languages} from "@/utils/language";
import {useRouter} from "next/router";
import {motion} from "framer-motion";
import LazyImport from "../LazyImport";
const GearIcon = dynamic(() => import("../Icons").then((mod) => mod.GearIcon));
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
  const router = useRouter();

  return (
    <div className="container-fluid py-20">
      <h2 className="mb-14 text-3xl font-bold leading-[89px] lg:text-6xl lg:leading-[84px] xl:text-[64px]">
        {languages(router.locale)?.service}
      </h2>
      <div className="relative grid h-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:min-h-[400px] xl:grid-cols-4 xl:gap-6 ">
        {/* Check emty array instead check null value: services.length >0 ... */}
        {services &&
          services.map((ele, index) => {
            return (
              <Card
                key={index}
                title={ele?.title || ""}
                description={ele?.description || ""}
                link={ele?.link}
                hoverImage={ele?.featuredImage?.node?.sourceUrl || ""}
                className={`col-span-1 ${index == 1 ? "xl:col-start-3" : ""}`}
              />
            );
          })}
        <div className="col-span-1 col-start-2 row-start-1 hidden place-items-center items-end justify-center xl:flex">
          <LazyImport containerClass="w-full aspect-[394/217] mt-auto">
            <GearIcon
              className="absolute left-[calc(25%-20px)] top-[180px] aspect-[394/217] w-4/5 scale-90 overflow-visible object-contain xl:static xl:w-auto"
              w={394}
              h={217}
              // alt="gear"
            />
          </LazyImport>
        </div>
      </div>
      <div className="mt-6 grid h-full  grid-cols-1 gap-6 sm:grid-cols-2  lg:grid-cols-4 xl:min-h-[400px] ">
        {featureImage?.map((img, index) => {
          return (
            <div
              key={index}
              className={`relative col-span-full min-h-[300px] overflow-hidden ${
                index === 0 ? "md:col-span-2" : "lg:col-span-1"
              }`}>
              <motion.div
                initial={{scale: 1}}
                whileInView={{scale: 1.2}}
                transition={{duration: 0.6, delay: 0.4}}
                className="relative h-full w-full">
                <Image
                  fill
                  sizes="(max-width: 768px) 80vw, (max-width: 800px) 50vw"
                  quality={70}
                  src={img.image}
                  alt="feature image"
                  className="object-cover"
                />
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Service;
