import {PropsWithChildren} from "react"
import dynamic from "next/dynamic"
import {MenuLocationEnum} from "@/__generated__/graphql"
import siteData from "../../data/site_data.json"
import {useLocaleContext} from "@/context/LocaleContext"
import Modal from "../Modal"
import Header from "../Header"
import Footer from "../Footer"

export type TSiteData = {
  menus?: (typeof siteData)["menus"]["nodes"][number]
}

const menuLocations = {
  de: {
    header: MenuLocationEnum.Header,
    footer: MenuLocationEnum.Footer,
  },
  en: {
    header: MenuLocationEnum.HeaderEn,
    footer: MenuLocationEnum.FooterEn,
  },
}

function getMenu(location: MenuLocationEnum) {
  const menu = siteData.menus.nodes.find(
    (menu) => menu.locations[0] === location
  )
  return menu
}

function getGlobalSiteData(locale: string | undefined) {
  const menuLocation = menuLocations[(locale as "de" | "en") || "de"]
  const headerMenu = getMenu(menuLocation.header)
  const footerMenu = getMenu(menuLocation.footer)

  return {
    headerMenu: headerMenu,
    footerMenu: footerMenu,
  }
}

const Layout = ({
  children,
  footerText,
  hideLanguageToggle
}: PropsWithChildren & {footerText?: string | null | undefined} & {hideLanguageToggle:boolean | undefined}) => {
  const {locale} = useLocaleContext()

  const {headerMenu, footerMenu} = getGlobalSiteData(locale)

  return (
    <>
      <Header menu={headerMenu} hideLanguageToggle={hideLanguageToggle}/>
      <main className="overflow-x-clip">{children}</main>
      <Footer footerText={footerText} menu={footerMenu} />
    </>
  )
}

export default Layout
