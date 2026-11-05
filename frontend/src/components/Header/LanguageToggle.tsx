import { useLocaleContext } from "@/context/LocaleContext"

import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback } from "react"
import { twMerge } from "tailwind-merge"

const LanguageButton = ({
  label,
  disabled,
  isActive,
  href,

  ...rest
}: {
  label: string
  isActive: boolean
  disabled?: boolean
  href: string
} & React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <Link
      href={href}
      aria-disabled={disabled}
      locale={label === "ENG" ? "en" : "de"}
      // locale={locale}
      className={twMerge(
        "inline-block rounded-full px-2 pb-[7.65px] pt-[9px] text-center text-base font-semibold uppercase leading-[140%] xl:px-[14.7px] xl:text-[18px]",

        isActive && "bg-primary-blue-main text-secondary-offWhite-white",
        !isActive && "text-primary-blue-main"
      )}>
      <span className="align-middle">{label}</span>
    </Link>
  )
}
type Props = {}

const commingSoonLink = "/coming-soon"

const LanguageToggle = (props: Props) => {
  const { localeData, asPath } = useLocaleContext()
  const router = useRouter()


  return (
    <div className="rounded-full border border-primary-blue-main bg-primary-blue-100 px-[3.68px] py-[3px]">
      <LanguageButton
        label="ENG"
        href={localeData?.EN ?? ""}
        // disabled={localeData ? !localeData["EN"] !== null : true}
        isActive={router.locale === "en"}
      // onClick={() => handleLanguageChange("EN")}
      />
      <LanguageButton
        label="GER"
        href={localeData?.DE ?? ""}
        // disabled={localeData ? !localeData["DE"] !== null : true}
        isActive={router.locale === "de"}
      // onClick={() => handleLanguageChange("DE")}
      />
    </div>
  )
}

export default LanguageToggle
