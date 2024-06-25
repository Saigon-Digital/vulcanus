import {LanguageCodeEnum} from "@/__generated__/graphql";
import {languages} from "@/utils/language";
import Link from "next/link";
import React from "react";

const index = ({locale}: {locale?: LanguageCodeEnum}) => {
  return (
    <p>
      {languages(locale)?.poweredBy}{" "}
      <Link
        className="hover:text-primary-blue-main"
        target="_blank"
        href="https://saigon.digital/">
        saigon.digital
      </Link>{" "}
    </p>
  );
};

export default index;
