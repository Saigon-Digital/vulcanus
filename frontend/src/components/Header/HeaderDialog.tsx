import Image from "next/image"
import Link from "next/link"
import {motion} from "framer-motion"

import CloseIcon from "public/icons/x-close.svg"
import LanguageToggle from "./LanguageToggle"
import {useLocaleContext} from "@/context/LocaleContext"
import {twMerge} from "tailwind-merge"
import {DownIcon} from "./NavItem"
import {useState} from "react"
import { MenuItem, MenuChildItem } from "@/utils/buildMenuTree"

type Props = {
  menu: MenuItem[];
  navIsOpen: boolean;
  setNavIsOpen: (navIsOpen: boolean) => void
}

const HeaderDialog = ({menu, navIsOpen, setNavIsOpen}: Props) => {
  const {asPath, locale} = useLocaleContext()
  return (
    <div
      role="dialog"
      aria-labelledby="dialogTitle"
      className={twMerge(
        "container-fluid fixed inset-0 z-50 flex flex-col bg-primary-midBlue-main py-[var(--header-py)] transition-all duration-500 lg:opacity-0",

        !navIsOpen && "translate-x-full",
        navIsOpen && "translate-x-0"
      )}>
      <div className="flex h-[var(--header-height)] items-center justify-between px-6">
        <Link href={"/"} locale={locale}>
          <Image
            src="/logo/combination-logo.svg"
            alt="logo"
            width={243.82}
            height={30.84}
            className="aspect-[243.82/30.84] max-w-[50vw] object-contain"
          />
        </Link>
        <button
          onClick={() => setNavIsOpen(false)}
          className="flex items-center justify-center"
          type="button">
          <span id="dialogTitle" className="sr-only">
            Close menu
          </span>
          <CloseIcon />
        </button>
      </div>

      <nav className="flex grow flex-col justify-between gap-y-10 overflow-y-auto py-[15%]">
        <ul className="flex flex-col items-center space-y-4">
          {menu?.map((item: MenuItem) => {
            const isActive =
              asPath !== "/" && item?.uri?.includes(asPath || "")
            return <NavItem key={item?.uri} item={item} />
          })}
        </ul>
        <div className="flex justify-center">
          <LanguageToggle />
        </div>
      </nav>
    </div>
  )
}

const NavItem = ({item}: { item: MenuItem }) => {
  const {locale} = useLocaleContext()
  const [open, setOpen] = useState<boolean>(false)
  
  return (
    <li key={item?.uri}>
      <Link
        href={item?.uri ?? "#"}
        locale={locale}
        className={twMerge(
          "relative flex items-center justify-center gap-x-1 text-[20px] font-semibold uppercase leading-[200%] transition-all duration-300",
          "text-secondary-offWhite-white",
          item?.childItems?.nodes && "ml-5"
        )}>
        {item?.label}
        {item?.childItems?.nodes.length > 0 && (
          <span
            onClick={() => {
              setOpen(!open)
            }}
            className={` transition-all duration-300 ${
                  open ? "rotate-180" : ""
                }`}
            >
            <DownIcon
              className={
                `cursor-pointer transition-all ${
                  open ? "rotate-180" : ""
                }` as string
              }
            />
          </span>
        )}
      </Link>
      {open && (
        <motion.div
          // onMouseEnter={() => setOpen(true)}
          initial={{ opacity: 0, scale: 0.95, y: -10 }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
              type: "spring",
              stiffness: 200,
              damping: 25,
              mass: 1,
              duration: 0.3
            }
          }}
          exit={{ opacity: 0, scale: 0.95, y: -5 }}
          transition={{
            duration: 0.2,
            ease: "easeOut"
          }}
          
          style={{
            z: 100,
            
            minHeight: "95px",
            boxShadow: "0px 4px 30px 0px #0F172A66",
          }}
          className="rounded-[10px] border-[0.5px] border-none bg-white">
          <ul className="flex list-none flex-col">
            {item?.childItems?.nodes &&
              item?.childItems?.nodes?.map((ele: MenuChildItem, id: number) => {
                return (
                  <Link
                    className={twMerge(
                      "p-4 pb-2 pr-[34px] text-base uppercase leading-none text-primary-midBlue-main"
                    )}
                    key={id}
                    href={ele?.uri || ""}>
                    {ele?.label || "Empty label"}
                  </Link>
                )
              })}
          </ul>
        </motion.div>
      )}
    </li>
  )
}
export default HeaderDialog
