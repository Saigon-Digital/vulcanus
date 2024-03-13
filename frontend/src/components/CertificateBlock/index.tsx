import {CertificateBlock as T} from "@/__generated__/graphql";
import React from "react";
import Image from "next/image";
const CertificateBlock = (props: T) => {
  return (
    <div className="container-fluid py-14 text-center lg:py-28 2xl:py-[140px]">
      <h4 className="mx-auto max-w-[924px] text-5xl font-bold xl:text-6xl">
        {props.title}
      </h4>
      <div className="mx-auto mt-14 grid max-w-[924px] grid-cols-3 gap-[1px] bg-secondary-offWhite-main">
        {props.certificates &&
          props.certificates.map((ele, id) => {
            return (
              <div
                key={id}
                className="z-5 relative flex items-center justify-center bg-primary-black-background p-3 xl:p-10">
                <Image
                  src={ele?.certificate?.node?.sourceUrl || ""}
                  alt="certificate"
                  width={141}
                  height={141}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CertificateBlock;