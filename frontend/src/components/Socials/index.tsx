import Link from "next/link";
import React from "react";
import {FaceBookIcon, InstagramIcon, LinkedInIcon} from "../Icons";
import footerData from "@/data/footer_setting.json";
import Image from "next/image";

const Socials = ({className}: {className?: string}) => {
  const footerInfo = footerData.siteSettings;
  return (
    <div className={className}>
      {footerInfo?.footerSetting.facebook && (
        <Link target="_blank" href={footerInfo.footerSetting.facebook.url}>
          <FaceBookIcon />
        </Link>
      )}
      {footerInfo?.footerSetting.instagram && (
        <Link target="_blank" href={footerInfo.footerSetting.instagram.url}>
          <InstagramIcon />
        </Link>
      )}
      {footerInfo?.footerSetting.linkedin && (
        <Link target="_blank" href={footerInfo.footerSetting.linkedin.url}>
          <LinkedInIcon />
        </Link>
      )}
      {footerInfo.footerSetting.xing && (
        <Link
          target="_blank"
          className="h-[41px] w-[41px]"
          href={
            footerInfo?.footerSetting?.xing?.url ||
            "https://www.xing.com/pages/vulcanus-stahl-maschinenbau-gmbh"
          }>
          <Image
            src="/icons/xing.png"
            alt="xing"
            className="h-[41px] w-[41px]"
            width={60}
            height={60}
          />
        </Link>
      )}
    </div>
  );
};

export default Socials;
