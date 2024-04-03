import {useLocaleContext} from "@/context/LocaleContext";
import clsx from "clsx";
import {useRouter} from "next/router";
import {useCallback} from "react";

const LanguageButton = ({
  label,
  isActive,
  ...rest
}: {
  label: string;
  isActive: boolean;
} & React.HTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={clsx(
        "rounded-full px-[14.7px] pb-[7.65px] pt-[9px] text-center text-[18px] font-semibold uppercase leading-[140%]",
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
      let href = localeData[locale].link;
      router.push(href);
    },
    [localeData, router]
  );
  return (
    <div className="rounded-full border border-primary-blue-main bg-primary-blue-100 px-[3.68px] py-[3px]">
      <LanguageButton
        label="ENG"
        isActive={router.locale === "en"}
        onClick={() => handleLanguageChange("EN")}
      />
      <LanguageButton
        label="GER"
        isActive={router.locale === "de"}
        onClick={() => handleLanguageChange("DE")}
      />
    </div>
  );
};

export default LanguageToggle;
