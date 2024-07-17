import Card from "../Card/index"
import img1 from "./images/img1.png"
import img2 from "./images/img2.png"
import type {StaticImport} from "next/dist/shared/lib/get-img-props"
import {ServiceComponent} from "@/__generated__/graphql"
import {languages} from "@/utils/language"
import {motion} from "framer-motion"

import dynamic from "next/dynamic"
import {useLocaleContext} from "@/context/LocaleContext"
import {twMerge} from "tailwind-merge"

import {useMediaQuery} from "@/hooks/useMediaQuery"
const Image = dynamic(() => import("next/image"))

type TService = {
  featureImage?: {image: string | StaticImport}[]
} & ServiceComponent

const images = [
  {
    image: img1,
  },
  {
    image: img2,
  },
]
const Service: React.FC<TService> = ({services, featureImage = images}) => {
  const {locale} = useLocaleContext()
  const isMobile = useMediaQuery("(max-width: 760px)")
  return (
    <div className="container-fluid py-14  md:py-20">
      <h2 className="mb-8 text-2xl font-bold  md:mb-14 md:text-3xl lg:text-6xl lg:leading-[84px] xl:text-[64px] xl:leading-[89px]">
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
            )
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
          const size = index === 0 ? 40 : 25
          return (
            <div
              key={index}
              className={twMerge(
                `relative col-span-full aspect-square min-h-[300px] overflow-hidden object-top sm:aspect-auto md:min-h-[400px] lg:min-h-[420px]`,
                index === 0
                  ? "col-span-1 lg:col-span-2"
                  : "col-span-1 lg:col-span-1"
              )}>
              <motion.div
                initial={{scale: 1}}
                whileInView={{scale: 1.1}}
                transition={{duration: 0.6, delay: 0.4}}
                className="relative grid h-full w-full place-items-center">
                <Image
                  fill
                  alt={img?.featuredImage?.node.altText || "feature image"}
                  quality={90}
                  src={img?.featuredImage?.node.sourceUrl || ""}
                  sizes="80vw"
                  className="object-cover"
                />
              </motion.div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Service
