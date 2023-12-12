import Image from "next/image";
import React from "react";

const Footer = () => {
  return (
    <footer className="container-fluid">
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
