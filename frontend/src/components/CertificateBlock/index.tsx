import {CertificateBlock as T} from "@/__generated__/graphql";

import Image from "next/image";
import {twMerge} from "tailwind-merge";
const CertificateBlock = (props: T) => {
  return (
    <div className="container-fluid py-14 text-center lg:py-28 2xl:py-[140px]">
      {props.title && (
        <h4 className="mx-auto max-w-[924px] text-3xl font-bold lg:text-5xl xl:text-6xl">
          {props.title}
        </h4>
      )}
      <div className="mx-auto mt-14 grid max-w-[924px] grid-cols-1 gap-[1px] gap-y-3 md:grid-cols-3 ">
        {props.certificates &&
          props.certificates.map((ele, id) => {
            return (
              <div
                key={id}
                className={twMerge(
                  "z-5 relative flex items-center justify-center bg-primary-black-background p-3 xl:p-10",
                  id === 1 && "md:border-l md:border-r md:border-white"
                )}>
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
