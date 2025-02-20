import {useLocaleContext} from "@/context/LocaleContext"
import Link from "next/link"
import React, {useState} from "react"
import {twMerge} from "tailwind-merge"
import {motion} from "framer-motion"


const DownIcon = (className: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      color="currentcolor">
      <path
        d="M4.99934 7.75C4.8511 7.75013 4.70622 7.79419 4.58301 7.87661C4.45979 7.95903 4.36377 8.07611 4.30705 8.21308C4.25034 8.35004 4.23549 8.50074 4.26438 8.64614C4.29326 8.79154 4.36458 8.92511 4.46934 9.03L11.4693 16.03C11.61 16.1705 11.8006 16.2493 11.9993 16.2493C12.1981 16.2493 12.3887 16.1705 12.5293 16.03L19.5293 9.03C19.6341 8.92511 19.7054 8.79154 19.7343 8.64614C19.7632 8.50074 19.7483 8.35004 19.6916 8.21308C19.6349 8.07611 19.5389 7.95903 19.4157 7.87661C19.2925 7.79419 19.1476 7.75013 18.9993 7.75H4.99934Z"
        fill="currentcolor"
      />
    </svg>
  )
}
function NavItem({item, index}: any) {
    
const subMenu:any = {
    1: [
      {
        title: "recyclingtechnik",
        link: "/maschinenbau/recyclingtechnik",
      },
      {
        title: "baugruppenfertigung",
        link: "/maschinenbau/baugruppenfertigung",
      },
    ],
    2: [
      {
        title: "Drehen",
        link: "/dienstleistungen/drehenn",
      },
      {
        title: "Fräsen",
        link: "/dienstleistungen/frasen",
      },
    ],
  }
  const {locale} = useLocaleContext()
  const [open, setOpen] = useState<boolean>(false)
  return (
    <div
      className="relative"
      key={item.uri}
      onMouseLeave={() => setOpen(false)}>
      <Link
        onMouseEnter={() => setOpen(true)}
        key={item?.uri}
        locale={locale}
        href={item?.uri ?? "#"}
        // locale={locale}
        className={twMerge(
          "relative flex items-center gap-x-1 text-sm font-semibold uppercase leading-[200%] transition-all duration-300 after:absolute after:top-[90%] after:content-[''] hover:text-primary-blue-main  xl:text-[16px]",
          open && " after:transparent after:h-52 after:w-full",
          "text-secondary-offWhite-white"
        )}>
        {item?.label}
        {(index === 1 || index === 2) && (
          <DownIcon
            className={
              `-translate-y-[0px] cursor-pointer transition-all ${
                open ? "rotate-180" : ""
              }` as string
            }
          />
        )}
      </Link>
      {open && (
        <motion.div
          // onMouseEnter={() => setOpen(true)}
          initial={{opacity: 0, scale: 1, y: -15}}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            animationTimingFunction: "ease-in-out",
          }}
          exit={{opacity: 0, y: 0}}
          transition={{
            y: {
              type: "spring",
              stiffness: 300,
              damping: 30,
              duration: 0.4,
            },
            opacity: {duration: 0.4},
          }}
          style={{
            position: "absolute",
            z: 100,
            top: "70px",
            left: -10,
            width: "240px",
            height: "auto",
            boxShadow: "0px 4px 30px 0px #0F172A66",
          }}
          onMouseLeave={() => {
            setOpen(false)
          }}
          className="rounded-[10px] border-[0.5px] border-none bg-eerie-black">
          <ul className="flex list-none flex-col">
            {subMenu?.[index]?.map((ele: any, id: any) => {
              return (
                <Link
                  className={twMerge(
                    "p-4 pr-[34px] text-base uppercase leading-none hover:text-primary-blue-main"
                  )}
                  key={id}
                  href={ele.link}>
                  {ele.title}
                </Link>
              )
            })}
          </ul>
        </motion.div>
      )}
    </div>
  )
}

export default NavItem
