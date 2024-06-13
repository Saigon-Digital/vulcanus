import Card from "../Card/index";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
import type {StaticImport} from "next/dist/shared/lib/get-img-props";
import {ServiceComponent} from "@/__generated__/graphql";
import {languages} from "@/utils/language";
import {m} from "framer-motion";

import dynamic from "next/dynamic";
import {useLocaleContext} from "@/context/LocaleContext";
const Image = dynamic(() => import("next/image"));

type TService = {
  featureImage?: {image: string | StaticImport}[];
} & ServiceComponent;

const images = [
  {
    image: img1,
  },
  {
    image: img2,
  },
];
const Service: React.FC<TService> = ({services, featureImage = images}) => {
  const {locale} = useLocaleContext();

  return (
    <div className="container-fluid py-20">
      <h2 className="mb-14 text-3xl font-bold leading-[89px] lg:text-6xl lg:leading-[84px] xl:text-[64px]">
        {languages(locale)?.service}
      </h2>
      <div className="relative grid h-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:min-h-[400px] xl:grid-cols-4 xl:gap-6 ">
        {services &&
          services.map((ele, index) => {
            return (
              <Card
                key={index}
                title={ele?.title || ""}
                description={ele?.description || ""}
                link={ele?.link}
                className={`col-span-1 ${index == 1 ? "xl:col-start-3" : ""}`}
              />
            );
          })}
        <div className="col-span-1 col-start-2 row-start-1 hidden place-items-center items-end justify-center xl:flex">
          <div className="mt-auto aspect-[394/217] w-full">
            <Image
              src={"/shapes/gearIcon.svg"}
              alt="gear icon"
              className="absolute left-[calc(25%-20px)] top-[180px] aspect-[394/217] w-4/5 scale-90 overflow-visible object-contain xl:static xl:w-auto"
              width={394}
              height={217}
              // alt="gear"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 grid h-full  grid-cols-1 gap-6 sm:grid-cols-2  lg:grid-cols-4 xl:min-h-[400px] ">
        {services?.slice(0, 2).map((img, index) => {
          const size = index === 0 ? 40 : 25;
          return (
            <div
              key={index}
              className={`relative col-span-full min-h-[300px] overflow-hidden ${
                index === 0 ? "md:col-span-2" : "lg:col-span-1"
              }`}>
              <m.div
                initial={{scale: 1}}
                whileInView={{scale: 1.2}}
                transition={{duration: 0.6, delay: 0.4}}
                className="relative h-full w-full">
                <Image
                  fill
                  sizes={`(max-width: 768px) 80vw, (max-width: 800px) ${size}vw`}
                  quality={80}
                  loading="lazy"
                  src={img?.featuredImage?.node.sourceUrl || ""}
                  alt="feature image"
                  className="object-cover"
                />
              </m.div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Service;
