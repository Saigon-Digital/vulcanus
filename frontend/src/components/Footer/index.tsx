import {GetFooterButtonQuery, MenuItemsQuery} from "@/__generated__/graphql";
import Image from "next/image";
import React, {useLayoutEffect, useState} from "react";
import Link from "next/link";
import {languages} from "@/utils/language";
import {useRouter} from "next/router";
import {motion} from "framer-motion";
import {getFooterButtonLink} from "@/libs/graphql/utils";
import {useConsoleLog} from "@/utils";
// import {flatListToHierarchical} from "@faustwp/core";
type Props = {
  menuItems: MenuItemsQuery["menuItems"];
};

const Footer = (props: Props) => {
  const hierarchicalList = props.menuItems?.nodes.filter((ele: any) => {
    const {childItems} = ele;
    return childItems.nodes?.length > 0;
  });
  let [buttonLink, setButtonLink] =
    useState<GetFooterButtonQuery["contactPage"]>();

  const router = useRouter();

  useLayoutEffect(() => {
    (async () => {
      const {data} = await getFooterButtonLink();
      setButtonLink(data.contactPage);
    })();
  }, []);
  if (!hierarchicalList) return null;

  return (
    <footer className="pt-20 sm:container-fluid">
      <div className="group mb-12 flex items-center justify-between px-5 sm:px-0">
        <h3
          className="cursor-default select-none text-3xl font-bold text-white md:text-5xl xl:text-6xl 2xl:text-[100px] [&>strong]:text-primary-blue-main"
          dangerouslySetInnerHTML={{
            __html: languages(router.locale)?.letStart || "",
          }}></h3>
        <Link
          href={
            router.locale?.toLocaleLowerCase() === "en"
              ? buttonLink?.ENLink?.uri || ""
              : buttonLink?.DELink?.uri || ""
          }>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={158}
            className="h-10 w-10 md:h-14 md:w-14 lg:h-28 lg:w-28 2xl:h-[158px] 2xl:w-[158px]"
            height={158}
            viewBox="0 0 158 158"
            fill="none">
            <rect width={158} height={158} rx={79} fill="#E5F5FC" />
            <motion.path
              initial={{x: -12, y: 12}}
              whileInView={{x: 12, y: -12}}
              transition={{duration: 0.4, delay: 0.3, type: "just"}}
              className="transition-all duration-300 "
              d="M67.29 51.7309C67.29 54.1562 69.2389 56.0619 71.621 56.0619H95.8312L48.6667 103.226C46.9776 104.915 46.9776 107.644 48.6667 109.333C50.3558 111.022 53.0843 111.022 54.7734 109.333L101.938 62.1686V86.3788C101.938 88.7609 103.887 90.7098 106.269 90.7098C108.651 90.7098 110.6 88.7609 110.6 86.3788V51.7309C110.6 49.3488 108.651 47.3999 106.269 47.3999H71.621C69.2389 47.3999 67.29 49.3488 67.29 51.7309Z"
              fill="#009EE0"
            />
          </svg>
        </Link>
      </div>
      <div className="relative rounded-md">
        <div className="relative grid grid-cols-12 rounded-md bg-primary-midBlue-main">
          <Image
            src="/footer-shape.png"
            className="absolute right-2 top-2 hidden sm:block"
            width={56}
            height={100}
            alt="shape"
          />

          <div className="col-span-full flex flex-col justify-between p-8 !pr-0 md:col-span-11 md:p-16 lg:flex-row">
            <div className="flex w-4/5 max-w-[458px] flex-col gap-6 lg:w-1/2 lg:gap-16  xl:flex-[440px] xl:gap-10">
              <Link href={"/"} locale={router.locale}>
                <Image src="/logo.svg" width={458} height={137} alt="logo" />
              </Link>
              <div className="flex flex-col gap-5 lg:flex-row lg:gap-10">
                <div className="text-primary-blue-100 lg:flex-[122px]">
                  <Link
                    href="/#"
                    className="transition hover:text-primary-blue-main">
                    Runtestraße 13 59457 Werl Germany
                  </Link>
                </div>
                <ul className="text-primary-blue-100 lg:flex-[240px]">
                  <li>
                    <Link
                      className="transition hover:text-primary-blue-main"
                      href="tel:+492922974999">
                      Tel.: +49 (0) 2922 / 97 49 0
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="transition hover:text-primary-blue-main"
                      href="fax:+492922974999">
                      Fax: +49 (0) 2922 / 97 49 99
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="transition hover:text-primary-blue-main"
                      href="mailto:info@vulcanus-stahl.de">
                      Email: info@vulcanus-stahl.de
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-16 grid w-full grid-cols-2  gap-5 gap-y-10  text-primary-blue-100 sm:w-4/5 md:grid-cols-3 lg:w-1/2  lg:gap-10 lg:pl-10 xl:mt-16 ">
              {/* should check if empty array: hierarchicalList.length > 0 && ...
           
            */}
              {hierarchicalList &&
                hierarchicalList.map((ele: any, index: number) => {
                  return (
                    <div key={index} className="flex flex-col  ">
                      <h4 className="whitespace-nowrap text-base font-semibold uppercase xl:text-lg">
                        {ele.label}
                      </h4>
                      <ul className="mt-5 flex flex-col gap-2 lg:gap-3">
                        {ele.childItems?.nodes?.map(
                          (ele: any, index: number) => {
                            return (
                              <li key={index}>
                                <Link
                                  className="hove:font-bold transition hover:text-primary-blue-main"
                                  href={ele.uri}>
                                  {ele.label}
                                </Link>
                              </li>
                            );
                          }
                        )}
                      </ul>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col justify-between gap-y-6 py-4 sm:flex-row">
          <p>
            {languages(router.locale)?.copyRight.replace(
              "$year",
              String(new Date().getFullYear())
            )}
          </p>
          <p>
            {languages(router.locale)?.poweredBy}{" "}
            <Link
              className="hover:text-primary-blue-main"
              target="_blank"
              href="https://saigon.digital/">
              saigon.digital
            </Link>{" "}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
