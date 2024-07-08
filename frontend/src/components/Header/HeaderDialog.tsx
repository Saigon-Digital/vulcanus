import {MenuItemsQuery} from "@/__generated__/graphql"

import Image from "next/image"
import Link from "next/link"

import CloseIcon from "public/icons/x-close.svg"
import LanguageToggle from "./LanguageToggle"
import {TSiteData} from "../Layout"
import {useLocaleContext} from "@/context/LocaleContext"
import {twMerge} from "tailwind-merge"

type Props = {
  menu: TSiteData["menus"]
  navIsOpen: boolean
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
          {menu &&
            menu?.menuItems.nodes.map((item) => {
              const isActive =
                asPath !== "/" && item?.uri?.includes(asPath || "")
              return (
                <li key={item?.uri}>
                  <Link
                    href={item?.uri ?? "#"}
                    locale={locale}
                    className={twMerge(
                      "text-[20px] font-semibold uppercase leading-[200%] transition-all duration-300",

                      isActive && "text-primary-blue-300",
                      !isActive && "text-secondary-offWhite-white"
                    )}>
                    {item?.label}
                  </Link>
                </li>
              )
            })}
        </ul>
        <div className="flex justify-center">
          <LanguageToggle />
        </div>
      </nav>
    </div>
  )
}

export default HeaderDialog
