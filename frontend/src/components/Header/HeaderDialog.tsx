import {MenuItemsQuery} from "@/__generated__/graphql";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import CloseIcon from "public/icons/x-close.svg";
import LanguageToggle from "./LanguageToggle";

type Props = {
  menuItems: MenuItemsQuery["menuItems"];
  navIsOpen: boolean;
  setNavIsOpen: (navIsOpen: boolean) => void;
};

const HeaderDialog = ({menuItems, navIsOpen, setNavIsOpen}: Props) => {
  const {asPath, locale} = useRouter();
  return (
    <div
      role="dialog"
      className={clsx(
        "container-fluid fixed inset-0 z-50 flex flex-col bg-primary-midBlue-main py-[var(--header-py)] transition-all duration-500",
        {
          "translate-x-full": !navIsOpen,
          "translate-x-0": navIsOpen,
        }
      )}>
      <div className="flex h-[var(--header-height)] items-center justify-between px-6">
        <Image
          src="/logo/combination-logo.svg"
          alt="logo"
          width={243.82}
          height={30.84}
          className="aspect-[243.82/30.84] max-w-[50vw] object-contain"
        />
        <button
          onClick={() => setNavIsOpen(false)}
          className="flex items-center justify-center"
          type="button">
          <span className="sr-only">Close menu</span>
          <CloseIcon />
        </button>
      </div>

      <nav className="flex grow flex-col justify-between gap-y-10 overflow-y-auto py-[15%]">
        <ul className="flex flex-col items-center space-y-4">
          {menuItems?.nodes?.map((item) => {
            const isActive = asPath !== "/" && item?.uri?.includes(asPath);
            return (
              <li key={item?.uri}>
                <Link
                  href={item?.uri ?? "#"}
                  locale={locale}
                  className={clsx(
                    "text-[20px] font-semibold uppercase leading-[200%] transition-all duration-300",
                    {
                      "text-primary-blue-300": isActive,
                      "text-secondary-offWhite-white": !isActive,
                    }
                  )}>
                  {item?.label}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="flex justify-center">
          <LanguageToggle />
        </div>
      </nav>
    </div>
  );
};

export default HeaderDialog;