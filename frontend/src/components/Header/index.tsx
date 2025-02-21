import { useLocaleContext } from "@/context/LocaleContext"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { TSiteData } from "../Layout"
import NavItem from "./NavItem"
import buildMenuTree from "@/utils/buildMenuTree"

const Link = dynamic(() => import("next/link"))
const HamburgerMenu = dynamic(() => import("public/icons/hamburger-menu.svg"))
const LanguageToggle = dynamic(() => import("./LanguageToggle"))
const HeaderDialog = dynamic(() => import("./HeaderDialog"))


type Props = {
  menu: TSiteData["menus"]
  hideLanguageToggle?: boolean | undefined
}

const Header = (props: Props) => {
  const menuItems = props?.menu ? buildMenuTree(props.menu) : []
  const [navIsOpen, setNavIsOpen] = useState(false)
  const {locale, asPath} = useLocaleContext()

  // console.log(asPath);

  const isMobile = useMediaQuery("(max-width:1024px)")
  useEffect(() => {
    if (navIsOpen) {
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.classList.remove("overflow-hidden")
    }
  }, [navIsOpen])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setNavIsOpen(false)
      }
    }
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  return (
    <>
      <header className=" sticky top-0 z-[100] py-[var(--header-py)]">
        <div className="sm:container-fluid ">
          <div className="flex h-[var(--header-height)] items-center justify-between rounded-[5px] bg-eerie-black px-2 transition-all duration-300 xl:px-6">
            <Link href="/" locale={locale}>
              <img
                src="https://holgerk1.sg-host.com/wp-content/uploads/2024/09/combination-logo-shape.svg"
                alt="logo"
                width={226}
                height={65}
                className="aspect-[226/65] max-w-[50vw] object-contain md:max-w-[150px] xl:max-w-[226px]"
              />
            </Link>

            {!isMobile && (
              <nav className=" hidden items-center  space-x-2 lg:flex xl:space-x-4">
                {menuItems?.map((item, index) => {
                  const isActive =
                    asPath !== "/" && item?.uri?.includes(asPath || "")
                  return (
                    <NavItem key={item?.uri} item={item} index={index}/>
                  )
                })}
              </nav>
            )}
            {!isMobile && (
              <div className="hidden shrink-0 lg:block">
                {!props?.hideLanguageToggle && <LanguageToggle />}
              </div>
            )}
            {isMobile && (
              <div className="block lg:hidden">
                <button
                  onClick={() => setNavIsOpen(true)}
                  className="flex items-center justify-center"
                  type="button">
                  <span className="sr-only">Open menu</span>
                  <HamburgerMenu />
                </button>
              </div>
            )}
          </div>
        </div>
        {isMobile && (
          <HeaderDialog
            menu={menuItems}
            navIsOpen={navIsOpen}
            setNavIsOpen={setNavIsOpen}
          />
        )}
      </header>
    </>
  )
}

export default Header
