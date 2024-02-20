import {MenuItemsQuery} from "@/__generated__/graphql";
import Image from "next/image";
import React from "react";

type Props = {
  menuItems: MenuItemsQuery["menuItems"];
};

const Footer = (props: Props) => {
  return (
    <footer className="container-fluid pt-20">
      <div className="mb-12 flex items-center justify-between">
        <h4 className="text-3xl font-bold text-primary-midBlue-main xl:text-[100px]">
          Let’s start
          <span className="text-primary-blue-main"> to work</span>
        </h4>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={158}
          className="h-10 w-10 md:h-14 md:w-14 lg:h-20 lg:w-20"
          height={158}
          viewBox="0 0 158 158"
          fill="none">
          <rect width={158} height={158} rx={79} fill="#E5F5FC" />
          <path
            d="M67.29 51.7309C67.29 54.1562 69.2389 56.0619 71.621 56.0619H95.8312L48.6667 103.226C46.9776 104.915 46.9776 107.644 48.6667 109.333C50.3558 111.022 53.0843 111.022 54.7734 109.333L101.938 62.1686V86.3788C101.938 88.7609 103.887 90.7098 106.269 90.7098C108.651 90.7098 110.6 88.7609 110.6 86.3788V51.7309C110.6 49.3488 108.651 47.3999 106.269 47.3999H71.621C69.2389 47.3999 67.29 49.3488 67.29 51.7309Z"
            fill="#009EE0"
          />
        </svg>
      </div>
      <div className="relative rounded-md">
        <div className="relative grid grid-cols-12 rounded-md bg-primary-midBlue-main">
          <Image
            src="/images/footer-shape.svg"
            className="absolute right-2 top-2 hidden sm:block"
            width={56}
            height={100}
            alt="shape"
          />
          <div className="col-span-full flex flex-col justify-between p-8 !pr-0 md:col-span-11 md:p-16 lg:flex-row">
            <div className="flex w-4/5 max-w-[458px] flex-col gap-6 lg:w-1/2 lg:gap-16  xl:flex-[440px] xl:gap-10">
              <Image src="/logo.svg" width={458} height={137} alt="logo" />
              <div className="flex flex-col gap-5 lg:flex-row lg:gap-10">
                <div className="text-primary-blue-100 lg:flex-[122px]">
                  <a href="">Runtestraße 13 59457 Werl Germany</a>
                </div>
                <ul className="text-primary-blue-100 lg:flex-[240px]">
                  <li>
                    <a> Tel.: +49 (0) 2922 / 97 49 0</a>
                  </li>
                  <li>
                    <a>Fax: +49 (0) 2922 / 97 49 99</a>
                  </li>
                  <li>
                    <a>Email: info@vulcanus-stahl.de</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-16 grid w-full grid-cols-2  gap-5 gap-y-10  text-primary-blue-100 sm:w-4/5 md:grid-cols-3 lg:w-1/2  lg:gap-10 lg:pl-10 xl:mt-16 ">
              <div className="flex flex-col  ">
                <h4 className="text-base font-semibold uppercase xl:text-lg">
                  our products
                </h4>
                <ul className="mt-5 flex flex-col gap-2 lg:gap-3">
                  <li>
                    <a href="#">Services</a>
                  </li>
                  <li>
                    <a href="#">Manufacturing</a>
                  </li>
                  <li>
                    <a href="#">Quality Assurance</a>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col  ">
                <h4 className="text-base font-semibold uppercase xl:text-lg">
                  Informations
                </h4>
                <ul className="mt-5 flex flex-col gap-2 lg:gap-3">
                  <li>
                    <a href="#">About Us</a>
                  </li>
                  <li>
                    <a href="#">Career</a>
                  </li>
                  <li>
                    <a href="#">Blogs</a>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col  ">
                <h4 className="text-base font-semibold uppercase xl:text-lg">
                  get in touch
                </h4>
                <ul className="mt-5 flex flex-col gap-2 lg:gap-3">
                  <li>
                    <a href="#">Services</a>
                  </li>
                  <li>
                    <a href="#">Manufacturing</a>
                  </li>
                  <li>
                    <a href="#">Quality Assurance</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
