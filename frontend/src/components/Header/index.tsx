import {MenuItemsQuery} from "@/__generated__/graphql";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/router";
import HamburgerMenu from "public/icons/hamburger-menu.svg";
import {useEffect, useState} from "react";
import LanguageToggle from "./LanguageToggle";
import HeaderDialog from "./HeaderDialog";
type Props = {
  menuItems: MenuItemsQuery["menuItems"];
};

const Header = (props: Props) => {
  const [navIsOpen, setNavIsOpen] = useState(false);
  const {locale, locales, defaultLocale, asPath} = useRouter();

  useEffect(() => {
    if (navIsOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [navIsOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setNavIsOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <>
      <header className=" sticky top-0 z-[100] py-[var(--header-py)]">
        <div className="sm:container-fluid ">
          <div className="flex h-[var(--header-height)] items-center justify-between rounded-[5px] bg-eerie-black px-6 transition-all duration-300">
            <Link href="/" locale={locale}>
              <Image
                src="/logo/combination-logo-shape.svg"
                alt="logo"
                width={226}
                height={65}
                className="aspect-[226/65] max-w-[50vw] object-contain"
              />
            </Link>

            <nav className="hidden items-center space-x-4 xl:flex">
              {props?.menuItems?.nodes?.map((item) => {
                const isActive = asPath !== "/" && item?.uri?.includes(asPath);
                return (
                  <Link
                    key={item?.uri}
                    href={item?.uri ?? "#"}
                    // locale={locale}
                    className={clsx(
                      "text-[16px] font-semibold uppercase leading-[200%] transition-all duration-300 hover:text-primary-blue-main",
                      {
                        "text-primary-blue-main": isActive,
                        "text-secondary-offWhite-white": !isActive,
                      }
                    )}>
                    {item?.label}
                  </Link>
                );
              })}
            </nav>

            <div className="hidden shrink-0 xl:block">
              <LanguageToggle />
            </div>

            <div className="block xl:hidden">
              <button
                onClick={() => setNavIsOpen(true)}
                className="flex items-center justify-center"
                type="button">
                <span className="sr-only">Open menu</span>
                <HamburgerMenu />
              </button>
            </div>
          </div>
        </div>
        <HeaderDialog
          menuItems={props.menuItems}
          navIsOpen={navIsOpen}
          setNavIsOpen={setNavIsOpen}
        />
      </header>
    </>
  );
};

export default Header;
