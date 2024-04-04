import React from "react";
import {PageBannerFragment} from "@/__generated__/graphql";
import parse from "html-react-parser";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

const PageBanner: React.FC<PageBannerFragment> = ({
  title,
  description,
  image,
}) => {
  return (
    <div className="container-fluid pb-10 lg:pb-16">
      {image && (
        <Head>
          <link rel="preload" href={image.node.sourceUrl || ""} as="image" />
        </Head>
      )}
      <div className="flex flex-wrap items-center justify-between gap-y-5 py-10 ">
        {title && (
          <h1 className="text-4xl font-bold text-white lg:text-5xl 2xl:text-[64px] 2xl:leading-[89px]">
            {title}
          </h1>
        )}
        {description && (
          <div className="w-full text-lg font-[300] md:w-1/2 md:text-xl [&>*>strong]:font-medium xl:[&>*]:text-xl">
            {description && parse(description)}
          </div>
        )}
      </div>
      {image && (
        <div
          style={{
            backgroundImage: `url(${image?.node?.sourceUrl}` || "",
          }}
          className="parallax relative aspect-[2/1] w-full object-cover lg:aspect-[1600/800]"></div>
      )}
    </div>
  );
};

export default PageBanner;
