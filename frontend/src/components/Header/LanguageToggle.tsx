import {useLocaleContext} from "@/context/LocaleContext";

import clsx from "clsx";
import {useRouter} from "next/router";
import {useCallback} from "react";

const LanguageButton = ({
  label,
  disabled,
  isActive,
  ...rest
}: {
  label: string;
  isActive: boolean;
  disabled?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      disabled={disabled}
      aria-disabled={disabled}
      className={clsx(
        "rounded-full px-2 pb-[7.65px] pt-[9px] text-center text-base font-semibold uppercase leading-[140%] xl:px-[14.7px] xl:text-[18px]",
        {
          "bg-primary-blue-main text-secondary-offWhite-white": isActive,
          "text-primary-blue-main": !isActive,
        }
      )}
      {...rest}>
      <span className="align-middle">{label}</span>
    </button>
  );
};
type Props = {};

const LanguageToggle = (props: Props) => {
  const {localeData} = useLocaleContext();
  const router = useRouter();

  const handleLanguageChange = useCallback(
    (locale: string) => {
      for (let [key, value] of Object.entries(localeData || {})) {
        if (!value) return;
      }
      //@ts-ignore
      let href = locale ? localeData[locale] : "";
      router.push(href, href, {locale: locale.toLocaleLowerCase()});
    },
    [localeData, router]
  );
  for (let [keys, values] of Object.entries(localeData || {})) {
    if (!values) return <div className="h-1 min-w-[130px] rounded-full"></div>;
  }

  return (
    <div className="rounded-full border border-primary-blue-main bg-primary-blue-100 px-[3.68px] py-[3px]">
      <LanguageButton
        label="ENG"
        // disabled={localeData ? !localeData["EN"] !== null : true}
        isActive={router.locale === "en"}
        onClick={() => handleLanguageChange("EN")}
      />
      <LanguageButton
        label="GER"
        // disabled={localeData ? !localeData["DE"] !== null : true}
        isActive={router.locale === "de"}
        onClick={() => handleLanguageChange("DE")}
      />
    </div>
  );
};

export default LanguageToggle;
