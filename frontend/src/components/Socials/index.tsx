import Link from "next/link";
import React from "react";
import {FaceBookIcon, InstagramIcon, LinkedInIcon, Xing} from "../Icons";
import footerData from "@/data/footer_setting.json";
import Image from "next/image";
import {twMerge} from "tailwind-merge";

const Socials = ({
  className,
  isHover,
  mainColor,
}: {
  className?: string;
  isHover?: boolean;
  mainColor?: string;
}) => {
  const footerInfo = footerData.siteSettings;
  return (
    <div className={className}>
      {footerInfo?.footerSetting.facebook && (
        <Link target="_blank" href={footerInfo.footerSetting.facebook.url}>
          <FaceBookIcon
            className={twMerge(isHover && "hover:text-primary-blue-main")}
          />
        </Link>
      )}
      {footerInfo?.footerSetting.instagram && (
        <Link target="_blank" href={footerInfo.footerSetting.instagram.url}>
          <InstagramIcon
            className={twMerge(isHover && "hover:text-primary-blue-main")}
          />
        </Link>
      )}
      {footerInfo?.footerSetting.linkedin && (
        <Link target="_blank" href={footerInfo.footerSetting.linkedin.url}>
          <LinkedInIcon
            className={twMerge(isHover && "hover:text-primary-blue-main")}
          />
        </Link>
      )}
      {footerInfo.footerSetting.xing && (
        <Link
          target="_blank"
          className=""
          href={
            footerInfo?.footerSetting?.xing?.url ||
            "https://www.xing.com/pages/vulcanus-stahl-maschinenbau-gmbh"
          }>
          <Xing
            className={twMerge(
              "h-10 w-10 text-primary-midBlue-main hover:bg-primary-blue-main",
              mainColor
            )}
          />
        </Link>
      )}
    </div>
  );
};

export default Socials;
